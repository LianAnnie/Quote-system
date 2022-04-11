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
  width: 100px;
  margin: 5px;
  text-align: center;
  cursor: pointer;
`;
const Table = styled.table`
  border: solid 1px #000000;
  padding: 20px;
`;

const Flex = styled.div`
  display: flex;
`;
const Th = styled.th`
  padding-right: 50px;
`
const Td = styled.td`
  padding-right: 50px;
`  

function AdminParts() {
    const [upList, setUpList] = useState([]);
    const [downList, setDownList] = useState([]);
  
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
          <Flex>
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
          </Flex>
          <Button
            onClick={() => {
              getList("parts");
            }}
          >
            firebase資料
          </Button>
          <div>將上傳資料</div>
          <Table>
            <thead>
              <tr>
                <Th>零件編號</Th>
                <Th>零件名稱</Th>
                <Th>處理工藝</Th>
                <Th>零件材質</Th>
                <Th>表面處理</Th>
              </tr>
            </thead>
            <tbody>
              {upList &&
                upList.map((e) => (
                  <tr key={e.id}>
                    <Td>{e.id}</Td>
                    <Td>{e.name}</Td>
                    <Td>{e.type}</Td>
                    <Td>{e.material}</Td>
                    <Td>{e.finish}</Td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div>下載資料</div>
          <Table>
            <thead>
              <tr>
                <Th>零件編號</Th>
                <Th>零件名稱</Th>
                <Th>處理工藝</Th>
                <Th>零件材質</Th>
                <Th>表面處理</Th>
              </tr>
            </thead>
            <tbody>
              {downList &&
                downList.map((e) => (
                  <tr key={e.id}>
                    <Td>{e.id}</Td>
                    <Td>{e.name}</Td>
                    <Td>{e.type}</Td>
                    <Td>{e.material}</Td>
                    <Td>{e.finish}</Td>
                  </tr>
                ))}
            </tbody>
          </Table>
      </Container>
    );
  }
  
  export default AdminParts;