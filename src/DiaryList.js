import { useContext } from "react";
import DiartItem from "./DiaryItem";

import { DiaryStateContext } from "./App";

const DiartList = () => {
  const diaryList = useContext(DiaryStateContext);

  console.log(diaryList);
  return (
    <div className="DuaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiartItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

DiartList.defaultProps = {
  diaryList: [],
};

export default DiartList;
