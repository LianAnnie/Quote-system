import Input from "./Input";
import Select from "./Select";
import { Section, Form, Question, Flex } from "./StyleComponent";
import data from "../utils/data";
import { storage } from "../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";

function AnalysisForm({ handleDataChange, processingData, setProcessingData }) {
    const inputComponentArray = [
        {
            title: "分析日期",
            name: "date",
            type: "date",
        },
        {
            title: "期望單價",
            name: "expectedPrice",
            type: "number",
        },
        {
            title: "期望利潤率(%)",
            name: "expoectedMargin",
            type: "number",
        },
    ];

    const selectComponentArray = [
        {
            title: "分析數量",
            name: "quoteQty",
            optionArray: data.inquiryQty,
        },
        {
            title: "幣別",
            name: "currency",
            optionArray: data.currencyList,
        },
    ];

    const [imageUrl, setImageUrl] = useState("");

    function upLoad(e) {
        let file = e.target.files[0];
        console.log(file);
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            },
            error => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    console.log("File available at", downloadURL);
                    setImageUrl(downloadURL);
                    const newProcessingData = { ...processingData };
                    newProcessingData.parentData.image = downloadURL;
                    setProcessingData(newProcessingData);
                });
            },
        );
    }

    return (
        <Section>
            <Form>
                <Flex>
                    <div>
                        {inputComponentArray.map(e => (
                            <Input
                                key={e.title}
                                title={e.title}
                                type={e.type}
                                handleDataChange={handleDataChange}
                                data={processingData}
                                name={e.name}
                            />
                        ))}
                        {selectComponentArray.map(e => (
                            <Select
                                key={e.title}
                                title={e.title}
                                handleDataChange={handleDataChange}
                                name={e.name}
                                optionArray={e.optionArray}
                            />
                        ))}
                        <Question>
                            <div>上傳圖片</div>
                            <input
                                type="file"
                                name="image"
                                data={processingData}
                                onChange={e => {
                                    upLoad(e);
                                    handleDataChange(e);
                                }}
                            />
                        </Question>
                    </div>
                    {imageUrl.length > 0 && (
                        <img
                            src={imageUrl}
                            alt="產品圖片"
                            style={{ width: "15%" }}
                        />
                    )}
                </Flex>
            </Form>
        </Section>
    );
}

export default AnalysisForm;
