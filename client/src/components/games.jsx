import React from "react";
import { Link } from "react-router-dom";
import { ButtonCreted } from "../Styles/buttons";

export default function Games({name, id, genres, image, createdInDb}){
    return (
        <div>
            <Link to = {`/videogames/${id}`}>
                <ButtonCreted>More</ButtonCreted>
            </Link>
            <h3>{name}</h3>
            <h4>{createdInDb === true ? genres.map(e => e.name) : genres}</h4>
            <img src={image} alt="Img not found" width="270px" height="200px" />
        </div>
    )
}   