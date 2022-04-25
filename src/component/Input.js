import styled from "styled-components";
const Question = styled.div`
    display: flex;
    margin: 5px;
`;

function Input({ title, type, handleDataChange, data, name }) {
    return (
        <Question>
            <div>{title}</div>
            <input
                type={type}
                name={name}
                onChange={e => {
                    handleDataChange(e);
                }}
                value={data[name]}
            />
        </Question>
    );
}

export default Input;
