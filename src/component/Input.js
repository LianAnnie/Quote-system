import { SingleLine, LabelStyled, InputStyled } from "./StyleComponent";

function Input({ title, type, handleDataChange, data, name, width }) {
    return (
        <SingleLine>
            <LabelStyled>{title}</LabelStyled>
            <InputStyled
                width={width}
                type={type}
                name={name}
                onChange={e => {
                    handleDataChange(e);
                }}
                value={data[name]}
            />
        </SingleLine>
    );
}

export default Input;
