import React, { useState } from 'react';
import './Adminhome.css'
import { Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import User from './user/User';

const { Sider } = Layout;


export default function Adminhome() {
  const [size, setSize] = useState<SizeType>('large');
  const navigate = useNavigate();
  function clickMovie() {
    navigate('/admin/movie');
  }
  function clickUser() {
    navigate('/admin');
  }
  function clickPayment() {
    navigate('/admin/payment');
  }
  function clickBack() {
    navigate('/');
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
          <div className='admin-content-payment-header-text'>
            ADMIN HOME
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
