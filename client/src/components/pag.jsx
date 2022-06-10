import React from "react";
import { Lista } from "../Styles/styles";

export default function Pagin({ gamesAll, gamesPerPage, paginated }){
    const numPage = [];

    for(let i=0; i<Math.ceil(gamesAll/gamesPerPage); i++){
        numPage.push(i+1)
    };

    return (
        <nav>
            <button className="paginated">
                { numPage && numPage.map(num => (
                    <Lista className="num" key={num}>
                        <a onClick={() => paginated(num)}>{num}</a>
                    </Lista>
                ))}
            </button>
        </nav>
    )

}