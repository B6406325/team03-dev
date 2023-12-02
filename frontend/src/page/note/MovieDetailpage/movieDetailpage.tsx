import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../../components/navbar';


export default function MovieDetailPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title');
  const duration = searchParams.get('duration');
  const poster = searchParams.get('poster');
  const description = searchParams.get('des');
  
  return (
    <div style={{ position:'absolute',backgroundColor: 'black', width: '100%', height: '100%',fontFamily:'Noto Sans Thai, sans-serif'}}>
       <Navbar/>
    <div style={{ position:'absolute',display: 'flex', flexDirection: 'row', backgroundColor: 'black', width: '100%', height: '100%', justifyContent: 'space-between' }}>
      <div style={{ flex: 1,display:'flex',flexDirection:'row', paddingLeft: '20px', paddingRight: '20px',margin:'5% 0% 0% 10%',position:'relative',borderRadius: '20px !important'}}>
        {poster && <img src={decodeURIComponent(poster)} alt="Movie Poster" style={{ width: '400px', height: '500px',borderRadius: '20px !important' }} />}
      </div>
      <div style={{ flex: 1,color: 'white' ,width:'30%',position:'absolute',margin:'5% 5% 5% 45%'}}>
        <h1>{title}</h1>
        <p>{duration}</p>
        <p><b>เรื่องย่อ:</b> {description}</p>
      </div>
    </div>
    </div>
  );
}

 //   <div>
  //   <h2>{title} Details</h2>
  //   <p>Duration: {duration}</p>
  //   {poster && <img src={decodeURIComponent(poster)} alt="Movie Poster" style={{ width: '240px', height: '360px' }} />}    {/* แสดงข้อมูลเพิ่มเติมของหนังที่นี่ */}
  // </div>
