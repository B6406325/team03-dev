import React,{ useState,useEffect, } from 'react';
import { useLocation,} from 'react-router-dom';
import { MoviesInterface } from '../../../interface/fook';
import { GetMovieById } from '../../../service/fook';
import './playmoviepage.css';

export default function PlayMoviepage(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const movieID = searchParams.get('ID');
    const [movie, setMovie] = useState<MoviesInterface>();

    const getData = async () => {
        let res = await GetMovieById(Number(movieID));
        if (res){
        console.log(res)
        setMovie(res);
        } 
    } 
    useEffect(() => {
        getData();
        console.log(movie)
      }, []);  


    return (
        <div className='PlayMoviepage'>
        <div className='bg'>
        <iframe className='iframe' src={movie?.Video} title="YouTube video player" allow="accelerometer; autoplay;"></iframe>
            
        </div>
                
        </div>
    );
}