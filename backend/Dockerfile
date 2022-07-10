FROM python:latest

# Install backend stuff
COPY src/ /root/backend/src/
COPY requirements.txt /root/backend/
RUN pip3 install -r /root/backend/requirements.txt

EXPOSE 8000
CMD ["python3", "/root/backend/src/main.py"]
