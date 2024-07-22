const ChatList = ({ messages }) => {
  return (
    <div className="chat-list">
      {messages.map((message, index) => (
        <div key={index}>
          {message.sender === "user" ? (
            <div className="p-2 my-2 rounded-md bg-blue">
              {message.text}
            </div>
          ) : (
            <div className="p-2 my-2 rounded-md bg-purple">
              {message.text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatList;

// const ChatList = ({ messages }) => {
//   return (
//     <div className="chat-list">
//       {messages.map((message, index) => (
//         <div
//           key={index}
//           className={`p-2 my-2 rounded-md ${
//             message.sender === "user" ? "bg-blue" : "bg-purple"
//           } `}
//         >
//           {message.text}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatList;


