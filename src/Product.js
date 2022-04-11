import styled from "styled-components";
import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import db from "./utils/firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";

const Container = styled.div`
  text-align: left;
`;
const Main = styled.div`
  margin-left: 300px;
  padding: 50px 10%;
`;
const Customers = styled.div`
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
  display: flex;
  margin: 5px;
`;
const Button = styled.div`
  border: solid 1px #000000;
  width: 50px;
  margin: 5px;
  text-align: center;
  cursor: pointer;
`;
const Product = styled.div`
`;

function Admin() {
  const [company, setCompany] = useState("");
  const [contacts, setContacts] = useState("");
  const [country, setCountry] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerList, setCustomerList] = useState("");

  useEffect(() => {
    getCustomerList();
  }, []);

  async function getCustomerList() {
    const collectionRef = collection(db, "customers");
    const collectionData = await getDocs(collectionRef);      
      const historyData = [];
      collectionData.forEach((e) => {
        const docData = {
          id: e.id,
          company: e.data().company,
          contacts: e.data().contacts,
          country: e.data().country,
        };
        historyData.push(docData);
      });
      setCustomerId(transformId(historyData.length + 1));
      setCustomerList(historyData);
  }

  async function addCustomer() {
    const customerData = {
      company,
      contacts,
      country,
    };
    setDoc(doc(db, "customers", customerId), customerData);
    setCompany("");
    setContacts("");
    setCountry("");
  }

  function transformId(id) {
    if (id.length === 3) return id;
    else return id.toString().padStart(3, 0);
  }

  return (
    <Container>
      <SideBar />
      <Main>
        <Customers>
          <Title>客戶資料表</Title>
          <Form
            onKeyPress={(e) => {
              e.key === "Enter" && addCustomer();
            }}
          >
            <Question>
              <div>company</div>
              <input
                type="text"
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
                value={company}
              />
            </Question>
            <Question>
              <div>contacts</div>
              <input
                type="text"
                onChange={(e) => {
                  setContacts(e.target.value);
                }}
                value={contacts}
              />
            </Question>
            <Question>
              <div>country</div>
              <input
                type="text"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                value={country}
              />
            </Question>
            <Button
              onClick={() => {
                addCustomer();
              }}
            >
              Add
            </Button>
          </Form>
          <select>
            {customerList &&
              customerList.map((customer) => (
                <option key={customer.id}>
                  {customer.company},{customer.contacts}, {customer.country}
                </option>
              ))}
          </select>
        </Customers>
        <Product>

        </Product>
      </Main>
    </Container>
  );
}

export default Admin;
