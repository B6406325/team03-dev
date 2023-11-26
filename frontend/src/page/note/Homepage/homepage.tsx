import React,{useState,useEffect} from 'react';
import {AppstoreOutlined, BookOutlined, HomeOutlined, SearchOutlined,StarOutlined,UserOutlined,} from '@ant-design/icons';
import {  ConfigProvider, Layout, Menu,Carousel,Card  } from 'antd';
import './homepage.css';
import MovieDtailpage from '../MovieDetailpage/movieDetailpage';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const contentStyle: React.CSSProperties = {
    margin:0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
    width:'100%',
    borderRadius:'20px',
};

export default function Homepage(){
      const navigate = useNavigate();
      const [isMenuFixed, setIsMenuFixed] = useState(false);
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const scrollThreshold = 100; // Adjust this value based on your design
    
        // Set isMenuFixed to true if the user has scrolled beyond the threshold
        setIsMenuFixed(scrollPosition > scrollThreshold);
      };
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      const [activeMenuItem, setActiveMenuItem] = useState(() => {
        // Retrieve the active menu item from localStorage or use a default value ('home' in this case)
        return localStorage.getItem('activeMenuItem') || 'home';
      });
    
      const handleMenuClick = (menuItem: { key: React.Key }) => {
        const clickedMenuItem = menuItem.key.toString();
      
        // Check if the clicked item is the "Logout" item
        if (clickedMenuItem === 'logout') {
          // Reset the active menu item to 'home'
          setActiveMenuItem('home');
      
          // Clear the stored active menu item from localStorage
          localStorage.removeItem('activeMenuItem');
      
          // Perform logout logic (if needed)
      
          // Navigate to the login page
          navigate('/login');
        } else {
          // Set the active menu item for other menu items
          setActiveMenuItem(clickedMenuItem);
      
          // Save the active menu item in localStorage
          localStorage.setItem('activeMenuItem', clickedMenuItem);
        }
      };
    //   const handleLogout = () => {  
    //     setActiveMenuItem('home');
    //     localStorage.removeItem('activeMenuItem');  
    //     setTimeout(function () {
    //         navigate("/login");
    //       }, );

    //   };
      const { SubMenu } = Menu;
      const { Meta } = Card;

    
    return(
        <ConfigProvider
            theme={{
                components:{
                    Layout:{
                        headerBg:'black',headerColor:'white'
                    },
                    Menu:{
                        darkItemHoverColor:'#F5CE00',
                        colorPrimary:'#F5CE00',
                        horizontalItemHoverColor:'#000000',
                    }
                    }, 
                token:{
                    
                },  
                }
                
            }
            
        >
            <Layout>
                <div style={{ position: isMenuFixed ? 'fixed' : 'static', width: '100%', zIndex: 1, top: 0 }}>
                <Header >
                    <div>
                        <img src='https://i.imgur.com/DFHK2rz.png' style={{width:'10%',height:'20%',position:isMenuFixed ? 'fixed' : 'absolute',zIndex:1,top:-40}}></img>
                    </div>
                    <Menu style={{background:'black',}} theme="dark" mode="horizontal" selectedKeys={[activeMenuItem]}onClick={handleMenuClick}>
                    <Menu.Item key="home" icon={<HomeOutlined />} style={{left:'35%'}}>
                        หน้าแรก
                    </Menu.Item>
                    <Menu.Item key="topRated" icon={<StarOutlined />} style={{left:'35%'}}>
                        เรทติ้งสูงสุด
                    </Menu.Item>
                    <Menu.Item key="categories" icon={<AppstoreOutlined />} style={{left:'35%'}}>
                        หมวดหมู่
                    </Menu.Item>
                    <Menu.Item key="myList" icon={<BookOutlined />} style={{left:'35%'}}>
                        รายการของฉัน
                    </Menu.Item>
                    <Menu.Item key="search" icon={<SearchOutlined />} style={{left:'35%'}}>
                        ค้นหา
                    </Menu.Item>
                    <SubMenu key="profile" icon={<UserOutlined />} title="โปรไฟล์" style={{left:'60%'}}>
                        {/* Dropdown menu items go here */}
                        <Menu.Item key="viewProfile">ดูโปรไฟล์</Menu.Item>
                        <Menu.Item key="editProfile">แก้ไขโปรไฟล์</Menu.Item>
                        <Menu.Item key="logout">ออกจากระบบ</Menu.Item>
                    </SubMenu>

                    </Menu>
        
                </Header></div>
                <Content  style={{ padding: '20px', background:'#000000'}}>

    {/*=============================================HOME PAGE=============================================================*/}

                {activeMenuItem === 'home' && ( 
                    
                    <div style={{width:'1024px',left:'15%',position:'relative'}}>
                    <Carousel autoplay className='carousel-home'>
                            <div >
                                <img src='https://i.imgur.com/UvhHnWC.jpg' alt="Slide 1" style={contentStyle}></img>
                            </div>
                            <div >
                                <img src='https://i.imgur.com/szjFQVM.jpg' alt="Slide 2" style={contentStyle} ></img>
                            </div>
                            <div>
                                <img src='https://i.imgur.com/rtVUh2D.jpg' alt="Slide 3" style={contentStyle} ></img>
                            </div>
                            <div>
                                <img src='https://i.imgur.com/N5rYH6N.jpg' alt="Slide 4" style={contentStyle} ></img>
                            </div>
                       
                    </Carousel>

                     {/* New section for movie posters */}
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    {/* Movie Poster 1 */}
                        <Card
                            hoverable
                            style={{ width: 200, marginBottom: '20px' }}
                            cover={<img alt="Movie Poster 1" src="https://i.imgur.com/VIQdyDD.jpg" />}
                        >
                            <Meta title="Movie Title 1" description="Release Date: 2023" />
                        </Card>

                        {/* Movie Poster 2 */}
                        <Card
                            hoverable
                            style={{ width: 200, marginBottom: '20px' }}
                            cover={<img alt="Movie Poster 2" src="https://i.imgur.com/LG0ZHxq.jpg" />}
                        >
                            <Meta title="Movie Title 2" description="Release Date: 2023" />
                        </Card>

                        {/* Movie Poster 3 */}
                        <Card
                            hoverable
                            style={{ width: 200, marginBottom: '20px' }}
                            cover={<img alt="Movie Poster 3" src="https://i.imgur.com/bWgVu4c.jpg" />}
                        >
                            <Meta title="Movie Title 3" description="Release Date: 2023" />
                        </Card>
                          {/* Movie Poster 4 */}
                          <Card
                            hoverable
                            style={{ width: 200, marginBottom: '20px' }}
                            cover={<img alt="Movie Poster 4" src="https://i.imgur.com/L30TIsI.jpg" />}
                        >
                            <Meta title="Movie Title 4" description="Release Date: 2023" />
                        </Card>
                          {/* Movie Poster 5 */}
                          <Card
                            hoverable
                            style={{ width: 200, marginBottom: '20px' }}
                            cover={<img alt="Movie Poster 5" src="https://i.imgur.com/cPgk3pr.jpg" />}
                        >
                            <Meta title="Movie Title 5" description="Release Date: 2023" />
                        </Card>
                          {/* Movie Poster 5 */}
                          <Card
                            hoverable
                            style={{ width: 200, marginBottom: '20px' }}
                            cover={<img alt="Movie Poster 5" src="https://i.imgur.com/cPgk3pr.jpg" />}
                        >
                            <Meta title="Movie Title 5" description="Release Date: 2023" />
                        </Card>
                    </div>
                    <div>
                        {/*CasinoImg*/}
                        <img src="https://i.imgur.com/B9Es0Op.gif" alt="casino" style={{top:'1%',right:'102%',width:'210px',height:'360px',position:'absolute'}}></img></div>
                </div>)}
    {/*=============================================TOPRATE PAGE=============================================================*/}
                    {activeMenuItem === 'topRated' && (
                        <div style={{position:'relative'}}>
                        <div style={{color:'white'}}><h1>เรทติ้งสูงสุด</h1></div>
                        <div><MovieDtailpage/></div>{/*ตรงนี้สามารถนำหน้าอื่นมาใส่ได้เลย */}
                        </div>
                    )}
    {/*=============================================CATEGORIES PAGE=============================================================*/}

                    {activeMenuItem === 'categories' && (
                        <div>
                        <div style={{color:'white'}}><h1>หมวดหมู่</h1></div>
                        </div>
                    )}
    {/*=============================================MYLIST PAGE=============================================================*/}
                    {activeMenuItem === 'myList' && (
                        <div>
                        <div style={{color:'white'}}><h1>รายการของฉัน</h1></div>
                        </div>
                    )}
    {/*=============================================SEARCH PAGE=============================================================*/}
                    {activeMenuItem === 'search' && (
                        <div>
                        <div style={{color:'white'}}><h1>ค้นหา</h1></div>
                        </div>
                    )}
             
                </Content>
                <Footer style={{ textAlign: 'center' }}>Movie App ©2023 Created by Team03 of System Engineering</Footer>
            </Layout>




            
                    
                
        </ConfigProvider>
    );
}