import axios from 'axios';
import {
    FILTER_CREATED, FILTER_GEN, FILTER_SEARCH,
    ORDER_ALPH, ORDER_RATING, SET_DETAILS,
    API_GAMES, API_NAME, API_GENRES, API_POST, API_ID,
    GET_GAMES,  GET_GENRES, GET_DETAILS } from '../components/constants';


export function getGames() {
    return async function(dispatch){
        const games = await axios.get(API_GAMES);
        return dispatch ({
            type: GET_GAMES,
            payload: games.data,
        });
    };
};

export function getGenres(){
    return async function(dispatch){
        const genres = await axios.get(API_GENRES);
        return dispatch({
            type: GET_GENRES,
            payload: genres.data
        });
    };
};

export function postGame(payload){
    return async function(dispatch){
        const post = await axios.post(API_POST, payload);
        console.log(post);
        return post;
    }
};

export function filterGen(payload) {
    return {
        type: FILTER_GEN,
        payload
    }
};

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
};

export function orderAlph(payload) {
    return {
        type: ORDER_ALPH,
        payload
    }
};

export function orderRating(payload) {
    return {
        type: ORDER_RATING,
        payload
    }
};

export function searchName(name) {
    return async function (dispatch){
        try {
            const data = await axios.get(API_NAME + name);
            return dispatch({
                type: FILTER_SEARCH,
                payload: data.data
            })
        } catch (error) {
            console.log(error)
        };
    };
};

export function getDetails(id){
    return async function(dispatch){
        const details = await axios.get(API_ID + id);
        
        return dispatch({
            type: GET_DETAILS,
            payload: details.data
        });
    };
};

export function setDetail(){
    return {
        type: SET_DETAILS,
        
    }
}