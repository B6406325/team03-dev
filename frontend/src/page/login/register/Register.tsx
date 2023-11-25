import './Register.css'
import { ConfigProvider , Button , Input, Form , message} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { MemberInterface } from '../../interface/Idata';
// import { CreateMember } from '../../service/http';

export default function Register(){
    const navigate = useNavigate();
    // const [member, setMember] = useState<MemberInterface[]>([]);
    // const onFinish = async (values: MemberInterface) => {
    //     values.Status = "member";
    //     values.Payment = "ยังไม่จ่าย";
    //     let res = await CreateMember(values);
    //     if (res.status){
    //         message.success("สมัครเสร็จสิ้น โปรดล็อกอินอีกครั้ง");
    //         setTimeout(function () {
    //             navigate("/");
    //         }, 2000);
    //     }
    // }
    function onClickLogin(){
        navigate("/login");
    }

    return(
        <ConfigProvider theme={{
            components:{
                Button:{
                    colorPrimary: '#F5CE00',
                    algorithm: true,
                    primaryColor: '#000000',
                },
                Input:{
                    colorPrimary: '#F5CE00',
                    algorithm: true,
                },
            },
        }}>
        <div className='web-reg'>
            <div className='body-reg'>
                <div className='body-reg-text'>สร้างบัญชีผู้ใช้งาน</div>
                <Form >
                    <div className='reg-username'>
                        <Form.Item name="Username" rules={[{required:true, message:"โปรดใส่ชื่อผู้ใช้งาน"}]}>
                            <Input style={{width:670,height:53,fontSize:25,fontFamily:'Mitr'}} placeholder='ชื่อผู้ใช้งาน'></Input>
                        </Form.Item>
                    </div>
                    <div className='reg-email'>
                        <Form.Item name="Email" rules={[{required:true, message:"โปรดใส่อีเมล"}]}>
                            <Input style={{width:670,height:53,fontSize:25,fontFamily:'Mitr'}} placeholder='อีเมล'></Input>
                        </Form.Item>
                    </div>
                    <div className='reg-pass'>
                        <Form.Item name="Password" hasFeedback rules={[{required:true, message:"โปรดใส่รหัสผ่าน"}]}>
                            <Input style={{width:670,height:53,fontSize:25,fontFamily:'Mitr'}} placeholder='รหัสผ่าน' type='password'></Input>
                        </Form.Item>    
                    </div>
                    <div className='reg-password'>
                        <Form.Item name="confirm" dependencies={['Password']} rules={[
                            {
                                required:true,
                                message:"โปรดยืนยันรหัสผ่าน",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('Password') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('รหัสผ่านไม่ตรงกัน!'));
                                },
                              }),
                            
                            ]}>
                            <Input style={{width:670,height:53,fontSize:25,fontFamily:'Mitr'}} placeholder='ยืนยันรหัสผ่าน' type='password'></Input>
                        </Form.Item>
                    </div>
                    <div className='reg-button'>
                        <Form.Item>
                            <Button style={{fontSize: 25,width: 200,height:50,fontFamily:'Mitr'}} type='primary' htmlType='submit'>สร้างบัญชี</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        <div className='reg-back-button'><Button style={{fontSize: 25,width: 200,height:50,fontFamily:'Mitr'}} type='primary' onClick={onClickLogin}>ล็อกอิน</Button></div>
        </div>
        </ConfigProvider>
        
    );
}