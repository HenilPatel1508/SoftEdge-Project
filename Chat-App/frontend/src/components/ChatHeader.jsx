const ChatHeader = ({ selectedUser }) => {
  return (
    <div className="bg-[#202c33] p-4 text-white">

      <h2 className="text-lg font-semibold">
        {selectedUser?.name}
      </h2>

    </div>
  );
};

export default ChatHeader;