import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import logo from "../../icons/logo.jpg";
import Typewriter from "typewriter-effect";
function ChatComponent() {
  const user_id = localStorage.getItem("user_id");
  const [message, setMessage] = useState("");
  const [listmessages, setListMessages] = useState([]);
  const [btnClick, setBtnClick] = useState(false);
  const chatContainer = useRef(null);
  const fectMessage = () => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/api/getchtmsg`, {
        adminId: 10,
        user_id,
      })
      .then((res) => {
        if (chatContainer.current) {
          chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
        }
        setListMessages(res.data.result);
        console.log(res.data.result);
      });
  };

  useEffect(() => {
    fectMessage();

    const invtervalsend = setInterval(fectMessage, 2000);

    return () => clearInterval(invtervalsend);
  }, []);
  const handleSendMessage = () => {
    setBtnClick(!btnClick);
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/api/create-chat-room`, {
        adminId: 10,
        user_id,
        content: message,
        senderId: user_id,
      })
      .then((res) => {
        if (res.data.status) {
          setMessage("");
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  // useEffect(() => {
  //   // socket.on("recieve_user_list", ({ targetUserId, sender, message }) => {
  //   //   console.log(`Received: ${sender} to ${targetUserId}: ${message}`);
  //   //   // Update the UI element with the specified targetUserId using the received message
  //   // });
  // }, []);

  return (
    <div className=" mt-5  pt-2 d-flex  flex-wrap justify-content-between ">
      <div className=" flex-column w-50 d-flex bg-primary text-light  align-items-center justify-content-center gap-2">
        <h1>BiaS Chat Support</h1>
        <img
          src={logo}
          alt="..."
          style={{ height: "10rem", width: "10rem" }}
          className="rounded-circle shadow"
        />
        <Typewriter
          options={{
            strings: ["Chat with us", "Ask question and we will response"],
            autoStart: true,
            loop: true,
            deleteSpeed: 30,
            delay: 70,
            wrapperClassName: " fw-bold mt-5",
          }}
        />
      </div>
      <div style={{ height: "34rem" }} className="w-50">
        <label className="fw-bold bg-secondary w-100 p-2 d-flex justify-content-between ">
          Chat{" "}
          <FontAwesomeIcon
            icon={faRotate}
            onClick={() => setBtnClick(!btnClick)}
          />
        </label>
        <div
          className="d-flex flex-column gap-2 p-3 rounded overflow-auto "
          style={{ height: "26.4rem" }}
          ref={chatContainer}
        >
          {listmessages ? (
            <>
              {listmessages.map((item) => (
                <div
                  className={`d-flex ${
                    item.chtmsg_sender_id === parseInt(user_id)
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                  key={item.chtmsg_id}
                >
                  <label
                    className={` rounded p-2  w-25  ${
                      item.chtmsg_sender_id === parseInt(user_id)
                        ? "bg-primary text-light"
                        : "bg-secondary"
                    }`}
                  >
                    {item.chtmsg_content}
                  </label>
                </div>
              ))}
              {/* <div className="d-flex justify-content-strt">
          <label className="right-0 bg-secondary rounded p-2  w-25">
            Hello
          </label>
        </div> */}
            </>
          ) : (
            ""
          )}
        </div>
        <div class="input-group  ps-3 pe-3">
          <input
            type="text"
            class="form-control"
            placeholder="Message"
            aria-describedby="button-addon2"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            class="btn btn-primary"
            type="button"
            id="button-addon2"
            onClick={() => handleSendMessage()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
