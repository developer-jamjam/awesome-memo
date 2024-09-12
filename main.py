from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

class Memo(BaseModel):
    id:str
    content:str

memos = []
app = FastAPI()


@app.post("/memos")
def create_memo(memo:Memo):
    memos.append(memo)
    return '메모 추가에 성공했습니다.'

app.mount("/",StaticFiles(directory="static",html=True),name="static")
# 루트경로에 우리의 static 파일에 있는 html을 호스팅 해줘!
