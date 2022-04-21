import styled from "styled-components";
import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SideBar from "./SideBar";
import { db } from "./utils/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

const Container = styled.div`
    text-align: left;
`;
const Main = styled.div`
    margin-left: 300px;
    padding: 50px 10%;
`;

function BulletinBoard() {
    const [pmWorkList, setPmWorkList] = useState([]);
    const [columns, setColumns] = useState([]);
    const itemsFromBackend = pmWorkList;
    const columnsFromBackend = {
        0: {
            name: "工程",
            items: [],
            // items: itemsFromBackend,
        },
        1: {
            name: "採購",
            items: [],
        },
        2: {
            name: "生產",
            items: [],
        },
        3: {
            name: "船務",
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

    console.log(columns, pmWorkList);

    useEffect(() => {
        const q = query(collection(db, "boards"));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            const pmWorks = [];
            querySnapshot.forEach(doc => pmWorks.push(doc.data()));
            setPmWorkList(pmWorks);
            columnsFromBackend[0].items = pmWorks;
            setColumns(columnsFromBackend);
        });
        return () => unsubscribe();
    }, []);

    return (
        <Container>
            <SideBar />
            <Main>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "100%",
                    }}
                >
                    <DragDropContext
                        onDragEnd={result =>
                            onDragEnd(result, columns, setColumns)
                        }
                    >
                        {Object.entries(columns).map(
                            ([columnId, column], index) => {
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                        key={columnId}
                                    >
                                        <h2>{column.name}</h2>
                                        <div style={{ margin: 8 }}>
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
                                        </div>
                                    </div>
                                );
                            },
                        )}
                    </DragDropContext>
                </div>
            </Main>
        </Container>
    );
}

export default BulletinBoard;
