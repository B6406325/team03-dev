import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Divider, Form, Input, Row, Select, Upload, message } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CategoriesInterface, ImageUpload, MoviesCreateInterface, SoundtrackInterface, TargetInterface } from "../../../../interface/fook";
import { CreateMovie, GetCategories, GetSoundtrack, GetTarget } from "../../../../service/fook";
const { Option } = Select;
export default function MovieCreate(){
    const [size, setSize] = useState<SizeType>('large');
    const [categories, setCategories] = useState<CategoriesInterface[]>([]);
    const [target, setTarget] = useState<TargetInterface[]>([]);
    const [soundtrack, setSoundtrack] = useState<SoundtrackInterface[]>([]);
    const [image, setImage] = useState<ImageUpload>()
    const navigate = useNavigate();

    const onFinish = async (values: MoviesCreateInterface) => {
      values.Image = image?.thumbUrl;
      values.Duration = Number(values.Duration);
      let res = await CreateMovie(values);
      if (res.status) {
        message.success("เพิ่มข้อมูลเสร็จสิ้น");
        setTimeout(function () {
          navigate("/admin/movie");
      }, 2000);
      }else{
        message.error(res.message);
      }
    };

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
      const getCategories = async () => {
        let res = await GetCategories();
        if (res) {
          setCategories(res);
        }
      };
      const getTarget = async () => {
        let res = await GetTarget();
        if (res) {
          setTarget(res);
        }
      };
      const getSoundtrack = async () => {
        let res = await GetSoundtrack();
        if (res) {
          setSoundtrack(res);
        }
      };

      const normFile = (e: any) => {
        if (Array.isArray(e)) {
          return e;
        }
        setImage(e?.fileList[0])
        return e?.fileList;
      };
      useEffect(() => {
        getCategories();
        getTarget();
        getSoundtrack();
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
                <Form onFinish={onFinish} autoComplete="off">
                    <Row gutter={[16, 16]}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="ชื่อเรื่อง" name="Title" rules={[{required: true,message: "กรอกชื่อเรื่อง!"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={32} sm={32} md={32} lg={32} xl={18}>     
                            <Form.Item label="เรื่องย่อ" name="Description" rules={[{required: true,message: "กรอกเรื่องย่อ!"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="ความยาว(min)" name="Duration" rules={[{required: true,message: "กรอกความยาวหนัง!"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="วันที่ออกฉาย" name="ReleaseDate" rules={[{required: true,message: "กรอกวันที่ออกฉาย!"}]}>
                                <DatePicker></DatePicker>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="ผู้กำกับ" name="Director" rules={[{required: true,message: "กรอกผู้กำกับ!"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="นักแสดง" name="Cast" rules={[{required: true,message: "กรอกนักแสดง"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="วีดีโอ" name="Video" rules={[{required: true,message: "กรอกวีดีโอ"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="หมวดหมู่" name="CategoriesID" rules={[{required: true,message: "กรอกหมวดหมู่"}]}>
                                <Select>
                                {categories.map((item) => (<Option value={item.ID} key={item.Categories}>{item.Categories}</Option>))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="กลุ่มเป้าหมาย" name="TargetID" rules={[{required: true,message: "กรอกเป้าหมาย"}]}>
                                <Select>
                                {target.map((item) => (<Option value={item.ID} key={item.Target}>{item.Target}</Option>))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <Form.Item label="รูปแบบเสียง" name="SoundtrackID" rules={[{required: true,message: "กรอกรูปแบบเสียง"}]}>
                                <Select>
                                {soundtrack.map((item) => (<Option value={item.ID} key={item.Soundtrack}>{item.Soundtrack}</Option>))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item label="รูปภาพ" name="Image" valuePropName="fileList" getValueFromEvent={normFile} rules={[{required: true,message: "อัปโหลดรูปภาพ!"}]}> 
                            <Upload maxCount={1} multiple={false} listType="picture-card">
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>อัพโหลด</div>
                                </div>
                            </Upload>
                            </Form.Item>
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