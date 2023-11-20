// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import "../Screens/CSS/message.css";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { decryptId } from "./Encryptor";
// import { SocketAPI } from "../Utils/SocketAPI";

// export default function Messages() {
//   const { id } = useParams();
//   const chat_id = decryptId(id);
//   const socket = SocketAPI();
//   const [message, setMessage] = useState("");
//   const [chatsMessages, setChatsMessages] = useState([]);
//   const senderId = localStorage.getItem("user_id");
//   const headerName = useRef();
//   const [userChat, setuserChat] = useState([]);
//   const [receiveName, setRecieveName] = useState();
//   // const chat_id = decryptId(id);
//   const [showHeaderUserName, setshowHeaderUserName] = useState(false);
//   // console.log(senderId + "sender");
//   // console.log(recieverId + "reciver");
//   const chatContainer = useRef(null);

//   useEffect(() => {
//     if (chatContainer.current) {
//       chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
//     }
//   }, [socket]);
//   useEffect(() => {
//     // axios
//     //   .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/messages`, {
//     //     chat_id: chat_id,
//     //   })
//     //   .then((res) => {
//     //     if (res.data.status) {
//     //       setChatsMessages(res.data.result);
//     //       console.log(res.data.result);
//     //     } else {
//     //       alert(res.data.message);
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     alert(error);
//     //   });

//     socket.on("receive", (data) => {
//       setChatsMessages(data);
//     });
//   }, [socket]);

//   const sendMessage = () => {
//     const currentDate = new Date();
//     const formattedDate = currentDate
//       .toISOString()
//       .slice(0, 19)
//       .replace("T", " ");
//     const sendData = {
//       message: message,
//       chat_id: chat_id,
//       senderId: senderId,
//       formattedDate: formattedDate,
//     };
//     socket.emit("send", sendData);
//     setMessage("");
//     // axios
//     //   .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/sendMessage`, {
//     //     message: message,
//     //     chat_id: chat_id,
//     //     senderId: senderId,
//     //   })
//     //   .then((res) => {
//     //     if (res.data.status) {
//     //       setMessage("");
//     //       window.location.reload();
//     //     } else {
//     //       alert(res.data.message);
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     alert(error);
//     //   });
//   };

//   useEffect(() => {
//     if (chat_id) {
//       socket.emit("get_chatRoom", chat_id);
//     }
//   }, [socket, chat_id]);

//   useEffect(() => {
//     if (chat_id) {
//       axios
//         .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/userchatroom`, {
//           chat_id: chat_id,
//         })
//         .then((res) => {
//           if (res.data.status) {
//             setuserChat(res.data.result);
//             setshowHeaderUserName(true);
//           } else {
//             alert(res.data.message);
//           }
//         })
//         .catch((error) => {
//           alert(error);
//         });
//     }
//   }, [chat_id]);

//   useEffect(() => {
//     if (headerName.current) {
//       setRecieveName(headerName.current.textContent);
//     }
//   }, [headerName.current]);

//   let prevDate = null;
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       sendMessage();
//     }
//   };
//   return (
//     <>
//       <div className="msg-content">
//         {showHeaderUserName && userChat && (
//           <div className="chat-name" key={userChat[0].cht_id}>
//             <p ref={headerName}>
//               {parseInt(userChat[0].cht_user_id_f) === parseInt(senderId)
//                 ? userChat[0].user2_name
//                 : userChat[0].user1_name}
//             </p>
//           </div>
//         )}
//         <div className="msg" ref={chatContainer}>
//           {chatsMessages.map((item, index) => {
//             const messageDate = new Date(
//               item.msg_datetime
//             ).toLocaleDateString();
//             const shouldDisplayDate = messageDate !== prevDate;

//             prevDate = messageDate;

//             return parseInt(item.msg_user_sends) === parseInt(senderId) ? (
//               <>
//                 <div className="send-msg" key={index}>
//                   <div className="senderText">
//                     <p>{item.msg_content}</p>
//                   </div>
//                   <p id="date-text">
//                     You {new Date(item.msg_datetime).toLocaleTimeString()}
//                   </p>
//                 </div>
//                 {shouldDisplayDate && (
//                   <div className="date-header">
//                     <p id="date-header-text">
//                       {new Date(item.msg_datetime).toDateString()}
//                     </p>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="recieve-msg" key={index}>
//                 <div className="recieverText">
//                   <p>{item.msg_content}</p>
//                 </div>
//                 <p id="date-text">
//                   {`${receiveName} ${new Date(
//                     item.msg_datetime
//                   ).toLocaleTimeString()}`}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//         <div className="type-msg">
//           <input
//             type="text"
//             placeholder="Text message"
//             id="txt-msg"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />
//           <FontAwesomeIcon
//             icon={faPaperPlane}
//             id="send-icon"
//             size="xl"
//             onClick={() => sendMessage()}
//           />
//         </div>
//       </div>
//     </>
//   );
// }
