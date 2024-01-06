import React, { useEffect, useState } from 'react';
import './Adminhome.css'
import { Button, Table, theme, message, Modal } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import type { ColumnType } from 'antd/es/table';
import { UserInterface } from '../../../interface/login';
import { ListUsers } from '../../../service/login';
import moment from 'moment';
import Search from 'antd/es/input/Search';
import { DeleteUserByID } from '../../../service/fook';


export default function Adminhome() {
  const columns: ColumnType<UserInterface>[] = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: 1,
      align:"center"
    },
    {
      title: "ชื่อผู้ใช้",
      dataIndex: "Username",
      key: 2,
      align:"center"
    },
    {
      title: "อีเมล",
      dataIndex: "Email",
      key: 3,
      align:"center"
    },
    {
      title: "รหัสผ่าน",
      dataIndex: "Password",
      key: 4,
      align:"center"
    },
    {
      title: "คำนำหน้า",
      dataIndex: "Prefix",
      key: 5,
      render: (item: any) => Object.values(item.Prefix),
    },
    {
      title: "ชื่อต้น",
      dataIndex: "Firstname",
      key: 6,
      align:"center"
    },
    {
      title: "ชื่อท้าย",
      dataIndex: "Lastname",
      key: 7,
      align:"center"
    },
    {
      title: "วันเกิด",
      dataIndex: "Dob",
      key: 8,
      align:"center",
      render: (text, record, index) => (
        <span>{moment(text).format('YYYY-MM-DD')}</span>
      ),
    },
    {
      title: "เพศ",
      dataIndex: "Gender",
      key: 9,
      render: (item: any) => Object.values(item.Gender),
    },
    {
      title: "สถานะ",
      dataIndex: "StatusUser",
      key: 10,
      render: (item: any) => Object.values(item.Status),
    },
    {
      title: "จัดการ",
      dataIndex: "manage",
      key: 10,
      render: (text, record, index) => (
        <>
        <Button onClick={() =>  navigate(`/user/edit/${record.ID}`)} shape="circle" icon={<EditOutlined/>} size={"large"} />
        <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined/>}
            size={"large"}
            danger
          />
        </>
      ),
    },
  ];
  const showModal = (val: UserInterface) => {
    setModalText(
      `ต้องการลบ ${val.Email} หรือไม่`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteUserByID(deleteId);
    if (res) {
      setOpen(false);
      message.success("ลบสำเร็จ")
      listUsers();
    } else {
      setOpen(false);
      message.error("เกิดข้อผิดพลาด")
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  
  const [size, setSize] = useState<SizeType>('large');
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const listUsers = async () => {
    let res = await ListUsers();
    if(res){
      setUsers(res);
    }
  };
  console.log(users);
  const navigate = useNavigate();
  function clickMovie() {
    navigate('/admin/movie');
  }
  function clickUser() {
    navigate('/admin');
  }
  function clickPayment() {
    navigate('/admin/payment');
  }
  function clickBack() {
    navigate('/');
  }
  const filteredUsers = users.filter((user) =>
  Object.values(user).some((value) =>
    value !== null && value !== undefined && value.toString().toLowerCase().includes(searchText.toLowerCase())
  )
  );
  useEffect(() => {
    listUsers();
  },[]);
  return (

    <div className='admin-page'>
      <div className='admin-sidebar'>
      <div className='admin-sidebar-top'>
        <div className='admin-sidebar-text'>
          ADMIN
        </div>
        <div className='admin-sidebar-menu'>
          <Button type="primary" shape="round" size={size} onClick={clickUser} style={{
            color: 'black', fontSize: 'large', fontWeight: 'bold', marginBottom: '10%', backgroundColor: '#F5CE00'
          }}>
            User
          </Button>
          <Button type="primary" shape="round" size={size} onClick={clickMovie} style={{
            color: 'black', fontSize: 'large', fontWeight: 'bold', marginBottom: '10%', backgroundColor: '#F5CE00'
          }}>
            Movies
          </Button>

          <Button type="primary" shape="round" size={size} onClick={clickPayment} style={{
            color: 'black', fontSize: 'large', fontWeight: 'bold', marginBottom: '10%', backgroundColor: '#F5CE00'
          }}>
            Payment
          </Button>
        </div>
        </div>

        <div className='admin-text-logout' onClick={clickBack}>
          logout
        </div>
      </div>
      <div className='admin-content-payment'>
        <div className='admin-content-payment-header'>
          <div className='admin-content-payment-header-text'>
            ADMIN HOME
          </div>
          <Search style={{marginLeft:20,width:500}} 
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            />
          <div className='admin-conteet-payment-header-right'>
            <div className='admin-content-payment-header-text2'>
              Admin01
            </div>
            <UserOutlined style={{ fontSize: '30px' }} />
          </div>
        </div>
        <div className='admin-user'>
          <Table columns={columns} dataSource={filteredUsers} scroll={{ x: '110vh', y: "65vh" }} pagination={false}></Table>
        </div>
        <Modal
            title="ลบข้อมูล?"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
        </Modal>
      </div>
    </div>

  );
}
