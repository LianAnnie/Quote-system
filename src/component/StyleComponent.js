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
    padding: 20px 5%;
`;
const Title = styled.div`
    margin-bottom: 20px;
    font-size: 20px;
`;

const AddScrollbar = styled.div`
    border: solid 1px #000000;
    border-radius: 10px;
    background-color: #fff;
    white-space: pre-wrap;
    height: 250px;
    overflow-x: scroll;
    overflow-y: scroll;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const Form = styled.div`
    border: solid 1px #000000;
    padding: 2%;
    border-radius: 10px;
    width: 100%;
    background-color: #fff;
`;

const TableStyled = styled.table`
    border: solid 1px #000000;
    padding: 2%;
    border-radius: 10px;
    width: 100%;
    background-color: #fff;
`;

const Table = styled.table`
    background-color: #fff;
    padding: 20px 5%;
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
    display: table-cell;
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
    display: table-cell;
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
    cursor: pointer;
`;
const AddButton = styled(AddCircleIcon)`
    text-align: right;
    color: #513c2c;
    margin-left: 90%;
    cursor: pointer;
`;
const UpdatedButton = styled(DriveFileRenameOutlineIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    cursor: pointer;
`;
const DeleteButton = styled(ClearIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    cursor: pointer;
`;
const CancelSelectedButton = styled(DeselectIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    margin: 0px 20px;
    cursor: pointer;
`;
const SaveButton = styled(UpgradeIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    cursor: pointer;
`;
const CancelEditButton = styled(EditOffIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    cursor: pointer;
`;

const ExportButton = styled(FileDownloadIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    cursor: pointer;
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
    cursor: pointer;
`;

const ResetButton = styled(BorderClearIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    margin: 20px;
    cursor: pointer;
`;

const LoginButton = styled(LoginIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    margin: 20px;
    cursor: pointer;
`;

const LogoutButton = styled(LogoutIcon)`
    color: #fff;
    background-color: #513c2c;
    border-radius: 5px;
    margin: 20px;
    cursor: pointer;
`;

const LabelStyled = styled.label`
    width: 150px;
`;

const DivStyled = styled.div`
    margin: 5px;
`;

const SelectInput = styled.input`
    width: 100px;
    margin: 5px 1px;
    border-radius: 5px;
`;

const InputStyled = styled.input`
    width: 100px;
    margin: 5px;
    border-radius: 5px;
`;

const SelectStyled = styled.select`
    width: 100px;
    margin: 10px 0px;
    border-radius: 5px;
`;

const UpdateInput = styled.input`
    width: 100px;
    border-radius: 5px;
`;

const Flex = styled.div`
    display: flex;
`;

const LefttMargi5 = styled.div`
    margin-left: 5%;
`;

export {
    Container,
    Main,
    Section,
    Title,
    Form,
    Table,
    TableStyled,
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
    LefttMargi5,
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
    AddScrollbar,
};
