import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount!");

    return () => {
      //Unmout 시점
      console.log("Unmount!");
    };
  });

  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  //   const [count, setCount] = useState(0);
  //   const [text, setText] = useState("");

  //   useEffect(() => {
  //     console.log("Mount!");
  //   }, []);

  //   useEffect(() => {
  //     console.log("update!");
  //   });

  //   useEffect(() => {
  //     console.log(`conut is update : ${count}`);
  //     if (count > 5) {
  //       alert(" 거... 카운트 그만올리라");
  //       setCount(1);
  //     }
  //   }, [count]);

  //   useEffect(() => {
  //     console.log(`tezxt is update : ${text}`);
  //   }, [text]);

  return (
    <div style={{ padding: 20 }}>
      {/* <div>
        {count}
        <button onClick={() => setCount(count + 1)}> +</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div> */}

      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default Lifecycle;
