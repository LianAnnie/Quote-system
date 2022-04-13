import styled from "styled-components";
import { useState } from "react";
import SideBar from "./SideBar";
import db from "./utils/firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    onSnapshot,
    doc,
    updateDoc,
    setDoc,
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
    display: flex;
    margin: 5px;
`;
const Board = styled.div`
    display: flex;
`;
const Department = styled.div`
    margin: 3%;
`;
const SubTitle = styled.div`
    margin-bottom: 50px;
`;
const Card = styled.div`
    margin-bottom: 25px;
    border: solid 1px #000000;
`;
const Button = styled.div`
    border: solid 1px #000000;
    width: 50px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
`;

function BulletinBoard() {
    const [type, setType] = useState("");
    const [status, setStatus] = useState(0);
    const [comment, setComment] = useState("");
    const [pmWorkList, setPmWorkList] = useState([]);
    console.log(pmWorkList);

    useEffect(() => {
        const q = query(collection(db, "boards"));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            const pmWorks = [];
            querySnapshot.forEach(doc => {
                const historyCardData = {
                    id: doc.id,
                    date: doc.data().date,
                    type: doc.data().type,
                    status: doc.data().status,
                    comment: doc.data().comment,
                };
                pmWorks.push(historyCardData);
            });
            setPmWorkList(pmWorks);
        });
        return () => unsubscribe();
    }, []);

    async function addCard() {
        // const boards = collection(db, "boards");
        // const cardData = {
        //   date: serverTimestamp(),
        //   type,
        //   status,
        //   comment,
        // };
        // console.log(cardData);
        // const ref = await addDoc(boards, cardData);
        // console.log("Document written with ID: ", ref.id);
        const boardsRef = doc(collection(db, "boards"));
        const cardData = {
            id: boardsRef.id,
            date: serverTimestamp(),
            type,
            status,
            comment,
        };
        setDoc(boardsRef, cardData);
        setComment("");
        setType("");
        setStatus(0);
    }

    function updateCardStatus(id) {
        let changeStatus = prompt("請輸入變更數字0-4", 0);
        if (changeStatus !== null) {
            const docRef = doc(db, "boards", id);
            updateDoc(docRef, {
                status: Number(changeStatus),
            });
        }
    }

    return (
        <Container>
            <SideBar />
            <Main>
                <Title>待辦通知</Title>
                <Form
                    onKeyPress={e => {
                        e.key === "Enter" && addCard();
                    }}
                >
                    <Question>
                        <div>工作類型</div>
                        <input
                            type="text"
                            onChange={e => {
                                setType(e.target.value);
                            }}
                            value={type}
                        />
                    </Question>
                    <Question>
                        <div>分配部門</div>
                        <input
                            type="text"
                            onChange={e => {
                                setStatus(Number(e.target.value));
                            }}
                            value={status}
                        />
                    </Question>
                    <Question>
                        <div>提醒事項</div>
                        <input
                            type="text"
                            onChange={e => {
                                setComment(e.target.value);
                            }}
                            value={comment}
                        />
                    </Question>
                    <Button
                        onClick={() => {
                            addCard();
                        }}
                    >
                        Add
                    </Button>
                </Form>
                <Board>
                    <Department>
                        <SubTitle>工程部</SubTitle>
                        {pmWorkList.map(
                            card =>
                                card.status === 1 && (
                                    <Card key={card.id}>
                                        <div>工作：{card.type}</div>
                                        <div>提醒事項：{card.comment}</div>
                                        <Button
                                            onClick={() =>
                                                updateCardStatus(card.id)
                                            }
                                        >
                                            修改
                                        </Button>
                                    </Card>
                                ),
                        )}
                    </Department>
                    <Department>
                        <SubTitle>採購部</SubTitle>
                        {pmWorkList.map(
                            card =>
                                card.status === 2 && (
                                    <Card key={card.id}>
                                        <div>工作：{card.type}</div>
                                        <div>提醒事項：{card.comment}</div>
                                        <Button
                                            onClick={() =>
                                                updateCardStatus(card.id)
                                            }
                                        >
                                            修改
                                        </Button>
                                    </Card>
                                ),
                        )}
                    </Department>
                    <Department>
                        <SubTitle>生產部</SubTitle>
                        {pmWorkList.map(
                            card =>
                                card.status === 3 && (
                                    <Card key={card.id}>
                                        <div>工作：{card.type}</div>
                                        <div>提醒事項：{card.comment}</div>
                                        <Button
                                            onClick={() =>
                                                updateCardStatus(card.id)
                                            }
                                        >
                                            修改
                                        </Button>
                                    </Card>
                                ),
                        )}
                    </Department>
                    <Department>
                        <SubTitle>船務</SubTitle>
                        {pmWorkList.map(
                            card =>
                                card.status === 4 && (
                                    <Card key={card.id}>
                                        <div>工作：{card.type}</div>
                                        <div>提醒事項：{card.comment}</div>
                                        <Button
                                            onClick={() =>
                                                updateCardStatus(card.id)
                                            }
                                        >
                                            修改
                                        </Button>
                                    </Card>
                                ),
                        )}
                    </Department>
                    <Department>
                        <SubTitle>暫停</SubTitle>
                        {pmWorkList.map(
                            (card, index) =>
                                card.status === 0 && (
                                    <Card key={index}>
                                        <div>工作：{card.type}</div>
                                        <div>提醒事項：{card.comment}</div>
                                        <Button
                                            onClick={() =>
                                                updateCardStatus(card.id)
                                            }
                                        >
                                            修改
                                        </Button>
                                    </Card>
                                ),
                        )}
                    </Department>
                </Board>
            </Main>
        </Container>
    );
}

export default BulletinBoard;
