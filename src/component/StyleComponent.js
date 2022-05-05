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

/* -----------按鈕區-----------*/
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
const UpdatedButton = styled(DriveFileRenameOutlineIcon)`
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    background-color: #c4d6b0;
    :hover {
        background-color: #513c2c;
    }
`;
const DeleteButton = styled(ClearIcon)`
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    background-color: #c4d6b0;
    :hover {
        background-color: #513c2c;
    }
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
const AddButton = styled(AddCircleIcon)`
    text-align: right;
    margin-left: 80%;
    cursor: pointer;
    color: #c4d6b0;
    :hover {
        color: #513c2c;
    }
`; //companies
/* -----------標題/Section共用區-----------*/
const Section = styled.div`
    padding: 20px 5%;
`;
const Title = styled.div`
    margin-bottom: 20px;
    font-size: 20px;
`;

/* -----------表單區-companies----------*/
const Form = styled.div`
    border: solid 1px #000000;
    padding: 20px 5%;
    border-radius: 10px;
    width: 100%;
    background-color: #fff;
`;
const SingleLine = styled.div`
    display: flex;
    margin: 15px 10px;
    align-items: center;
    justify-content: space-between;
`;
const LabelStyled = styled.div`
    font-size: 16px;
    width: 130px;
`;
const SelectStyled = styled.select`
    font-size: 16px;
    width: 120px;
    border: 1px solid #bebebe;
    border-radius: 5px;
    height: 40px;
    text-align: center;
`;
const InputStyled = styled.input`
    font-size: 16px;
    width: 120px;
    border: 1px solid #bebebe;
    border-radius: 5px;
    height: 40px;
    text-align: center;
`;
const DataStyled = styled.div`
    width: 120px;
    text-align: center;
    margin: 12px;
`;
const Submit = styled.div`
    background-color: #513c2c;
    width: 30px;
    color: #fff;
`;
/* -----------列表區-----------*/
const AddScrollbar = styled.div`
    border: solid 1px #000000;
    border-radius: 10px;
    background-color: #fff;
    white-space: pre-wrap;
    height: 361px;
    overflow-x: scroll;
    overflow-y: scroll;
    scrollbar-width: none;
    padding: 20px 5%;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const Table = styled.table`
    border-collapse: collapse;
`;

const Thead = styled.thead`
    background-color: #fff;
    position: sticky;
    z-index: 1;
    top: 0;
`;
const Tr = styled.tr`
    height: 50px;
`;
const ThTitle = styled.th`
    padding-left: 10px;
    height: 50px;
`;
const ThButtonTitle = styled.th`
    width: 50px;
`;
const TableSelectSearch = styled.select`
    font-size: 16px;
    width: 160px;
    margin-right: 10px;
    border: none;
    height: 35px;
    text-align: left;
`;
const TableInputSearch = styled.input`
    position: absolute;
    font-size: 16px;
    z-index: 2;
    width: 140px;
    border: 1px solid #bebebe;
    border-radius: 5px;
    height: 35px;
    text-align: left;
    padding-left: 10px;
`;

const TBody = styled.tbody``;
const TBodyTr = styled.tr`
    border-bottom: 1px solid #bebebe;
    :hover {
        background-color: #f1d9a754;
    }
`;
const TBodyTdContext = styled.td`
    padding: 20px 0px 5px 10px;
`;
const TBodyTdButton = styled.td`
    width: 40px;
`;

const ThText = styled.th``;

/* -----------總頁面-----------*/

/* -----------外框區-----------*/

/* -----------待整理-----------*/
const TdContext = styled.td`
    padding-left: 10px;
`;
const Th = styled.th``;
const Td = styled.td`
    width: 40px;
    margin: 0px 10px;
    padding: 5px 0px;
`;

const UpdatedTr = styled.tr`
    @media ${device.mobileS} {
        flex-wrap: wrap;
        display: flex;
    }
    width: 40px;
    margin: 0px 10px;
`;

const SelectInput = styled.input`
    width: 100px;
    margin: 5px 1px;
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

const Container = styled.div`
    text-align: left;
    background-color: #fffae3;
    min-height: 100vh;
`;
const Main = styled.div`
    @media ${device.laptop} {
        padding: 80px 0px 0px;
    }
    @media ${device.desktopL} {
        padding: 80px 10% 0px;
    }
    @media ${device.desktop} {
        margin-left: 300px;
    }
`;

const TableStyled = styled.table`
    border: solid 1px #000000;
    padding: 2%;
    border-radius: 10px;
    width: 100%;
    background-color: #fff;
`;

const Border = styled.div`
    border: solid 1px #000000;
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
    height: calcu(100vh - 300px);
`;
const Question = styled.div`
    display: flex;
    margin: 5px;
`;

const DivStyled = styled.div`
    width: 160px;
`;

export {
    TBodyTdContext,
    TBodyTdButton,
    TBodyTr,
    TableSelectSearch,
    TableInputSearch,
    ThButtonTitle,
    Container,
    Main,
    Section,
    Title,
    Form,
    Table,
    Thead,
    TableStyled,
    Border,
    Question,
    LabelStyled,
    InputStyled,
    SelectStyled,
    ThText,
    Tr,
    TBody,
    Td,
    Th,
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
    SingleLine,
    DataStyled,
    DivStyled,
    Submit,
};
