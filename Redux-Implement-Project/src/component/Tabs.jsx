import React from 'react'

const Tabs = () => {
    const tabs = ['Photos', 'Videos', 'GIFS',];
  return (
    <div>
      {tabs.map(function(ele, index){
        return <button key={index} className="active:scale-95 border-2 px-4 text-xl py-2 rounded outline-none cursor-pointer m-7">{ele}</button>
      })}
    </div>
  )
}

export default Tabs
