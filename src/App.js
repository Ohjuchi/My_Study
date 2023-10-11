import React, {
  // useState, // useReducer쓸거라서 이제 이거 안씀!
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiartList from "./DiaryList";
import Lifecycle from "./Lifecycle";
// 테스트용이라 주석침 import OptimizeTest from "./OptimizeTest";

// https://jsonplaceholder.typicode.com/comments json 값가져오는 URL

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      console.log("왜안대?");
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      // 이거 간단히 설명하자면 it.id 선택한 id만 해당배열에서 뺴달라는거임
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      console.log("여기까지는 타는가", action.targetId);
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  // const [data, setData] = useState([]);

  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0); // 레퍼런스 id는 0부터 시작이라는 의미

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    //console.log(res);
    //console.log("위의 로그는 데이터 가져온거 로그찍는거임");

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    dispatch({ type: "INIT", data: initData });
    // setData(initData); 위에 애가 해줄거임
  };

  useEffect(() => {
    //함수호출하는 거니까.. getData json으로가져오는거 호출하는거겠지? 쓰는방법은.. 저게 그..
    getData(); //아근데 Effect 쓴이유가 마운트될때 (처음화면 뜰때만 적용하려고) 그때만 실행시켜야해서 저거한거임 화면호출할때마다 저거실행되면..알지?
  }, []);

  //등록에디터  작성자 , 내용 , 점수기재내용 저장하고 ID 부여해서 리스트배열에 저장
  const onCreate = useCallback((author, content, emotion) => {
    // 유즈콜백을 사용했는데 그 상태 스테이트가 변경하면 이 함수도 재생성되면서 리렌더가 되어버리기 떄문에
    // 최적화를 하기위해서 스테이트가 변경되어도 함수재생성을 막기위해서임 그런데 이것만 선언하면
    // 기존 스테이트를 못불러와서 일기 등록시 기존 리스트 삭제됨. 그거 해결하기위해서 아래에 함수형 업데이트 적용하면 해결됨

    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    // const created_date = new Date().getTime();
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   created_date,
    //   id: dataId.current,
    // };
    dataId.current += 1;
    // setData((data) => [newItem, ...data]); //근데 삭제함 // (data) = > 이렇게 한이유가 함수형 업데이트 기능을 사용하려고해서그럼
  }, []);

  const onRemove = useCallback((targetId) => {
    //console.log(`${targetId}가 삭제되었다!`);
    dispatch({ type: "REMOVE", targetId });

    // setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
    // setData((data) =>
    //   data.map((it) =>
    //     it.id === targetId ? { ...it, content: newContent } : it
    //   )
    // );
  }, []);

  // context.provier 로 아래로 보내기위해 묶은것 재생성하지 않는 함수로만 묶음
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  //이거 일기 상태어떤지 분석해서 좋음 나쁨 비율 따져서 출력해주는 함수
  const getDiaryAnalysis = useMemo(() => {
    //console.log("일기 분석 시좌악");
    // 이거 원래 2번호출함 왜냐하면 빈배열일떄 한번 그리고 setData할때 한번
    // 그런데 내용 수정할때는 감정점수 수정못하도록 되어있음
    // 그러면 수정할때 이 함수를 재호출할 필요가없는건데 하고있는거니까.. 수정일때 호출안하면 좋음
    const goodCount = data.filter((it) => it.emotion >= 3).length; // data에 담겨있는 emostion 값이 3이상인것들의 배열 길이
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]); // useMemo사용법 data.length 이값이 변함이없으면 이 함수 실행안함

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
  //   const { goodCount, badCount, goodRatio } = getDiaryAnalysis(); 이거 이제 함수아님 왜냐면 useMemo로 감싸서 콜백만 리턴받으니까

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          {/* <OptimizeTest /> 테스트용이라 주석침 */}
          <Lifecycle />
          <DiaryEditor onCreate={onCreate} />
          <div>전체 일기 : {data.length}</div>
          <div>기모찌 갯수 : {goodCount}</div>
          <div>ㅠㅠ 갯수 : {badCount}</div>
          <div>평타이상 기분 비율 : {goodRatio}</div>
          <DiartList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
