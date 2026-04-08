import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "./features/counterslice";

const App = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        Increment
      </button>
      <button onClick={() => {
        dispatch(decrement());
      }}>Decrement</button>
      <button onClick={()=>{
        dispatch(incrementByAmount(5));
      }}>
        Increment by 5
      </button>
    </div>
  );
};

export default App;
