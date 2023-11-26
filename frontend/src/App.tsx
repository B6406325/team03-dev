import './App.css';
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import FirstPage from './page/firstpage';
import Login from './page/login/Login';
import Register from './page/login/register/Register';
import Adminhome from './page/fook/adminhome/Adminhome';
import Movies from './page/fook/movie/Movie';
import Homepage from './page/note/Homepage/homepage';
import UserAccount from './page/pool/user_account/userAccount';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<FirstPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' element={<Adminhome/>}/>
        <Route path='/admin/movie' element={<Movies/>}/>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/account' element={<UserAccount/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
