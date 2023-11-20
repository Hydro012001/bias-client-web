// import { Outlet, useNavigate } from "react-router-dom";
// import "../Screens/CSS/message.css";
// import { useCallback, useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { encryptId } from "./Encryptor";
// import { io } from "socket.io-client";

// import ChatContacts from "./ChatContacts";
// const socket = io("http://localhost:3005/");
// export default function ChatContact() {
//   const activeChat = useRef(null);
//   const navigate = useNavigate();
//   const senderId = localStorage.getItem("user_id");
//   const [contacts, setContacts] = useState([]);
//   const [sortedMessage, setSortedMessage] = useState([]);
//   const [chatId, setChatId] = useState();
//   const [showMessage, setShowMessage] = useState(false);
//   // useEffect(() => {
//   //   // axios
//   //   //   .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/chatcontact`, {
//   //   //     userId: senderId,
//   //   //   })
//   //   //   .then((res) => {
//   //   //     if (res.data.status) {
//   //   //       // console.log(res.data.result);
//   //   //       setContacts(res.data.result);
//   //   //     } else {
//   //   //       console.log(res.data.message);
//   //   //     }
//   //   //   })
//   //   //   .catch((error) => {
//   //   //     alert(error);
//   //   //   });
//   //   socket.emit("getChatContact", { userId: senderId });
//   //   socket.on("chatcontact", (data) => {
//   //     const sortedData = data.sort(
//   //       (a, b) =>
//   //         Number(new Date(b.last_message_timestamp)) -
//   //         Number(new Date(a.last_message_timestamp))
//   //     );
//   //     setContacts(sortedData);
//   //     console.log(sortedData);
//   //   });
//   // }, [senderId]);

//   // const handlChatUser = (id) => {
//   //   setChatId(id);
//   //   // socket.emit("AllChats", id);
//   //   socket.emit("join_chat", id);
//   // };

//   // const handleCheckUser = (user1, user2) => {
//   //   if (user1 === senderId) {
//   //     handlChatUser(user2);
//   //   } else {
//   //     handlChatUser(user1);
//   //   }
//   //   // console.log(user1 + " " + user2);
//   // };

//   // const sortMessage = useCallback(() => {
//   //   const sortedData = contacts.sort(
//   //     (a, b) =>
//   //       Number(new Date(b.last_message_timestamp)) -
//   //       Number(new Date(a.last_message_timestamp))
//   //   );

//   //   setSortedMessage(sortedData);
//   // }, [contacts]);

//   // useEffect(() => {
//   //   sortMessage();
//   // }, [sortMessage]);

//   // const handleCheckUserChats = (item) => {
//   //   if (toString(item.cht_user_id_f) === toString(senderId)) {
//   //     return (
//   //       <div
//   //         className="chats-users"
//   //         onClick={() => {
//   //           handlChatUser(item.cht_id);
//   //         }}
//   //         key={item.cht_id}
//   //       >
//   //         <div className="chats-profile"></div>
//   //         <div>
//   //           <p id="user-name">{item.user2_name}</p>
//   //           <p id="initial-msg">{item.last_message}</p>
//   //         </div>
//   //       </div>
//   //     );
//   //   } else {
//   //     <div
//   //       className="chats-users"
//   //       // onClick={() =>
//   //       //   handleCheckUser(item.msg_sender_id, item.msg_receiver_id)
//   //       // }
//   //       key={item.cht_id}
//   //       onClick={() => handlChatUser(item.cht_id)}
//   //     >
//   //       <div className="chats-profile"></div>
//   //       <div>
//   //         <p id="user-name">{item.user1_name}</p>
//   //         <p id="initial-msg">{item.last_message}</p>
//   //       </div>
//   //     </div>;
//   //   }
//   // };

//   return (
//     <div style={{ marginTop: "6rem" }}>
//       <ChatContacts />
//       {/* <div className="chats">
//         {contacts.map((item) => {
//           if (parseInt(item.cht_user_id_f) === parseInt(senderId)) {
//             return (
//               <div
//                 className="chats-users"
//                 onClick={() => handlChatUser(item.cht_id)}
//                 key={item.cht_id}
//               >
//                 <div className="chats-profile"></div>
//                 <div>
//                   <p id="user-name">{item.user2_name}</p>
//                   <div className="elipsis-msg">
//                     <p id="initial-msg">{item.last_message}</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           } else {
//             return (
//               <div
//                 className="chats-users"
//                 onClick={() => handlChatUser(item.cht_id)}
//                 key={item.cht_id}
//               >
//                 <div className="chats-profile"></div>
//                 <div>
//                   <p id="user-name">{item.user1_name}</p>
//                   <div className="elipsis-msg">
//                     <p id="initial-msg">{item.last_message}</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           }
//         })}
//       </div>

//       <Messages socket={socket} chat_id={chatId} /> */}
//     </div>
//   );
// }
