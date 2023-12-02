import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Carousel,Card  } from 'antd';
import './homepage.css';
import Navbar from '../../../components/navbar';

const movieData = [
    { title: 'Toy Story 4', duration: '100min', poster: 'https://i.imgur.com/p7WQfVm.jpg',des: 'When a new toy called \"Forky\" joins Woody and the ang, a road trip alongside old and new friends reveals how big the world can be for a toy.'},
    { title: 'Toy Story 3', duration: '100min', poster: 'https://i.imgur.com/5YUn5L4.jpg', des: '' },
    { title: 'The Hunger Games', duration: '142min', poster: 'https://i.imgur.com/MfZ3ZhJ.jpg', des: ''  },
    { title: 'Opphenheimer', duration: '180min', poster: 'https://i.imgur.com/VIQdyDD.jpg', des: 'เรื่องราวของ Oppenheimer ชายผู้มีปัญหาในตัวเองมากมาย แต่ก็ถูกมองข้ามไปด้วยความปราดเปรื่องของตัวเขา เมื่อเขาถูกขอความช่วยเหลือให้หาหนทางยุติสงครามโลกครั้งที่สอง เขาก็ชี้ไปที่ความหวังเดียวเท่านั้น คือ อาวุธปรมาณูที่มีพลังทำลายล้างรุนแรงจนสามารถยับยั้งไม่ให้ทุกฝ่ายต่อสู้กันต่อไปได้อีก' },
    { title: 'Five Nights At Freddy', duration: '109min', poster: 'https://i.imgur.com/HtX0pTe.jpg', des: '' },
    { title: 'The terminal', duration: '128min', poster: 'https://i.imgur.com/9OSQ1Uy.jpg', des: '' },
    { title: 'Toy Story 4', duration: '100min', poster: 'https://i.imgur.com/p7WQfVm.jpg', des: '' },
    { title: 'Toy Story 3', duration: '100min', poster: 'https://i.imgur.com/5YUn5L4.jpg', des: '' },
    { title: 'The Hunger Games', duration: '142min', poster: 'https://i.imgur.com/MfZ3ZhJ.jpg', des: '' },
    { title: 'Opphenheimer', duration: '180min', poster: 'https://i.imgur.com/VIQdyDD.jpg', des: '' },
    { title: 'Five Nights At Freddy', duration: '109min', poster: 'https://i.imgur.com/HtX0pTe.jpg' , des: ''},
    { title: 'The terminal', duration: '128min', poster: 'https://i.imgur.com/9OSQ1Uy.jpg', des: '' },
       
    
  ];
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
                        {movieData.map((movie, index) => (
                        <Link to={`/moviedetailpage?title=${encodeURIComponent(movie.title)}&duration=${encodeURIComponent(movie.duration)}&poster=${encodeURIComponent(movie.poster)}&des=${encodeURIComponent(movie.des)}`} key={index}>
                            <Card
                                key={index}
                                hoverable
                                style={{ width: 240,height: 400, margin: 16}}
                                cover={<img alt="Movie Poster" src={movie.poster} style={{width:'100%',height:300}}/>}
                            >
                                <Meta title={movie.title} description={movie.duration}/>
                            </Card>
                        </Link>
                    
                        ))}
                    </div>
                </div>
                
                
            
            
            </section>
        </div>
        
        
    );
}