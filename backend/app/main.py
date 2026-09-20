from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.database import engine, Base

# Import models
from app.models import user, heart, progress, premium, subscription, lesson, word

# Import routes
from app.routes import auth
from app.routes import progress as progress_routes
from app.routes import heart as heart_routes
from app.routes import premium as premium_routes
from app.routes import review as review_routes


# ============================================================
# ساخت جداول دیتابیس
# ============================================================
Base.metadata.create_all(bind=engine)


# ============================================================
# ساخت اپ FastAPI
# ============================================================
app = FastAPI(
    title="Bijo - Language Learning App API",
    debug=True
)


# ============================================================
# CORS (برای اتصال فرانت‌اند)
# ============================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# Routes (API endpoints)
# ============================================================
app.include_router(auth.router, prefix="/api")
app.include_router(progress_routes.router, prefix="/api")
app.include_router(heart_routes.router, prefix="/api")
app.include_router(premium_routes.router, prefix="/api")
app.include_router(review_routes.router, prefix="/api")


# ============================================================
# Health Check
# ============================================================
@app.get("/health")
def health():
    return {"status": "ok"}


# ============================================================
# مسیرهای فایل‌ها
# ============================================================
# BASE_DIR = ریشه‌ی پروژه (bijo/)
# چون main.py توی backend/app/ هست، سه بار parent می‌گیریم
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# مسیر فایل‌های درس
LESSONS_DIR = BASE_DIR / "lessons_data"


# ============================================================
# فایل‌های استاتیک (فرانت‌اند)
# ============================================================
# /static/... → BASE_DIR
app.mount("/static", StaticFiles(directory=str(BASE_DIR)), name="static")


# ============================================================
# فایل‌های درس (بک‌اند)
# ============================================================
# /lessons/... → lessons_data/
if LESSONS_DIR.exists():
    app.mount("/lessons", StaticFiles(directory=str(LESSONS_DIR)), name="lessons")
    print(f"✅ Lessons mounted from: {LESSONS_DIR}")
else:
    print(f"⚠️  Lessons directory not found: {LESSONS_DIR}")
    print(f"   Create it with: mkdir -p {LESSONS_DIR}")


# ============================================================
# صفحه‌ی اصلی
# ============================================================
@app.get("/")
async def serve_home():
    home_file = BASE_DIR / "home.html"
    if home_file.exists():
        return FileResponse(str(home_file))
    return {"detail": "home.html not found"}


# ============================================================
# سرو کردن فایل‌های HTML
# (باید آخر باشه، وگرنه مسیرهای دیگه رو می‌گیره)
# ============================================================
@app.get("/{file_name}")
async def serve_html(file_name: str):
    file_path = BASE_DIR / file_name
    if file_path.exists() and file_name.endswith(".html"):
        return FileResponse(str(file_path))
    return {"detail": "Not Found"}