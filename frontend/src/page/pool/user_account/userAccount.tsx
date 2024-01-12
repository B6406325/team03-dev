import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./user.css"
import { ConfigProvider, Button, Spin, Space } from 'antd';
import UserChangeName from './userChangeName';
import UserChangePass from './userChangePass';
import UserChangeDetial from './userChangedetail';
import {
    LeftOutlined,
    HomeOutlined
} from '@ant-design/icons';
import Navbar from '../../../components/navbar';
import { GetUserInfo, GetGenderType, GetPrefixType } from '../../../service/pool';
import { UserInterface } from '../../../interface/pool';
import Cookies from 'js-cookie';

function UserAccount() {
    const [changeNameVisible, setChangeNameVisible] = useState(false);
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
    const [changeDetialVisible, setChangeDetialVisible] = useState(false);
    const [genderType, setGenderType] = useState<string | undefined>(undefined);
    const [prefixType, setPrefixType] = useState<string | undefined>(undefined);
    const [userData, setUserData] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        fetchUserData();
        fetchGenderType();
        fetchPrefixType();
    }, []);
    

    const fetchUserData = async () => {
        try {
            console.log('User ID from localStorage:', localStorage.getItem('UserID'));
            const id = localStorage.getItem('UserID');

            if (!id) {
                console.error('User ID not found in localStorage');
                return;
            }

            console.log('Fetching user data for user ID:', id);

            let data = await GetUserInfo(id);
            console.log('User data:', data);
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchGenderType = async () => {
        const id = localStorage.getItem("UserID");
        const data = await GetGenderType(id);
    
        if (data) {
            setGenderType(data.Gender); // Set the genderType state
        }
    };
    
    const fetchPrefixType = async () => {
        const id = localStorage.getItem("UserID");
        const data = await GetPrefixType(id);
    
        if (data) {
            setPrefixType(data.Prefix); // Set the prefixType state
        }
    };
    

    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

        return date.toLocaleDateString('TH', options);
    };

    const toggleChangeNamePop = () => {
        setChangeNameVisible(!changeNameVisible);
    };

    const toggleChangePasswordPop = () => {
        setChangePasswordVisible(!changePasswordVisible);
    };

    const toggleChangeDetialPop = () => {
        setChangeDetialVisible(!changeDetialVisible);
    };

    const handleToHome = () => {
        setTimeout(() => {
            navigate("/homepage");
        }, 500);
    };

    const getGenderLabel = (genderId: number) => {
        switch (genderId) {
          case 1:
            return "ชาย";
          case 2:
            return "หญิง";
          case 3:
            return "ไม่ระบุ";
          default:
            return "ไม่ระบุ"; // Handle unexpected values gracefully
        }
    };

    const getPrefixLabel = (prefixId: number) => {
        switch (prefixId) {
          case 1:
            return "นาย";
          case 2:
            return "นาง";
          case 3:
            return "นางสาว";
          default:
            return "ไม่ระบุ"; // Handle unexpected values gracefully
        }
    };

    if (loading) {
        return (
            <Space size="middle">
                <Spin size="large" />
            </Space>
        );
    }


    return (
        <div>
            <header style={{ backgroundColor: 'black' }}>
                <Navbar />
            </header>
            <ConfigProvider theme={{
                components: {
                    Button: {
                        colorPrimary: '#F5CE00',
                        algorithm: true,
                        primaryColor: '#000000',
                    },
                },
            }}>
                <div className='web-user'>
                    <div className='web-user-boxmain'>
                        <Button
                            className='back-button'
                            type='primary'
                            style={{ fontSize: 15, fontFamily: 'Mitr', marginTop: 0 }}
                            onClick={handleToHome}
                        ><HomeOutlined />กลับไป Home</Button>
                        {userData && userData.map(user => (
                            <div key={user.ID} className='web-user-box' style={{ marginTop: 0 }}>
                                {/* ============================================My Account=================================================================== */}
                                <div className='user-text-header'>My Account</div>
                                <div className='user-line' />
                                <div className='user-text'>Email: {user.Email}
                                    <div className='user-button'>
                                        <Button
                                            style={{ fontSize: 20, width: 120, height: 40, fontFamily: 'Mitr' }}
                                            type="primary"
                                            onClick={toggleChangePasswordPop}
                                        >เปลี่ยนรหัส</Button>
                                    </div>
                                    <UserChangePass visible={changePasswordVisible} onCancel={toggleChangePasswordPop} />
                                </div>

                                <div className='user-text'>Username: {user.Username}

                                    <div className='user-button'>
                                        <Button
                                            style={{ fontSize: 20, width: 120, height: 40, fontFamily: 'Mitr' }}
                                            type='primary'
                                            onClick={toggleChangeNamePop}
                                        >แก้ไขชื่อ</Button>
                                    </div>
                                    <UserChangeName visible={changeNameVisible} onCancel={toggleChangeNamePop} />
                                </div>



                                <div className='user-text'>Full Name: {getPrefixLabel(user.PrefixID)} {user.Firstname} {user.Lastname}
                                    <div className='user-button'>
                                        <Button
                                            style={{ fontSize: 20, width: 120, height: 40, fontFamily: 'Mitr' }}
                                            type='primary'
                                            onClick={toggleChangeDetialPop}
                                        >แก้ไขข้อมูล</Button>
                                    </div>
                                    <UserChangeDetial visible={changeDetialVisible} onCancel={toggleChangeDetialPop} />
                                </div>
                                <div className='user-text'>Gender: {getGenderLabel(user.GenderID)}

                                </div>

                                <div className='user-text'>Date of Birth: {formatDate(user.Dob)}

                                </div>
                                <div className='user-text'>Address: {user.Address}

                                </div>



                            </div>
                        ))}
                        {/* ===============================================Subscription================================================================ */}
                        <div className='web-user-box'>
                            <div className='user-text-header'>Subscription</div>
                            <div className='user-line' />
                            <div className='user-text'>Package:
                                <div className='user-button'>
                                    <Link to="/package">
                                        <Button style={{ fontSize: 20, width: 150, height: 40, fontFamily: 'Mitr' }} type='primary'>เปลี่ยนแพ็คเกจ</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className='user-text'>Exp:
                                <div className='user-button'>
                                    <Link to="/subhistory">
                                        <Button style={{ fontSize: 20, width: 150, height: 40, fontFamily: 'Mitr' }} type='primary'>ประวัติ</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className='user-text'></div>
                            <div className='user-button'>
                                <Button htmlType="button" style={{ fontSize: 20, width: 150, height: 40, fontFamily: 'Mitr' }}>ยกเลิก</Button>
                            </div>
                        </div>
                        <div className='web-user-box'>
                            {/* =========================================Other====================================================================== */}
                            <div className='user-text-header'>Other</div>
                            <div className='user-line' />
                            <div className='user-text'>ประวัติการรับชม
                                <div className='user-button'>
                                    <Link to="/moviehistory">
                                        <Button style={{ fontSize: 20, width: 170, height: 40, fontFamily: 'Mitr' }} type='primary'>ประวัติการรับชม</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className='user-text'>การดาวน์โหลด
                                <div className='user-button'>
                                    <Button style={{ fontSize: 20, width: 170, height: 40, fontFamily: 'Mitr' }} type='primary'>การดาวน์โหลด</Button>
                                </div>
                            </div>
                            <div className='user-text'>ติดต่อ Admin
                                <div className='user-button'>
                                    <Button style={{ fontSize: 20, width: 170, height: 40, fontFamily: 'Mitr' }} type='primary'>ติดต่อ Admin</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
            {/* <Footer style={{ textAlign: 'center' }}>Movie App ©2023 Created by Team03 of System Engineering</Footer> */}
        </div>
        
    );
};



export default UserAccount;
