import axios from "axios";
import { apiKey } from "../constants";


const apiBaseUrl='https://api.themoviedb.org/3'
const trendingMoviesEndpoint=`${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint=page=>`${apiBaseUrl}/movie/upcoming?page=${page}&api_key=${apiKey}`
const topRatedMoviesEndpoint=page=>`${apiBaseUrl}/movie/top_rated?page=${page}&api_key=${apiKey}`
const searchMoviesEndpoint=`${apiBaseUrl}/search/multi?api_key=${apiKey}`

const movieDetailsEndpoint=(id,type)=>`${apiBaseUrl}/${type}/${id}?api_key=${apiKey}`
const movieCreditsEndpoint=(id,type)=>`${apiBaseUrl}/${type}/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint=(id,type)=>`${apiBaseUrl}/${type}/${id}/similar?api_key=${apiKey}`



const personDetailsEndpoint=id=>`${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint=id=>`${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`


export const image500= path => path? `https://image.tmdb.org/t/p/w500${path}`:null;
export const image342= path => path? `https://image.tmdb.org/t/p/w342${path}`:null;
export const image185= path => path? `https://image.tmdb.org/t/p/w185${path}`:null;

const apiCall = async (endpoint, params) => {
    const options = {
      method: 'GET',
      url: endpoint,
      params: params,
    };
  
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log('Error:', error);
      return null; // Return null or handle error as necessary
    }
  };
  
  // Function to fetch trending movies
  export const fetchTrendingMovies = async () => {
    return await apiCall(trendingMoviesEndpoint);
  };
  export const fetchUpcomingMovies = page=> {
    return   apiCall(upcomingMoviesEndpoint(page));
  };
  export const fetchTopRatedMovies = page => {
    return  apiCall(topRatedMoviesEndpoint(page));
  };
  export const fetchMovieDetails=(id,type)=>{
    return apiCall(movieDetailsEndpoint(id,type));
  }
  export const fetchMovieCredits=(id,type)=>{
    return apiCall(movieCreditsEndpoint(id,type));
  }
  export const fetchSimilarMovies=(id,type)=>{
    return apiCall(similarMoviesEndpoint(id,type));
  }
  export const fetchPersonDetails=id=>{
    return apiCall(personDetailsEndpoint(id));
  }
  export const fetchPersonMovies=id=>{
    return apiCall(personMoviesEndpoint(id));
  }
  export const searchMovies=params=>{
    return apiCall(searchMoviesEndpoint,params)
  }