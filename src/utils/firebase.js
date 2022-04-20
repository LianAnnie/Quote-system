import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC5vERJiu6Px2LaRjNRYqR9IpuuTAt8348",
    authDomain: "sideproject2022-erpsystem.firebaseapp.com",
    projectId: "sideproject2022-erpsystem",
    storageBucket: "sideproject2022-erpsystem.appspot.com",
    messagingSenderId: "1012171064877",
    appId: "1:1012171064877:web:1533e8732f50f257b39aa4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
