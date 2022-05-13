import { SingleLine, LabelStyled, InputStyled } from "./StyleComponent";

function Input({ title, type, handleDataChange, data, name, inputWidth }) {
    return (
        <SingleLine>
            <LabelStyled>{title}</LabelStyled>
            {type === "text" ? (
                <InputStyled
                    wiinputWidthdth={inputWidth}
                    type={type}
                    name={name}
                    onChange={e => {
                        handleDataChange(e);
                    }}
                    placeholder={data[name]}
                />
            ) : (
                <InputStyled
                    inputWidth={inputWidth}
                    type={type}
                    defaultValue="2022-05-01"
                    name={name}
                    onChange={e => {
                        handleDataChange(e);
                    }}
                    placeholder={data[name]}
                />
            )}
        </SingleLine>
    );
}

export default Input;
