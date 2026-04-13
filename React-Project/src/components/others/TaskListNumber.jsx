import React from 'react'

const TaskListNumber = () => {
  return (
    <div className='flex mt-10 justify-between gap-5 screen'>
      <div className="w-[40%] rounded-xl py-6 px-9 bg-red-400">
        <h1 className='text-3xl font-semibold'>10</h1>
        <h3 className='text-xl font-medium '>New Task</h3>
      </div>
      <div className="w-[40%] rounded-xl py-6 px-9 bg-purple-400">
        <h1 className='text-3xl font-semibold'>6</h1>
        <h3 className='text-xl font-medium '>Completed Task</h3>
      </div>
      <div className="w-[40%] rounded-xl py-6 px-9 bg-emerald-300">
        <h1 className='text-3xl font-semibold'>4</h1>
        <h3 className='text-xl font-medium '>Accepted Task</h3>
      </div>
      <div className="w-[40%] rounded-xl py-6 px-9 bg-cyan-400">
        <h1 className='text-3xl font-semibold'>0</h1>
        <h3 className='text-xl font-medium '>Failed Task</h3>
      </div>
    </div>
  )
}

export default TaskListNumber
