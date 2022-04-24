import styled from "styled-components";
const Question = styled.div`
    display: flex;
    margin: 5px;
`;

function Select({ title, handleDataChange, data, name, optionArray }) {
    return (
        <Question>
            <div>{title}</div>
            <select
                name={name}
                value={data[name]}
                onChange={e => handleDataChange(e)}
            >
                {optionArray.map((e, index) => (
                    <option key={index} value={e}>
                        {e[1]}
                    </option>
                ))}
            </select>
        </Question>
    );
}

export default Select;
