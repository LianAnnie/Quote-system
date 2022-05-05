import {
    SingleLine,
    LabelStyled,
    InputStyled,
    DataListStyled,
} from "./StyleComponent";

function Select({ title, handleDataChange, name, optionArray }) {
    return (
        <>
            <SingleLine>
                <LabelStyled>{title}</LabelStyled>
                {optionArray.length > 1 ? (
                    <>
                        <InputStyled
                            type="text"
                            list={name}
                            name={name}
                            onChange={e => handleDataChange(e)}
                        />
                        <DataListStyled id={name}>
                            {optionArray.map((e, index) => (
                                <option key={index} value={e}>
                                    {e[1] ? e[1] : e}
                                </option>
                            ))}
                        </DataListStyled>
                    </>
                ) : (
                    <div>{optionArray[0][1]}</div>
                )}
            </SingleLine>
        </>
    );
}

export default Select;
