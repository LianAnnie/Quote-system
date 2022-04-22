import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Orange = styled.div`
    position: fixed;
    text-align: left;
    color: #fff;
    background-color: #4236f4;
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

const White = styled.div`
    color: white;
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

function SideBar() {
    const [showNavBar, setShowNavBar] = useState(false);

    return (
        <Orange showNavBar={showNavBar}>
            <Header showNavBar={showNavBar}>
                <Title>
                    {!showNavBar && (
                        <Burger onClick={() => setShowNavBar(true)}>≡</Burger>
                    )}
                    <Design>ERP System</Design>
                </Title>
                <HideMobile showNavBar={showNavBar}>
                    <Navbar>
                        <NavLink to="/admin">
                            <White>功能測試</White>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink to="/">
                            <White>待辦通知</White>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink to="/overview">
                            <White>銷售概覽</White>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink to="/bom">
                            <White>客戶產品</White>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink to="/parts">
                            <White>廠商訊息</White>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink to="/quote">
                            <White>報價表單</White>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink to="/order">
                            <White>訂單資料</White>
                        </NavLink>
                    </Navbar>
                    {/* <Navbar>
                        <NavLink to="/admin">
                            <White>採購表單</White>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink to="/admin">
                            <White>出貨發票</White>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink to="/admin">
                            <White>庫存進銷</White>
                        </NavLink>
                    </Navbar> */}
                    <Navbar>
                        <NavLink to="/analysis">
                            <White>成本分析</White>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink to="/analysis2">
                            <White>成本分析2</White>
                        </NavLink>
                    </Navbar>
                    <Navbar>
                        <NavLink to="/login">
                            <White>登出</White>
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
