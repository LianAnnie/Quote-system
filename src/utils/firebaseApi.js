import { db } from "../utils/firebase";
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
    where,
} from "firebase/firestore";

const api = {
    async getCompleteCollection(collectionName) {
        console.log(`get firebase`);
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, orderBy("id", "asc"));
        const collectionData = await getDocs(q);
        const data = collectionData.docs.map(e => e.data());
        return data;
    },

    async getCollectionWithQuery(collectionName, key, searchWay, value) {
        console.log(`get Q firebase`);
        const q = query(
            collection(db, collectionName),
            where(key, searchWay, value),
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.map(e => e.data());
        return data;
    },

    async setDocWithId(collectionName, docId, data) {
        console.log(`set firebase`);
        const collectionRef = doc(collection(db, collectionName));
        if (collectionName === "boards") {
            data.id = collectionRef.id;
            data.date = serverTimestamp();
            docId = collectionRef.id;
            data.status = Number(data.status);
        }
        if (collectionName === "products2" || collectionName === "parts2") {
            const newData = JSON.parse(JSON.stringify(data));
            const keyArray = Object.keys(newData);
            keyArray.forEach(key =>
                key !== "id" && key !== "mark"
                    ? (newData[key] = data[key][1])
                    : "",
            );
            console.log(newData);
            await setDoc(doc(db, collectionName, docId), newData);
            return;
        }
        await setDoc(doc(db, collectionName, docId), data);
        //waiting check: setDoc 沒有response 嗎？  沒有：(void) https://firebase.google.com/docs/reference/js/firestore_lite.md#setdoc_2
    },

    async deleteDoc(collectionName, docId) {
        console.log(`delete firebase`);
        deleteDoc(doc(db, collectionName, docId));
    },
    async updateDoc(collectionName, docId, data) {
        console.log(`update firebase`);
        if (collectionName === "boards") {
            data.status = Number(data.status);
        }
        const docRef = doc(db, collectionName, docId);
        updateDoc(docRef, data);
    },
};

export default api;
