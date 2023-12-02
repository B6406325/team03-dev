import React, { useState, useEffect } from 'react';
import './package.css';
import { Button, ConfigProvider } from 'antd';

interface PackageComponent {
    id: number;
    name: string;
    price: number;
    duration: string;
}

const Package: React.FC = () => {
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
    const [packages, setPackages] = useState<PackageComponent[]>([]);

    useEffect(() => {
        // สมมติว่ามีฟังก์ชันใน API ที่ทำการดึงข้อมูล Subscription Packages
        // const fetchData = async () => {
        //   try {
        //     const response = await fetch('URL_TO_YOUR_API_ENDPOINT');
        //     const data = await response.json();
        //     setPackages(data);
        //   } catch (error) {
        //     console.error('Error fetching data:', error);
        //   }
        // };

        // fetchData();

        // สร้างข้อมูล Subscription Packages แบบ mock ไว้ก่อน
        const mockPackages: PackageComponent[] = [
            { id: 1, name: 'Package 1', price: 99, duration: '7 วัน' },
            { id: 2, name: 'Package 2', price: 329, duration: '30 วัน' },
            { id: 3, name: 'Package 3', price: 3499, duration: '1 ปี' },
        ];

        setPackages(mockPackages);
    }, []);

    const handlePackageClick = (packageId: number) => {
        setSelectedPackage(packageId);
    };

    const handleCancelClick = () => {
       
    };

    const handleNextClick = () => {
        // ทำตราบางอย่างเมื่อคลิกที่ปุ่ม 'ถัดไป'
    };

    return (
        <div>
            <ConfigProvider theme={{
                components: {
                    Button: {
                        colorPrimary: '#F5CE00',
                        algorithm: true,
                        primaryColor: '#000000',
                    },
                },
            }}>
                <div className='web-package'>
                    <div className='box-main-container'>
                        <div className='box-main-container-inner'>
                            <div className='package-text'>เลือกแพ็คเกจ</div>
                        </div>
                        {packages.map((packageItem) => (
                            <div
                                key={packageItem.id}
                                className={`package-box-selected ${selectedPackage === packageItem.id ? 'clicked' : ''}`}
                                onClick={() => handlePackageClick(packageItem.id)}
                            >
                                <div className='package-box-selected-text'>{packageItem.name}</div>
                                <div className='additional-box'>{`${packageItem.duration}/${packageItem.price} บาท`}</div>
                            </div>
                        ))}
                        <div className='button-cancel'>
                            <Button onClick={handleCancelClick}
                                style={{ width: '100px', height: "40px", fontFamily: 'Mitr', fontSize: 20, textAlign: "center" }} danger>
                                ยกเลิก
                            </Button>
                        </div>
                        <div className='button-next'>
                            <Button onClick={handleNextClick}
                                style={{ width: '100px', height: "40px", fontFamily: 'Mitr', fontSize: 20, textAlign: "center" }} >
                                ถัดไป
                            </Button>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </div>
    );
};

export default Package;
