import json

# ugc
from ugc.grades import Grades
from ugc.config import ConfigValidationError


def get_config_dict(config_data: dict = None):
    if config_data is None:
        config_data = {}
    try:
        return Grades(json_str=json.dumps(config_data))
    except ConfigValidationError as err:
        print(f"Unexpected ConfigValidationError {err=}")
        raise


def get_config_json(json_str):
    try:
        grades = Grades(json_str=json.dumps(json_str))
    except ConfigValidationError:
        return {"error": True, "config": {}}
    return {"error": False, "config": grades.config}
