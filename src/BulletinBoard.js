import {
    Container,
    Main,
    Form,
    SingleLine,
    LabelStyled,
    SelectStyled,
    AddButton,
    Button,
    TextareaStyled,
    DeleteButton,
} from "./component/StyleComponent";
import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { db } from "./utils/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import form from "./utils/formChange";
import api from "./utils/firebaseApi";
import styled from "styled-components";

const Boards = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    flex-wrap: wrap;
    @media (min-width: 768px) {
    }
`;

const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`;

const CardsContainer = styled.div`
    margin: 8px;
`;

const Cards = styled.div`
    border-radius: 10px;
    background: #f1d9a7b3;
    padding: 10px;
    width: 200px;
    min-height: 400px;
    :hover {
        background: #f1d9a7;
    }
`;

const Cards2 = styled(DeleteButton)`
    border-radius: 10px;
    background-color: #bdbdbd6b;
    padding: 10px;
    width: 80px;
    height: 80px;
    border: dashed 1px #6b6868;
    :hover {
        background-color: #00000066;
    }
`;

const CardStyled = styled.div`
    user-select: none;
    padding: 16px;
    margin: 0 0 8px 0;
    border-radius: 10px;
    min-height: 50px;
    background-color: #775943;
    color: white;
    :hover {
        background-color: #513c2c;
    }
`;

const Hover = styled.div``;

const Card = styled.div`
    width: 20vw;
    display: none;
    ${Hover}:hover & {
        display: block;
        position: absolute;
        left: 10%;
        top: 14%;
    }
`;

function BulletinBoard() {
    const cardDataRule = {
        id: 0,
        date: "",
        type: "Order",
        status: 0,
        comment: "請輸入待辦事項",
    };
    const [columns, setColumns] = useState([]);
    const [card, setCard] = useState(cardDataRule);
    const columnsFromBackend = {
        0: {
            name: "暫停",
            items: [],
        },
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
        5: {
            name: "請拖曳至此刪除",
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
            console.log(`sourceColumn`, sourceColumn);
            console.log(`destColumn`, destColumn);
            console.log(`sourceItems`, sourceItems);
            console.log(`destItems`, destItems);
            console.log(`removed`, removed);
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

    useEffect(() => {
        const q = query(collection(db, "boards"));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            const pmWorks = [];
            querySnapshot.forEach(doc => {
                pmWorks.push(doc.data());
                console.log(`note!!!`);
            });
            console.log(pmWorks);
            for (let i = 0; i < 5; i++) {
                columnsFromBackend[i].items = pmWorks.filter(
                    item => Number(item.status) === i && item,
                );
            }
            console.log(columnsFromBackend);
            setColumns(columnsFromBackend);
        });
        return () => unsubscribe();
    }, []);

    function updateCard(card) {
        api.updateDoc("boards", card.id, card, 0);
    }

    function handleCardChange(e) {
        const data = form.handleChange("_", e, card);
        setCard(data);
    }
    async function addCard() {
        api.setDocWithId("boards", undefined, card).then(() => {
            setCard(cardDataRule);
        });
    }

    return (
        <Container>
            <Main>
                <Boards>
                    <Hover>
                        <Button>新增卡片</Button>
                        <Card>
                            <Form>
                                <SingleLine>
                                    <LabelStyled>工作類型</LabelStyled>
                                    <SelectStyled
                                        name="type"
                                        onChange={e => {
                                            handleCardChange(e);
                                        }}
                                        value={card.type}
                                    >
                                        <option value="Inquiry">Inquiry</option>
                                        <option value="Order">Order</option>
                                    </SelectStyled>
                                </SingleLine>
                                <SingleLine>
                                    <LabelStyled>分配部門</LabelStyled>
                                    <SelectStyled
                                        name="status"
                                        onChange={e => {
                                            handleCardChange(e);
                                        }}
                                        value={card.status}
                                    >
                                        <option value={1}>工程</option>
                                        <option value={2}>採購</option>
                                        <option value={3}>生產</option>
                                        <option value={4}>船務</option>
                                        <option value={0}>暫停</option>
                                    </SelectStyled>
                                </SingleLine>
                                <SingleLine>
                                    <LabelStyled>提醒事項</LabelStyled>
                                    <TextareaStyled
                                        type="text"
                                        name="comment"
                                        onChange={e => handleCardChange(e)}
                                        rows="3"
                                        cols="20"
                                        placeholder={card.comment}
                                    />
                                </SingleLine>
                                <AddButton
                                    sx={{ width: "30px", height: "30px" }}
                                    onClick={() => {
                                        addCard();
                                    }}
                                />
                            </Form>
                        </Card>
                    </Hover>
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
                                                    return index !== 5 ? (
                                                        <Cards
                                                            snapshot={snapshot}
                                                            {...provided.droppableProps}
                                                            ref={
                                                                provided.innerRef
                                                            }
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
                                                                                    <CardStyled
                                                                                        snapshot={
                                                                                            snapshot
                                                                                        }
                                                                                        ref={
                                                                                            provided.innerRef
                                                                                        }
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
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
                                                                                    </CardStyled>
                                                                                );
                                                                            }}
                                                                        </Draggable>
                                                                    );
                                                                },
                                                            )}
                                                            {
                                                                provided.placeholder
                                                            }
                                                        </Cards>
                                                    ) : (
                                                        <Cards2
                                                            snapshot={snapshot}
                                                            {...provided.droppableProps}
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            style={{
                                                                width: "100px",
                                                                height: "100px",
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
                                                                                    <CardStyled
                                                                                        snapshot={
                                                                                            snapshot
                                                                                        }
                                                                                        ref={
                                                                                            provided.innerRef
                                                                                        }
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
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
                                                                                    </CardStyled>
                                                                                );
                                                                            }}
                                                                        </Draggable>
                                                                    );
                                                                },
                                                            )}
                                                            {
                                                                provided.placeholder
                                                            }
                                                        </Cards2>
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
