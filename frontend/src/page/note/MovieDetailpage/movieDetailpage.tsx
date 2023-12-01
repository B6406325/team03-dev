import React from 'react';
import { useLocation } from 'react-router-dom';



export default function  MovieDetailPage (){
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title');
  const duration = searchParams.get('duration');
  const poster = searchParams.get('poster');
  
  return (
    <div>
    <h2>{title} Details</h2>
    <p>Duration: {duration}</p>
    {poster && <img src={decodeURIComponent(poster)} alt="Movie Poster" style={{ width: '240px', height: '360px' }} />}    {/* แสดงข้อมูลเพิ่มเติมของหนังที่นี่ */}
  </div>

  );
}


