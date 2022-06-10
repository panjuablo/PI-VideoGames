import { React, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postGame, getGenres } from "../Reducer/actions";
import { ButtonCreted, ButtonRefresh } from "../Styles/buttons";

export default function CreateForm(){
    const dispatch = useDispatch();
    const history = useNavigate();
    const genres = useSelector((state) => state.genres);
    const [input, setInput] = useState({
        name: "",
        released: "",
        rating: "",
        platforms: [],
        image: "",
        genres: [],
        description: "",
    });

    function handleChange(e){
       setInput({
           ...input,
           [e.target.name] : e.target.value
       })
    };

    function handleCheck(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    };

    function handleSelect(e){
        console.log(e.taget.value)
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        console.log(e.target.value)
    }
    
    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postGame(input))
        alert('Successfully created!!!')
        setInput({
            name: '',
            released: '',
            rating: '',
            platforms: [],
            image: '',
            genres: [],
            description: ''
        })
        history(-1)
    }
    
    useEffect(() =>{
        dispatch(getGenres());
    },[dispatch]);

    return (
        <div>
            <Link to='/videogames'>
                <ButtonCreted>← Back</ButtonCreted>
            </Link>
                <h1>Create your Videogame...</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Name:</label>
                        <input type="text" value= {input.name} name="name" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label>Released:</label>
                        <input type="date" value={input.released} name="released" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label>Rating:</label>
                        <input type="number" max="5" min="0" value={input.rating} name="rating" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label>Platforms:</label>
                        <label>PC<input type="checkbox" name="PC" value="PC" onChange={(e) => handleCheck(e)}/></label>
                        <label>PlayStation<input type="checkbox" name="PlayStation" value="PlayStation" onChange={(e) => handleCheck(e)}/></label>
                        <label>Xbox<input type="checkbox" name="Xbox" value="Xbox" onChange={(e) => handleCheck(e)}/></label>
                        <label>Nintendo<input type="checkbox" name="Nintendo" value="Nintendo" onChange={(e) => handleCheck(e)}/></label>
                        <label>Linux<input type="checkbox" name="Linux" value="Linux" onChange={(e) => handleCheck(e)}/></label>
                        <label>Apple Macintosh<input type="checkbox" name="Apple Macintosh" value="Apple Macintosh" onChange={(e) => handleCheck(e)}/></label>
                        <label>Android<input type="checkbox" name="Android" value="Android" onChange={(e) => handleCheck(e)}/></label>
                        <label>iOs<input type="checkbox" name="iOs" value="iOs" onChange={(e) => handleCheck(e)}/></label>
                        <label>Web<input type="checkbox" name="Web" value="Web" onChange={(e) => handleCheck(e)}/></label>
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type="url" value={input.image} name="image" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label>Description:</label>
                        <input type="text" value={input.description} name="description" onChange={(e) => handleChange(e)}/>
                    </div>
                    <select>
                        {genres?.map((e) => {return(
                            <option value={e.name} key={e.id} onChange={(e) => handleSelect(e)}>{e.name}</option>
                        )})}
                    </select>
                    <div>
                        <li>{input.genres.map(e => {return (<ul>{e.name}</ul>)})}</li>
                    </div>
                    <ButtonRefresh type="submit">Create!!!</ButtonRefresh>
                </form>             
        </div>
    )
}