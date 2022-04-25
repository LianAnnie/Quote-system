import SideBar from "./component/SideBar";
import { useState } from "react";
import { Container, Main, Flex, Button } from "./component/StyleComponent";
import Quotes from "./component/Quotes";

function Quote() {
    const [page, setPage] = useState(0);
    const quoteDataRule = {
        id: ["3客人id", "13產品編號", "02產品版本號", "報價日期"],
        date: "2022-04-01",
        valid: "2022-04-01",
        currency: "報價幣別",
        image: "產品圖片",
        quoteList: [
            {
                qty: "報價數量",
                price: "產品單價",
                analysisId: "分析id",
                leadTime: "生產天數",
            },
        ],
    };

    const partCollectionName = "parts2";
    const partQuotationCollectionName = "partQuotations2";
    const productCollectionName = "products2";
    const productQuotationCollectionName = "productQuotations2";
    const inquiryQty = [10, 250, 1000, 5000];

    return (
        <Container>
            <SideBar />
            <Main>
                <Flex>
                    <Button onClick={() => setPage(0)}>零件報價</Button>
                    <Button onClick={() => setPage(1)}>產品報價</Button>
                </Flex>
                {/* {page === 0 ? ( */}
                <Quotes
                    collectionName={partCollectionName}
                    assembleCollectionName={partQuotationCollectionName}
                    inquiryQt={inquiryQty}
                />
                {/* ) : (
                    <Quotes
                        collectionName={productCollectionName}
                        assembleCollectionName={productQuotationCollectionName}
                        inquiryQt={inquiryQty}
                    />
                )} */}
            </Main>
        </Container>
    );
}

export default Quote;
