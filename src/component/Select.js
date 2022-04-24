import styled from "styled-components";
const Question = styled.div`
    display: flex;
    margin: 5px;
`;

function Select({ title, handleDataChange, data, name, optionArray }) {
    return (
        <Question>
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
        </Question>
    );
}

export default Select;
