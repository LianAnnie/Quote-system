import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import styled from "styled-components";
import PropTypes from "prop-types";
import { device } from "./StyleComponent";

const LogoImage = styled.div`
    background-size: contain;
    background-repeat: no-repeat;
    width: ${props => (props.shownavbar === 1 ? "80%" : "40px")};
    height: ${props => (props.shownavbar === 1 ? "20%" : "40px")};
    padding: ${props => (props.shownavbar === 1 ? "20px" : "0px 20px")};
    margin: ${props => (props.shownavbar === 1 ? "10px" : "0px 0px 0px 10px ")};
    background-image: url(${require("../images/logo.png")});
    filter: drop-shadow(0 30px 30px rgba(0, 0, 0, 0.2));
    @media ${device.mobileS} {
        width: ${props => (props.shownavbar === 1 ? "50%" : "40px")};
        margin: ${props =>
            props.shownavbar === 1
                ? "10px 10px 10px 25px"
                : "0px 0px 0px 10px "};
    }
    @media ${device.mobileL} {
        width: ${props => (props.shownavbar === 1 ? "65%" : "40px")};
        margin: ${props =>
            props.shownavbar === 1
                ? "10px 10px 10px 25px"
                : "0px 0px 0px 10px "};
    }
    @media ${device.tablet} {
        width: ${props => (props.shownavbar === 1 ? "80%" : "40px")};
        margin: ${props =>
            props.shownavbar === 1
                ? "10px 10px 10px 25px"
                : "0px 0px 0px 10px "};
    }
    @media ${device.desktop} {
        width: 80%;
        height: ${props => (props.shownavbar === 1 ? "100px" : "180px")};
    }
`;

function Logo({ options, shownavbar, ...rest }) {
    const tilt = useRef(null);

    useEffect(() => {
        VanillaTilt.init(tilt.current, options);
    }, [options]);

    return <LogoImage shownavbar={shownavbar} ref={tilt} {...rest} />;
}

Logo.propTypes = {
    shownavbar: PropTypes.number,
    options: PropTypes.object.isRequired,
};

export default Logo;
