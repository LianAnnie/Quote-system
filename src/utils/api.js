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
    arrayUnion,
    arrayRemove,
    onSnapshot,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../utils/firebase";
import form from "../utils/formChange";

const api = {
    checkLogInState(callBack1, callBack2) {
        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            if (user) {
                callBack1(1);
                callBack2(`歡迎回來`);
            } else {
                callBack1(0);
            }
        });
    },
    runFirebaseSignOut(callback1, callback2, callback3) {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                callback1(`您已登出`);
                callback2(0);
            })
            .catch(error => {
                const errorCode = error.code;
                callback3(errorCode);
            });
    },

    listenerBoardsData(objectData, callback) {
        const q = query(collection(db, "boards"));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            const pmWorks = [];
            querySnapshot.forEach(doc => {
                pmWorks.push(doc.data());
                console.log(`note!!!`);
            });
            for (let i = 0; i < 5; i++) {
                objectData[i].items = pmWorks.filter(
                    item => Number(item.status) === i && item,
                );
            }
            callback(objectData);
        });
        return () => unsubscribe();
    },

    async getCompleteCollection(collectionName) {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, orderBy("id", "asc"));
        const collectionData = await getDocs(q);
        const data = collectionData.docs.map(e => e.data());
        return data;
    },

    async getCollectionWithQuery(collectionName, key, searchWay, value) {
        const q = query(
            collection(db, collectionName),
            where(key, searchWay, value),
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.map(e => e.data());
        return data;
    },

    async setDocWithId(collectionName, docId, data) {
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
            return dataArray;
        }
        if (
            collectionName === "partQuotations2" ||
            collectionName === "productQuotations2"
        ) {
            const idArray = data.childData.map(e => {
                const inquiryQtyId = form.transformId(e.inquiryQty, 6);
                return [
                    e.id.join(""),
                    data.parentData.id.join(""),
                    inquiryQtyId,
                    data.parentData.date,
                ];
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
            return dataArray;
        }
        if (collectionName === "order") {
            const idArray = data.childData.map(e => {
                return [
                    data.parentData.id.join(""),
                    e.id.join(""),
                    data.parentData.date,
                    data.parentData.requestedDate,
                ];
            });
            const dataArray = data.childData.map((e, index) => ({
                id: idArray[index],
                orderId: data.parentData.orderId,
                sum: data.parentData.sum,
                currency: data.parentData.currency,
                qty: e.qty,
                price: e.price,
                date: data.parentData.date,
                requestedDate: data.parentData.requestedDate,
                remark: e.remark,
            }));
            dataArray.forEach(async e => {
                await setDoc(doc(db, collectionName, e.id.join("")), e);
            });
            return dataArray;
        }
        await setDoc(doc(db, collectionName, docId), data);
    },

    async deleteDoc(collectionName, docId) {
        deleteDoc(doc(db, collectionName, docId));
    },
    async updateDoc(collectionName, docId, data, state) {
        let newData = data;
        if (collectionName === "products2" || collectionName === "parts2") {
            if (state === 0) {
                newData = {
                    dependency: arrayRemove(data),
                };
            }
            if (state === 1) {
                newData = {
                    dependency: arrayUnion(data),
                };
            }
        } else {
            newData = data;
        }
        const docRef = doc(db, collectionName, docId);
        updateDoc(docRef, newData);
    },
};

export default api;
