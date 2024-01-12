import React, { useState, useEffect } from 'react';
import { UpdateUser } from '../../../service/pool';
import { GetUserInfo } from '../../../service/pool';
import { UserInterface } from '../../../interface/pool';
import { Form, Input, Button, Modal, ConfigProvider, message } from 'antd';
import Cookies from 'js-cookie';

interface UserChangePassProps {
    visible: boolean;
    onCancel: () => void;
}

const UserChangePass: React.FC<UserChangePassProps> = ({ visible, onCancel }) => {
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
                console.log("Entered CurrentPassword:", values.CurrentPassword);
                console.log("Entered NewPassword:", values.NewPassword);
                console.log("Database password:", user.Password);

                // Check if the entered password matches the current password
                if (values.CurrentPassword !== user.Password) {
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
                    // window.location.reload(); // Reload the page
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
        form.setFieldsValue({
            CurrentPassword: '', // Clear the CurrentPassword field when initializing
        });
    }, [form, getUserByID]);

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
                title={<span style={{ fontSize: '1.9em', padding: "20px", fontFamily: 'Mitr' }}>เปลี่ยนรหัส</span>}
                visible={visible}
                onCancel={onCancel}
                footer={null}
                width={600}
                centered
            >
                {contextHolder}
                <Form form={form} onFinish={onFinish}>
                    <Form.Item
                        name="CurrentPassword"
                        rules={[{ required: true, message: 'Please enter your current password!' }]}
                    >
                        <Input.Password
                            style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }}
                            placeholder='Current Password'
                        />
                    </Form.Item>

                    <Form.Item
                        name="NewPassword"
                        rules={[{ required: true, message: 'Please enter your new password!' }]}
                    >
                        <Input.Password
                            style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }}
                            placeholder='New Password'
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['NewPassword']}
                        rules={[
                            { required: true, message: 'Please confirm your new password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('NewPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }}
                            placeholder='Confirm Password'
                        />
                    </Form.Item>


                    <Form.Item>
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

export default UserChangePass;
