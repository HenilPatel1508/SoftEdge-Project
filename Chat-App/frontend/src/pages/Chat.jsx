import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageBubble from "../components/MessageBubble";
import MessageInput from "../components/MessageInput";
import { socket } from "../socket";
import axios from "axios";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    _id: "",
    name: "",
  });

  // USERS STATE HERE
  const [users, setUsers] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/users"
      );

      const filtered = res.data.filter(
        (u) => u._id !== currentUser._id
      );

      setUsers(filtered);
    };

    fetchUsers();
  }, []);

  // ROOM
  const room = useMemo(() => {
    if (!selectedUser?.name) return "";

    return currentUser.name < selectedUser.name
      ? `${currentUser.name}_${selectedUser.name}`
      : `${selectedUser.name}_${currentUser.name}`;
  }, [selectedUser, currentUser]);

  // JOIN ROOM
  useEffect(() => {
    if (room) {
      socket.emit("join_room", room);
    }
  }, [room]);

  // RECEIVE MESSAGE
  useEffect(() => {

    socket.on("receive_message", (data) => {

      setMessages((prev) => [...prev, data]);

      // MOVE USER TOP
      setUsers((prevUsers) => {

        const updatedUsers = [...prevUsers];

        const userIndex = updatedUsers.findIndex(
          (u) =>
            u.name === data.author ||
            u.name === data.receiver
        );

        if (userIndex !== -1) {

          const user = updatedUsers.splice(
            userIndex,
            1
          )[0];

          updatedUsers.unshift(user);
        }

        return updatedUsers;
      });

    });

    return () => {
      socket.off("receive_message");
    };

  }, []);

  // SEND MESSAGE
  const sendMessage = () => {

    if (!message.trim()) return;

    const messageData = {
      room,
      author: currentUser.name,
      receiver: selectedUser.name,
      message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", messageData);

    // MOVE SELECTED USER TOP
    setUsers((prevUsers) => {

      const updatedUsers = [...prevUsers];

      const userIndex = updatedUsers.findIndex(
        (u) => u.name === selectedUser.name
      );

      if (userIndex !== -1) {

        const user = updatedUsers.splice(
          userIndex,
          1
        )[0];

        updatedUsers.unshift(user);
      }

      return updatedUsers;
    });

    setMessage("");
  };

  // LOAD HISTORY
  useEffect(() => {

    const fetchMessages = async () => {

      if (!room) return;

      const res = await axios.get(
        `http://localhost:5000/api/messages/${room}`
      );

      setMessages(res.data);
    };

    fetchMessages();

  }, [room]);

  // SEEN UPDATE
  useEffect(() => {

    socket.on(
      "message_seen_update",
      (updatedMsg) => {

        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === updatedMsg._id
              ? updatedMsg
              : msg
          )
        );

      }
    );

    return () => {
      socket.off("message_seen_update");
    };

  }, []);

  // MARK SEEN
  useEffect(() => {

    messages
      .filter(
        (msg) =>
          msg.receiver === currentUser.name &&
          !msg.seen
      )
      .forEach((msg) => {

        socket.emit("message_seen", {
          messageId: msg._id,
          room,
        });

      });

  }, [messages, room]);

  return (
    <div className="h-screen flex bg-[#111b21]">

      <Sidebar
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <div className="flex-1 flex flex-col">

        <ChatHeader selectedUser={selectedUser} />

        <div className="flex-1 overflow-y-auto p-4 bg-[#0b141a]">

          {messages.map((msg, index) => (

            <MessageBubble
              key={index}
              own={
                msg.author?.trim() ===
                currentUser?.name?.trim()
              }
              message={msg}
            />

          ))}

        </div>

        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />

      </div>
    </div>
  );
};

export default Chat;