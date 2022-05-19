import Input from "./Input";
import Select from "./Select";
import { Article, StructureForm, StructrueSingleLine } from "./StyleComponent";
import data from "../utils/data";
import PropTypes from "prop-types";

function Quotes({ handleDataChange, processingData, mode }) {
    const inputComponentArray = [
        {
            title: "報價日期",
            name: "date",
        },
        {
            title: "有效日期",
            name: "valid",
        },
    ];

    return (
        <Article>
            <StructureForm mode={mode}>
                {inputComponentArray.map((e, index) => (
                    <StructrueSingleLine>
                        <Input
                            inputWidth={170}
                            key={index}
                            title={e.title}
                            type="date"
                            handleDataChange={handleDataChange}
                            data={processingData}
                            name={e.name}
                        />
                    </StructrueSingleLine>
                ))}
                <StructrueSingleLine>
                    <Select
                        title="幣別"
                        handleDataChange={handleDataChange}
                        name="currency"
                        optionArray={data.currencyList}
                    />
                </StructrueSingleLine>
            </StructureForm>
        </Article>
    );
}

Quotes.propTypes = {
    handleDataChange: PropTypes.func.isRequired,
    processingData: PropTypes.shape({
        id: PropTypes.string,
        childData: PropTypes.array,
        parentData: PropTypes.shape({
            company: PropTypes.string,
            contacts: PropTypes.string,
            country: PropTypes.string,
            currency: PropTypes.string,
            date: PropTypes.string,
            dependency: PropTypes.array,
            id: PropTypes.array,
            valid: PropTypes.array,
        }),
    }),
    mode: PropTypes.string.isRequired,
};

export default Quotes;
