import styled from "styled-components";
import ListWithRadio from "./ListWithRadio";

function Structure({ collectionName, list }) {
    return (
        <>
            <ListWithRadio collectionName={collectionName} list={list} />
        </>
    );
}

export default Structure;
