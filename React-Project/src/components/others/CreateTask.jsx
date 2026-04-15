import React from 'react'

const CreateTask = () => {
  return (
    <div className=" bg-[#1C1C1C] text-white mt-5 rounded p-10">
        <form action="" className="flex flex-wrap w-full ">
          <div className="w-1/2">
            <div>
              <h1 className="text-lg text-gray-300 mb-1">Task Title :</h1>
              <input className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent  border-gray-400"  type="text" placeholder="Make A UI Design..." />
            </div>
            <div>
              <h1 className="text-lg text-gray-300 mb-1">Date :</h1>
              <input className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent  border-gray-400"  type="date" />
            </div>
            <div>
              <h1 className="text-lg text-gray-300 mb-1">Assign To : </h1>
              <input className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent  border-gray-400"  type="text" placeholder="Employee Name : " />
            </div>
            <div>
              <h1 className="text-lg text-gray-300 mb-1">Category : </h1>
              <input className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent  border-gray-400" type="text" placeholder="design,dev,etc" />
            </div>
          </div>

          <div className="w-2/5 flex flex-col items-start">
            <h1 className="text-lg text-gray-300 mb-0.5">Description : </h1>
            <textarea
              className="w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent  border-gray-400"
              name=""
              id=""
              cols={25}
              rows={5}
            ></textarea>
            <button className="bg-emerald-500 py-3 hover:bg-emerald-700 px-2 rounded text-sm mt-4 w-full">
              Create Task
            </button>
          </div>
        </form>
      </div>
  )
}

export default CreateTask
