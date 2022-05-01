import styled from "styled-components";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import ClearIcon from "@mui/icons-material/Clear";
import DeselectIcon from "@mui/icons-material/Deselect";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EditOffIcon from "@mui/icons-material/EditOff";

const size = {
    mobile: "320px",
    tablet: "768px",
    laptop: "1024px",
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
    padding: 100px 10%;
    @media ${device.desktop} {
        margin-left: 200px;
    }
`;
const Section = styled.div`
    padding: 20px 5%;
`;
const Title = styled.div`
    margin-bottom: 20px;
    font-size: 20px;
`;
const Form = styled.div`
    border: solid 1px #000000;
    border-radius: 10px;
    padding: 20px 5%;
    width: 100%;
    background-color: #fff;
`;
const Table = styled.table`
    border: solid 1px #000000;
    border-radius: 10px;
    padding: 20px 5%;
    width: 100%;
    background-color: #fff;
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
        display: ${props =>
            props.index === 0 || props.index === 1 || props.index === 2
                ? "table-cell"
                : "none"};
    }
    @media ${device.laptopL} {
        display: ${props =>
            props.index === 0 ||
            props.index === 1 ||
            props.index === 2 ||
            props.index === 3 ||
            props.index === 4 ||
            props.index === 5
                ? "table-cell"
                : "none"};
    }
    @media ${device.desktop} {
        display: ${props =>
            props.index === 0 ||
            props.index === 1 ||
            props.index === 2 ||
            props.index === 3 ||
            props.index === 4 ||
            props.index === 5 ||
            props.index === 6
                ? "table-cell"
                : "none"};
    }
    @media ${device.desktopL} {
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
        display: ${props =>
            props.index === 0 || props.index === 1 || props.index === 2
                ? "table-cell"
                : "none"};
    }
    @media ${device.laptopL} {
        display: ${props =>
            props.index === 0 ||
            props.index === 1 ||
            props.index === 2 ||
            props.index === 3 ||
            props.index === 4 ||
            props.index === 5
                ? "table-cell"
                : "none"};
    }
    @media ${device.desktop} {
        display: ${props =>
            props.index === 0 ||
            props.index === 1 ||
            props.index === 2 ||
            props.index === 3 ||
            props.index === 4 ||
            props.index === 5 ||
            props.index === 6
                ? "table-cell"
                : "none"};
    }
    @media ${device.desktopL} {
        display: table-cell;
    }
`;
const Button = styled.div`
    border: solid 1px #000000;
    width: 100px;
    margin: 5px;
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

const Flex = styled.div`
    display: flex;
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
    Th,
    Td,
    Button,
    Flex,
    AddButton,
    UpdatedButton,
    DeleteButton,
    SaveButton,
    CancelEditButton,
    CancelSelectedButton,
    ThTitle,
    TdContext,
};
