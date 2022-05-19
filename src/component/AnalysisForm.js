import PropTypes from "prop-types";
import * as S from "./StyleComponent";
import data from "../utils/data";
import Input from "./Input";
import Select from "./Select";

function AnalysisForm({ handleDataChange, processingData }) {
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
        <S.Article mode="origin">
            <S.Form>
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
            </S.Form>
        </S.Article>
    );
}

AnalysisForm.propTypes = {
    handleDataChange: PropTypes.func.isRequired,
    processingData: PropTypes.shape({
        id: PropTypes.string,
        children: PropTypes.array,
        parentData: PropTypes.shape({
            caculatedMargin: PropTypes.number,
            caculatedPrice: PropTypes.number,
            class: PropTypes.string,
            color: PropTypes.string,
            currency: PropTypes.string,
            date: PropTypes.string,
            dependency: PropTypes.array,
            expectedPrice: PropTypes.string,
            expoectedMargin: PropTypes.string,
            group: PropTypes.string,
            id: PropTypes.array,
            mark: PropTypes.string,
            material: PropTypes.string,
            quoteQty: PropTypes.string,
            special: PropTypes.string,
            sum: PropTypes.number,
            type: PropTypes.string,
            valid: PropTypes.number,
        }),
    }),
};

export default AnalysisForm;
