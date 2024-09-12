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

@app.put("/memo/{memo_id}")
def put_memo(rea_memo:Memo):
    for memo in memos:
        if memo.id == rea_memo.id:
            memo.content = rea_memo.content
            return '성공했습니다.'
    return '그런 메모는 없습니다'

@app.get("/memos")
def read_memo():
    return memos

app.mount("/",StaticFiles(directory="static",html=True),name="static")
# 루트경로에 우리의 static 파일에 있는 html을 호스팅 해줘!
