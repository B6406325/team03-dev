import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./user.css"
import { ConfigProvider, Button } from 'antd';
import UserChangeName from './userChangeName';
import UserChangePass from './userChangePass';
import UserChangeEmail from './userChangeEmail';

// const { Header, Content, Footer } = Layout;

function UserAccount() {
    const [changeNameVisible, setChangeNameVisible] = useState(false);
    const [changeEmailVisible, setChangeEmailVisible] = useState(false);
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
    const navigate = useNavigate();

    const toggleChangeNamePop = () => {
        setChangeNameVisible(!changeNameVisible);
    };

    const toggleChangeEmailPop = () => {
        setChangeEmailVisible(!changeEmailVisible);
    };

    const toggleChangePasswordPop = () => {
        setChangePasswordVisible(!changePasswordVisible);
    };

    const handleToHis = () => {
        setTimeout(() => {
            navigate("/subhistory");
        }, 500);
    };

    const handleToPack = () => {
        setTimeout(() => {
            navigate("/package");
        }, 500);
    };

    return (



        <ConfigProvider theme={{
            components: {
                Button: {
                    colorPrimary: '#F5CE00',
                    algorithm: true,
                    primaryColor: '#000000',
                },
            },
        }}><div className='web-user'>
                <div className='web-user-boxmain'>
                    <div className='web-user-box' style={{ marginTop: 0 }}>
                        <div className='user-text-header'>My Account</div>
                        <div className='user-line' />
                        <div className='user-text'>Username:
                            <div className='user-button'>
                                <Button
                                    style={{ fontSize: 20, width: 150, height: 50, fontFamily: 'Mitr' }}
                                    type='primary'
                                    onClick={toggleChangeNamePop}
                                >แก้ไขชื่อ</Button>
                            </div>
                            <UserChangeName visible={changeNameVisible} onCancel={toggleChangeNamePop} />
                        </div>
                        <div className='user-text'>Email:
                            <div className='user-button'>
                                <Button
                                    style={{ fontSize: 20, width: 150, height: 50, fontFamily: 'Mitr' }}
                                    type='primary'
                                    onClick={toggleChangeEmailPop}
                                >แก้ไขอีเมล์</Button>
                            </div>
                            <UserChangeEmail visible={changeEmailVisible} onCancel={toggleChangeEmailPop} />
                        </div>

                        <div className='user-text'>Password:
                            <div className='user-button'>
                                <Button
                                    style={{ fontSize: 20, width: 150, height: 50, fontFamily: 'Mitr' }}
                                    type="primary"
                                    onClick={toggleChangePasswordPop}
                                >เปลี่ยนรหัส</Button>
                            </div>
                            <UserChangePass visible={changePasswordVisible} onCancel={toggleChangePasswordPop} />
                        </div>
                    </div>
                    <div className='web-user-box'>
                        <div className='user-text-header'>Subscription</div>
                        <div className='user-line' />
                        <div className='user-text'>Package:
                            <div className='user-button'>
                                <Button onClick={handleToPack} style={{ fontSize: 20, width: 150, height: 50, fontFamily: 'Mitr' }} type='primary'>เปลี่ยนแพ็คเกจ</Button>
                            </div>
                        </div>
                        <div className='user-text'>Exp:
                            <div className='user-button'>
                                <Button onClick={handleToHis} style={{ fontSize: 20, width: 150, height: 50, fontFamily: 'Mitr' }} type='primary'>ประวัติ Sub</Button>
                            </div>
                        </div>
                        <div className='user-text'></div>
                        <div className='user-button'>
                            <Button htmlType="button" style={{ fontSize: 20, width: 150, height: 50, fontFamily: 'Mitr' }}>ยกเลิก Sub</Button>
                        </div>
                    </div>
                    <div className='web-user-box'>
                        <div className='user-text-header'>Other</div>
                        <div className='user-line' />
                        <div className='user-text'>ประวัติการรับชม
                            <div className='user-button'>
                                <Button style={{ fontSize: 20, width: 170, height: 50, fontFamily: 'Mitr' }} type='primary'>ประวัติการรับชม</Button>
                            </div>
                        </div>
                        <div className='user-text'>การดาวน์โหลด
                            <div className='user-button'>
                                <Button style={{ fontSize: 20, width: 170, height: 50, fontFamily: 'Mitr' }} type='primary'>การดาวน์โหลด</Button>
                            </div>
                        </div>
                        <div className='user-text'>ติดต่อ Admin
                            <div className='user-button'>
                                <Button style={{ fontSize: 20, width: 170, height: 50, fontFamily: 'Mitr' }} type='primary'>ติดต่อ Admin</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
        // <Footer style={{ textAlign: 'center' }}>Movie App ©2023 Created by Team03 of System Engineering</Footer>


    );
};

export default UserAccount;