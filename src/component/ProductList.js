import styled from "styled-components";
import { useEffect, useState } from "react";
import api from "../utils/firebaseApi";
import form from "../utils/formChange";

const Contanier = styled.div`
    padding: 20px 10%;
`;
const Title = styled.div`
    margin-bottom: 20px;
`;
const Table = styled.table`
    border: solid 1px #000000;
    padding: 20px;
`;
const Th = styled.th`
    padding-right: 20px;
`;
const Td = styled.td`
    padding-right: 50px;
`;
const Button = styled.div`
    border: solid 1px #000000;
    width: 100px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
`;

function ProductList({ list }) {
    return <></>;
}

export default ProductList;
