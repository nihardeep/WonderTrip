from typing import Dict, Any, List
from http.server import BaseHTTPRequestHandler
import json
import os

from google import genai
from pinecone import Pinecone


# ======================================================
# CONFIG (from Vercel Environment Variables)
# ======================================================

GEMINI_API_KEY = os.environ["GEMINI_API_KEY"]
PINECONE_API_KEY = os.environ["PINECONE_API_KEY"]
PINECONE_INDEX = os.environ["PINECONE_INDEX"]

EMBED_MODEL = "models/text-embedding-004"


# ======================================================
# INITIALIZE CLIENTS (cold start safe)
# ======================================================

genai.configure(api_key=GEMINI_API_KEY)

pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index(PINECONE_INDEX)


# ======================================================
# SEMANTIC CHUNKING LOGIC
# ======================================================

def semantic_chunk_itinerary(itinerary: Dict[str, Any]) -> List[Dict[str, Any]]:
    chunks = []

    def add_chunk(content: str, metadata: Dict[str, Any]):
        if content and content.strip():
            chunks.append({
                "content": content.strip(),
                "metadata": metadata
            })

    destination = itinerary.get("destination", {})
    itinerary_outline = itinerary.get("itinerary_outline", [])
    trip_type = itinerary.get("trip_type", [])

    base_metadata = {
        "trip_id": itinerary.get("trip_id"),
        "destination_id": itinerary.get("destination_id"),
        "hotel_id": itinerary.get("hotel_id"),
        "city": destination.get("city"),
        "country": destination.get("country"),
        "region": destination.get("region"),
        "trip_type": trip_type,
        "source": "llm_itinerary"
    }

    # -------- OVERVIEW --------
    add_chunk(
        f"{itinerary.get('headline', '')}. {itinerary.get('description', '')}",
        {**base_metadata, "chunk_type": "overview"}
    )

    # -------- DAYS / ACTIVITIES --------
    for day in itinerary_outline:
        day_number = day.get("day")

        add_chunk(
            f"Day {day_number}: {day.get('title', '')}. {day.get('overview', '')}",
            {
                **base_metadata,
                "chunk_type": "day",
                "day": day_number
            }
        )

        for activity in day.get("activities", []):
            if activity.get("description"):
                add_chunk(
                    activity["description"],
                    {
                        **base_metadata,
                        "chunk_type": "activity",
                        "day": day_number
                    }
                )

        if day.get("how_to_reach"):
            add_chunk(
                day["how_to_reach"],
                {
                    **base_metadata,
                    "chunk_type": "logistics",
                    "day": day_number
                }
            )

    # -------- FALLBACK LOGISTICS --------
    if not any(c["metadata"]["chunk_type"] == "logistics" for c in chunks):
        add_chunk(
            f"The itinerary is designed to be explored comfortably within {destination.get('city')}, "
            f"with walking and public transport suitable for most locations.",
            {**base_metadata, "chunk_type": "logistics"}
        )

    return chunks


# ======================================================
# EMBEDDING + UPSERT
# ======================================================

def embed_and_upsert(chunks: List[Dict[str, Any]]):
    vectors = []

    for i, chunk in enumerate(chunks):
        embedding = genai.embed_content(
            model=EMBED_MODEL,
            content=chunk["content"]
        )["embedding"]

        vectors.append({
            "id": f"{chunk['metadata'].get('trip_id', 'trip')}-{i}",
            "values": embedding,
            "metadata": {
                **chunk["metadata"],
                "content": chunk["content"]
            }
        })

    index.upsert(vectors=vectors)


# ======================================================
# VERCEL ENTRY POINT
# ======================================================

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)

        itinerary = json.loads(body)

        chunks = semantic_chunk_itinerary(itinerary)
        embed_and_upsert(chunks)

        response = {
            "status": "success",
            "chunks_ingested": len(chunks)
        }

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(response).encode("utf-8"))
