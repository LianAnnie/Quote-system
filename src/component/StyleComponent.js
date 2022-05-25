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
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

const size = {
    mobile: "320px",
    tablet: "768px",
    laptop: "1280px",
    laptopL: "1440px",
    desktop: "1920px",
    desktopL: "2560px",
};

const device = {
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
    :hover {
        background-color: #513c2c;
        color: #fff;
    }
`;
const UpdatedButton = styled(DriveFileRenameOutlineIcon)`
    color: #8a9b77;
    border-radius: 5px;
    cursor: pointer;
    background-color: #c4d6b0;
    padding: 5px;
    :hover {
        background-color: #513c2c;
        color: #fff;
    }
`;
const DeleteButton = styled(ClearIcon)`
    color: ${props => (props.dependency ? "#b5b1b1" : "#8a9b77")};
    border-radius: 5px;
    cursor: ${props => (props.dependency ? "not-allowed" : "pointer")};
    background-color: ${props => (props.dependency ? "#eeefec" : "#c4d6b0")};
    padding: 5px;
    :hover {
        background-color: ${props =>
            props.dependency ? "#eeefec" : "#513c2c"};
        color: ${props => (props.dependency ? "#b5b1b1" : " #fff")};
    }
`;
const CancelSelectedButton = styled(DeselectIcon)`
    color: #8a9b77;
    border-radius: 5px;
    margin: 0 0 0 20px;
    cursor: pointer;
    background-color: #c4d6b0;
    padding: 5px;
    :hover {
        background-color: #513c2c;
        color: #fff;
    }
`;
const ShowTextForButton = styled.div`
    overflow: hidden;
    width: 50px;
    height: 50px;
    display: flex;
    :hover {
        width: 150px;
    }
`;
const CancelSelectedText = styled.div`
    margin-top: 5px;
    margin-left: 8px;
`;
const SaveButton = styled(UpgradeIcon)`
    color: #8a9b77;
    border-radius: 5px;
    cursor: pointer;
    background-color: #c4d6b0;
    padding: 2px;
    :hover {
        background-color: #513c2c;
        color: #fff;
    }
`;
const CancelEditButton = styled(EditOffIcon)`
    color: #8a9b77;
    border-radius: 5px;
    cursor: pointer;
    background-color: #c4d6b0;
    padding: 5px;
    :hover {
        background-color: #513c2c;
        color: #fff;
    }
`;
const ExportButton = styled(FileDownloadIcon)`
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 90%;
    color: #8a9b77;
    padding: 5px;
    height: 10px;
    background-color: #c4d6b0;
    top: ${props => (props.mode === "analysis" ? "180px" : "380px")};
    right: 20%;
    :hover {
        background-color: #513c2c;
        color: #fff;
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
    margin-left: 84%;
    cursor: pointer;
    color: #8a9b77;
    margin-top: auto;
    border-radius: 5px;
    padding: 5px;
    position: ${props => (props.fix === "fix" ? "fixed" : "static")};
    top: 380px;
    right: 17.2%;
    background-color: #c4d6b0;
    z-index: 11;
    :hover {
        background-color: #513c2c;
        color: #fff;
    }
    .css-i4bv87-MuiSvgIcon-root {
        width: 24px;
        height: 24px;
    }
`; //companies
const NextButton = styled(ArrowForwardIosIcon)`
    color: #8a9b77;
    padding: 5px;
    height: 10px;
    border-radius: 5px;
    margin: 0px 20px;
    cursor: pointer;
    position: fixed;
    background-color: #c4d6b0;
    z-index: 11;
    top: ${props => (props.mode === "analysis" ? "205px" : "380px")};
    right: 20%;
    :hover {
        background-color: #513c2c;
        color: #fff;
    }
    @media ${device.tablet} {
        top: ${props => (props.mode === "analysis" ? "205px" : "140px")};
    }
    @media ${device.laptop} {
        top: ${props => (props.mode === "analysis" ? "205px" : "360px")};
    }
    @media ${device.laptopL} {
        top: ${props => (props.mode === "analysis" ? "205px" : "380px")};
    }
`;
const BackButton = styled(ArrowBackIosNewIcon)`
    color: #8a9b77;
    border-radius: 5px;
    padding: 5px;
    margin: 0px 20px;
    cursor: pointer;
    position: fixed;
    z-index: 11;
    top: ${props => (props.mode === "analysis" ? "205px" : "380px")};
    right: 23%;
    background-color: #c4d6b0;
    :hover {
        background-color: #513c2c;
        color: #fff;
    }
    @media ${device.tablet} {
        top: ${props => (props.mode === "analysis" ? "205px" : "140px")};
    }
    @media ${device.laptop} {
        top: ${props => (props.mode === "analysis" ? "205px" : "380px")};
    }
`;
const CloseButton = styled(CloseIcon)`
    color: #8a9b77;
    border-radius: 5px;
    padding: 5px;
    margin: 0px 20px;
    cursor: pointer;
    position: fixed;
    z-index: 11;
    top: 380px;
    right: 10.5%;
    background-color: #c4d6b0;
    :hover {
        background-color: #513c2c;
        color: #fff;
    }
`;
const CreatNewData = styled(CreateNewFolderIcon)`
    padding: 5px;
    border-radius: 5px;
    margin: 0px 20px;
    cursor: pointer;
    position: fixed;
    top: 115px;
    right: 10%;
    color: ${props => (props.page !== 0 ? "#513c2c" : "#c4d6b0")};
    :hover {
        color: #513c2c;
    }
`;

/* -----------表單/列表共用區-----------*/
const Title = styled.div`
    margin-bottom: ${props => (props.mode === "structure" ? "0px" : "20px;")};
    margin-left: 10px;
    font-size: 20px;
`;
const Article = styled.div`
    padding: ${props =>
        props.mode === "origin" ? "20px 0px 20px 4%" : "20px 0px 20px 8%"};
    width: ${props => (props.mode === "origin" ? "23vw" : "80%")};
    @media ${device.mobileS} {
        width: 95%;
    }
    @media ${device.mobileL} {
        width: 95%;
    }
    @media ${device.tablet} {
        width: ${props => (props.mode === "origin" ? "45%" : "80%")};
    }
    @media ${device.laptop} {
        width: ${props => (props.mode === "origin" ? "23vw" : "80%")};
    }
    @media ${device.laptop} {
        width: ${props => (props.mode === "origin" ? "23vw" : "80%")};
        // max-width: 550px;
    }
`;
const NewDataContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const NewDataForm = styled.div`
    position: fixed;
    width: 80%;
    height: 500px;
    border-radius: 30px;
    padding: 10px;
    background-color: #fff;
    margin: auto;
    box-shadow: 4px 3px 20px 8px #dddaca;
    top: 360px;
    z-index: ${props => (props.page === 0 ? "0" : "10")};
    display: ${props => (props.page === 0 ? "none" : "block")};
    @media ${device.mobileS} {
        position: static;
    }
    @media ${device.mobileL} {
        position: static;
    }
    @media ${device.tablet} {
        position: static;
    }
    @media ${device.laptop} {
        position: fixed;
        top: 340px;
    }
    @media ${device.laptopL} {
        top: 360px;
    }
`;
/*--------Analysis --------*/
const AnalysisDataContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;
const AnalysisDataForm = styled.div`
    width: 90%;
    border-radius: 30px;
    padding: 10px;
    background-color: #fff;
    margin: 2% 5%;
    box-shadow: 4px 3px 20px 8px #dddaca;
    top: 360px;
    z-index: 10;
    display: block;
`;
const AnalysisDrawingContainer = styled.div`
    display: flex;
    height: 30vh;
    margin: 1% 5% 0;
    justify-content: space-between;
    @media ${device.mobileS} {
        flex-wrap: wrap;
    }
    @media ${device.mobileL} {
        flex-wrap: wrap;
    }
    @media ${device.laptopL} {
        flex-wrap: nowrap;
    }
`;
const AnalysisAssembledContainer = styled.div`
    border-radius: 30px;
    background-color: #fff;
    box-shadow: 4px 3px 20px 8px #dddaca;
    padding: 2%;
    margin-right: 20px;
    @media ${device.laptopL} {
        width: 45vw;
    }
`;
const Border = styled.div`
    width: 40vw;
    display: flex;
    border-radius: 30px;
    padding: 20px;
    background-color: #fff;
    justify-content: space-between;
    box-shadow: 4px 3px 20px 8px #dddaca;x;
    @media ${device.mobileS} {
        margin: 3% 0px;
        width: 80vw;
    }
    @media ${device.mobileL} {
        margin: 3% 0px;
        width: 80vw;
    }
    @media ${device.laptopL} {
        margin: 0px;
    }
`;
const Pie = styled.div``;
/* -----------表單區-companies----------*/
const Form = styled.div`
    border: solid 1px #e4e4e4;
    box-shadow: 1px 1px 6px 0 #dfdfdf;
    padding: 20px 5%;
    border-radius: 10px;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    height: ${props => (props.columnQty === 7 ? "482px" : "auto")};
    margin-top: ${props => (props.mode === "structure" ? "40px" : "auto")};
`;
const StructureForm = styled.div`
    display: flex;
    margin-bottom: 20px;
    @media ${device.mobileS} {
        flex-wrap: wrap;
    }
    @media ${device.mobileL} {
        flex-wrap: wrap;
    }
    @media ${device.laptopL} {
        flex-wrap: nowrap;
    }
`;
const StructrueSingleLine = styled.div`
    // width: 230px;
    margin-right: 30px;
    border-radius: 10px;
    box-shadow: 1px 1px 6px 0 #dfdfdf;
    border: solid 1px #e4e4e4;
    :hover: {
        background-color: #b9e1ea63;
    }
`;
const SingleLine = styled.div`
    display: flex;
    padding: 10px;
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
    font-size: 15px;
    width: ${props => (props.inputWidth ? `${props.inputWidth}px` : "120px")};
    border: 1px solid #bebebe;
    padding-right: 5px;
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
const TextareaStyled = styled.textarea`
    font-size: 16px;
    width: 120px;
    border: 1px solid #bebebe;
    border-radius: 5px;
    :focus-visible {
        outline: 1px solid #bebebe;
    }
`;

/* -----------列表區-----------*/
const AddScrollbar = styled.div`
    border-radius: 10px;
    background-color: #fff;
    white-space: pre-wrap;
    height: ${props =>
        props.mode === "assemble" && props.page === 5
            ? "400px"
            : props.mode === "assemble"
            ? "160px"
            : props.mode === "structure" && props.page === "3"
            ? "180px"
            : props.mode === "structure" && props.page === "4"
            ? "180px"
            : props.mode === "structure"
            ? "600px"
            : props.mode === "origin"
            ? "600px"
            : props.mode === "analysis"
            ? "295px"
            : "320px"};
    display: ${props => (props.mode === "assemble" ? "flex" : "block")};
    overflow-x: scroll;
    overflow-y: scroll;
    scrollbar-width: none;
    padding: ${props =>
        props.mode === "structure" && props.page === "5"
            ? "0px 15%"
            : props.mode === "structure" && props.columnQty === 10
            ? "0px 2%"
            : props.mode === "structure"
            ? "0px 5%"
            : props.columnQty === 4
            ? "0px 15%"
            : props.columnQty === 8
            ? "0px 6%"
            : props.columnQty === 7
            ? "0px 6%"
            : props.columnQty === 6
            ? "0px 4%"
            : "0px 1%"};
    border: solid 1px #e4e4e4;
    box-shadow: 1px 1px 6px 0 #dfdfdf;
    ::-webkit-scrollbar {
        display: none;
    }
    @media ${device.mobileS} {
        flex-wrap: ${props => (props.mode === "assemble" ? "wrap" : "nowrap")};
        width: ${props =>
            props.mode === "assemble"
                ? "70%"
                : props.listPosition === "inner"
                ? "70%"
                : "auto"};
    }
    @media ${device.mobileL} {
        flex-wrap: ${props => (props.mode === "assemble" ? "wrap" : "nowrap")};
        width: ${props =>
            props.mode === "assemble"
                ? "78%"
                : props.listPosition === "inner"
                ? "78%"
                : "auto"};
    }
    @media ${device.tablet} {
        width: ${props => (props.mode === "assemble" ? "52vw" : "auto")};
        margin: auto;
        padding: ${props => props.columnQty === 4 && "0px 5%"};
    }
    @media ${device.laptop} {
        width: ${props => (props.mode === "assemble" ? "77vw" : "auto")};
        flex-wrap: nowrap;
        flex-direction: ${props => (props.page === 5 ? "column" : "row")};
    }
    @media ${device.laptopL} {
        width: ${props => (props.mode === "assemble" ? "77vw" : "auto")};
    }
`;
const StructureScrollbar = styled.div`
    background-color: #fff;
    margin-top: 29px;
    margin-left: ${props => (props.page === 5 ? "70px" : "20px")};
    height: ${props =>
        props.page === 5
            ? "310px"
            : props.mode === "assemble"
            ? "110px"
            : "160px"};
    white-space: pre-wrap;
    overflow-y: scroll;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
    @media ${device.mobileS} {
        margin-left: ${props => (props.page === 5 ? "70px" : "10px")};
    }
    @media ${device.mobileL} {
        margin-left: ${props => (props.page === 5 ? "70px" : "10px")};
    }
`;
const Table = styled.table`
    table-layout: fixed;
    word-wrap: break-word;
    border-collapse: collapse;
    width: ${props =>
        props.mode === "structure"
            ? "100%"
            : props.mode === "assemble" && props.page === 5
            ? "auto"
            : props.mode === "assemble"
            ? "340px"
            : "auto"};
    height: ${props => (props.mode === "structureassemble" ? "100px" : "auto")};
    @media ${device.mobileS} {
        margin-left: ${props => props.mode === "structureassemble" && "10px"};
        margin: auto;
    }
    @media ${device.mobileL} {
        margin-left: ${props => props.mode === "structureassemble" && "10px"};
        margin: auto;
    }
    @media ${device.laptop} {
        margin-left: ${props => props.mode === "structureassemble" && "20px"};
        margin: auto;
    }
    @media ${device.laptopL} {
        margin-left: ${props => props.mode === "structureassemble" && "70px"};
        margin: auto;
    }
`;
const Thead = styled.thead`
    background-color: #fff;
    position: sticky;
    z-index: 1;
    top: 0;
`;
const Tr = styled.tr``;
const TrBody = styled.tr`
    border-radius: 10px;
    height: 50px;
    :hover {
        background-color: #b9e1ea63;
    }
`;
const Td = styled.td`
    width: ${props =>
        props.mode === "structure"
            ? "142px"
            : props.mode === "anlysis"
            ? "160px"
            : "90px"};
    padding: ${props =>
        props.mode === "structure"
            ? "5px 10px"
            : props.mode === "anlysis"
            ? "5px 0px 0px 0px"
            : "20px 0px 5px 10px"};
    height: ${props => (props.mode === "anlysis" ? "45px" : "auto")};
    text-align: ${props => (props.mode === "anlysis" ? "center" : "left")};
`;
const ThTitle = styled.th`
    min-width: ${props =>
        props.mode === "structure"
            ? "100px"
            : props.mode === "anlysis" && props.index === 0
            ? "150px"
            : props.mode === "anlysis"
            ? "130px"
            : "auto"};
    padding-left: 10px;
    height: 50px;
    font-weight: 500;
    width: ${props =>
        props.mode === "structure"
            ? "150px"
            : props.mode === "anlysis"
            ? "150px"
            : "auto"};
    text-align: ${props => (props.mode === "anlysis" ? "center" : "left")};
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
            ? "150px"
            : props.columnQty === 7
            ? "100px"
            : // : props.columnQty === 8 && props.index === 4
            // ? "95px" 客戶訂單列表會有問題
            props.columnQty === 8
            ? "85px"
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
            ? "143px"
            : props.index === 6 || props.index === 7 || props.index === 8
            ? "88px"
            : props.columnQty === 4
            ? "140px"
            : props.columnQty === 7
            ? "87px"
            : // : props.columnQty === 8 || props.index === 4
            // ? "80px" >客戶訂單列表會有問題
            props.columnQty === 8
            ? "73px"
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
    @media ${device.desktop} {
        margin-left: 250px;
    }
`;
const Section = styled.div`
    padding: ${props => (props.mode === "structure" ? "10px 5%" : "20px 5%")};
    width: ${props => (props.mode === "analysis" ? "68vw" : "77vw")};
    margin: auto;
    @media ${device.mobileS} {
        width: ${props => (props.mode === "analysis" ? "68vw" : "95vw")};
    }
    @media ${device.mobileL} {
        width: ${props => (props.mode === "analysis" ? "68vw" : "95vw")};
    }
    @media ${device.tablet} {
        width: ${props =>
            props.mode === "analysis"
                ? "68vw"
                : props.listPosition === "inner"
                ? "60vw"
                : props.collectionName === "products2"
                ? "60vw"
                : props.collectionName === "parts2"
                ? "60vw"
                : props.mode === "structure"
                ? "95%"
                : "95%"};
    }
    @media ${device.laptop} {
        width: ${props =>
            props.mode === "analysis"
                ? "68vw"
                : props.listPosition === "inner"
                ? "77vw"
                : props.collectionName === "products2"
                ? "77vw"
                : props.collectionName === "parts2"
                ? "77vw"
                : props.mode === "structure"
                ? "95%"
                : "95%"};
    }
    @media ${device.desktop} {
        width: ${props =>
            props.mode === "analysis"
                ? "68vw"
                : props.mode === "company"
                ? "90%"
                : "calc(77vw - 250px)"};
        max-width: 1700px;
    }
`;
const Flex = styled.div`
    display: flex;
`;

/* -----------待整理-----------*/
const TdContext = styled.td`
    padding-left: 10px;
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
    margin: 2px 1px;
    height: ${prop => (prop.mode === "list" ? "30px" : "auto")};
    border: 1px solid #bebebe;
    padding: 10px 0px 5px 10px;
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
const DivStyled = styled.div`
    width: 160px;
`;

export {
    device,
    CancelSelectedText,
    ShowTextForButton,
    TrBody,
    StructrueSingleLine,
    StructureForm,
    TextareaStyled,
    Pie,
    AnalysisAssembledContainer,
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
    LabelStyled,
    InputStyled,
    SelectStyled,
    ThText,
    Tr,
    TBody,
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
    SingleLine,
    DataStyled,
    DivStyled,
};
