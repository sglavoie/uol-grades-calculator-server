# Server for `ugc` (UoL Grades Calculator)

This repository will serve to interface with the [`ugc` CLI tool](https://github.com/sglavoie/uol-grades-calculator) by providing an API with [FastAPI](https://fastapi.tiangolo.com/) as well as a front-end built with [React](https://reactjs.org/). More to come!

## Setting up the back-end

Install dependencies:

```bash
pip install -r backend/requirements.txt
```

Run the server:

```bash
cd backend
uvicorn main:app --reload
```

## Testing changes made to `ugc` before publishing to PyPI

In `backend/requirements.txt`, comment out the line `uol-grades-calculator` and add a new line as follows:

```text
git+https://github.com/sglavoie/uol-grades-calculator@BRANCH_NAME#egg=uol-grades-calculator
```

The GitHub repository for `ugc` will be cloned when installing the dependencies and the source code will be coming from the branch `BRANCH_NAME`. The bit at the end, `#egg=uol-grades-calculator`, will tell `pip` to install the package with the same name as before: _uol-grades-calculator_.
