import json
import os
from pathlib import Path

# Third-party library imports
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

# ugc
import ugc
from ugc.grades import Grades
from ugc.config import Config
from ugc import __version__ as version_ugc
from ugc import commands
from ugc.utils import commands_helpers

# Local imports
from version import __version__ as version_api

app = FastAPI()
grades = Grades()
config = Config()

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
            "weighted": progress_only.get("weighted_average"),
            "unweighted": progress_only.get("unweighted_average"),
        },
    }


@app.get("/summarize/all")
async def summarize_all():
    return commands.summarize_all(grades)


# TODO: Options should be accepted by the API.
# TODO: "path" just works with a local server. The expected reply would be a
# PNG image.
@app.get("/plot/modules")
async def plot_modules():
    # Need to pass in a default path, otherwise it would save at the root of
    # the server
    # Passing the API flag so that prompt confirmation can be avoided
    return commands.plot_modules(
        grades, api=True, options={"path": os.path.expanduser("~")}
    )


@app.get("/get-template")
async def get_template():
    return commands_helpers.get_template()
