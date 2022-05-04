import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { device } from "./StyleComponent";
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

const Orange = styled.div`
    width: ${props => (props.showNavBar ? "300px" : "100vw")};
    height: ${props => (props.showNavBar ? "100vh" : "68px")};
    display: ${props => (props.showNavBar ? "flex" : "block")};
    padding: ${props => (props.showNavBar ? "100px 40px" : "16px 0px")};
    justify-content: space-between;
    text-align: left;
    color: #000;
    background-color: #c4d6b0;
    position: fixed;
    z-index: 99;
    @media ${device.mobileS} {
        padding: ${props => (props.showNavBar ? "20px 40px" : "16px 0px")};
    }
    @media ${device.mobileL} {
        padding: ${props => (props.showNavBar ? "30px 40px" : "16px 0px")};
    }
    @media ${device.tablet} {
        padding: ${props => (props.showNavBar ? "50px 40px" : "16px 0px")};
    }
    @media ${device.desktop} {
        padding: ${props => (props.showNavBar ? "100px 40px" : "16px 0px")};
        width: 300px;
        height: 100vh;
        padding: 100px 48px;
        .css-i4bv87-MuiSvgIcon-root {
            display: none;
        }
    }
`;

const Burger = styled(MenuIcon)`
    display: flex;
    margin: 6px 20px 6px 10px;
    width: 20px;

    @media ${device.desktop} {
        .css-i4bv87-MuiSvgIcon-root {
            display: none;
        }
    }
`;

const Header = styled.div`
    display: ${props => (props.showNavBar ? "block" : "flex")};
    @media ${device.desktop} {
        display: block;
    }
`;

const Title = styled.div`
    display: ${props => (props.showNavBar ? "block" : "flex")};
`;

const Design = styled.div`
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
`;
const HideMobile = styled.nav`
    display: ${props => (props.showNavBar ? "block" : "none")};
    padding: 20px;
    @media ${device.desktop} {
        margin-top: 40px;
        font-weight 500;
        font-size: 18px;
        line-height 27px;
        display:block
    }
`;
const Logo = styled.img`
    width: ${props => (props.showNavBar ? "60%" : "80px")};
    padding: ${props => (props.showNavBar ? "20px" : "0px 20px")};
    @media ${device.desktop} {
        width: 80%;
    }
`;

const NavbarStyled = styled.div`
    margin-top: 24px;
`;

const NavLinkStyled = styled(NavLink)`
    display: flex;
`;

const Close = styled(CloseIcon)`
    display: flex;
    position: absolute;
    top: 27px;
    left: 254px;
    @media ${device.desktop} {
        display: none;
    }
`;
const Black = styled.div`
    color: #000;
    margin: 0px 5px;
    @media ${device.laptopL} {
        display: flex;
    }
    @media ${device.desktop} {
        .css-i4bv87-MuiSvgIcon-root {
            display: flex;
        }
    }
`;

const Flex = styled.div`
    display: flex;
`;

function SideBar({ signOut }) {
    const [showNavBar, setShowNavBar] = useState(false);

    return (
        <Orange showNavBar={showNavBar}>
            <Header showNavBar={showNavBar}>
                <Logo
                    showNavBar={showNavBar}
                    src={require("../images/log.png")}
                />
                <Title>
                    {!showNavBar && (
                        <Burger onClick={() => setShowNavBar(true)} />
                    )}
                    <Design>Quote System</Design>
                </Title>

                <HideMobile showNavBar={showNavBar}>
                    <NavbarStyled>
                        <NavLinkStyled
                            style={{ textDecoration: "none" }}
                            to="/"
                        >
                            <Black>
                                <CallToActionIcon />
                            </Black>
                            <Black>待辦通知</Black>
                        </NavLinkStyled>
                    </NavbarStyled>
                    <NavbarStyled>
                        <NavLinkStyled
                            style={{ textDecoration: "none" }}
                            to="/overview"
                        >
                            <Black>
                                <PublicIcon />
                            </Black>
                            <Black>銷售概覽</Black>
                        </NavLinkStyled>
                    </NavbarStyled>
                    <NavbarStyled>
                        <NavLinkStyled
                            style={{ textDecoration: "none" }}
                            to="/company"
                        >
                            <Black>
                                <BusinessIcon />
                            </Black>
                            <Black>客戶廠商</Black>
                        </NavLinkStyled>
                    </NavbarStyled>
                    <NavbarStyled>
                        <NavLinkStyled
                            style={{ textDecoration: "none" }}
                            to="/bom"
                        >
                            <Black>
                                <CategoryIcon />
                            </Black>
                            <Black>產品零件</Black>
                        </NavLinkStyled>
                    </NavbarStyled>
                    <NavbarStyled>
                        <NavLinkStyled
                            style={{ textDecoration: "none" }}
                            to="/quote"
                        >
                            <Black>
                                <RequestQuoteIcon />
                            </Black>
                            <Black>報價表單</Black>
                        </NavLinkStyled>
                    </NavbarStyled>
                    <NavbarStyled>
                        <NavLinkStyled
                            style={{ textDecoration: "none" }}
                            to="/order"
                        >
                            <Black>
                                <HandshakeIcon />
                            </Black>
                            <Black>訂單資料</Black>
                        </NavLinkStyled>
                    </NavbarStyled>
                    <NavbarStyled>
                        <NavLinkStyled
                            style={{ textDecoration: "none" }}
                            to="/analysis"
                        >
                            <Black>
                                <InsertChartIcon />
                            </Black>
                            <Black>成本分析</Black>
                        </NavLinkStyled>
                    </NavbarStyled>
                    <NavbarStyled>
                        <Flex>
                            <Black>
                                <LogoutIcon />
                            </Black>
                            <Black onClick={() => signOut()}>登出</Black>
                        </Flex>
                    </NavbarStyled>
                </HideMobile>
            </Header>
            {showNavBar && <Close onClick={() => setShowNavBar(false)} />}
        </Orange>
    );
}

export default SideBar;
