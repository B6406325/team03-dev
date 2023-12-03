import { Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import React, { useState, useEffect, } from 'react';
import { Content, Header } from 'antd/es/layout/layout';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import MovieDash from './edit/Moviedash';
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import type { SizeType } from 'antd/es/config-provider/SizeContext';
const { Sider } = Layout;

export default function Movies() {
  const [size, setSize] = useState<SizeType>('large');
  const navigate = useNavigate();
  function clickMovie() {
    navigate('/admin/movie');
  }
  function clickPayment() {
    navigate('/admin/payment');
  }
  function clickBack() {
    navigate('/');
  }
  function clickUser() {
    navigate('/admin');
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (

    <div className='admin-page'>
      <div className='admin-sidebar'>
      <div className='admin-sidebar-top'>
        <div className='admin-sidebar-text'>
          ADMIN
        </div>
        <div className='admin-sidebar-menu'>
          <Button type="primary" shape="round" size={size} onClick={clickUser} style={{
            color: 'black', fontSize: 'large', fontWeight: 'bold', marginBottom: '10%', backgroundColor: '#F5CE00'
          }}>
            User
          </Button>
          <Button type="primary" shape="round" size={size} onClick={clickMovie} style={{
            color: 'black', fontSize: 'large', fontWeight: 'bold', marginBottom: '10%', backgroundColor: '#F5CE00'
          }}>
            Movies
          </Button>

          <Button type="primary" shape="round" size={size} onClick={clickPayment} style={{
            color: 'black', fontSize: 'large', fontWeight: 'bold', marginBottom: '10%', backgroundColor: '#F5CE00'
          }}>
            Payment
          </Button>
        </div>
      </div>
      <div className='admin-text-logout' onClick={clickBack}>
          logout
        </div>
      </div>

      <div className='admin-content-payment'>
        <div className='admin-content-payment-header'>
          <div className='admin-content-movie-header-left'>
            <div className='admin-content-payment-header-text'>
              Movie
            </div>
            <Link style={{ marginLeft: 50 }} to="/movie/create">
              <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#F5CE00' }}>
                เพิ่มข้อมูล
              </Button>
            </Link>
          </div>

          <div className='admin-conteet-payment-header-right'>
            <div className='admin-content-payment-header-text2'>
              Admin01
            </div>
            <UserOutlined style={{ fontSize: '30px' }} />
          </div>

        </div>
      </div>
    </div>

  );
}
