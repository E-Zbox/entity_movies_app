// react
import React from "react";

// styles
import { Container, Image } from "../styles/Header.jsx";

const Header = ({ imageUrl }) => (
    <Container>
        <Image source={imageUrl} />
    </Container>
);

export default Header;
