import { Button, Modal, Table, Tooltip, message } from 'antd';
import React, { useState, useEffect, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { DeleteOutlined, EditOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import './Movie.css'
import type { ColumnType } from 'antd/es/table';
import { MoviesInterface } from '../../../interface/fook';
import { DeleteMovieByID, ListMovies } from '../../../service/fook';

export default function Movies() {
  const columns: ColumnType<MoviesInterface>[] = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: 1,
      width: 68,
      align:"center"
    },
    {
      title: "รูป",
      dataIndex: "Image",
      key: 2,
      render: (text, record, index) => (
        <img src={record.Image} width="50%"/>
      )
    },
    {
      title: "ชื่อเรื่อง",
      dataIndex: "Title",
      key: 3,
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "เรื่องย่อ",
      dataIndex: "Description",
      key: 4,
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "ความยาว(min)",
      dataIndex: "Duration",
      key: 5,
    },
    {
      title: "วันที่ออกฉาย",
      dataIndex: "ReleaseDate",
      key: 6,
      render: (text, record, index) => (
        <span>{moment(text).format('YYYY-MM-DD')}</span>
      ),
    },
    {
      title: "ผู้กำกับ",
      dataIndex: "Director",
      key: 7,
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "นักแสดง",
      dataIndex: "Cast",
      key: 8,
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "วีดีโอ",
      dataIndex: "Video",
      key: 9,
      render: (text, record, index) => (
        <a
        href={text}
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch Video
      </a>
      )
    },
    {
      title: "หมวดหมู่",
      dataIndex: "Categories",
      key: 10,
      render: (item: any) => Object.values(item.Categories)
    },
    {
      title: "กลุ่มเป้าหมาย",
      dataIndex: "Target",
      key: 11,
      render: (item: any) => Object.values(item.Target)
    },
    {
      title: "รูปแบบเสียง",
      dataIndex: "Soundtrack",
      key: 12,
      render: (item: any) => Object.values(item.Soundtrack)
    },
    {
      title: "จัดการ",
      dataIndex: "manage",
      key: 13,
      render: (text, record, index) => (
        <>
        <Button  onClick={() =>  navigate(`/movie/edit/${record.ID}`)} shape="circle" icon={<EditOutlined/>} size={"large"} />
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
  const showModal = (val: MoviesInterface) => {
    setModalText(
      `ต้องการลบ ${val.Title} หรือไม่`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteMovieByID(deleteId);
    if (res) {
      setOpen(false);
      message.success("ลบสำเร็จ")
      listMovies();
    } else {
      setOpen(false);
      message.error("เกิดข้อผิดพลาด")
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [movies, setMovies] = useState<MoviesInterface[]>([]);
  const listMovies = async () => {
    let res = await ListMovies();
    if(res){
      setMovies(res);
    }
  };
  console.log(movies);
  useEffect(()=>{
    listMovies();
  }, []);

  const [size, setSize] = useState<SizeType>('large');
  const navigate = useNavigate();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();
  const [open, setOpen] = useState(false);
  function clickMovie() {
    navigate('/admin/movie');
  }
  function clickPayment() {
    navigate('/admin/payment');
  }
  function clickBack() {
    navigate('/');
  }
  function clickUser() {
    navigate('/admin');
  }

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
          <div className='admin-content-movie-header-left'>
            <div className='admin-content-payment-header-text'>
              Movie
            </div>
            <Link style={{ marginLeft: 50 }} to="/movie/create">
              <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#F5CE00' }}>
                เพิ่มข้อมูล
              </Button>
            </Link>
          </div>
          <div className='admin-conteet-payment-header-right'>
            <div className='admin-content-payment-header-text2'>
              Admin01
            </div>
            <UserOutlined style={{ fontSize: '30px' }} />
          </div>
        </div>
        <div className='admin-movie'>
          <Table columns={columns} dataSource={movies} scroll={{ x: 1000, y: 900 }} pagination={false} tableLayout='fixed'></Table>
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
    </div>
  );
}
