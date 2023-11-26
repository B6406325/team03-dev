import React from 'react';
import { Form, Input, Button, Modal } from 'antd';

interface UserChangeNameProps {
    visible: boolean;
    onCancel: () => void;
}

const UserChangeName: React.FC<UserChangeNameProps> = ({ visible, onCancel }) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        // Handle form submission (update email and username)
        console.log('Form submitted:', values);
        // Add logic to update email and username
        onCancel();
    };

    return (
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
                    name="username"
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
    );
};

export default UserChangeName;
