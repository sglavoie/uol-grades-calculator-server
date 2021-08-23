# Third-party library imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ugc
from ugc.grades import Grades
from ugc import __version__ as version_ugc
from ugc import commands

# Local imports
from version import __version__ as version_api

app = FastAPI()
grades = Grades()

# Allow CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    data = {
        "about": "Grades calculator for the BSc Computer Science at the University of London",
        "config": grades.config_exists,
        "grades": None,
        "versionAPI": version_api,
        "versionUGC": version_ugc,
    }
    if grades.config_exists:
        data["grades"] = grades.data
    return data


@app.get("/check/score-accuracy")
async def check_score_accuracy():
    accuracy = commands.check_score_accuracy(grades)
    response = {"ok": True if not accuracy else False, "accuracy": accuracy}
    return response


@app.get("/summarize/done")
async def summarize_done():
    return commands.summarize_done(grades)


@app.get("/summarize/progress")
async def summarize_progress():
    in_progress = commands.summarize_progress(grades)
    progress_only = commands.summarize_progress_avg_progress_only(grades)
    return {
        "in_progress": in_progress,
        "average_in_progress_only": {
            "weighted": progress_only["weighted_average"],
            "unweighted": progress_only["unweighted_average"],
        },
    }


@app.get("/summarize/all")
async def summarize_all():
    return commands.summarize_all(grades)
