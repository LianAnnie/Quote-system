import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import styled from "styled-components";
import { device } from "./StyleComponent";

const LogoImage = styled.div`
    background-size: contain;
    background-repeat: no-repeat;
    width: ${props => (props.showNavBar ? "80%" : "40px")};
    height: ${props => (props.showNavBar ? "20%" : "40px")};
    padding: ${props => (props.showNavBar ? "20px" : "0px 20px")};
    margin: ${props => (props.showNavBar ? "10px" : "0px 0px 0px 10px ")};
    background-image: url(${require("../images/log.png")});
    filter: drop-shadow(0 30px 30px rgba(0, 0, 0, 0.2));
    @media ${device.desktop} {
        width: 80%;
        height: 200px;
    }
`;

function Logo(props) {
    const { options, ...rest } = props;
    const tilt = useRef(null);

    useEffect(() => {
        VanillaTilt.init(tilt.current, options);
    }, [options]);

    return <LogoImage ref={tilt} {...rest} />;
}

export default Logo;
