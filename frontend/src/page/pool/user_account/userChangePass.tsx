import React from 'react';
import { Form, Input, Button, Modal, ConfigProvider } from 'antd';

interface UserChangePassProps {
    visible: boolean;
    onCancel: () => void;
}

const UserChangePass: React.FC<UserChangePassProps> = ({ visible, onCancel }) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        // Handle form submission (update password)
        console.log('Password change submitted:', values);
        // Add logic to update the password
        onCancel(); // Close the modal after submission
    };

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
                <Form form={form}
                    onFinish={onFinish}>
                    <Form.Item
                        name="currentPassword"
                        rules={[{ required: true, message: 'Please enter your current password!' }]}
                    >
                        <Input.Password style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }} placeholder='Current Password' />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        rules={[{ required: true, message: 'Please enter your new password!' }]}
                    >
                        <Input.Password style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }} placeholder='New Password' />
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
                        <Input.Password style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }} placeholder='Confirm Password' />
                    </Form.Item>

                    <Form.Item >
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
