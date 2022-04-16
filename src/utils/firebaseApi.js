import db from "./firebase";
import {
    doc,
    setDoc,
    collection,
    getDocs,
    query,
    orderBy,
    serverTimestamp,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

const api = {
    async getCompleteCollection(collectionName) {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, orderBy("id", "asc"));
        const collectionData = await getDocs(q);
        const data = collectionData.docs.map(e => e.data());
        return data;
    },

    async setDocWithId(collectionName, docId, data) {
        if (collectionName === "boards") {
            const collectionRef = doc(collection(db, collectionName));
            data.id = collectionRef.id;
            data.date = serverTimestamp();
            docId = collectionRef.id;
            data.status = Number(data.status);
        }
        await setDoc(doc(db, collectionName, docId), data);
        //waiting fix : setDoc 沒有response 嗎？  沒有：(void) https://firebase.google.com/docs/reference/js/firestore_lite.md#setdoc_2
    },

    async deleteDoc(collectionName, docId) {
        deleteDoc(doc(db, collectionName, docId));
    },
    async updateDoc(collectionName, docId, data) {
        if (collectionName === "boards") {
            data.status = Number(data.status);
        }
        const docRef = doc(db, collectionName, docId);
        updateDoc(docRef, data);
    },
};

export default api;
