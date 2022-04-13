import db from "./firebase";
import {
    doc,
    setDoc,
    collection,
    addDoc,
    updateDoc,
    serverTimestamp,
    arrayUnion,
    arrayRemove,
    increment,
    getDoc,
    getDocs,
    collectionGroup,
    query,
    where,
} from "firebase/firestore";

const api = {
    async getCompleteCollection(collectionName) {
        const collectionRef = collection(db, collectionName);
        const collectionData = await getDocs(collectionRef);
        const data = collectionData.docs.map(e => e.data());
        return data;
    },

    async setDocWithId(collectionName, docId, data) {
        const reponse = await setDoc(doc(db, collectionName, docId), data);
        return reponse;
        //waiting fix : setDoc 沒有response 嗎？
    },
};

export default api;
