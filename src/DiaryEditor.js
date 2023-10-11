import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
  useEffect(() => {
    console.log("다이어리 에디터 렌더함");
  });

  const { onCreate } = useContext(DiaryDispatchContext);

  //포커스 가져오려고 하는 Ref 레퍼런스.. DOM요소 접근하려면 이거 써야한대
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  //입력할때 마다 onChang 발동해서 state에 저장해주는 기능인데 작성자 따로 내용따로 구현하는게아니 하나로 합침.

  const handleChangeState = (e) => {
    console.log("추가 가능?", e.target.name);
    console.log("로그가 어케찍히는지 확인하고픔", e.target.value);
    // target에서 name을 가져와서 key로 설정하고 value로 넣는로직! e 이거 이벤트 속성가져올수잇음
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  //저장버튼 Submit
  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    //여기서 데이터 넣어서 저장함
    onCreate(state.author, state.content, state.emotion);

    console.log(" 저장한 state 값 :", state);

    alert("저장 성공");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);
