import React, { useState, useEffect } from 'react';
import { UpdateUser } from '../../../service/pool';
import { GetUserInfo } from '../../../service/pool';
import { UserInterface } from '../../../interface/pool';
import { Form, Input, Button, Modal, ConfigProvider, Col, Row, message } from 'antd';
import Cookies from 'js-cookie';
interface UserChangeNameProps {
    visible: boolean;
    onCancel: () => void;
}

const UserChangeName: React.FC<UserChangeNameProps> = ({ visible, onCancel }) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [upUser, setUpUser] = useState<UserInterface>();

    const id = Cookies.get('UserID');

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

    useEffect(() => {
        getUserByID();
        // Set initial form values when user data changes
        form.setFieldsValue({
            Username: upUser?.Username,
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
                title={<span style={{ fontSize: '1.9em', padding: "20px", fontFamily: 'Mitr' }}>แก้ไขข้อมูลผู้ใช้</span>}
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
                    <Form.Item
                        name="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your username',
                            },
                        ]}
                    >
                        <Input style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }} placeholder='New Username' />
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
                        <Button style={{ fontSize: 20, width: 100, height: 40, fontFamily: 'Mitr' }} type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button style={{ fontSize: 20, width: 100, height: 40, fontFamily: 'Mitr', marginLeft: 8 }} htmlType="button" onClick={onCancel}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
                {contextHolder}
            </Modal>
        </ConfigProvider>
    );
};

export default UserChangeName;
