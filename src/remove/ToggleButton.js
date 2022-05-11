import styled from "styled-components";
import PageviewIcon from "@mui/icons-material/Pageview";
import EditOffIcon from "@mui/icons-material/EditOff";

const ToggleButtonContainer = styled.div`
    display: flex;
    position: relative;
`;
const ViewMode = styled(PageviewIcon)`
    margin-top: 5px;
`;

const InputMode = styled(EditOffIcon)`
    margin-top: 5px;
`;
const CheckBoxWrapper = styled.div`
    position: relative;
`;
const ViewModeToggle = styled.div`
    position: absolute;
    top: 5px;
    left: 20px;
    width: 60px;
    height: 26px;
    border-radius: 15px;
    background: #bebebe;
    cursor: pointer;
    &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        margin: 3px;
        background: #ffffff;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
        transition: 0.2s;
    }
`;
const InputModeToggle = styled.div`
    opacity: 0;
    z-index: 1;
    border-radius: 15px;
    width: 42px;
    height: 26px;
    background: #4fbe79;
    &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        margin-left: 41px;
        transition: 0.2s;
    }
`;

function ToggleButton({ viewMode, setViewMode }) {
    console.log(viewMode);
    return (
        <ToggleButtonContainer>
            {viewMode === 1 ? (
                <>
                    <ViewMode />
                    <div>查看模式</div>
                </>
            ) : (
                <>
                    <InputMode />
                    <div>輸入模式</div>
                </>
            )}
            <CheckBoxWrapper>
                {viewMode === 1 ? (
                    <ViewModeToggle onClick={() => setViewMode(0)} />
                ) : (
                    <InputModeToggle onClick={() => setViewMode(0)} />
                )}
            </CheckBoxWrapper>
        </ToggleButtonContainer>
    );
}

export default ToggleButton;
