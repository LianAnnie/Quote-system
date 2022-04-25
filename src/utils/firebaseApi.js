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
import form from "../utils/formChange";

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
                key !== "id" && key !== "mark" && key !== "dependency"
                    ? (newData[key] = data[key][1])
                    : "",
            );
            console.log(newData);
            await setDoc(doc(db, collectionName, docId), newData);
            return newData;
        }
        if (collectionName === "bom") {
            const idArray = data.childData.map(e => [
                data.parentData.id.join(""),
                e.id.join(""),
                "00",
            ]);
            const dataArray = data.childData.map((e, index) => ({
                id: idArray[index],
                qty: e.qty,
                unit: e.unit,
            }));
            dataArray.forEach(async e => {
                await setDoc(doc(db, collectionName, e.id.join("")), e);
            });
            console.log(`${dataArray.length}files, finish`);
            return dataArray;
        }
        if (collectionName === "partQuotations2") {
            console.log(docId, data);
            const idArray = data.childData.map(e => {
                const inquiryQtyId = form.transformId(e.inquiryQty, 6);
                return [e.id.join(""), inquiryQtyId, data.parentData.date];
            });
            const dataArray = data.childData.map((e, index) => ({
                id: idArray[index],
                inquiryQty: e.inquiryQty,
                leadTime: e.leadTime,
                price: e.price,
                date: data.parentData.date,
                valid: data.parentData.valid,
                currency: data.parentData.currency,
            }));
            dataArray.forEach(async e => {
                await setDoc(doc(db, collectionName, e.id.join("")), e);
            });
            console.log(`${dataArray.length}files, finish`);
            return dataArray;
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
