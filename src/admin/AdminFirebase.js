import db from "../utils/firebase";
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
function firebaseFunction() {
    const data1 = {
      name: "test1",
      timestamp: serverTimestamp(),
    };
    const data2 = {
      name: "test2",
      timestamp: serverTimestamp(),
    };
    const data3 = {
      name: "test3",
      timestamp: serverTimestamp(),
    };
    // 寫入資料
    async function input() {
      setDoc(doc(db, "testfunction", "CH"), data1);
  
      // 自行形成文件id
      const ref = await addDoc(collection(db, "testfunction"), data2);
      console.log("Document written with ID: ", ref.id);
  
      // 自行形成文件id-2
      const newCityRef = doc(collection(db, "testfunction"));
      setDoc(newCityRef, data3);
  
      //建立子項collection
      setDoc(doc(collection(db, "testfunction", "CH", "test")), {
        Key: "sucessful",
      });
    }
    //更新現有資料
    function update() {
      //基本更新
      const washingtonRef = doc(db, "testfunction", "LA");
      // Set the "capital" field of the city 'LA'
      updateDoc(washingtonRef, {
        capital: true,
        //注意更改object內部資料需要加點,要不然會完全替換object內所有資料
        "object.key2": "update value",
        timestamp: serverTimestamp(),
      });
  
      // Atomically add a new region to the "regions" array field.
      updateDoc(washingtonRef, {
        regions: arrayUnion("greater_virginia2"),
      });
  
      // Atomically remove a region from the "regions" array field.
      updateDoc(washingtonRef, {
        regions: arrayRemove("greater_virginia"),
      });
  
      //在原本的數值再加
      updateDoc(washingtonRef, {
        population: increment(50),
      });
    }
    //取得資料
    async function get() {
      //指定得到某doc內容
      const docRef = doc(db, "testfunction", "SF");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
  
      //取回全部collection內容
      const collectionRef = collection(db, "testfunction");
      const collectionSnap = await getDocs(collectionRef);
      collectionSnap.forEach((e) => {
        console.log(e.id, "=>", e.data());
      });
  
      //指定取回某層資料
      const q = query(
        collection(db, "testfunction"),
        where("capital", "==", true)
      );
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().name);
      });
    }
  
    //從子集和取得資料
    async function getSubCollectionInformation() {
      const q = query(
        collectionGroup(db, "customer"),
        where("company", "==", "Wastberg")
      );
  
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.length);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    }
  }

function AdminFirebase() {
    <div></div>
}

export default AdminFirebase;