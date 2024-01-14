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
  const [upUser, setUpUser] = useState<UserInterface | undefined>();
  const id = Cookies.get('UserID');

  const onFinish = async (values: any) => {
    try {
      const currentUser = await GetUserInfo(id);

      if (currentUser && currentUser.length > 0) {
        const user = currentUser[0];

        if (values.CurrentPassword !== user.Password) {
          throw new Error('Incorrect current password');
        }

        const updatedUser = { ...user, Password: values.NewPassword };

        // Update the user data including the password
        await UpdateUser(updatedUser);

        messageApi.success('Password changed successfully');
        onCancel();
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      const errorMessage: string =
        (error as Error)?.message || 'Error updating password';
      messageApi.error(errorMessage);
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
      NewPassword: upUser?.Password,
    });
  }, []);

  return (
    <ConfigProvider
      theme={{
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
          },
        },
      }}
    >
      <Modal
        title={<span style={{ fontSize: '1.9em', padding: '20px', fontFamily: 'Mitr' }}>Change Password</span>}
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
              placeholder="Current Password"
            />
          </Form.Item>

          <Form.Item
            name="NewPassword"
            rules={[
              { required: true, 
                message: 'Please enter your new password!' },
              {
                min: 4,
                message: "รหัสผ่านไม่ต่ำกว่า 4 ตัว"
              }]}
          >
            <Input.Password
              style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }}
              placeholder="New Password"
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
              {
                min: 4,
                message: "รหัสผ่านไม่ต่ำกว่า 4 ตัว"
              }
            ]}
          >
            <Input.Password
              style={{ fontSize: '1.4em', fontFamily: 'Mitr', width: '100%', marginTop: '10px' }}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ fontSize: 20, width: 100, height: 40, fontFamily: 'Mitr' }}
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
            <Button
              style={{ fontSize: 20, width: 100, height: 40, fontFamily: 'Mitr', marginLeft: 8 }}
              htmlType="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default UserChangePass;
