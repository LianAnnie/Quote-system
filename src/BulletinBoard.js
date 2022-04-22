import styled from "styled-components";
import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SideBar from "./SideBar";
import { db } from "./utils/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
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
const Boards = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
`;

const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CardsContainer = styled.div`
    margin: 8px;
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
    const [columns, setColumns] = useState([]);
    const [card, setCard] = useState(cardDataRule);
    const columnsFromBackend = {
        1: {
            name: "工程",
            items: [],
        },
        2: {
            name: "採購",
            items: [],
        },
        3: {
            name: "生產",
            items: [],
        },
        4: {
            name: "船務",
            items: [],
        },
        0: {
            name: "暫停",
            items: [],
        },
    };
    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            console.log(source.droppableId); //原本位置
            console.log(destination.droppableId); //新的位置-status要改的數字
            // console.log(sourceColumn);
            console.log(sourceItems);
            // console.log(destColumn);
            console.log(destItems);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
            destItems.forEach(e => {
                e.status = destination.droppableId;
                updateCard(e);
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            // console.log(column);
            // console.log(copiedItems)
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    };

    function updateCard(card) {
        api.updateDoc("boards", card.id, card);
    }

    function handleCardChange(e) {
        const data = form.handleChange("_", e, card);
        setCard(data);
    }
    async function addCard() {
        // api.setDocWithId("boards", undefined, card);
        setCard(cardDataRule);
    }

    useEffect(() => {
        const q = query(collection(db, "boards"));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            const pmWorks = [];
            // querySnapshot.forEach(doc => pmWorks.push(doc.data()));
            // for(let i=0; i<5; i++) {
            //     columnsFromBackend[i].items = pmWorks.filter(item => item.status===i&&item);
            // }
            setColumns(columnsFromBackend);
        });
        return () => unsubscribe();
    }, []);

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
                <Boards>
                    <DragDropContext
                        onDragEnd={result =>
                            onDragEnd(result, columns, setColumns)
                        }
                    >
                        {Object.entries(columns).map(
                            ([columnId, column], index) => {
                                return (
                                    <BoardContainer key={columnId}>
                                        <h2>{column.name}</h2>
                                        <CardsContainer>
                                            <Droppable
                                                droppableId={columnId}
                                                key={columnId}
                                            >
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div
                                                            {...provided.droppableProps}
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            style={{
                                                                background:
                                                                    snapshot.isDraggingOver
                                                                        ? "lightblue"
                                                                        : "lightgrey",
                                                                padding: 4,
                                                                width: 250,
                                                                minHeight: 500,
                                                            }}
                                                        >
                                                            {column.items.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => {
                                                                    return (
                                                                        <Draggable
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            draggableId={
                                                                                item.id
                                                                            }
                                                                            index={
                                                                                index
                                                                            }
                                                                        >
                                                                            {(
                                                                                provided,
                                                                                snapshot,
                                                                            ) => {
                                                                                return (
                                                                                    <div
                                                                                        ref={
                                                                                            provided.innerRef
                                                                                        }
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        style={{
                                                                                            userSelect:
                                                                                                "none",
                                                                                            padding: 16,
                                                                                            margin: "0 0 8px 0",
                                                                                            minHeight:
                                                                                                "50px",
                                                                                            backgroundColor:
                                                                                                snapshot.isDragging
                                                                                                    ? "#263B4A"
                                                                                                    : "#456C86",
                                                                                            color: "white",
                                                                                            ...provided
                                                                                                .draggableProps
                                                                                                .style,
                                                                                        }}
                                                                                    >
                                                                                        <div>
                                                                                            {
                                                                                                item.type
                                                                                            }
                                                                                        </div>
                                                                                        <div>
                                                                                            {
                                                                                                item.comment
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            }}
                                                                        </Draggable>
                                                                    );
                                                                },
                                                            )}
                                                            {
                                                                provided.placeholder
                                                            }
                                                        </div>
                                                    );
                                                }}
                                            </Droppable>
                                        </CardsContainer>
                                    </BoardContainer>
                                );
                            },
                        )}
                    </DragDropContext>
                </Boards>
            </Main>
        </Container>
    );
}

export default BulletinBoard;
