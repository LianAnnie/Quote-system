import Input from "./Input";
import Select from "./Select";
import { Section, Form } from "./StyleComponent";
import data from "../utils/data";

function AnalysisForm({ handleDataChange, processingData }) {
    // console.log(processingData);
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

    return (
        <Section>
            <Form>
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
            </Form>
        </Section>
    );
}

export default AnalysisForm;
