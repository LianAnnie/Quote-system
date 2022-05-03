import { Question, LabelStyled, InputStyled } from "./StyleComponent";

function Input({ title, type, handleDataChange, data, name }) {
    return (
        <Question>
            <LabelStyled>{title}</LabelStyled>
            <InputStyled
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
