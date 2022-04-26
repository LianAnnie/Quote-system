import { Question } from "./StyleComponent";

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
