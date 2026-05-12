const UserCard = ({ name }) => {
  return (
    <div className="flex items-center gap-3 p-4 hover:bg-[#2a3942] cursor-pointer border-b border-gray-700">
      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
        {name[0]}
      </div>

      <div>
        <h3 className="text-white font-semibold">
          {name}
        </h3>

        <p className="text-sm text-gray-400">
          Online
        </p>
      </div>
    </div>
  );
};

export default UserCard;