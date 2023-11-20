import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAQCK02eP49v1JJsEvDRwYaKSoajnPERbE",
  authDomain: "database-storage-9e165.firebaseapp.com",
  projectId: "database-storage-9e165",
  storageBucket: "database-storage-9e165.appspot.com",
  messagingSenderId: "574889805175",
  appId: "1:574889805175:web:1d074705b01569d17d4d72",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
