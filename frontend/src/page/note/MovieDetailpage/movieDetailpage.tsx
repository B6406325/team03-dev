import React from 'react';
import { Row, Col, Typography, Card, Descriptions } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { url } from 'inspector';

const { Title, Text } = Typography;

const MovieDetailPage = () => {
  return (
    <>
      
      <Card style={{width:'20%',height:'30%'}}
            cover={
              <img
                alt="Movie Poster"
                src="https://i.imgur.com/VIQdyDD.jpg" // Adjust the width and height as needed
                style={{ width: '100%', height: 'auto' }}
              />
            }
          >
            <Card.Meta
              title={<Title level={4} style={{ color: 'black' }}>Movie Title</Title>}
              description={<Text style={{ color: 'black' }}>Release Year: 2023</Text>}
            />
          </Card>
        
    
   
      
            <Card style={{ width: 300 ,left:'32%',marginTop:'-20%'}}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>

    </>
  );
};

export default MovieDetailPage;
