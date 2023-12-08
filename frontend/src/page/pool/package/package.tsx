import React, { useState, useEffect } from 'react';
import './package.css';
import { Button, ConfigProvider } from 'antd';
import { PackageComponent } from '../../../interface/pool';


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
            { id: 1, name: 'Package 1', price: 99, package_detail: 'ดูได้ 1 ความระเอียด 720p ดาวน์โหลดไม่ได้', download_status: false },
            { id: 2, name: 'Package 2', price: 329, package_detail: 'ดูได้ 2 ความระเอียด 1080p ดาวน์โหลดได้', download_status: true },
            { id: 3, name: 'Package 3', price: 459, package_detail: 'ดูได้ 4 ความระเอียด 1080p ดาวน์โหลดได้', download_status: true },
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
                                <div className='additional-box' style={{display: "grid", gridTemplateRows: "auto auto", gap: "1px"}}>
                                    <h2>{`${packageItem.price} บาท`}</h2>
                                    {`ดูได้ ${packageItem.package_detail.split(' ')[1]} จอ`}
                                    <p>{`${packageItem.package_detail.split(' ')[2]}`}</p>
                                    <p>{`${packageItem.package_detail.split(' ')[3]}`}</p>
                                    <p>{`${packageItem.package_detail.split(' ')[4]}`}</p>
                                </div>
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
