import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Divider, Form, Input, Row, Select, Upload, message } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MovieCreate(){
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
    return(
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
                MovieCreate
              </div>
            </div>
            <div className='admin-conteet-payment-header-right'>
              <div className='admin-content-payment-header-text2'>
                Admin01
              </div>
              <UserOutlined style={{ fontSize: '30px' }} />
            </div>
          </div>
          <div className='admin-movie-popup'>
            <Card>
                <h2>ชื่อเรื่อง</h2>
                <Divider/>
                <Form>
                    <Row gutter={[16, 16]}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="ชื่อเรื่อง">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={32} sm={32} md={32} lg={32} xl={18}>
                            <Form.Item label="เรื่องย่อ">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="ความยาว(min)">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="วันที่ออกฉาย">
                                <DatePicker></DatePicker>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="ผู้กำกับ">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="นักแสดง">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="วีดีโอ">
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="หมวดหมู่">
                                <Select></Select>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="กลุ่มเป้าหมาย">
                                <Select></Select>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="รูปแบบเสียง">
                                <Select></Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item label="รูปภาพ">
                            <Upload maxCount={1} multiple={false} listType="picture-card">
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>อัพโหลด</div>
                                </div>
                            </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
          </div>
        </div>
      </div>
    );
}