import React, { useState, useContext, useEffect } from 'react'
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [isLoading , setIsLoading] = useState(false);
  const [movies , setMovies] = useState([]);
  const [error , setError] = useState({show:false, msg:''});
  const [query , setQuery] = useState('batman');
  const fetchMovies = async (url) =>{
    setIsLoading(true);
    try {
    const response =  await fetch(url);
    const data = await response.json();
    console.log(data);
    if(data.Response === 'True'){
      setMovies(data.Search);
      setError({show:false , msg:''})
    }
    else{
      setError({show:true , msg: data.Error})
    }
    setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  // https://www.omdbapi.com/?apikey=77232e31&s=batman
  useEffect(()=>{
    fetchMovies(`${API_ENDPOINT}&s=${query}`);
  } , [query])
  return <AppContext.Provider value={{isLoading , movies , error, setQuery}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
