import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./subhistory.css"
import { ConfigProvider, Button, Space, Table, Tag, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    LeftOutlined,
    HomeOutlined,
    EyeOutlined
} from '@ant-design/icons';
import Navbar from '../../../components/navbar';


interface Subscription {
    key: string;
    name: string;
    price: string;
    imageURL: string;
}


function SubHistory() {
    const [imageData, setImageData] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();
    const [subscriptionData, setSubscriptionData] = useState([
        { key: '1', name: 'Subscription 1', price: '$10', imageURL: 'https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/bill-book/bill-book-102-600x800.png' },
        { key: '2', name: 'Subscription 2', price: '$20', imageURL: 'https://example.com/image2.jpg' },
        { key: '3', name: 'Subscription 3', price: '$10', imageURL: 'https://example.com/image1.jpg' },
        { key: '4', name: 'Subscription 4', price: '$20', imageURL: 'https://example.com/image2.jpg' },
        { key: '5', name: 'Subscription 5', price: '$10', imageURL: 'https://example.com/image1.jpg' },
        { key: '6', name: 'Subscription 6', price: '$20', imageURL: 'https://example.com/image2.jpg' },
        { key: '7', name: 'Subscription 7', price: '$20', imageURL: 'https://example.com/image2.jpg' },
        { key: '8', name: 'Subscription 8', price: '$10', imageURL: 'https://example.com/image1.jpg' },
        { key: '9', name: 'Subscription 9', price: '$20', imageURL: 'https://example.com/image2.jpg' },
        { key: '10', name: 'Subscription 8', price: '$10', imageURL: 'https://example.com/image1.jpg' },
        { key: '11', name: 'Subscription 9', price: '$20', imageURL: 'https://example.com/image2.jpg' },
        // Add more sample data as needed
    ]);



    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Subscription) => (
                <Button  onClick={() => handleViewImage(record)}>
                    <EyeOutlined /> ดูสลิป
                </Button>
            ),
        },
    ];

    const handleViewImage = (record: Subscription) => {
        setImageData(record.imageURL);
        setIsModalVisible(true);
    };


    const handleToHome = () => {
        setTimeout(() => {
            navigate("/homepage");
        }, 500);
    };



    return (
        <div><header style={{ backgroundColor: 'black' }}><Navbar /></header>
            <div className='web-subhistory'>

                <ConfigProvider theme={{
                    components: {
                        Button: {
                            colorPrimary: '#F5CE00',
                            algorithm: true,
                            primaryColor: '#000000',
                        },
                    },
                }}>

                    <div className='web-subhistory-boxmain'>
                        <Button
                            className='back-button'
                            type='primary'
                            style={{ fontSize: 15, fontFamily: 'Mitr' }}
                            onClick={handleToHome}
                        >
                            <HomeOutlined /> กลับไป Home
                        </Button>
                        <div className='web-subhistory-box' style={{ marginTop: 0 }}>
                            <div className='subhistory-text-header'>Subscription History</div>
                            <div className='subhistory-line' />
                            <Table
                                style={{ paddingRight: '40px', paddingLeft: '40px', marginTop: '10px' }}
                                dataSource={subscriptionData}
                                columns={columns}
                                pagination={{ pageSize: 6 }} />
                        </div>
                        <Modal
                            title="รูปสลิปของวันที่ "
                            visible={isModalVisible}
                            onCancel={() => setIsModalVisible(false)}
                            footer={null}
                        >
                            {imageData && <img src={imageData} alt="Subscription" style={{ width: '100%' }} />}
                        </Modal>
                    </div>

                </ConfigProvider>
            </div>
        </div>
    )
}

export default SubHistory;

