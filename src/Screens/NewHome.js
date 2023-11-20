// import { Outlet, useNavigate } from "react-router-dom";
// import "../CSS/newhome.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCamera } from "@fortawesome/free-solid-svg-icons";
// import NavbarEntrep from "../Components/navbarEntrep";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { storage } from "../Components/firebaseConfig";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// export default function Entrepreneur() {
//   const user_id = localStorage.getItem("user_id");
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [photo, setPhoto] = useState([]);
//   const [showUploadForm, setShowUploadForm] = useState(false);
//   const [imagesrc, setImageSrc] = useState();
//   const [profileURl, setProfileURL] = useState("");
//   const hanldePostBusiness = () => {
//     navigate("pitch");
//   };
//   useEffect(() => {
//     axios
//       .post("http://192.168.254.182:3006/api/userInfo", {
//         user_id: user_id,
//       })
//       .then((res) => {
//         setData(res.data.result);
//         //  console.log(res.data.result);
//       })
//       .catch((error) => alert(error));
//   }, [user_id]);

//   useEffect(() => {
//     axios
//       .post("http://192.168.254.182:3006/api/businessPhoto", {
//         user_id: user_id,
//       })
//       .then((res) => setPhoto(res.data.result))
//       .catch((error) => alert(error));
//   }, [user_id]);

//   const handleUploadForm = () => {
//     if (showUploadForm) {
//       setShowUploadForm(false);
//     } else {
//       setShowUploadForm(true);
//     }
//   };
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const imageURL = URL.createObjectURL(file);
//       setImageSrc(imageURL);
//       setProfileURL(file);
//     }
//   };

//   const handleUploadProfilePicture = async () => {
//     setShowUploadForm(false);
//     const strg = storage;
//     const imgRef = ref(strg, "files/" + profileURl.name);

//     uploadBytes(imgRef, profileURl).then((res) => {
//       getDownloadURL(res.ref).then((url) => {
//         updateDatabase(url);
//       });
//     });
//   };

//   const updateDatabase = (url) => {
//     axios
//       .post("http://192.168.254.182:3006/api/uploadPhoto", {
//         url: url,
//         user_id: user_id,
//       })
//       .then((res) => {
//         if (res.data.status) {
//           alert(res.data.message);
//           setShowUploadForm(false);
//           setImageSrc("");
//         } else {
//           alert(res.data.message);
//         }
//       })
//       .catch((error) => alert(error));
//   };

//   return (
//     <>
//       {showUploadForm ? (
//         <div className="uploadForm">
//           <div className="image">
//             {imagesrc && <img src={imagesrc} alt="" id="preview-img" />}
//           </div>
//           <input type="file" accept="image/" onChange={handleImageChange} />
//           <button onClick={handleUploadProfilePicture}>Upload</button>
//         </div>
//       ) : (
//         ""
//       )}
//       <div className="home-container">
//         {data.map((item, index) => (
//           <div className="home-header" key={index}>
//             <div className="cover-photo"></div>
//             <div className="home-profile">
//               <div className="image-profile-details">
//                 <div className="image">
//                   <img src={item.user_profile_photo} alt="" id="preview-img" />
//                   <span id="camera-icon" onClick={handleUploadForm}>
//                     <FontAwesomeIcon
//                       icon={faCamera}
//                       size="2xl"
//                       style={{ color: "#79118d" }}
//                       id="camera"
//                     />
//                   </span>
//                 </div>
//                 <div className="profile-details">
//                   <h1>
//                     {item.user_fname} {item.user_lname}
//                   </h1>
//                   <p>{item.countofBusiness} business</p>
//                   <div className="count">
//                     {photo.map((item, index) => (
//                       <img
//                         src={item.buss_photo}
//                         alt="business"
//                         id="bussiness-photo"
//                         key={index}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="porfile-button">
//                 <div className="pitch-business" onClick={hanldePostBusiness}>
//                   Add Business
//                 </div>
//                 <div className="edit-profile">Update profile</div>
//               </div>
//             </div>
//             <NavbarEntrep />
//           </div>
//         ))}
//         <Outlet />
//       </div>
//     </>
//   );
// }
