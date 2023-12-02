import React, { useState, useEffect, } from 'react';
import './styles/adminPayment.css';
import { Button, Divider, Flex, Radio } from 'antd'; //npm install antd --save
import { InputNumber, Image } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { UserOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

function AdminPayment() {
  const [size, setSize] = useState<SizeType>('large');
  const [visible, setVisible] = useState(false);
  const [scaleStep, setScaleStep] = useState(0.5);

  return (
    <div className='admin-page'>
      <div className='admin-sidebar'>
        <div className='admin-sidebar-text'>
          ADMIN
        </div>
        <div className='admin-sidebar-menu'>
          <Button type="primary" shape="round" size={size} style={{
            color: 'black', fontSize: 'large', fontWeight: 'bold', marginBottom: '10%', backgroundColor: '#F5CE00'
          }}>
            Member
          </Button>
          <Button type="primary" shape="round" size={size} style={{
            color: 'black', fontSize: 'large', fontWeight: 'bold', marginBottom: '10%', backgroundColor: '#F5CE00'
          }}>
            User
          </Button>

          <Button type="primary" shape="round" size={size} style={{
            color: 'black', fontSize: 'large', fontWeight: 'bold', marginBottom: '10%', backgroundColor: '#F5CE00'
          }}>
            Payment
          </Button>
        </div>
      </div>
      <div className='admin-content-payment'>
        <div className='admin-content-payment-header'>
          <div className='admin-content-payment-header-text'>
            Payment
          </div>
          <div className='admin-conteet-payment-header-right'>
            <div className='admin-content-payment-header-text2'>
              Admin01
            </div>
            <UserOutlined style={{ fontSize: '30px' }} />
          </div>

        </div>
        <div className='admin-content-payment-user-bg'>
          <div className='admin-content-payment-user'>
            <div className='admin-content-payment-user-left'>
              <img className="imageUser" alt="Image" src={require("./asset/Group.png")} />
              <div className='admin-content-payment-user-text'>
                <div>
                  ชื่อผู้ใช้ : พี่เข้มครับ
                </div>
                <div>
                  อีเมล : test@gmail.com
                </div>
                <div>
                  วันที่ : 17 พฤศจิกายน 2566
                </div>
              </div>
              <div className='admin-content-payment-user-text2'>
                <div>
                  ยอดชำระ : 342 บาท
                </div>
                <div>
                  แพ็คเกจ : จุใจยกครอบครัว
                </div>
                <div className='statusUserPayment'>
                  สถานะ :
                  <div style={{ marginLeft: '5px', color: '#C52929', fontWeight: 'bold' }}>
                    ยังไม่อนุมัติ
                  </div>
                </div>
              </div>
              <div style={{ marginLeft: '2%' }}>
                <Button style={{ backgroundColor: '#F5CE00' }} type="primary" size={size} onClick={() => setVisible(true)}>
                  show Image
                </Button>
                <Image
                  width={200}
                  style={{ display: 'none' }}
                  src={require("./asset/paymentTest.jpg")}
                  preview={{
                    visible,
                    scaleStep,
                    onVisibleChange: (value) => {
                      setVisible(value);
                    },
                  }}
                />
              </div>
            </div>
            <Button style={{
              marginRight: '1%',
              fontSize: '24px',
              backgroundColor: '#F57B7B',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
            }} type="primary" shape="circle">
              <CloseOutlined />
            </Button>
            <Button style={{
              marginRight: '2%',
              fontSize: '24px',
              backgroundColor: '#ABE49D',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
            }} type="primary" shape="circle">
              <CheckOutlined />
            </Button>
          </div>
          <div className='admin-content-payment-user2'>
            <div className='admin-content-payment-user-left'>
              <img className="imageUser" alt="Image" src={require("./asset/Group.png")} />
              <div className='admin-content-payment-user-text'>
                <div>
                  ชื่อผู้ใช้ : พี่เข้มครับ
                </div>
                <div>
                  อีเมล : test@gmail.com
                </div>
                <div>
                  วันที่ : 17 พฤศจิกายน 2566
                </div>
              </div>
              <div className='admin-content-payment-user-text2'>
                <div>
                  ยอดชำระ : 342 บาท
                </div>
                <div>
                  แพ็คเกจ : จุใจยกครอบครัว
                </div>
                <div className='statusUserPayment'>
                  สถานะ :
                  <div style={{ marginLeft: '5px', color: '#5AA122', fontWeight: 'bold' }}>
                    อนุมัติ
                  </div>
                </div>
              </div>
              <div style={{ marginLeft: '2%' }}>
                <Button style={{ backgroundColor: '#F5CE00' }} type="primary" size={size} onClick={() => setVisible(true)}>
                  show Image
                </Button>
                <Image
                  width={200}
                  style={{ display: 'none' }}
                  src={require("./asset/paymentTest.jpg")}
                  preview={{
                    visible,
                    scaleStep,
                    onVisibleChange: (value) => {
                      setVisible(value);
                    },
                  }}
                />
              </div>
            </div>
            
          </div>

        

        </div>

      </div>

    </div>


  );
}


export default AdminPayment;