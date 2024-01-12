import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, message } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GenderUserInterface, PrefixUserInterface, StatusUserInterface, UserInterface } from "../../../../interface/login";
import { GetGenders, GetPrefix, GetStatusUser, GetUserById, UpdateUser } from "../../../../service/login";
import moment from 'moment';

const { Option } = Select;

export default function MovieEdit(){
    const [size, setSize] = useState<SizeType>('large');
    const [user, setUser] = useState<UserInterface>();
    const [prefix, setPrefix] = useState<PrefixUserInterface[]>([]);
    const [gender, setGender] = useState<GenderUserInterface[]>([]);
    const [statususer, setStatususer] = useState<StatusUserInterface[]>([]);
    let {id} = useParams();
    const [form] = Form.useForm();
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

      const getUserById = async () => {
        let res = await GetUserById(Number(id));
        if (res) {
          setUser(res);
          form.setFieldsValue({ 
            Username: res.Username,
            Email: res.Email,
            Password: res.Password,
            Firstname: res.Firstname,
            Lastname: res.Lastname,
            Address: res.Address,
            GenderID: res.GenderID,
            PrefixID: res.PrefixID,
            // Dob: res.Dob,
            StatusUserID: res.StatusUserID,
        });
        }
        console.log(res);
      };;
      const getPrefix = async () => {
        let res = await GetPrefix();
        if (res) {
          setPrefix(res);
        }
      };
      const getGender = async () => {
        let res = await GetGenders();
        if (res) {
          setGender(res);
        }
      };
      const getStatususer = async () => {
        let res = await GetStatusUser();
        if (res) {
          setStatususer(res);
        }
      };
      
      const onFinish = async (values: UserInterface) => {
        values.ID = user?.ID;
        let res = await UpdateUser(values);
        if (res.status) {
          message.success("อัปเดตสำเร็จ")
          setTimeout(function () {
            navigate("/admin");
          }, 2000);
        }else{
            message.error(res.message);
        }
      };

      useEffect(() => {
        getUserById();
        getGender();
        getPrefix();
        getStatususer();
      }, []);
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
              UserEdit
            </div>
          </div>
          <div className='admin-conteet-payment-header-right'>
            <div className='admin-content-payment-header-text2'>
              Admin01
            </div>
            <UserOutlined style={{ fontSize: '30px' }} />
          </div>
        </div>
        <div className='admin-movie'>
        <Card>
                <Form form={form} onFinish={onFinish}>
                    <Row gutter={[16, 16]}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="ชื่อผู้ใช้" name="Username" rules={[{required: true,message:"กรอกชื่อผู้ใช้"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={32} sm={32} md={32} lg={32} xl={18}>
                            <Form.Item label="อีเมล" name="Email" rules={[{required: true,message:"กรอกอีเมล"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="รหัสผ่าน" name="Password" rules={[{required: true,message:"กรอกรหัสผ่าน"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="ชื่อต้น" name="Firstname" rules={[{required: true,message:"กรอกชื่อต้น"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="ชื่อท้าย" name="Lastname" rules={[{required: true,message:"กรอกชื่อท้าย"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="ที่อยู่" name="Address" rules={[{required: true,message:"กรอกที่อยู่"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="วันเกิด" name="Dob" rules={[{required: true,message:"กรอกวันเกิด"}]}>
                            <DatePicker/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="เพศ" name="GenderID" rules={[{required: true,message:"กรอกเพศ"}]}>
                                <Select allowClear>
                                {gender.map((item) => (<Option value={item.ID} key={item.Gender}>{item.Gender}</Option>))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="คำนำหน้า" name="PrefixID" rules={[{required: true,message:"กรอกคำนำหน้า"}]}>
                                <Select>
                                {prefix.map((item) => (<Option value={item.ID} key={item.Prefix}>{item.Prefix}</Option>))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="StatusUserID">
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                          <Form.Item>
                            <Button style={{fontSize: 25,width: 200,height:50,fontFamily:'Mitr'}} htmlType="submit">ตกลง</Button>
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