import React,{ useState,useEffect, } from 'react';
import { useLocation,} from 'react-router-dom';
import Navbar from '../../../components/navbar';
import { Button, Card,Image,Empty} from 'antd';
import Cookies from 'js-cookie'; //npm install js-cookie
import './Historypage.css';
import { HistoryInterface } from '../../../interface/note';
import { ListHistoryByUserID ,DeleteHistoryByID} from '../../../service/note';

export default function Historypage(){
  // const location = useLocation();
  const userID = String(Cookies.get('UserID'));
  const [movies, setMovies] = useState<HistoryInterface[]>([]);
  const { Meta } = Card;


  useEffect(() => {
    console.log("UI", movies);
  }, [movies]);
  
  useEffect(() => {
    const getMoviesByUserId = async () => {
      let res = await ListHistoryByUserID(Number(userID));
      if (res) {
        console.log("Backend", res);
        setMovies(res);
      }
    };
  
    getMoviesByUserId();
  }, [userID]);

  const handleRemoveMovie = async (movieID: number) => {
    // ทำการลบประวัติตาม movieID
    await DeleteHistoryByID(movieID);

    // รีเฟรชข้อมูลหลังจากการลบ
    const updatedMovies = movies.filter((historyItem) => historyItem.MovieID !== movieID);
    setMovies(updatedMovies);
  };

  const handleScrollLeft = () => {
    const element = document.querySelector('.history-box');
    if (element) {
      element.scrollLeft -= 200; // ปรับตามความต้องการ
    }
  };

  const handleScrollRight = () => {
    const element = document.querySelector('.history-box');
    if (element) {
      element.scrollLeft += 200; // ปรับตามความต้องการ
    }
  };

  

  return (
    <div className='Historypage'>
      {/* <Navbar/> */}
      <div className='bg'>
        <div className='history-nav'><Navbar /></div>
        <h2 className='history-text'>ประวัติการรับชม</h2>
        
        {movies.length === 0 ? 
        (<Empty className='empty' description={false}>คุณยังไม่มีการรับชมภาพยนตร์</Empty>
        ) : (
          <div className='history-box'> 
          <button className='scroll-button' onClick={handleScrollLeft}><b>{'<'}</b></button>
            {movies.map((historyItem) => (
              <Card
                className='history-card'
                key={historyItem.ID}
                style={{ width: 200, marginBottom: 10, height: 450 }}
                cover={<Image src={historyItem.Movie?.Image} alt="Movie Poster" height={300} />}
              >
                <Meta
                  title={historyItem.Movie?.Title}
                  description={`ดูเมื่อ: ${historyItem.DateTime ? new Date(historyItem.DateTime).toLocaleString() : 'N/A'}`}
                />
                <Button
                  style={{ top: '15px', left: '35%' }}
                  onClick={() => historyItem.MovieID && handleRemoveMovie(historyItem.MovieID)}
                  danger
                >
                  ลบ
                </Button>
              </Card>
            ))}
            <button className='scroll-button2' onClick={handleScrollRight}><b>{'>'}</b></button>
          </div>
        )}
      </div>
      
    </div>
  );

}

