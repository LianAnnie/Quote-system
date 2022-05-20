import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CallToActionIcon from "@mui/icons-material/CallToAction";
import PublicIcon from "@mui/icons-material/Public";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import HandshakeIcon from "@mui/icons-material/Handshake";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import LogoutIcon from "@mui/icons-material/Logout";
import PropTypes from "prop-types";
import { device } from "./StyleComponent";
import Logo from "./Logo";

const Orange = styled.div`
    width: ${props => (props.shownavbar === 1 ? "250px" : "100vw")};
    height: ${props => (props.shownavbar === 1 ? "100vh" : "68px")};
    display: ${props => (props.shownavbar === 1 ? "flex" : "block")};
    padding: ${props => (props.shownavbar === 1 ? "50px 40px" : "16px 0px")};
    justify-content: space-between;
    text-align: left;
    color: #000;
    background-color: #c4d6b0;
    position: fixed;
    z-index: 99;
    @media ${device.mobileS} {
        padding: ${props =>
            props.shownavbar === 1 ? "20px 20px" : "16px 0px"};
        width: ${props => (props.shownavbar === 1 ? "200px" : "100vw")};
    }
    @media ${device.mobileL} {
        padding: ${props =>
            props.shownavbar === 1 ? "20px 20px" : "16px 0px"};
        width: ${props => (props.shownavbar === 1 ? "200px" : "100vw")};
    }
    @media ${device.tablet} {
        padding: ${props =>
            props.shownavbar === 1 ? "50px 40px" : "16px 0px"};
        width: ${props => (props.shownavbar === 1 ? "250px" : "100vw")};
    }
    @media ${device.desktop} {
        width: 250px;
        height: 100vw;
        padding: 50px 40px;
    }
`;
const Burger = styled(MenuIcon)`
    display: flex;
    margin: 6px 20px 6px 10px;
    width: 20px;
    cursor: pointer;
`;
const Header = styled.div`
    display: ${props => (props.shownavbar === 1 ? "block" : "flex")};
    @media ${device.desktop} {
        display: block;
    }
`;
const Title = styled.div`
    display: ${props => (props.shownavbar === 1 ? "block" : "flex")};
`;
const Design = styled.div`
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    @media ${device.desktop} {
        padding-left: ${props => (props.shownavbar === 1 ? "20px" : "0px")};
    }
`;
const HideMobile = styled.nav`
    display: ${props => (props.shownavbar === 1 ? "block" : "none")};
    padding: 20px;
    @media ${device.desktop} {
        margin-top: 40px;
        font-weight 500;
        font-size: 18px;
        line-height 27px;
        display:block
    }
`;
const NavbarStyled = styled.div`
    padding: ${props => (props.shownavbar === 1 ? "20px" : "0px")};
    display: ${props => (props.shownavbar === 1 ? "block" : "flex")};
    margin-left: ${props => (props.shownavbar === 1 ? "0px" : "50px")};
    @media ${device.mobileS} {
        display: ${props => (props.shownavbar === 1 ? "block" : "none")};
    }
    @media ${device.mobileL} {
        display: ${props => (props.shownavbar === 1 ? "block" : "none")};
    }
    @media ${device.tablet} {
        padding: ${props => (props.shownavbar === 1 ? "20px" : "0px")};
        display: ${props => (props.shownavbar === 1 ? "block" : "flex")};
        margin-left: ${props => (props.shownavbar === 1 ? "0px" : "50px")};
    }
    @media ${device.desktop} {
        padding: 20px;
        display: block;
        margin-left: 0px;
    }
`;
const LogoutLinkStyled = styled.div`
    cursor: pointer;
    margin-top: 24px;
    transition: 0.5s;
    padding: 10px;
    :hover {
        background-color: #fefae2;
        border-radius: 10px;
    }
    @media ${device.mobileS} {
        margin-top: 10px;
        padding: 1px;
        font-size: 10px;
    }
    @media ${device.mobileL} {
        margin-top: 10px;
        padding: 1px;
        font-size: 10px;
    }
`;
const NavLinkStyled = styled(NavLink)`
    margin-top: ${props => (props.shownavbar === 1 ? "24px" : "8px")};
    padding: 2px;
    display: flex;
    transition: 0.5s;
    border-radius: 5px;
    @media ${device.mobileS} {
        margin-top: ${props => (props.shownavbar === 1 ? "10px" : "0px")};
    }
    @media ${device.mobileL} {
        margin-top: ${props => (props.shownavbar === 1 ? "10px" : "0px")};
    }
`;
const Close = styled(CloseIcon)`
    display: flex;
    position: absolute;
    top: 27px;
    left: 200px;
    cursor: pointer;
    p @media ${device.mobileS} {
        top: 10px;
        left: 165px;
    }
    @media ${device.mobileL} {
        top: 10px;
        left: 165px;
    }
    @media ${device.tablet} {
        top: 27px;
        left: 200px;
    }
    @media ${device.desktop} {
        display: none;
    }
`;
const Black = styled.div`
    color: #000;
    margin: 0px 10px;
    @media ${device.desktop} {
        display: flex;
    }
`;
const HideBlack = styled.div`
    display: ${props => (props.shownavbar === 1 ? "flex" : "none")};
    color: #000;
    margin: 0px 5px;
    @media ${device.desktop} {
        display: flex;
    }
`;
const Flex = styled.div`
    align-items: center;
    display: flex;
`;
const Hide = styled.div`
    display: block;
    @media ${device.desktop} {
        display: none;
    }
`;
const Cover = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 98;
`;
const ActiveDiv = styled.div`
    transition: 0.5s;
    width: ${props => (props.shownavbar === 1 ? "130px" : "")};
    display: flex;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: ${props =>
        props.shownavbar === 1 ? "0px" : "10px"};
    border-bottom-right-radius: ${props =>
        props.shownavbar === 1 ? "0px" : "10px"};
    padding: 5px;
    align-items: center;
    transform: ${props =>
        props.shownavbar === 1 && props.active ? "translateX(58px)" : ""};
    background-color: ${props => (props.active ? "#fefae2" : "")};
    :hover {
        background-color: #fefae2;
        border-radius: 10px;
    }
    @media ${device.mobileS} {
        padding: 1px;
        font-size: 10px;
        margin-bottom: ${props => (props.shownavbar === 1 ? "0px" : "5px")};
        transform: ${props =>
            props.shownavbar === 1 && props.active ? "translateX(38px)" : ""};
        width: ${props => (props.shownavbar === 1 ? "120px" : "")};
    }
    @media ${device.mobileL} {
        padding: 1px;
        font-size: 10px;
        margin-bottom: ${props => (props.shownavbar === 1 ? "0px" : "5px")};
        transform: ${props =>
            props.shownavbar === 1 && props.active ? "translateX(38px)" : ""};
        width: ${props => (props.shownavbar === 1 ? "120px" : "")};
    }
    @media ${device.tablet} {
        padding: ${props => (props.shownavbar === 1 ? "1px" : "5px")};
        margin-bottom: ${props => (props.shownavbar === 1 ? "0px" : "5px")};
        transform: ${props =>
            props.shownavbar === 1 && props.active ? "translateX(58px)" : ""};
        width: ${props => (props.shownavbar === 1 ? "130px" : "")};
    }
    @media ${device.desktop} {
        margin-bottom: 5px;
    }
`;

function SideBar({ signOut }) {
    const [showNavBar, setShowNavBar] = useState(0);

    const linkArray = [
        ["/", CallToActionIcon, "待辦通知"],
        ["/overview", PublicIcon, "銷售概覽"],
        ["/company", BusinessIcon, "客戶廠商"],
        ["/bom", CategoryIcon, "產品零件"],
        ["/quote", RequestQuoteIcon, "報價表單"],
        ["/order", HandshakeIcon, "訂單資料"],
        ["/analysis", InsertChartIcon, "成本分析"],
    ];

    const options = {
        scale: 1.2,
        speed: 1000,
        max: 30,
    };

    return (
        <>
            <Orange shownavbar={showNavBar}>
                <Header shownavbar={showNavBar}>
                    <NavLink style={{ textDecoration: "none" }} to="/">
                        <Logo shownavbar={showNavBar} options={options} />
                    </NavLink>
                    <Title>
                        {!showNavBar && (
                            <Hide>
                                <Burger onClick={() => setShowNavBar(1)} />
                            </Hide>
                        )}
                        <Design>Quote System</Design>
                    </Title>
                    <NavbarStyled shownavbar={showNavBar}>
                        {linkArray.map(([path, Component, title], index) => (
                            <NavLinkStyled
                                shownavbar={showNavBar}
                                key={index}
                                style={{ textDecoration: "none" }}
                                to={path}
                            >
                                {({ isActive }) => (
                                    <ActiveDiv
                                        shownavbar={showNavBar}
                                        active={isActive}
                                    >
                                        <Black>
                                            <Component />
                                        </Black>
                                        <HideBlack shownavbar={showNavBar}>
                                            {title}
                                        </HideBlack>
                                    </ActiveDiv>
                                )}
                            </NavLinkStyled>
                        ))}
                    </NavbarStyled>
                    <HideMobile shownavbar={showNavBar}>
                        <LogoutLinkStyled>
                            <Flex>
                                <Black>
                                    <LogoutIcon />
                                </Black>
                                <Black onClick={() => signOut()}>登出</Black>
                            </Flex>
                        </LogoutLinkStyled>
                    </HideMobile>
                </Header>
                {showNavBar === 1 && <Close onClick={() => setShowNavBar(0)} />}
            </Orange>
            {showNavBar === 1 && (
                <Cover
                    shownavbar={showNavBar}
                    onClick={() => setShowNavBar(0)}
                />
            )}
            <Outlet />
        </>
    );
}

SideBar.propTypes = {
    signOut: PropTypes.func,
};

export default SideBar;
