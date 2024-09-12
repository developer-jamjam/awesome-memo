function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;
  ul.appendChild(li);
}

async function readMemo() {
  const res = await fetch("/memos"); //default로 get요청이 간다.
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo);
  // 배열의 각각의 요소에 대해서 함수를 실행한다.
}

readMemo();
async function createMemo(val) {
  const res = await fetch("/memos", {
    //fetch로만 보내게 되면 get요청이 가기 때문에 옵션을 준다.
    method: "POST", //어떤 메소드로 보낼 것인가?
    headers: { "Content-Type": "application/json" }, // request body를 보낼때 필수적으로 넣어야 하는 header
    body: JSON.stringify({
      id: new Date(),
      content: val,
    }),
    /* 
        통신을 할때는 문자열만 전송을 할 수가 있다. 문자열로 body를 바꿔주고 전송을 한 후 받는쪽에서 다시 json형태로 바꿔서 받고 처리하고 
        다시 문자열로 바꿔서 보내고 받아서 json형태로 바꾸는 과정들이 필요하다.
    */
  });
  readMemo();
}

function handleSubmit(e) {
  e.preventDefault(); //이벤트가 발생하는걸, 동작하는 걸 막는다.
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);
/* 
    폼에 있는 값이 제출 되었을때 발생
    폼에 submit 이벤트는 제출이 되는것과 동시에 redirect라는 이벤트가 발생한다.
    즉 새로고침을 스스로 해버린다.
    shift + F5 완전 새로고침
*/
