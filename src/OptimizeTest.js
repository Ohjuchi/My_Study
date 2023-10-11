import React, { useEffect, useState } from "react";

//  컴포넌트 재사용하는 연습용으로 만드는거라 하고나면 지워도됨
//

// const CountView = ({ count }) => {
//   useEffect(() => {
//     console.log(`Update :: count : ${count}`);
//   });
//   return <div>{count}</div>;
// };

// const Textview = React.memo(({ text }) => {
//     useEffect(() => {
//       console.log(`Update :: Text :  ${text}`);
//     });
//     return <div>{text}</div>;
//   });

// const OptimizeTest = () => {
//   const [count, setCount] = useState(1);
//   const [text, setText] = useState("");

//   return (
//     <div style={{ padding: 50 }}>
//       <div>
//         <h2>count</h2>
//         <CountView count={count} />
//         <button onClick={() => setCount(count + 1)}>+</button>
//       </div>
//       <div>
//         <h2>text</h2>
//         <Textview text={text} />
//         <input value={text} onChange={(e) => setText(e.target.value)} />
//       </div>
//     </div>
//   );
// };  //위에 것은 테스트로 만들엇기떄문에 끝나서 주석처리

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`AAAAA update - count : ${count}`);
  });
  return <div>{count}</div>;
});

const CounterB = React.memo(({ obj }) => {
  useEffect(() => {
    console.log(`BBBBBB update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
});
// obj로 선언해서 똑같은 값을 반환하면 주소값을 비교하기때문에
// 변경되었다고 판단되어서 리렌더링됨 그래서 비교하는 함수를 따로만들어야함
// 그래서 효율좋게 코드짤때 반환값이 오브젝트이면 비교함수 만들것!

// const areEqual = (prevProps, nextProps) => {
//   if (prevProps.obj.count === nextProps.obj.count) {
//     return true; // 이전 프롭스랑 현재라같으면 > 리렌더링 x
//   }

//   return false; // 이전과 현재 값 다르면 > 리렌더링 o
// }; //근데 이거 식이 너무 기네? 짧게만드는거 쌉가능 아래거임

const areEqual = (prevProps, nextProps) => {
  return prevProps.obj.count === nextProps.obj.count;
};

const MemmoizedCounterB = React.memo(CounterB, areEqual);
// 결국 CountberB 를 실행시키는건데 areEual가 o아니면x 에따라서 실행여부
// 결정하는 코드임

// 함수리턴값저장
const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setobj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A 버튼</button>
      </div>
      <div>
        <h2>Count B</h2>
        <MemmoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setobj({
              count: obj.count,
            })
          }
        >
          B 버튼
        </button>
        <button
          onClick={() =>
            setobj({
              count: obj.count + 1,
            })
          }
        >
          B가 변하는 버튼
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
