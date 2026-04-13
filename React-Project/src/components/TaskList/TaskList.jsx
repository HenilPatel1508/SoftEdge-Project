import React from 'react'

const TaskList = () => {
  return (
    <div id='tasklist' className='h-[53%] overflow-x-auto flex items-center justify-start gap-5  flex-nowrap w-full py-5 mt-10'>
      <div className='shrink-0 h-full w-75 bg-cyan-600 p-5 rounded-2xl'>
        <div className='flex items-center justify-between'>
            <h3 className='bg-red-600 text-sm px-3 py-2 rounded'>High</h3>
            <h4 className='text-sm'>15 Aug 2025</h4>
        </div>
        <h2 className='mt-5 text-2xl font-semibold'>Make a Youtube Video</h2>
        <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ducimus ipsum nisi maiores.</p>
      </div>
      <div className='shrink-0 h-full w-75 bg-green-400 p-5 rounded-2xl'>
        <div className='flex items-center justify-between'>
            <h3 className='bg-red-600 text-sm px-3 py-2 rounded'>High</h3>
            <h4 className='text-sm'>15 Aug 2025</h4>
        </div>
        <h2 className='mt-5 text-2xl font-semibold'>Make a Youtube Video</h2>
        <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ducimus ipsum nisi maiores.</p>
      </div>
      <div className='shrink-0 h-full w-75 bg-emerald-900 p-5 rounded-2xl'>
        <div className='flex items-center justify-between'>
            <h3 className='bg-red-600 text-sm px-3 py-2 rounded'>High</h3>
            <h4 className='text-sm'>15 Aug 2025</h4>
        </div>
        <h2 className='mt-5 text-2xl font-semibold'>Make a Youtube Video</h2>
        <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ducimus ipsum nisi maiores.</p>
      </div>
      <div className='shrink-0 h-full w-75 bg-yellow-600 p-5 rounded-2xl'>
        <div className='flex items-center justify-between'>
            <h3 className='bg-red-600 text-sm px-3 py-2 rounded'>High</h3>
            <h4 className='text-sm'>15 Aug 2025</h4>
        </div>
        <h2 className='mt-5 text-2xl font-semibold'>Make a Youtube Video</h2>
        <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ducimus ipsum nisi maiores.</p>
      </div>
      <div className='shrink-0 h-full w-75 bg-blue-300 p-5 rounded-2xl'>
        <div className='flex items-center justify-between'>
            <h3 className='bg-red-600 text-sm px-3 py-2 rounded'>High</h3>
            <h4 className='text-sm'>15 Aug 2025</h4>
        </div>
        <h2 className='mt-5 text-2xl font-semibold'>Make a Youtube Video</h2>
        <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ducimus ipsum nisi maiores.</p>
      </div>
    </div>
  )
}

export default TaskList
