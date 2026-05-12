import { FaPaperPlane } from "react-icons/fa";

const MessageInput = ({
  message,
  setMessage,
  sendMessage,
}) => {
  return (
    <div className="bg-[#202c33] p-4 flex items-center gap-3">
      <input
        type="text"
        value={message}
        placeholder="Type a message"
        onChange={(e) =>
          setMessage(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        className="flex-1 bg-[#2a3942] text-white px-4 py-3 rounded-full outline-none"
      />

      <button
        onClick={sendMessage}
        className="bg-green-500 p-3 rounded-full text-white"
      >
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default MessageInput;