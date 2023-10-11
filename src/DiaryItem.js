import React, { useContext, useEffect, useRef, useState } from "react";

import { DiaryDispatchContext } from "./App";

const DiartItem = ({ id, author, content, emotion, created_date }) => {
  const { onEdit, onRemove } = useContext(DiaryDispatchContext);

  useEffect(() => {
    console.log(` ${id}번 째 아이템 렌더중임`);
  });

  //이거 토글임 버튼 클릭시 난 수정[Edit]한다! 느낌으로 상태변화시킴
  // 그래서 시작은 false 수정버튼을 누르면 !isEdit 으로 보내니까 true 되면 수정활성화임
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  //토글이 활성화되면 기존 데이터를 수정 text에리어에 넣는거 해주는 곳
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef(); //이거...focus쓸려고 추가한거같은데 기억상 해당 속성불러오려면이렇게해야한다는거 같은데...

  //삭제기능 삭제를 할지 알람띄워주는 기능 window.confirm 여기서 확인을 누르면 ture로 가서 onRemove함수가 실행되서 해당id로 삭제하는거임
  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 레알 삭제?`)) {
      onRemove(id);
    }
  };

  //수정 취소누르면 토글상태가 false로 바뀌면서
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  //이건 수정버튼도 글자가 5이상일때만 수정할수있게 기능넣은거 안넘으면 다시 포커스
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    //수정할떄도 알람띄워야하니까 yes할때만 수정실행하게하는거. 그리고 수정했으면 토글 다시 해서 닫아야겠지?
    if (window.confirm(`${id}번 째 일기 레알수정?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정지수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};
//삭제 기능 최적화
export default React.memo(DiartItem);
