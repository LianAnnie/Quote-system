import Input from "./Input";
import Select from "./Select";
import * as S from "./StyleComponent";
import data from "../utils/data";

function Orders({ handleDataChange, processingData, mode }) {
    return (
        <S.Article>
            <S.StructureForm mode={mode}>
                {data.order.inputComponentArray.map(e => (
                    <S.StructrueSingleLine>
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

export default Orders;
