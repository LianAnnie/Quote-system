import styled from "styled-components";
import { useState } from "react";
import SideBar from "./SideBar";
import db from "./utils/firebase";
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
import { useEffect } from "react";

const Container = styled.div`
  text-align: left;
`;
const Main = styled.div`
  margin-left: 300px;
  padding: 50px 10%;
`;
const Title = styled.div`
  margin-bottom: 50px;
`;
const Form = styled.div`
  border: solid 1px #000000;
  padding: 20px;
`;
const Question = styled.div`
  display:flex;
  margin: 5px;
`
const Button = styled.div`
  border: solid 1px #000000;
  width: 50px;
  margin: 5px;
  text-align: center
`;

function firebaseFunction(){
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

function Admin() {
  const [company, setCompany] = useState('');
  const [contacts, setContacts] = useState('');
  const [country, setCountry] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [customerList, setCustomerList] = useState('');
  console.log(customerId);

  useEffect(()=>{
    getCustomerList();
  },[])

  async function getCustomerList(){
    const collectionRef = collection(db, "customers");
    const collectionSnap = await getDocs(collectionRef);
    const historyCustomerData = [];
    collectionSnap.forEach((e) => {
      const customerData = {
        customerId: e.id,
        company: e.data().company,
        contacts: e.data().contacts,
        country: e.data().country
      }
      historyCustomerData.push(customerData);
    });
    setCustomerId(transformId(historyCustomerData.length+1))
    setCustomerList(historyCustomerData);
  }

  async function addCustomer (){
    const customerData = {
      company,
      contacts,
      country
    };
    setDoc(doc(db, "customers", customerId), customerData);
  }

  function transformId(id){
    if(id.length === 3)
    return id;
    else
    return id.toString().padStart(3,0);
  }


  return (
    <Container>
      <SideBar />
      <Main>
        <Title>客戶資料表</Title>
        <Form onKeyPress={(e)=>{e.key==='Enter'&&addCustomer()}}>       
          <Question>
            <div>company</div>
            <input type="text" onChange={(e)=>{setCompany(e.target.value)}} value={company}/>
          </Question>
          <Question>
            <div>contacts</div>
            <input type="text" onChange={(e)=>{setContacts(e.target.value)}} value={contacts}/>
          </Question>
          <Question>
            <div>country</div>
            <input type="text" onChange={(e)=>{setCountry(e.target.value)}} value={country}/>
          </Question>          
          <Button onClick={()=>{addCustomer()}}>Add</Button>
        </Form>
        <select>
          {customerList&&customerList.map((customer)=>(
            <option key={customer.id}>{customer.company},{customer.contacts}, {customer.country}</option>
          ))}
        </select>
      </Main>
    </Container>
  );
}

export default Admin;
