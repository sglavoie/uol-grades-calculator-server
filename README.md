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
python src/main.py
```

### Testing changes made to `ugc` before publishing to PyPI

#### Via GitHub

In `backend/requirements.txt`, comment out the line `uol-grades-calculator` and add a new line as follows:

```text
git+https://github.com/sglavoie/uol-grades-calculator@BRANCH_NAME#egg=uol-grades-calculator
```

The GitHub repository for `ugc` will be cloned when installing the dependencies and the source code will be coming from the branch `BRANCH_NAME`. The bit at the end, `#egg=uol-grades-calculator`, will tell `pip` to install the package with the same name as before: _uol-grades-calculator_.

#### Via local installation

Assuming requirements are already installed, it is possible to uninstall `uol-grades-calculator` and reinstall it from a local repository to avoid pushing changes to the remote altogether. To do so:

```bash
pip uninstall uol-grades-calculator
pip install /home/user/path/to/uol_grades_calculator

# Then, just re-launch the server
python src/main.py
```

## Setting up the front-end

Install dependencies:

```bash
cd frontend
yarn  # or npm install
```

Run the server:

```bash
cd frontend
yarn start
```
