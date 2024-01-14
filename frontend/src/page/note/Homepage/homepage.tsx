import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Carousel,Card  } from 'antd';
import './homepage.css';
import Navbar from '../../../components/navbar';
import { ReviewInterface } from '../../../interface/note';
import { MoviesInterface } from '../../../interface/fook';
import { ListMovies } from '../../../service/fook';

const { Meta } = Card;
const contentStyle: React.CSSProperties = {
    width:'100%',
    height: '480px',
    color:'white',
    backgroundColor:'rgba(0, 0, 0, 0.3)',
    position:'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
  };

export default function Homepage(){
    const [movies, setMovies] = useState<MoviesInterface[]>([]);
    const listMovies = async () => {
        let res = await ListMovies();
        if(res){
        setMovies(res);
        }
    };
    console.log(movies);
    
    useEffect(() => {
    
        listMovies();
    
    }, []);


    return(
        
        <div>
            <header style={{backgroundColor:'black'}}><Navbar/></header>
            <section className='homepage-section'>
                
                <Carousel autoplay>
                    <div>
                    <div style={contentStyle}><img src='https://i.imgur.com/LKzePxU.jpg' style={{width:'1080px',height:'480px'}}></img></div>
                    </div>
                    <div>
                    <div style={contentStyle}><img src='https://i.imgur.com/z127eo0.jpg' style={{width:'1080px',height:'480px'}}></img></div>                    </div>
                    <div>
                    <div style={contentStyle}><img src='https://i.imgur.com/UvhHnWC.jpg' style={{width:'1080px',height:'480px'}}></img></div>                    </div>
                    <div>
                    <div style={contentStyle}><img src='https://i.imgur.com/xDuYLGw.jpg' style={{width:'1080px',height:'480px'}}></img></div>                    </div>
                </Carousel>
                <br/>
                <div className='movie-content-section' style={{justifyItems: 'center', alignItems: 'center'}}>
                    <div className='movie-card-container' style={{display:'flex',flexDirection:'row',flexWrap: 'wrap',position:'relative',justifyContent: 'center', alignItems: 'center'}}>
                        {movies.map((movie, index) => (
                        <Link to={`/moviedetailpage?ID=${encodeURIComponent(movie.ID || 'abc')}`} key={index}>
                            <Card
                                key={index}
                                hoverable
                                style={{ width: 240,height: 400, margin: 16}}
                                cover={<img alt="Movie Poster" src={movie.Image} style={{width:'100%',height:300}}/>}
                            >
                                <Meta title={movie.Title} description={`${movie.Duration} นาที`} />
                            </Card>
                        </Link>
                    
                        ))}
                    </div>
                </div>
                
                
            
            
            </section>
        </div>
        
        
    );
        

}