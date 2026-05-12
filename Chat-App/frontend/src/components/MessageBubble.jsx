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
        <p>{message.message}</p>

        <div className="flex justify-end items-center gap-1 text-[10px] mt-1 text-gray-300">

          <span>{message.time}</span>

          {/* Seen ticks */}
          {own && (
            <span className="ml-2">
              {message.seen ? "✓✓" : "✓"}
            </span>
          )}

        </div>

      </div>
    </div>
  );
};

export default MessageBubble;