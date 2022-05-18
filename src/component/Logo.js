import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import styled from "styled-components";
import { device } from "./StyleComponent";
import PropTypes from "prop-types";

const LogoImage = styled.div`
    background-size: contain;
    background-repeat: no-repeat;
    width: ${props => (props.showNavBar ? "80%" : "40px")};
    height: ${props => (props.showNavBar ? "20%" : "40px")};
    padding: ${props => (props.showNavBar ? "20px" : "0px 20px")};
    margin: ${props => (props.showNavBar ? "10px" : "0px 0px 0px 10px ")};
    background-image: url(${require("../images/log.png")});
    filter: drop-shadow(0 30px 30px rgba(0, 0, 0, 0.2));
    @media ${device.mobileS} {
        width: ${props => (props.showNavBar ? "50%" : "40px")};
        margin: ${props =>
            props.showNavBar ? "10px 10px 10px 25px" : "0px 0px 0px 10px "};
    }
    @media ${device.mobileL} {
        width: ${props => (props.showNavBar ? "65%" : "40px")};
        margin: ${props =>
            props.showNavBar ? "10px 10px 10px 25px" : "0px 0px 0px 10px "};
    }
    @media ${device.tablet} {
        width: ${props => (props.showNavBar ? "80%" : "40px")};
        margin: ${props =>
            props.showNavBar ? "10px 10px 10px 25px" : "0px 0px 0px 10px "};
    }
    @media ${device.desktop} {
        width: 80%;
        height: ${props => (props.showNavBar ? "100px" : "180px")};
    }
`;

function Logo({ options, showNavBar, ...rest }) {
    const tilt = useRef(null);

    useEffect(() => {
        VanillaTilt.init(tilt.current, options);
    }, [options]);

    return <LogoImage showNavBar={showNavBar} ref={tilt} {...rest} />;
}

Logo.propTypes = {
    showNavBar: PropTypes.bool,
};

export default Logo;
