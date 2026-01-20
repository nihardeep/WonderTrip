import os
import subprocess
import base64
from typing import List

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import HumanMessage

# ==============================
# FRAME EXTRACTION
# ==============================

def extract_frames(video_path: str, output_dir: str, fps: int = 1) -> List[str]:
    """
    Extract frames from a video using ffmpeg.
    """
    os.makedirs(output_dir, exist_ok=True)

    cmd = [
        "ffmpeg",
        "-i", video_path,
        "-vf", f"fps={fps}",
        f"{output_dir}/frame_%04d.jpg"
    ]

    subprocess.run(cmd, check=True)

    return sorted(
        os.path.join(output_dir, f)
        for f in os.listdir(output_dir)
        if f.endswith(".jpg")
    )

# ==============================
# IMAGE → BASE64 (Gemini format)
# ==============================

def encode_image_base64(path: str) -> str:
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

# ==============================
# VIDEO ANALYSIS (GEMINI 2.5 FLASH)
# ==============================

def analyze_video(video_path: str) -> str:
    """
    Analyze a video by sampling frames and sending them to Gemini 2.5 Flash.
    Returns RAW TEXT (JSON string).
    """

    frames_dir = video_path.replace(".mp4", "_frames")

    frame_paths = extract_frames(
        video_path=video_path,
        output_dir=frames_dir,
        fps=1
    )

    # -------- Prompt (TEXT PART) --------
    parts = [
        {
            "type": "text",
            "text": """
You are a travel scene analyst.
Be precise and conservative.
If unsure, say so explicitly.

Important guidelines:
- Do NOT assume a single destination if multiple plausible locations exist.
- If a landmark or scene could correspond to multiple cities or countries,
  mention this ambiguity clearly in the assumptions.
- destination_guess should reflect the MOST LIKELY location,
  but assumptions must list credible alternatives if applicable.
- Confidence should reflect certainty after considering ambiguity,
  not just how common or famous the location is.

Tasks:
1. Identify likely destination (city/country if possible)
2. Identify visible activities
3. Infer trip type (leisure, adventure, cultural, food, honeymoon)
4. Infer time of day if possible
5. List assumptions explicitly, including ambiguity and alternatives
6. Provide a confidence score between 0 and 1

Return STRICT JSON only:

{
  "destination_guess": "",
  "activities": [],
  "trip_type": "",
  "time_of_day": "",
  "assumptions": [],
  "confidence": 0.0
}
"""
        }
    ]

    # -------- Frames as image_url (Gemini requirement) --------
    for fp in frame_paths[:10]:  # cap frames for cost + latency
        parts.append({
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{encode_image_base64(fp)}"
            }
        })

    # -------- Gemini LLM (API-key mode) --------
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        temperature=0.2
    )

    response = llm.invoke([
        HumanMessage(content=parts)
    ])

    # IMPORTANT: return raw text (n8n will parse + validate)
    return response.content
