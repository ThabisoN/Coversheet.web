import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import logo from './logo.svg';
import './App.css';
import { Sheet } from './Components/Sheet';
import { ManagerSheet } from './Components/ManagerSheet';
import { Department } from './Components/Department';
import { Invoice } from './Components/Invoice';
import { Manager } from './Components/Manager';
import { Supplier } from './Components/Supplier';
import { BrowserRouter, Router,Route, Switch, NavLink, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className='App container'>
      <h3 className='d-flex justify-content-center m-3'>
       Platinum Life Sheet
      </h3>

      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className='navbar-nav'>
          <li className='nav-item- m-1'>
            <NavLink className="btn btn=light btn-outline-primary" to="/sheet">
              Cover Sheet
            </NavLink>
          </li>
          <li className='nav-item- m-1'>
            <NavLink className="btn btn=light btn-outline-primary" to="/managersheet">
              Manager SignOff Sheet
            </NavLink>
          </li>
          <li className='nav-item- m-1'>
            <NavLink className="btn btn=light btn-outline-primary" to="/department">
              Department
            </NavLink>
          </li>
          <li className='nav-item- m-1'>
            <NavLink className="btn btn=light btn-outline-primary" to="/invoice">
              Invoice
            </NavLink>
          </li>
          <li className='nav-item- m-1'>
            <NavLink className="btn btn=light btn-outline-primary" to="/manager">
              Manager
            </NavLink>
          </li>
          <li className='nav-item- m-1'>
            <NavLink className="btn btn=light btn-outline-primary" to="/Supplier">
              Supplier
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/sheet' element={<Sheet />} />
        <Route path='/managersheet' element={<ManagerSheet />} />
        <Route path='/department' element={<Department />} />
        <Route path='/invoice' element={<Invoice />}/>
        <Route path='/manager' element={<Manager />}/>
        <Route path='/supplier' element={<Supplier />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
