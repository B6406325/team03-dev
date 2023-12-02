import React from 'react';
import { Form, Input, Button, Modal, Select } from 'antd';

interface UserChangeDetialProps {
    visible: boolean;
    onCancel: () => void;
}

const UserChangeDetial: React.FC<UserChangeDetialProps> = ({ visible, onCancel }) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        // Handle form submission (update email and username)
        console.log('Form submitted:', values);
        // Add logic to update email and username
        onCancel();
    };

    return (
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
                <Form.Item
                    name="Fullname"
                >
                    <Input style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }} placeholder='New Fullname' />
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
                <Form.Item
                    name="Lastname"
                >
                    <Select style={{fontSize: '1.4em', fontFamily: 'Mitr', width: '30%', height: '40px', marginTop: '10px'}} placeholder='เพศ'></Select>
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

export default UserChangeDetial;
