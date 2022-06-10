import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../../Reducer/actions";

export default function SearchN (){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    function handleInput(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchName(name))
    }

    return (
        <div>
            <input 
            type='text'
            placeholder="Search..."
            onChange={(e) => handleInput(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}
