import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { LandingStyle, H1 } from "../Styles/styles";
import { ButtonGo } from "../Styles/buttons"


export default class Landing extends Component{
    render(){
        return (
            <LandingStyle>
                <H1>Videogames!!!</H1>
                    <Link to = "/videogames">
                        <ButtonGo>All Videogames!!!</ButtonGo>
                    </Link>
            </LandingStyle>
        );
    };
};