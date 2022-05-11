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
import { Outlet } from "react-router-dom";
import VanillaTilt from "vanilla-tilt";
import Logo from "./Logo";

const Orange = styled.div`
    width: ${props => (props.showNavBar ? "250px" : "100vw")};
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
    @media ${device.desktop} {
        padding-left: 20px;
    }
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
const NavbarStyled = styled.div`
    margin-top: 24px;
    transition: 0.2s;
    :hover {
        transform: scale(1.1);
    }
`;
const NavLinkStyled = styled(NavLink)`
    display: flex;
    transition: 0.2s;
    :hover {
        transform: scale(1.1);
    }
`;
const Close = styled(CloseIcon)`
    display: flex;
    position: absolute;
    top: 27px;
    left: 200px;
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
const Hide = styled.div`
    display: block;
    @media ${device.desktop} {
        display: none;
    }
`;

const NavInfoIcon = styled(CallToActionIcon)``;

function SideBar({ signOut }) {
    const [showNavBar, setShowNavBar] = useState(false);

    const linkArray = [
        ["/", <NavInfoIcon styled={{ transition: "2s" }} />, "待辦通知"],
        ["/overview", <PublicIcon />, "銷售概覽"],
        ["/company", <BusinessIcon />, "客戶廠商"],
        ["/bom", <CategoryIcon />, "產品零件"],
        ["/quote", <RequestQuoteIcon />, "報價表單"],
        ["/order", <HandshakeIcon />, "訂單資料"],
        ["/analysis", <InsertChartIcon />, "成本分析"],
    ];

    const options = {
        scale: 1.2,
        speed: 1000,
        max: 30,
    };

    return (
        <>
            <Orange showNavBar={showNavBar}>
                <Header showNavBar={showNavBar}>
                    <Logo showNavBar={showNavBar} options={options} />
                    <Title>
                        {!showNavBar && (
                            <Hide>
                                <Burger onClick={() => setShowNavBar(true)} />
                            </Hide>
                        )}
                        <Design>Quote System</Design>
                    </Title>

                    <HideMobile showNavBar={showNavBar}>
                        {linkArray.map((e, index) => (
                            <NavbarStyled key={index}>
                                <NavLinkStyled
                                    style={{ textDecoration: "none" }}
                                    to={e[0]}
                                >
                                    <Black>{e[1]}</Black>
                                    <Black>{e[2]}</Black>
                                </NavLinkStyled>
                            </NavbarStyled>
                        ))}
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
            <Outlet />
        </>
    );
}

export default SideBar;
