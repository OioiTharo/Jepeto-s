//jepeto\components\button.js
import styled from "styled-components";

const Button = styled.button`
    background-color: #1E88E5;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    white-space: nowrap;
    &:hover {
        opacity: 0.5;
    }
`

export default Button;
