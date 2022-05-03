import styled from "styled-components";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import ClearIcon from "@mui/icons-material/Clear";
import DeselectIcon from "@mui/icons-material/Deselect";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EditOffIcon from "@mui/icons-material/EditOff";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BorderClearIcon from "@mui/icons-material/BorderClear";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const size = {
    mobile: "320px",
    tablet: "768px",
    laptop: "1280px",
    laptopL: "1440px",
    desktop: "1920px",
    desktopL: "2560px",
};
export const device = {
    mobileS: `(max-width: ${size.mobile})`,
    mobileL: `(min-width: ${size.mobile})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktopL})`,
};

const Container = styled.div`
    text-align: left;
    background-color: #fffae3;
    min-height: 100vh;
`;
const Main = styled.div`
    @media ${device.laptop} {
        padding: 100px 0px;
    }
    @media ${device.desktopL} {
        padding: 100px 10%;
    }
    @media ${device.desktop} {
        margin-left: 300px;
    }
`;
const Section = styled.div`
    @media ${device.mobileS} {
        padding: 20px 10%;
    }
    @media ${device.mobileL} {
        padding: 20px 10%;
    }

    @media ${device.laptop} {
        padding: 20px 1%;
    }
    @media ${device.laptopL} {
        padding: 20px 2%;
    }
    @media ${device.desktop} {
        padding: 20px 5%;
    }
`;
const Title = styled.div`
    margin-bottom: 20px;
    font-size: 20px;
`;
const Form = styled.div`
    border: solid 1px #000000;
    border-radius: 10px;
    width: 100%;
    background-color: #fff;
    padding: 20px 5%;
`;
const Table = styled.table`
    border: solid 1px #000000;
    border-radius: 10px;
    width: 100%;
    background-color: #fff;
    @media ${device.mobileS} {
        padding: 20px 10%;
    }
    @media ${device.mobileL} {
        padding: 20px 10%;
    }
    @media ${device.laptop} {
        padding: 20px 1%;
    }
    @media ${device.laptopL} {
        padding: 20px 2%;
    }
    @media ${device.desktop} {
        padding: 20px 5%;
    }
`;
const Border = styled.div`
    border: solid 1px #000000;
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
`;
const Question = styled.div`
    display: flex;
    margin: 5px;
`;
const ThTitle = styled.th`
    @media ${device.mobileS} {
        display: ${props => (props.index === 0 ? "table-cell" : "none")};
    }
    @media ${device.mobileL} {
        display: ${props => (props.index === 0 ? "table-cell" : "none")};
    }
    @media ${device.tablet} {
        display: ${props =>
            props.index === 0 || props.index === 1 ? "table-cell" : "none"};
    }
    @media ${device.laptop} {
        display: table-cell;
    }
`;
const Th = styled.th`
    width: 40px;
`;
const Td = styled.td`
    width: 40px;
    margin: 0px 10px;
`;
const UpdatedTr = styled.tr`
    @media ${device.mobileS} {
        flex-wrap: wrap;
        display: flex;
    }
    width: 40px;
    margin: 0px 10px;
`;

const TdContext = styled.td`
    @media ${device.mobileS} {
        display: ${props => (props.index === 0 ? "table-cell" : "none")};
    }
    @media ${device.mobileL} {
        display: ${props => (props.index === 0 ? "table-cell" : "none")};
    }
    @media ${device.tablet} {
        display: ${props =>
            props.index === 0 || props.index === 1 ? "table-cell" : "none"};
    }
    @media ${device.laptop} {
        display: table-cell;
    }
`;

const Button = styled.div`
    border: solid 1px #000000;
    width: 100px;
    margin: 5px;
    margin-left: 20px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
`;
const AddButton = styled(AddCircleIcon)`
    text-align: right;
    color: #513c2c;
    margin-left: 90%;
`;
const UpdatedButton = styled(DriveFileRenameOutlineIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
`;
const DeleteButton = styled(ClearIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
`;
const CancelSelectedButton = styled(DeselectIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    margin: 0px 20px;
`;
const SaveButton = styled(UpgradeIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
`;
const CancelEditButton = styled(EditOffIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
`;

const ExportButton = styled(FileDownloadIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    @media ${device.mobileS} {
        margin-left: 10%;
    }
    @media ${device.mobileL} {
        margin-left: 10%;
    }
    @media ${device.laptop} {
        margin-left: 1%;
    }
    @media ${device.laptopL} {
        margin-left: 2%;
    }
    @media ${device.desktop} {
        margin-left: 5%;
    }
`;

const RegisterButton = styled(PersonAddIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    margin: 20px;
`;

const ResetButton = styled(BorderClearIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    margin: 20px;
`;

const LoginButton = styled(LoginIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    margin: 20px;
`;

const LogoutButton = styled(LogoutIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    margin: 20px;
`;

const Flex = styled.div`
    display: flex;
`;

const LabelStyled = styled.label`
    width: 100px;
`;

const DivStyled = styled.div`
    margin: 5px;
`;

const SelectInput = styled.input`
    width: 100px;
`;

const InputStyled = styled.input`
    margin: 5px;
`;

const SelectStyled = styled.select`
    margin: 5px;
`;

const UpdateInput = styled.input`
    width: 100px;
`;

export {
    Container,
    Main,
    Section,
    Title,
    Form,
    Table,
    Border,
    Question,
    LabelStyled,
    DivStyled,
    InputStyled,
    SelectStyled,
    Th,
    Td,
    UpdatedTr,
    Button,
    Flex,
    AddButton,
    UpdatedButton,
    DeleteButton,
    SaveButton,
    CancelEditButton,
    CancelSelectedButton,
    ExportButton,
    RegisterButton,
    ResetButton,
    LoginButton,
    LogoutButton,
    ThTitle,
    TdContext,
    SelectInput,
    UpdateInput,
};
