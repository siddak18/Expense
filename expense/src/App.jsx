
import './App.css';
import Expense from './components/Expense';
import Home from './components/Home';
import Income from './components/Income';
import Math from './components/Math';
import Login from './components/Login';
import {Routes ,Route} from 'react-router-dom'
import Signup from './components/Signup';
function App() {
  return (
    <div className="des" >
      <Routes>
        <Route exact path='/' Component={Login}></Route>
        <Route exact path='/home/:id' Component={Home}></Route>
        <Route exact path='/signup' Component={Signup}></Route>
      </Routes>
    </div>
  );
}

export default App;
