import React,{ useState,useEffect, } from 'react';
import Navbar from '../../../components/navbar';
import { Table } from 'antd';
import Cookies from 'js-cookie'; //npm install js-cookie
import './Historypage.css';
import { HistoryInterface } from '../../../interface/note';
import { ListHistoryByUserID } from '../../../service/note';

export default function Historypage(){
  const [histories, setHistories] = useState<HistoryInterface[]>([]);
  const userID = String(Cookies.get('UserID'));
  const getData = async () => {
    let res = await ListHistoryByUserID(Number(userID));
    if (res){
      
      setHistories(res);
      console.log(histories)
    } 
  };

  useEffect(() => {
    getData();
  
  }, []);

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Movie ID',
      dataIndex: 'movieId',
      key: 'movieId',
    },
  ];


  return (
    <div className='Historypage'>
      <nav style={{backgroundColor:'#121212'}}><Navbar/></nav>
      <div className='bg'>
        {/* {histories.map((historiesItem) =>(
          <div className='history-box' key={historiesItem.ID}><p>{historiesItem.User?.Username}</p></div>
        ))} */}
        <Table dataSource={histories} columns={columns} />


      </div>
            
    </div>
  );
}

