import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './report.css'
import { ConfigProvider, Button, Space, Table, Tag, Modal,Form,Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  LeftOutlined,
  HomeOutlined,
  EyeOutlined
} from '@ant-design/icons';
import Navbar from '../../../components/navbar';
import './reporttopic.css'
import { GetReport,GetTopicByID } from '../../../service/mix';
import { EditOutlined, DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';

import Cookies from 'js-cookie'; //npm install js-cookie
const { TextArea } = Input;
const { confirm } = Modal;



function Report() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  interface topics {
    ID: number,
    Topic: string,
  }
  const [filteredTopics, setFilteredTopics] = useState<topics[]>([]);
  const IDTopic = Number(Cookies.get('IDTopic'));

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this topic?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk() {
        // Handle delete logic here
        console.log('Topic deleted');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };


  const GetTopics = async (IDTopic: number) => {
    
    let res = await GetTopicByID(IDTopic);
    console.log(res.data)
    if (res.data) {
      setFilteredTopics([res.data]);
    }
  };
  useEffect(() => {
    GetTopics(IDTopic);
  }, [IDTopic]);






  return (
    <div><header style={{ backgroundColor: 'black' }}><Navbar /></header>
      <div className='report-page'>
        <div className='block-report'>
          <div className='block-report-head-text' style={{justifyContent:'center'}}>
            {filteredTopics.map((topic, index) => (
              <div key={index}>{topic.Topic}</div>
            ))}
            <div style={{marginTop:'4%'}}>

            
            <Form>
              <Form.Item name = "Desription">
                <TextArea rows={4} placeholder="maxLength is 500" maxLength={500} />
              </Form.Item>
            </Form>

            </div>
            <div className='report-mention'>
              <div className='report-mention-box'>
                <div className='report-mention-text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus facilisis ex vel ullamcorper. Suspendisse potenti. Nam eu dui at libero convallis eleifend. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus eu semper lectus, et ultricies justo. Sed at justo sed felis tincidunt scelerisque. Nulla facilisi. Suspendisse ac nunc at ligula finibus bibendum.

Fusce rhoncus, justo eu eleifend congue, nisl arcu rhoncus metus, at fermentum turpis risus in libero. Nulla facilisi. Nunc bibendum nisl nec velit feugiat hendrerit. Integer luctus efficitur augue, at tristique lectus facilisis id. Duis tristique, lacus at tincidunt fermentum, nisi justo eleifend orci, nec tincidunt lacus est vel orci. Phasellus ut congue erat. Curabitur euismod arcu a leo volutpat tempus.

                </div>
                <div className='report-mention-edit'>
                  <EditOutlined style={{ marginRight: '5px' }} />
                </div>
                <div className='report-mention-delete' onClick={() => showDeleteConfirm()}>
                  <DeleteOutlined style={{ marginRight: '5px' }}  />
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>
  )
}

export default Report;

