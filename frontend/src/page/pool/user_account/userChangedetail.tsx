import { UpdateUser } from '../../../service/pool';
import { GetUserInfo } from '../../../service/pool';
import { UserInterface, GenderUserInterface, PrefixUserInterface } from '../../../interface/pool';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Select, DatePicker, ConfigProvider, message } from 'antd';
import { GetGenders, GetPrefix } from '../../../service/login';
interface UserChangeDetialProps {
    visible: boolean;
    onCancel: () => void;
}

const { Option } = Select;

const UserChangeDetial: React.FC<UserChangeDetialProps> = ({ visible, onCancel }) => {
    const [form] = Form.useForm();
    const [genders, setGenders] = useState<GenderUserInterface[]>([]);
    const [prefix, setPrefix] = useState<PrefixUserInterface[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [upUser, setUpUser] = useState<UserInterface>();

    const id = localStorage.getItem('UserID');

    const onFinish = async (values: any) => {
        try {
            // Fetch the user's current data
            const currentUser = await GetUserInfo(id);

            console.log("Current user:", currentUser);
            if (currentUser && currentUser.length > 0) {
                const user = currentUser[0];
                console.log("Entered password:", values.password);
                console.log("Database password:", user.Password);

                // Check if the entered password matches the current password
                if (values.password !== user.Password) {
                    throw new Error("รหัสผ่านเดิมไม่ถูกต้อง");
                }

                // Update the user data including the password
                let res = await UpdateUser(values);

                if (res.status) {
                    messageApi.open({
                        type: "success",
                        content: "แก้ไขข้อมูลสำเร็จ",
                    });

                    onCancel(); // Close the modal if needed
                    window.location.reload(); // Reload the page
                }
            } else {
                // Handle the case when the user is not found
                console.error("User not found");
                messageApi.open({
                    type: "error",
                    content: "ไม่พบข้อมูลผู้ใช้",
                });
            }
        } catch (error) {
            console.error("Error updating user:", error);
            const errorMessage: string = (error as Error)?.message || "เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้";
            messageApi.open({
                type: "error",
                content: errorMessage,
            });
        }
    };



    const getUserByID = async () => {
        try {
            let res = await GetUserInfo(id);

            if (res) {
                setUpUser(res);
            }
        } catch (error) {
            console.error("Error fetching user information:", error);
            // Handle the error, e.g., show a message to the user
        }
    };

    const getGender = async () => {
        let res = await GetGenders();
        if (res) {
            setGenders(res);
        }
    };

    const getPrefix = async () => {
        let res = await GetPrefix();
        if (res) {
            setPrefix(res);
        }
    };

    useEffect(() => {
        getGender();
        getPrefix();
        getUserByID();
        // Set initial form values when user data changes
        form.setFieldsValue({
            Firstname: upUser?.Firstname,
            Lastname: upUser?.Lastname,
            Address: upUser?.Address,
            Dob: upUser?.Dob,
            GenderID: upUser?.GenderID,
            PrefixID: upUser?.PrefixID
        });
    }, []);

    return (
        <ConfigProvider theme={{
            components: {
                Button: {
                    colorPrimary: '#F5CE00',
                    algorithm: true,
                    primaryColor: '#000000',
                },
                Input: {
                    colorPrimary: '#F5CE00',
                    algorithm: true,
                },
                Select: {
                    colorPrimary: '#F5CE00',
                    algorithm: true,
                },
                DatePicker: {
                    colorPrimary: '#F5CE00',
                    algorithm: true,
                }
            },
        }}>
            <Modal
                title={<span style={{ fontSize: '1.9em', padding: "20px", fontFamily: 'Mitr' }}>แก้ไขข้อมูลส่วนตัว</span>}
                visible={visible}
                onCancel={onCancel}
                footer={null}
                width={600}
                centered

            >
                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item name="PrefixID">
                        <Select style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '30%', height: '40px', marginTop: '10px' }} placeholder='คำนำหน้า'>
                            {prefix.map((item) => (<Option value={item.ID} key={item.Prefix}>{item.Prefix}</Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="Firstname"
                    >
                        <Input style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }} placeholder='New Firstname' />
                    </Form.Item>
                    <Form.Item
                        name="Lastname"
                    >
                        <Input style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }} placeholder='New Lastname' />
                    </Form.Item>
                    <Form.Item
                        name="Address"
                    >
                        <Input style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }} placeholder='New Address' />
                    </Form.Item>

                    <Form.Item name="Dob">
                        <DatePicker style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '30%', height: '40px', marginTop: '10px' }} placeholder='วันเกิด'></DatePicker>
                    </Form.Item>

                    <Form.Item name="GenderID">
                        <Select style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '30%', height: '40px', marginTop: '10px' }} placeholder='เพศ'>
                            {genders.map((item) => (<Option value={item.ID} key={item.Gender}>{item.Gender}</Option>))}
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password',
                            },
                        ]}
                    >
                        <Input.Password style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%' }} placeholder='Password' />
                    </Form.Item>

                    <Form.Item style={{ marginTop: '10px' }}>
                        {contextHolder}
                        <Button style={{ fontSize: 20, width: 100, height: 40, fontFamily: 'Mitr' }} type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button style={{ fontSize: 20, width: 100, height: 40, fontFamily: 'Mitr', marginLeft: 8 }} htmlType="button" onClick={onCancel}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};

export default UserChangeDetial;
