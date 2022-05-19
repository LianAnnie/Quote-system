import PropTypes from "prop-types";
import data from "../utils/data";
import Input from "./Input";
import Select from "./Select";
import * as S from "./StyleComponent";

function Orders({ handleDataChange, processingData, mode }) {
    return (
        <S.Article>
            <S.StructureForm mode={mode}>
                {data.order.inputComponentArray.map((e, index) => (
                    <S.StructrueSingleLine key={index}>
                        <Input
                            width={170}
                            key={e.title}
                            title={e.title}
                            type={e.type}
                            handleDataChange={handleDataChange}
                            data={processingData}
                            name={e.name}
                        />
                    </S.StructrueSingleLine>
                ))}

                <S.StructrueSingleLine>
                    <Select
                        title="幣別"
                        handleDataChange={handleDataChange}
                        name="currency"
                        optionArray={data.currencyList}
                    />
                </S.StructrueSingleLine>
            </S.StructureForm>
        </S.Article>
    );
}

Orders.propTypes = {
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
            orderId: PropTypes.string,
            requestedDate: PropTypes.string,
            sum: PropTypes.number,
        }),
    }),
    mode: PropTypes.string,
};

export default Orders;
