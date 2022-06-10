import {React, useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import{useDispatch, useSelector} from 'react-redux';
import { getDetails, setDetail } from '../Reducer/actions';
import { ButtonCreted } from '../Styles/buttons';
import Loading from './loading';

export default function Details(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const detail = useSelector((state)=> state.detail);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        dispatch(getDetails(id))
        return () => {dispatch(setDetail())}
    },[dispatch,id])
    
    
    return (
        <div>{ loading === true? (<Loading setLoading={setLoading}/>) :
            <div>
                <Link to='/videogames'>
                <ButtonCreted>BACK</ButtonCreted>
                </Link>
                <h2>Name: {detail.name}</h2>
                <h3>ID: {detail.id}</h3>
                <div className='imgcont'>
                <img src={detail.image} alt=''/>
                </div>
                <p>Genres: {detail.createdInDb?detail.genres.map(e => e.name).join(', '): detail.genres + ''}</p>
                <p>Description: {detail.description}</p>
                <p>Released: {detail.released}</p>
                <p>Rating: {detail.rating}</p>
                <p>Platforms: {detail.platforms + ''}</p>
            </div>}
        </div>
    )
}