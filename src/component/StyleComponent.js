import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import FiberNewIcon from "@mui/icons-material/FiberNew";

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
    border: solid 1px #513c2c;
    width: 100px;
    margin: 10px;
    margin-left: 20px;
    text-align: center;
    cursor: pointer;
    color: #513c2c;
    background-color: #f1d9a7;
    border-radius: 5px;
    cursor: pointer;
    :hover {
        background-color: #513c2c;
        color: #fff;
    }
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
    border-radius: 5px;
    margin: 0px 20px;
    cursor: pointer;
    background-color: #c4d6b0;
    :hover {
        background-color: #513c2c;
    }
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
const AddButton = styled(AddIcon)`
    text-align: right;
    margin-left: 80%;
    cursor: pointer;
    color: #fff;
    margin-top: auto;
    border-radius: 5px;
    position: ${props => (props.fix === "fix" ? "fixed" : "static")};
    top: 380px;
    right: 17.2%;
    background-color: #c4d6b0;
    z-index: 11;
    :hover {
        background-color: #513c2c;
    }
    .css-i4bv87-MuiSvgIcon-root {
        width: 24px;
        height: 24px;
    }
`; //companies
const NextButton = styled(ArrowForwardIosIcon)`
    color: #fffae3;
    height: 10px;
    border-radius: 5px;
    margin: 0px 20px;
    cursor: pointer;
    position: fixed;
    background-color: #c4d6b0;
    z-index: 11;
    top: 380px;
    right: ${props => (props.page === 2 ? "42%" : "20%")};
    :hover {
        background-color: #513c2c;
    }
`;
const BackButton = styled(ArrowBackIosNewIcon)`
    color: #fffae3;
    border-radius: 5px;
    margin: 0px 20px;
    cursor: pointer;
    position: fixed;
    z-index: 11;
    top: 380px;
    right: ${props => (props.page === 2 ? "45%" : "23%")};
    background-color: #c4d6b0;
    :hover {
        background-color: #513c2c;
    }
`;
const CloseButton = styled(CloseIcon)`
    color: #fffae3;
    border-radius: 5px;
    margin: 0px 20px;
    cursor: pointer;
    position: fixed;
    z-index: 11;
    top: 380px;
    right: ${props => (props.page === 2 ? "38%" : "10.5%")};
    background-color: #c4d6b0;
    :hover {
        background-color: #513c2c;
    }
`;

const CreatNewData = styled(FiberNewIcon)`
    border-radius: 5px;
    margin: 0px 20px;
    cursor: pointer;
    position: fixed;
    top: 100px;
    right: 10%;
    color: ${props => (props.page !== 0 ? "#513c2c" : "#c4d6b0")};
    :hover {
        color: #513c2c;
    }
`;

/* -----------表單/列表共用區-----------*/
const Title = styled.div`
    margin-bottom: ${props => (props.mode === "bom" ? "0px" : "20px;")};
    margin-left: 10px;
    font-size: 20px;
`;
const Article = styled.div`
    padding: 20px 0px 20px 4%;
    width: 23vw;
`;
const NewDataContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const NewDataForm = styled.div`
    position: fixed;
    width: ${props => (props.page === 2 ? "25vw" : "80%")};
    height: 500px;
    border-radius: 30px;
    padding: 10px;
    background-color: #fff;
    margin: auto;
    box-shadow: 14px 12px 14px #dddaca;
    top: 360px;
    z-index: ${props => (props.page === 0 ? "0" : "10")};
    display: ${props => (props.page === 0 ? "none" : "block")};
`;
const AnalysisDataContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;
const AnalysisDataForm = styled.div`
    width: 90%;
    height: 30vh;
    border-radius: 30px;
    padding: 10px;
    background-color: #fff;
    margin: 2% 5%;
    box-shadow: 14px 12px 14px #dddaca;
    top: 360px;
    z-index: 10;
    display: block;
`;
const AnalysisDrawingContainer = styled.div`
    display: flex;
`;
/* -----------表單區-companies----------*/
const Form = styled.div`
    border: solid 1px #000000;
    padding: 20px 5%;
    border-radius: 10px;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    height: ${props => (props.columnQty === 7 ? "482px" : "auto")};
    margin-top: ${props => (props.mode === "bom" ? "40px" : "auto")};
`;
const SingleLine = styled.div`
    display: flex;
    margin: 5px 5px;
    padding: 5px 5px;
    align-items: center;
    justify-content: space-between;
    :hover {
        background-color: #b9e1ea63;
    }
`;
const LabelStyled = styled.div`
    font-size: 16px;
    width: 120px;
    letter-spacing: 1px;
`;
const SelectStyled = styled.select`
    font-size: 16px;
    width: 120px;
    border: 1px solid #bebebe;
    border-radius: 5px;
    height: 40px;
    text-align: center;
    :focus-visible {
        outline: 1px solid #bebebe;
    }
`;
const DataListStyled = styled.datalist`
    font-size: 16px;
    width: 120px;
    border: 1px solid #bebebe;
    border-radius: 5px;
    height: 40px;
    text-align: center;
`;
const InputStyled = styled.input`
    font-size: 16px;
    width: ${props => (props.inputWidth === 170 ? "170px" : "120px")};
    border: 1px solid #bebebe;
    border-radius: 5px;
    height: 40px;
    text-align: center;
    :focus-visible {
        outline: 1px solid #bebebe;
    }
`;
const DataStyled = styled.div`
    width: 120px;
    text-align: center;
    margin: 12px;
`;

/* -----------列表區-----------*/
const AddScrollbar = styled.div`
    border: solid 1px #000000;
    border-radius: 10px;
    background-color: #fff;
    white-space: pre-wrap;
    height: ${props =>
        props.mode === "bom"
            ? "180px"
            : props.columnQty === 4
            ? "361px"
            : props.columnQty === 7
            ? "482px"
            : props.columnQty === 8
            ? "549px"
            : "300px"};
    overflow-x: scroll;
    overflow-y: scroll;
    scrollbar-width: none;
    padding: ${props =>
        props.mode === "bom"
            ? "10px 5%"
            : props.columnQty === 4
            ? "20px 15%"
            : props.columnQty === 8
            ? "30px 6%"
            : props.columnQty === 7
            ? "30px 6%"
            : "20px 2%"};
    ::-webkit-scrollbar {
        display: none;
    }
`;
const StructureScrollbar = styled.div`
    background-color: #fff;
    margin-left: ${props => (props.page === 5 ? "70px" : "20px")};
    height: ${props => (props.page === 5 ? "310px" : "160px")};
    white-space: pre-wrap;
    overflow-y: scroll;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
`;
const Table = styled.table`
    border-collapse: collapse;
    width: ${props => (props.mode === "bom" ? "100%" : "auto")};
    margin-left: ${props => (props.mode === "bomassemble" ? "70px" : "0px")};
    height: ${props => (props.mode === "bomassemble" ? "100px" : "auto")};
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
const Td = styled.td`
    width: ${props => (props.mode === "bom" ? "142px" : "40px")};
    padding: ${props => (props.mode === "bom" ? "5px 10px" : "5px 0px")};
`;
const ThTitle = styled.th`
    padding-left: 10px;
    height: 50px;
    font-weight: 500;
    width: ${props => (props.mode === "bom" ? "100px" : "auto")};
`;
const ThButtonTitle = styled.th`
    width: 50px;
    font-weight: 500;
    text-align: center;
`;
const TableSelectSearch = styled.select`
    font-size: 16px;
    width: ${props =>
        props.index === 0
            ? "160px"
            : props.index === 6 || props.index === 7 || props.index === 8
            ? "105px"
            : props.columnQty === 4
            ? "160px"
            : props.columnQty === 7
            ? "105px"
            : props.columnQty === 8
            ? "90px"
            : props.columnQty === 10
            ? "68px"
            : "160px"};
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    height: 35px;
    text-align: left;
    border: 1px solid #bebebe;
    :focus-visible {
        outline: 1px solid #bebebe;
    }
`;
const TableInputSearch = styled.input`
    position: absolute;
    font-size: 16px;
    z-index: 2;
    width: ${props =>
        props.index === 0
            ? "142px"
            : props.index === 6 || props.index === 7 || props.index === 8
            ? "87px"
            : props.columnQty === 4
            ? "140px"
            : props.columnQty === 7
            ? "85px"
            : props.columnQty === 8
            ? "70px"
            : props.columnQty === 10
            ? "51px"
            : "140px"};
    border-radius: 5px 0 0 5px;
    height: 35px;
    text-align: left;
    padding-left: 10px;
    border: 1px solid #bebebe;
    border-right: 1px solid #fff;
    :focus-visible {
        outline: 1px solid #bebebe;
        border-radius: 5px;
    }
`;
const TableInput = styled.input`
    font-size: 16px;
    border-radius: 5px;
    height: 35px;
    text-align: left;
    padding-left: 10px;
    border: 1px solid #bebebe;
    width: 70px;
`;
const TBody = styled.tbody`
    font-weight: 400;
`;
const TBodyTr = styled.tr`
    border-bottom: 1px solid #bebebe;
    :hover {
        background-color: #b9e1ea63;
    }
`;
const TBodyTdContext = styled.td`
    padding: 20px 0px 5px 10px;
`;
const TBodyTdButton = styled.td`
    width: 40px;
    padding-left: 10px;
`;
const ThText = styled.th``;

/* -----------頁面-----------*/
const Container = styled.div`
    text-align: left;
    background-color: #fffae3;
    min-height: 100vh;
    letter-spacing: 1px;
`;
const Main = styled.div`
    padding: 80px 0px 0px;
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
const Section = styled.div`
    padding: ${props => (props.mode === "bom" ? "10px 5%" : "20px 5%")};
    width: 77vw;
    margin: auto;
`;
const Flex = styled.div`
    display: ${props => (props.page === 5 ? "block" : "flex")};
`;

/* -----------待整理-----------*/
const TdContext = styled.td`
    padding-left: 10px;
`;
const Th = styled.th``;

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
const LefttMargi5 = styled.div`
    margin-left: 5%;
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
    AnalysisDrawingContainer,
    AnalysisDataContainer,
    AnalysisDataForm,
    StructureScrollbar,
    TableInput,
    NewDataContainer,
    NewDataForm,
    CreatNewData,
    CloseButton,
    BackButton,
    NextButton,
    DataListStyled,
    Article,
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
};
