import './App.css';
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import FirstPage from './page/firstpage';
import Login from './page/login/Login';
import Register from './page/login/register/Register';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<FirstPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
