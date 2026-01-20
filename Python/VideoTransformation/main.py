import os
import uuid
import shutil
import subprocess
import requests
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# 🔹 Import video analyzer
from langchain_video import analyze_video

# ==============================
# CONFIG
# ==============================

DATA_DIR = "/Users/nihardip/Desktop/WonderTrip/Python/VideoTransformation/downloadedvideo"

MAX_FILE_SIZE_MB = 200
MAX_VIDEO_DURATION_SEC = 180  # 3 minutes
ALLOWED_EXTENSIONS = {".mp4", ".mov", ".webm"}

# 🔹 n8n webhook (YOUR REAL URL)
N8N_WEBHOOK_URL = "https://rahulmohan.app.n8n.cloud/webhook-test/ac5d8037-976d-4384-8622-a08566629e3e"

# ==============================
# APP
# ==============================

app = FastAPI()

# ==============================
# CORS (FOR YOUR VERCEL SITE)
# ==============================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",          # local dev
        "https://wondertrip.vercel.app"   # production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# HELPERS
# ==============================

def run(cmd):
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(result.stderr)


def normalize_video(input_path: str, output_path: str):
    run([
        "ffmpeg", "-y",
        "-i", input_path,
        "-c:v", "libx264",
        "-c:a", "aac",
        "-movflags", "+faststart",
        output_path
    ])


def get_video_duration(path: str) -> float:
    result = subprocess.run(
        [
            "ffprobe",
            "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            path
        ],
        capture_output=True,
        text=True
    )
    return float(result.stdout.strip())

# ==============================
# API — UPLOAD + ANALYZE
# ==============================

@app.post("/video/ingest")
async def ingest_video(
    file: UploadFile = File(...),
    email: str = Form(...),
    source: str = Form(...),
    user_destination: str = Form(None),
    user_trip_type: str = Form(None)
):
    # --------------------------
    # BASIC VALIDATION
    # --------------------------
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Unsupported video format")

    # --------------------------
    # JOB SETUP
    # --------------------------
    job_id = f"job_{uuid.uuid4().hex[:8]}"
    job_dir = os.path.join(DATA_DIR, job_id)
    os.makedirs(job_dir, exist_ok=True)

    try:
        # --------------------------
        # FILE SIZE GUARD
        # --------------------------
        file.file.seek(0, 2)
        size_mb = file.file.tell() / (1024 * 1024)
        file.file.seek(0)

        if size_mb > MAX_FILE_SIZE_MB:
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Max allowed is {MAX_FILE_SIZE_MB} MB"
            )

        # --------------------------
        # SAVE RAW FILE
        # --------------------------
        raw_path = os.path.join(job_dir, f"raw{ext}")
        with open(raw_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # --------------------------
        # NORMALIZE VIDEO
        # --------------------------
        final_path = os.path.join(job_dir, "video.mp4")
        normalize_video(raw_path, final_path)

        # --------------------------
        # DURATION GUARD
        # --------------------------
        duration = get_video_duration(final_path)
        if duration > MAX_VIDEO_DURATION_SEC:
            raise HTTPException(
                status_code=400,
                detail="Video too long. Max duration is 3 minutes"
            )

        # ==============================
        # 🔥 VIDEO ANALYSIS (Gemini)
        # ==============================
        analysis_text = analyze_video(final_path)

        # ==============================
        # 🔁 SEND TO n8n
        # ==============================
        n8n_payload = {
            "job_id": job_id,
            "source": source,
            "user_input": {
                "email": email,
                "destination": user_destination,
                "trip_type": user_trip_type
            },
            "video_analysis": analysis_text
        }

        requests.post(
            N8N_WEBHOOK_URL,
            json=n8n_payload,
            timeout=5
        )

        # --------------------------
        # RESPONSE TO WEBSITE
        # --------------------------
        return {
            "job_id": job_id,
            "status": "RECEIVED"
        }

    except Exception as e:
        shutil.rmtree(job_dir, ignore_errors=True)
        raise HTTPException(status_code=500, detail=str(e))
