# TODO: Create a Grades instance with DRY (using decorator?)

import os
from typing import Optional, Dict, Any

# Third-party library imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# ugc
from ugc.grades import Grades
from ugc.config import Config, ConfigValidationError
from ugc import __version__ as version_ugc
from ugc import commands
from ugc.utils import commands_helpers

# Local imports
from helpers import get_config_dict, get_config_json
from version import __version__ as version_api

app = FastAPI()
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


class ModuleData(BaseModel):
    completion_date: Optional[str]
    final_score: Optional[float]
    final_weight: Optional[int]
    midterm_score: Optional[float]
    midterm_weight: Optional[int]
    module_score: Optional[float]
    level: Optional[int]


class GradesResponse(BaseModel):
    module_name: str


@app.get("/")
async def root():
    grades = Grades()
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


@app.post("/check/score-accuracy")
async def check_score_accuracy(json_str: Dict[Any, Any] = None):
    grades = get_config_dict(json_str)
    accuracy = commands.check_score_accuracy(grades)
    response = {"ok": not bool(accuracy), "accuracy": accuracy}
    return response


@app.post("/summarize/done")
async def summarize_done(json_str: Dict[Any, Any] = None):
    grades = get_config_dict(json_str)
    return commands.summarize_done(grades)


@app.post("/summarize/progress")
async def summarize_progress(json_str: Dict[Any, Any] = None):
    grades = get_config_dict(json_str)
    in_progress = commands.summarize_progress(grades)
    progress_only = commands.summarize_progress_avg_progress_only(grades)
    return {
        "in_progress": in_progress,
        "average_in_progress_only": {
            "weighted": progress_only.get("weighted_average"),
            "unweighted": progress_only.get("unweighted_average"),
        },
    }


@app.post("/summarize/all")
async def summarize_all(json_str: Dict[Any, Any] = None):
    grades = get_config_dict(json_str)
    return commands.summarize_all(grades)


# TODO: Options should be accepted by the API.
# TODO: Config should be loaded elsewhere and this should be a POST request.
@app.post("/plot/modules")
async def plot_modules(json_str: Dict[Any, Any] = None) -> dict:
    try:
        grades = get_config_dict(json_str)
        # Passing the API flag so that prompt confirmation can be avoided
        return commands.plot_modules(
            grades, api=True, options={"path": os.path.expanduser("~")}
        )
    except ConfigValidationError:
        return {
            "ok": False,
            "error": "ConfigValidationError: Config file must be invalid.",
        }


@app.get("/get-template")
async def get_template():
    return commands_helpers.get_template()


# TODO: Parameter `json_str` should be defined as a Pydantic model
@app.post("/validate-config")
async def validate_config(json_str: Dict[Any, Any] = None):
    return get_config_json(json_str)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
