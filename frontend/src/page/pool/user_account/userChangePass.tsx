import React, { useState, useEffect } from 'react';
import { UpdateUser } from '../../../service/pool';
import { GetUserInfo } from '../../../service/pool';
import { UserInterface } from '../../../interface/pool';
import { Form, Input, Button, Modal, Select, DatePicker, ConfigProvider, message } from 'antd';

interface UserChangePassProps {
    visible: boolean;
    onCancel: () => void;
}

const UserChangePass: React.FC<UserChangePassProps> = ({ visible, onCancel }) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [upUser, setUpUser] = useState<UserInterface>();

    const getUserByEmail = async () => {
        try {
            const sid = "pool@gmail.com";
            const res = await GetUserInfo(sid);

            if (res && res.length > 0) {
                setUpUser(res[0]);
            }
        } catch (error) {
            console.error("Error fetching user information:", error);
            // Handle the error, e.g., show a message to the user
        }
    };

    const onFinish = async (values: any) => {
        try {
            // Validate current password
            const currentUser = await GetUserInfo("pool@gmail.com");
            if (!currentUser || currentUser.length === 0 || currentUser[0].Password !== values.currentPassword) {
                throw new Error("รหัสผ่านปัจจุบันไม่ถูกต้อง");
            }
    
            // Check if the new password is different from the current password
            if (values.currentPassword === values.newPassword) {
                throw new Error('รหัสผ่านใหม่ต้องแตกต่างจากรหัสผ่านปัจจุบัน');
            }
    
            // Update the password
            const updateData = [{
                Email: "pool@gmail.com",
                Password: values.newPassword,
            }];
    
            const updateResult = await UpdateUser(updateData);
    
            if (updateResult.status) {
                messageApi.open({
                    type: "success",
                    content: "เปลี่ยนรหัสผ่านสำเร็จ",
                });
    
                onCancel(); // Close the modal if needed
                window.location.reload(); // Reload the page
            } else {
                throw new Error("เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            const errorMessage: string = (error as Error)?.message || "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน";
            messageApi.open({
                type: "error",
                content: errorMessage,
            });
        }
    };
    
    
    useEffect(() => {
        getUserByEmail();
        // Set initial form values when user data changes
        form.resetFields(); // Reset the form
        form.setFieldsValue({
            newPassword: upUser?.Password,
        });
    }, [upUser]);
    
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
                <Form form={form} onFinish={onFinish}>
                <Form.Item
    name="currentPassword"
    rules={[{ required: true, message: 'Please enter your current password!' }]}
>
    <Input.Password
        style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }}
        placeholder='Current Password'
    />
</Form.Item>

<Form.Item
    name="newPassword"
    rules={[{ required: true, message: 'Please enter your new password!' }]}
>
    <Input.Password
        style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }}
        placeholder='New Password'
    />
</Form.Item>

<Form.Item
    name="confirmPassword"
    dependencies={['newPassword']}
    rules={[
        { required: true, message: 'Please confirm your new password!' },
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
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
