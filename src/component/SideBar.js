import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Orange = styled.div`
    position: fixed;
    text-align: left;
    color: #000;
    background-color: #c4d6b0;
    width: 300px;
    height: 100vh;
    padding: 94px 48px;
    @media screen and (max-width: 991px) {
        width: ${props => (props.showNavBar ? "300px" : "100vw")};
        height: ${props => (props.showNavBar ? "100vh" : "68px")};
        display: ${props => (props.showNavBar ? "flex" : "block")};
        padding: ${props =>
            props.showNavBar ? "72px 0px 0px 16px" : "16px 0px"};
        justify-content: space-between;
    }
`;

const Burger = styled.div`
    display: none;
    @media screen and (max-width: 991px) {
        display: flex;
        margin: 10px 32px;
    }
`;

const Header = styled.div`
    @media screen and (max-width: 991px) {
        display: ${props => (props.showNavBar ? "block" : "flex")};
    }
`;

const Title = styled.div`
    display: flex;
`;

const Design = styled.div`
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
`;
const HideMobile = styled.nav`
    margin-top: 94px;
    font-weight 500;
    font-size: 18px;
    line-height 27px;
    @media screen and (max-width: 991px) {
        display: ${props => (props.showNavBar ? "block" : "none")}
    }
`;

const Navbar = styled.div`
    margin-top: 24px;
`;

const Close = styled.div`
    display: none;
    @media screen and (max-width: 991px) {
        display: flex;
        position: absolute;
        top: 27px;
        left: 254px;
    }
`;
const Black = styled.div`
    color: #000;
`;

function SideBar() {
    const [showNavBar, setShowNavBar] = useState(false);

    return (
        <Orange showNavBar={showNavBar}>
            <Header showNavBar={showNavBar}>
                <Title>
                    {!showNavBar && (
                        <Burger onClick={() => setShowNavBar(true)}>≡</Burger>
                    )}
                    <Design>Quote System</Design>
                </Title>
                <HideMobile showNavBar={showNavBar}>
                    <Navbar>
                        <NavLink style={{ textDecoration: "none" }} to="/">
                            <Black>待辦通知</Black>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink
                            style={{ textDecoration: "none" }}
                            to="/overview"
                        >
                            <Black>銷售概覽</Black>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink
                            style={{ textDecoration: "none" }}
                            to="/company"
                        >
                            <Black>客戶廠商</Black>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink style={{ textDecoration: "none" }} to="/bom">
                            <Black>產品零件</Black>
                        </NavLink>
                    </Navbar>
                    {/* <Navbar>
                        <NavLink to="/bom">
                            <White>客戶產品</White>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink to="/parts">
                            <White>廠商訊息</White>
                        </NavLink>
                    </Navbar> */}
                    <Navbar>
                        <NavLink to="/quote">
                            <Black>報價表單</Black>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink to="/order">
                            <Black>訂單資料</Black>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink to="/analysis">
                            <Black>成本分析</Black>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink style={{ textDecoration: "none" }} to="/login">
                            <Black>登出</Black>
                        </NavLink>
                    </Navbar>
                </HideMobile>
            </Header>
            {showNavBar && (
                <Close onClick={() => setShowNavBar(false)}>X</Close>
            )}
        </Orange>
    );
}

export default SideBar;
