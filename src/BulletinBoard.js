import {
    Container,
    Main,
    Title,
    Form,
    Question,
    AddButton,
} from "./component/StyleComponent";
import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SideBar from "./component/SideBar";
import { db } from "./utils/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import form from "./utils/formChange";
import api from "./utils/firebaseApi";
import styled from "styled-components";

const Card = styled.div`
    padding: 20px 15%;
`;

const Boards = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    flex-wrap: wrap;
`;

const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CardsContainer = styled.div`
    margin: 8px;
`;

function BulletinBoard({ signOut }) {
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
        api.setDocWithId("boards", undefined, card);
        setCard(cardDataRule);
    }

    useEffect(() => {
        const q = query(collection(db, "boards"));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            const pmWorks = [];
            querySnapshot.forEach(doc => {
                pmWorks.push(doc.data());
                console.log(`note!!!`);
            });
            for (let i = 0; i < 5; i++) {
                columnsFromBackend[i].items = pmWorks.filter(
                    item => item.status === i && item,
                );
            }
            setColumns(columnsFromBackend);
        });
        return () => unsubscribe();
    }, []);

    return (
        <Container>
            <SideBar signOut={signOut} />
            <Main>
                <Card>
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
                        <AddButton
                            onClick={() => {
                                addCard();
                            }}
                        />
                    </Form>
                </Card>
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
                                                                borderRadius:
                                                                    "10px",
                                                                background:
                                                                    snapshot.isDraggingOver
                                                                        ? "#A39171"
                                                                        : "#F1D9A7",
                                                                padding: 10,
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
                                                                                            borderRadius:
                                                                                                "10px",
                                                                                            minHeight:
                                                                                                "50px",
                                                                                            backgroundColor:
                                                                                                snapshot.isDragging
                                                                                                    ? "#513c2c"
                                                                                                    : "#513c2c",
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
