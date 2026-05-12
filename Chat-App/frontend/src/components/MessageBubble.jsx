const MessageBubble = ({ message, own }) => {
  return (
    <div
      className={`flex w-full mb-2 ${
        own ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-lg max-w-[60%] text-white ${
          own
            ? "bg-green-600 rounded-br-none"
            : "bg-gray-700 rounded-bl-none"
        }`}
      >
        <p className="text-sm">{message.message}</p>

        <div className="text-[10px] text-right mt-1 text-gray-300">
          {message.time}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;