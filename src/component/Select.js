import { Question, LabelStyled, InputStyled } from "./StyleComponent";

function Select({ title, handleDataChange, data, name, optionArray }) {
    return (
        <>
            {/* <Question>
                <div>{title}</div>
                {optionArray.length > 1 ? (
                    <select
                        name={name}
                        value={data[name]}
                        onChange={e => handleDataChange(e)}
                    >
                        {data[name] === 0 && <option value={0}>請選擇</option>}
                        {optionArray.map((e, index) => (
                            <option key={index} value={e}>
                                {e[1]}
                            </option>
                        ))}
                    </select>
                ) : (
                    <div>{optionArray[0][1]}</div>
                )}
            </Question> */}
            <Question>
                <LabelStyled>{title}</LabelStyled>
                {optionArray.length > 1 ? (
                    <>
                        <InputStyled
                            type="text"
                            list={name}
                            name={name}
                            onChange={e => handleDataChange(e)}
                        />
                        <datalist id={name}>
                            {optionArray.map((e, index) => (
                                <option key={index} value={e}>
                                    {e[1] ? e[1] : e}
                                </option>
                            ))}
                        </datalist>
                    </>
                ) : (
                    <div>{optionArray[0][1]}</div>
                )}
            </Question>
        </>
    );
}

export default Select;
