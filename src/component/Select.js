import PropTypes from "prop-types";
import * as S from "./StyleComponent";

function Select({ title, handleDataChange, name, optionArray }) {
    return (
        <>
            <S.SingleLine>
                <S.LabelStyled>{title}</S.LabelStyled>
                {optionArray.length > 1 ? (
                    <>
                        <S.InputStyled
                            type="text"
                            list={name}
                            name={name}
                            onChange={e => handleDataChange(e)}
                        />
                        <S.DataListStyled id={name}>
                            {optionArray.map((e, index) => (
                                <option key={index} value={e}>
                                    {e[1] ? e[1] : e}
                                </option>
                            ))}
                        </S.DataListStyled>
                    </>
                ) : (
                    <div>{optionArray[0][1]}</div>
                )}
            </S.SingleLine>
        </>
    );
}

Select.propTypes = {
    title: PropTypes.string,
    handleDataChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    optionArray: PropTypes.array,
};

export default Select;
