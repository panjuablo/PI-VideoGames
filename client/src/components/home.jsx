import { Link } from "react-router-dom";
import { Fragment, React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, filterGen, filterCreated, orderAlph, orderRating } from "../Reducer/actions";
import Games from "./games"
import Pagin from "./pag"
import SearchN from "./Nav/searchBar";
import { ButtonRefresh, ButtonCreted } from "../Styles/buttons";
import Loading from "./loading";

export default function Home () {
    const dispatch = useDispatch();
    const gamesAll = useSelector((state) => state.allGames);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setPerPage] = useState(15);
    const [Order, setOrder ] = useState('');
    const lastGame = currentPage * gamesPerPage;
    const firstGame = lastGame - gamesPerPage;
    const currentGames = gamesAll.slice(firstGame, lastGame);
    const [loading, setLoading] = useState(true);


    
    function handleClick(e){
        e.preventDefault();
        dispatch(getGames());
    };
    
    function sortAlph(e){
        if (e.target.value !== 'all'){
            dispatch(orderAlph(e.target.value))
            setCurrentPage(1);
            setOrder(`Ordenado ${e.target.value}`)
        } else {
            dispatch(getGames())
        }
    };
    
    function sortRating(e){
        if (e.target.value !== 'all'){
            dispatch(orderRating(e.target.value))
            setCurrentPage(1);
            setOrder(`Ordenado ${e.target.value}`)
        } else {
            dispatch(getGames())
        }
    };
    
    function handleFilterGen(e){
        dispatch(filterGen(e.target.value))
    };
    
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    };
    
    useEffect (() => {
        dispatch(getGames())
    },[dispatch]);
    
    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div>
            <h1>home</h1>
            <SearchN/>
            <Link to="/videogame" ><ButtonCreted>Create Videogame...</ButtonCreted></Link>
            <ButtonRefresh onClick={e => handleClick(e)}>Refresh...</ButtonRefresh>
            <div>
                <select onChange={e => sortAlph(e)}>
                    <option value='all'>Alphabet Order</option>
                    <option value='asc' >A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                <select onChange={e => sortRating(e)}>
                    <option value='all'>Rating Order</option>
                    <option value='desc'>Rating ↓</option>
                    <option value='asc' >Rating ↑</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='all'>All games</option>
                    <option value='created' >Created</option>
                    <option value='api'>Existing</option>
                </select>
                <select onChange={e => handleFilterGen(e)}>
                    <option value='dataBase' >All genres</option>
                    <option value='Action'>Action</option>
                    <option value='Indie' >Indie</option>
                    <option value='RPG'>RPG</option>
                    <option value='Adventure' >Adventure</option>
                    <option value='Strategy'>Strategy</option>
                    <option value='Shooter'>Shooter</option>
                    <option value='Casual' >Casual</option>
                    <option value='Simulation' >Simulation</option>
                    <option value='Puzzle'>Puzzle</option>
                    <option value='Arcade' >Arcade</option>
                    <option value='Platformer'>Platformer</option>
                    <option value='Racing' >Racing</option>
                    <option value='Massively Multiplayer'>Massively Multiplayer</option>
                    <option value='Sports' >Sports</option>
                    <option value='Fighting'>Fighting</option>
                    <option value='Family' >Family</option>
                    <option value='Board Games'>Board Games</option>
                    <option value='Educational' >Educational</option>
                    <option value='Card'>Card</option>
                </select>  
                <Pagin 
                    gamesPerPage = {gamesPerPage}
                    gamesAll = {gamesAll.length}
                    paginated = {paginated}  
                />
               {gamesAll.length === 0? <p>(<Loading setLoading={setLoading}/>)</p>
                    : currentGames?.map((e) => {
                    return (
                       <Fragment key={e.id}>
                            <Games name={e.name} id={e.id} genres={e.genres} image={e.image} createdInDb={e.createdInDb}/>
                        </Fragment>
                    )
               })
               } 
            </div>
        </div>
    ) 
}