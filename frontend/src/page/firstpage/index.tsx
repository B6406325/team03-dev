import { ConfigProvider , Button} from 'antd';
import {useNavigate} from 'react-router-dom';

export default function FirstPage(){
    const navigate = useNavigate();

    function onClickLogin(){
      navigate("/login");
  }
  
    function onClickReg(){
      navigate("/register");
    }
    return(
        <ConfigProvider theme={{
            components:{
                Button:{
                    colorPrimary: '#F5CE00',
                    algorithm: true,
                    primaryColor: '#000000',
                },
            },
        }}>
          <div className="App">
            <div className='button01'>
              <Button style={{fontSize: 25,width: 200,height:50,fontFamily:'Mitr'}} type='primary' onClick={onClickLogin}>เข้าสู่ระบบ</Button>
            </div>
            <div className='logoweb'>
            LOGO
            </div>
            <div className='button02'>
              <Button style={{fontSize: 25,width: 200,height:50,fontFamily:'Mitr'}} type='primary' onClick={onClickReg}>สมัครสมาชิก</Button>
            </div>
          </div>
          </ConfigProvider>
    );
}