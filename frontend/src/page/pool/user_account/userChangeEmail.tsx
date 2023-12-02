import React from 'react';
import { Form, Input, Button, Modal, ConfigProvider } from 'antd';

interface UserChangeEmailProps {
    visible: boolean;
    onCancel: () => void;
}

const UserChangeEmail: React.FC<UserChangeEmailProps> = ({ visible, onCancel }) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        // Handle form submission (update email and username)
        console.log('Form submitted:', values);
        // Add logic to update email and username
        onCancel();
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
                title={<span style={{ fontSize: '1.9em', padding: "20px", fontFamily: 'Mitr' }}>แก้ไขอีเมล์</span>}
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
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email',
                            },
                        ]}
                    >
                        <Input style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }} placeholder='New Email' />
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
                        <Input style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%' }} placeholder='Password' />
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
            </Modal>
        </ConfigProvider>
    );
};

export default UserChangeEmail;
