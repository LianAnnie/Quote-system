import styled, { keyframes } from "styled-components";
import { Container } from "./StyleComponent";

const Article = styled.div`
    padding-top: 20vh;
    width: 80%;
    margin: auto;
`;
const SkRotate = keyframes`
    100% { transform: rotate(360deg)}
`;
const skBounce = keyframes`
    0%, 100% { 
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
    } 
    50% { 
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
    }
`;
const Spinner = styled.div`
    margin: 100px auto;
    width: 100px;
    height: 100px;
    position: relative;
    text-align: center;
    -webkit-animation: ${SkRotate} 2s infinite linear;
    animation: ${SkRotate} 2s infinite linear;
`;
const Dot1 = styled.div`
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: #8a9b77;
    border-radius: 100%;
    -webkit-animation: ${skBounce} 2s infinite ease-in-out;
    animation: ${skBounce} 2s infinite ease-in-out;
`;
const Dot2 = styled.div`
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: #8a9b77;
    border-radius: 100%;
    -webkit-animation: ${skBounce} 2s infinite ease-in-out;
    animation: ${skBounce} 2s infinite ease-in-out;
    top: auto;
    bottom: 0;
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
`;

function Loading() {
    return (
        <Container>
            <Article>
                <Spinner>
                    <Dot1 />
                    <Dot2 />
                </Spinner>
            </Article>
        </Container>
    );
}

export default Loading;
