import json

# ugc
from ugc.grades import Grades
from ugc.config import ConfigValidationError


def get_config_dict(json_str):
    try:
        return Grades(json_str=json.dumps(json_str))
    except ConfigValidationError:
        return {}


def get_config_json(json_str):
    try:
        grades = Grades(json_str=json.dumps(json_str))
    except ConfigValidationError:
        return {"error": True, "config": {}}
    return {"error": False, "config": grades.config}
