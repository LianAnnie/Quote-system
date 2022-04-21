import styled from "styled-components";
import { useState } from "react";
import SideBar from "./SideBar";
import { db } from "./utils/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import form from "./component/formChange";
import api from "./utils/firebaseApi";

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
    width: 100px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
`;

const Flex = styled.div`
    display: flex;
`;

function BulletinBoard() {
    const cardDataRule = {
        id: 0,
        date: "",
        type: "Order",
        status: 0,
        comment: "comment",
    };
    const [pmWorkList, setPmWorkList] = useState([]);
    const [card, setCard] = useState(cardDataRule);
    console.log(card);

    useEffect(() => {
        const q = query(collection(db, "boards"));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            const pmWorks = [];
            querySnapshot.forEach(doc => pmWorks.push(doc.data()));
            setPmWorkList(pmWorks);
        });
        return () => unsubscribe();
    }, []);

    async function addCard() {
        api.setDocWithId("boards", undefined, card);
        setCard(cardDataRule);
    }
    function deleteCard(id) {
        console.log(id);
        api.deleteDoc("boards", id);
    }
    function updateCard() {
        api.updateDoc("boards", card.id, card);
        setCard(cardDataRule);
    }
    function handleCardChange(e) {
        const data = form.handleChange("_", e, card);
        setCard(data);
    }
    function reviedCard(e) {
        setCard(e);
    }

    return (
        <Container>
            <SideBar />
            <Main>
                <Title>待辦通知</Title>
                <Form>
                    <Question>
                        <div>工作類型</div>
                        <select
                            name="type"
                            onChange={e => {
                                handleCardChange(e);
                            }}
                            value={card.type}
                        >
                            <option value="Inquiry">Inquiry</option>
                            <option value="Order">Order</option>
                        </select>
                    </Question>
                    <Question>
                        <div>分配部門</div>
                        <select
                            name="status"
                            onChange={e => {
                                handleCardChange(e);
                            }}
                            value={card.status}
                        >
                            <option value={0}>暫停</option>
                            <option value={1}>工程</option>
                            <option value={2}>採購</option>
                            <option value={3}>生產</option>
                            <option value={4}>船務</option>
                        </select>
                    </Question>
                    <Question>
                        <div>提醒事項</div>
                        <textarea
                            type="text"
                            name="comment"
                            onChange={e => handleCardChange(e)}
                            rows="3"
                            cols="20"
                            value={card.comment}
                        />
                    </Question>
                    {card.id === 0 ? (
                        <Button
                            onClick={() => {
                                addCard();
                            }}
                        >
                            新增
                        </Button>
                    ) : (
                        <Flex>
                            <Button
                                onClick={() => {
                                    setCard(cardDataRule);
                                }}
                            >
                                取消修改
                            </Button>
                            <Button
                                onClick={() => {
                                    updateCard();
                                }}
                            >
                                上傳修改
                            </Button>
                        </Flex>
                    )}
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
                                            onClick={() => reviedCard(card)}
                                        >
                                            修改
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                deleteCard(card.id);
                                            }}
                                        >
                                            刪除
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
                                            onClick={() => reviedCard(card)}
                                        >
                                            修改
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                deleteCard(card.id);
                                            }}
                                        >
                                            刪除
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
                                            onClick={() => reviedCard(card)}
                                        >
                                            修改
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                deleteCard(card.id);
                                            }}
                                        >
                                            刪除
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
                                            onClick={() => reviedCard(card)}
                                        >
                                            修改
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                deleteCard(card.id);
                                            }}
                                        >
                                            刪除
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
                                            onClick={() => reviedCard(card)}
                                        >
                                            修改
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                deleteCard(card.id);
                                            }}
                                        >
                                            刪除
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
