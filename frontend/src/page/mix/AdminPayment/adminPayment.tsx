import React, { useState, useEffect, } from 'react';
import './styles/adminPayment.css';
import { Button, Divider, Flex, Radio } from 'antd'; //npm install antd --save
import { InputNumber, Image } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { UserOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PaymentAdmin, PaymentAdminAllowed, UpdateSubscribe ,PaymentAdminNotAllowed,UpdateSubscribe2 } from '../../../service/mix';

interface Product {
  ID: number;
  Bill: string;
  UserID: number;
  PaymentStatusID: number;
  Datetime: any;
  Username:string;
  Email:string;
  Price:any;
  PackageName:string;

}

function AdminPayment() {

  const [size, setSize] = useState<SizeType>('large');
  // const [visible, setVisible] = useState(false);
  const [productVisibility, setProductVisibility] = useState<{ [key: number]: boolean }>({});
  const [scaleStep, setScaleStep] = useState(0.5);
  const [products, setProducts] = useState<Product[]>([]);

  const paymentAdmin = async () => {
    let res = await PaymentAdmin();
    console.log(res);
    if (res) {
      setProducts(res);
      

    }
  };

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

  useEffect(() => {
    paymentAdmin();


  }, []);

  const onClick = (ID: Number, UserID: Number) => {
    // ID use for change payment table only and UserID change subscribe only
    PaymentAdminAllowed(ID);
    console.log(ID)
    UpdateSubscribe(UserID);
    setTimeout(() => window.location.reload(), 100);

  }
  const onClick2 = (ID: Number, UserID: Number) => {
    // ID use for change payment table only and UserID change subscribe only
    PaymentAdminNotAllowed(ID);
    console.log(ID)
    UpdateSubscribe2(UserID);
    setTimeout(() => window.location.reload(), 100);

  }



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


          {products.map((p) => (


            p.PaymentStatusID == null && (
              <div className='admin-content-payment-user' key={p.ID}>
                <div className='admin-content-payment-user-left'>
                  <img className="imageUser" alt="Image" src={require("./asset/Group.png")} />
                  <div className='admin-content-payment-user-text'>
                    <div>
                      ชื่อผู้ใช้ : {p.Username}
                    </div>
                    <div>
                      อีเมล : {p.Email}
                    </div>
                    <div>
                      วันที่ : {p.Datetime}
                    </div>
                  </div>
                  <div className='admin-content-payment-user-text2'>
                    <div>
                      ยอดชำระ : {p.Price} บาท
                    </div>
                    <div>
                      แพ็คเกจ : {p.PackageName}
                    </div>
                    <div className='statusUserPayment'>
                      สถานะ :
                      <div style={{ marginLeft: '5px', color: '#C52929', fontWeight: 'bold' }}>
                        ยังไม่อนุมัติ
                      </div>
                    </div>
                  </div>
                  <div style={{ marginLeft: '2%', position: 'relative' }}>
                    <Button style={{ backgroundColor: '#F5CE00' }} type="primary" size={size} onClick={() => setProductVisibility({ ...productVisibility, [p.ID]: true })}>
                      show Image
                    </Button>
                    <Image
                      width={200}
                      style={{ display: 'none' }}
                      src={p.Bill}
                      preview={{
                        visible: productVisibility[p.ID],
                        scaleStep,
                        onVisibleChange: (value) => {
                          setProductVisibility({ ...productVisibility, [p.ID]: value });
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
                }} type="primary" shape="circle" onClick={() => onClick2(p.ID, p.UserID)} >
                  <CloseOutlined />
                </Button>
                <Button style={{
                  marginRight: '2%',
                  fontSize: '24px',
                  backgroundColor: '#ABE49D',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                }} type="primary" shape="circle" onClick={() => onClick(p.ID, p.UserID)}>
                  <CheckOutlined />
                </Button>
              </div>

            )


          ))}

          {products.map((p) => (
            p.PaymentStatusID != null && (
              <div className='admin-content-payment-user2 'key={p.ID}>
                <div className='admin-content-payment-user-left'>
                  <img className="imageUser" alt="Image" src={require("./asset/Group.png")} />
                  <div className='admin-content-payment-user-text'>
                    <div>
                      ชื่อผู้ใช้ : {p.Username}
                    </div>
                    <div>
                      อีเมล : {p.Email}
                    </div>
                    <div>
                      วันที่ : {p.Datetime}
                    </div>
                  </div>
                  <div className='admin-content-payment-user-text2'>
                    <div>
                      ยอดชำระ : {p.Price} บาท
                    </div>
                    <div>
                      แพ็คเกจ : {p.PackageName}
                    </div>
                    <div className='statusUserPayment'>
                      สถานะ :
                      {
                        p.PaymentStatusID == 1 && (
                          <div style={{ marginLeft: '5px', color: '#5AA122', fontWeight: 'bold' }}>
                            อนุมัติ
                          </div>
                        )
                      }
                      {
                        p.PaymentStatusID == 2 && (
                          <div style={{ marginLeft: '5px', color: '#C52929', fontWeight: 'bold' }}>
                            ไม่อนุมัติ
                          </div>
                        )

                      }

                    </div>
                  </div>
                  <div style={{ marginLeft: '2%' ,position: 'relative'}}>
                    <Button style={{ backgroundColor: '#F5CE00' }} type="primary" size={size} onClick={() => setProductVisibility({ ...productVisibility, [p.ID]: true })}>
                      show Image
                    </Button>
                    <Image
                      width={200}
                      style={{ display: 'none' }}
                      src={p.Bill}
                      preview={{
                        visible: productVisibility[p.ID],
                        scaleStep,
                        onVisibleChange: (value) => {
                          setProductVisibility({ ...productVisibility, [p.ID]: value });
                        },
                      }}
                    />
                  </div>
                </div>

              </div>
            )))}



        </div>

      </div>

    </div>


  );
}


export default AdminPayment;