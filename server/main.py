from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import FastAPI
import pafy

app = FastAPI()

origins = [
    # "*",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class YouTubeUrl(BaseModel):
    v: str


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post(('/id/'))
def video_info(video_id: YouTubeUrl):
    url_id = str(video_id).replace("'", "")
    video = pafy.new(f'https://www.youtube.com/watch?{url_id}')
    audioStream = video.audiostreams
    return audioStream


@ app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}
