import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../redux/features/searchSlice';

const Tabs = () => {
    const tabs = ['Photos', 'Videos', 'GIFs'];
    const dispatch = useDispatch();
    const activeTab = useSelector((state) => state.search.activeTab);

  return (
    <div>
      {tabs.map(function(ele, index){
        return <button key={index} className={`${(activeTab==ele?'bg-orange-600':'border-bs-indigo-400')} active:scale-95 border-2 px-4 text-xl py-2 rounded outline-none cursor-pointer m-7`} onClick={()=>{
            dispatch(setActiveTab(ele))
        }}>{ele}</button>
      })}
    </div>
  )
}

export default Tabs
