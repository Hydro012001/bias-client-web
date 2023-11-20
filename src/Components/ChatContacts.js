// import React from "react";

// import { useCallback, useEffect, useRef, useState } from "react";
// import Messages from "./Messages";
// import { SocketAPI } from "../Utils/SocketAPI";
// import { Outlet, useNavigate } from "react-router-dom";
// import { encryptId } from "./Encryptor";
// function ChatContacts() {
//   const socket = SocketAPI();
//   const senderId = localStorage.getItem("user_id");
//   const navigate = useNavigate();
//   const [chatId, setChatId] = useState();
//   const [contacts, setContacts] = useState([]);
//   const [sendToName, setSendToName] = useState("");
//   const [addActive, setAddActive] = useState(null);
//   useEffect(() => {
//     // axios
//     //   .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/chatcontact`, {
//     //     userId: senderId,
//     //   })
//     //   .then((res) => {
//     //     if (res.data.status) {
//     //       // console.log(res.data.result);
//     //       setContacts(res.data.result);
//     //     } else {
//     //       console.log(res.data.message);
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     alert(error);
//     //   });
//     socket.emit("getChatContact", { userId: senderId });
//     console.log(senderId);
//     socket.on("chatcontact", (data) => {
//       const sortedData = data.sort(
//         (a, b) =>
//           Number(new Date(b.last_message_timestamp)) -
//           Number(new Date(a.last_message_timestamp))
//       );

//       console.log(data);

//       const filterData = sortedData.filter((item) => {
//         const f = item.cht_user_id_f;
//         const s = item.cht_user_id_s;
//         // console.log("First user " + f + "Sender Id" + senderId);
//         // console.log("Second user " + s + "Sender Id" + senderId);
//         if (
//           f.toString() === senderId.toString() ||
//           s.toString() === senderId.toString()
//         ) {
//           return item;
//         }
//       });
//       console.log("Entrep");
//       console.log(filterData);
//       setContacts(filterData);
//     });
//   }, [senderId, socket]);

//   const handlChatUser = (id) => {
//     setAddActive(id);
//     socket.emit("join_chat", id, (acknowledgment) => {
//       if (acknowledgment) {
//         const chat_id = encryptId(id);

//         navigate(`t/${chat_id}`);
//       } else {
//         alert("Something went wrong");
//       }
//     });

//     // socket.emit("AllChats", id);
//   };

//   return (
//     <>
//       <div className="chats">
//         {contacts.map((item) => {
//           if (parseInt(item.cht_user_id_f) === parseInt(senderId)) {
//             return (
//               <div
//                 className={`chats-users ${
//                   addActive === item.cht_id
//                     ? "chats-user-active"
//                     : "chats-users"
//                 }`}
//                 onClick={() => handlChatUser(item.cht_id, item.user2_name)}
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
//                 className={`chats-users ${
//                   addActive === item.cht_id
//                     ? "chats-user-active"
//                     : "chats-users"
//                 }`}
//                 onClick={() => handlChatUser(item.cht_id, item.user1_name)}
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

//       <Outlet />
//     </>
//   );
// }

// export default ChatContacts;
