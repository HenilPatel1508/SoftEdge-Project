import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/features/searchSlice";

const SearchBar = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();



  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setQuery(text));
    setText('');
    
  };
  return (
    <div>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }} className="flex  bg-gray-500 p-10 gap-6">
        <input
            value={text}
            onChange={(e)=>{
                setText(e.target.value)
            }}
          required
          className="w-full border-2 px-4 text-xl py-2 rounded outline-none text-amber-50 "
          type="text"
          placeholder="Search Anything..."
        />
        <button className="active:scale-95 border-2 px-4 text-xl py-2 rounded outline-none cursor-pointer text-amber-50">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
