import './App.css';
import {useFirebaseApp} from 'reactfire';
import Auth from './components/Auth';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login'
import Register from './components/Login/Register';
import Dashboard from './components/Login/Dashboard';
import CampusList from './components/Campus/CampusList';
import CampusForm from './components/Campus/CampusForm';

function App() {

  const firebase = useFirebaseApp();
  console.log(firebase);

  return (
    <div className="App">
     <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/campusList" element={<CampusList />} />
          <Route exact path="/userList" element={<Dashboard />} />
          <Route exact path="/newCampus" element={<CampusForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
