import { SingleLine, LabelStyled, InputStyled } from "./StyleComponent";
import PropTypes from "prop-types";

function Input({ title, type, handleDataChange, data, name, inputWidth }) {
    return (
        <SingleLine>
            <LabelStyled>{title}</LabelStyled>
            {type === "text" ? (
                <InputStyled
                    inputWidth={inputWidth}
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

Input.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    handleDataChange: PropTypes.func,
    data: PropTypes.object,
    name: PropTypes.string,
    inputWidth: PropTypes.number,
};

export default Input;
