import styled from "styled-components";

export const Container = styled.div`
    min-width: 510px;
    width: 100%;
    height: 70px;
    background: #20295f;
    border-bottom: 5px solid #ee6b26;

    display: flex;

    button {
        background: none;
        border: none;
        cursor: pointer;

        &:hover {
            opacity: 0.5;
        }
    }
`;

export const LeftSide = styled.div`
    width: 50%;
    height: 70px;
    display: flex;
    align-items: center;
    padding-left: 10px;

    img {
        width: 100px;
        height: 40px;
    }
`;

export const RightSide = styled.div`
    width: 50%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    a,
    button {
        color: #fff;
        font-weight: bold;
        text-decoration: none;
        margin: 0 10px;

        &:hover {
            color: #ee6b26;
        }

        img {
            width: 25px;
            height: 30px;
        }

        span {
            background: #fff;
            color: #ee6b26;
            padding: 3px 7px;
            border-radius: 50%;
            position: relative;
            top: -20px;
            right: 10px;
        }
    }

    .dividir::after {
        content: "|";
        margin: 0 10px;
        color: #fff;
    }

    button {
        font-size: 16px;
    }
`;
