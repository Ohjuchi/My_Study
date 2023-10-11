// 테스트용이라 주석침 import OptimizeTest from "./OptimizeTest";
// https://jsonplaceholder.typicode.com/comments json 값가져오는 URL
export const reducer = (state, action) => {
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
      console.log("여기까지는 타는가");
      return state.mep((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};
