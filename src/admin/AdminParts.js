import styled from "styled-components";
import { useState } from "react";
import db from "../utils/firebase";
import parts from "./inputData";
import {
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const Container = styled.div`
  text-align: left;
`;
const Title = styled.div`
  margin-bottom: 50px;
`;
const Button = styled.div`
  border: solid 1px #000000;
  width: 50px;
  margin: 5px;
  text-align: center;
  cursor: pointer;
`;

function AdminParts() {
    const [upList, setUpList] = useState("");
    const [downList, setDownList] = useState("");
  
    async function importList(collectionName) {
      parts.forEach((e) => {
        const docData = {
          id: e.id,
          name: e.name,
          type: e.type,
          material: e.material,
          finish: e.finish,
        };
        setUpList((prev)=>[...prev,docData]);
      });
    }
    async function getList(collectionName) {
      const collectionRef = collection(db, collectionName);
      const collectionSnap = await getDocs(collectionRef);
      const historyData = [];
      collectionSnap.forEach((e) => {
        const docData = {
          id: e.id,
          name: e.data().name,
          type: e.data().type,
          material: e.data().material,
          finish: e.data().finish,
        };
        historyData.push(docData);
      });
      setDownList(historyData);
    }
  
    async function addList(collectionName) {
      parts.forEach((e) => {
        const docData = {
          name: e.name,
          type: e.type,
          material: e.material,
          finish: e.finish,
        };
        setDoc(doc(db, collectionName, e.id), docData);
      });
    }
  
    return (
      <Container>
          <Title>批量資料</Title>
          <div>parts</div>
          <Button
            onClick={() => {
              importList('parts');
            }}
          >
            匯入資料
          </Button>
          <Button
            onClick={() => {
              addList('parts');
            }}
          >
            上傳資料
          </Button>
          <Button
            onClick={() => {
              getList("parts");
            }}
          >
            firebase資料
          </Button>
          <div>將上傳資料</div>
          <div>
            {upList &&
              upList.map((e) => (
                <div key={e.id}>
                  {e.id}
                  {e.name}
                  {e.type}
                  {e.material}
                  {e.finish}
                </div>
              ))}
          </div>
          <div>下載資料</div>
          <div>
            {downList &&
              downList.map((e) => (
                <div key={e.id}>
                  {e.id}
                  {e.name}
                  {e.type}
                  {e.material}
                  {e.finish}
                </div>
              ))}
          </div>
      </Container>
    );
  }
  
  export default AdminParts;