FROM python:3.8.16-alpine

WORKDIR /usr/src/chat

ENV OEPNAPI_KEY=""

ENV CHAT_SECRET="sparkle-secret"

COPY ./requirements.txt ./

RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

COPY ./main.py ./main.py

CMD [ "python", "./main.py" ]
