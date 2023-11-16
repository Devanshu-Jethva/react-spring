import ListEmployeesComponent from './components/ListEmployeesComponent'
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import { Route, Routes } from 'react-router-dom'
import { CreateEmployeeComponent } from './components/CreateEmployeeComponent'
import { UpdateEmployeeComponent } from './components/UpdateEmployeeComponent'
import ShowEmployee from './components/ShowEmployee'

function App() {

    return (
        <>
            <HeaderComponent />
            <div className='App'>
                <Routes>
                    <Route path='/' element={<ListEmployeesComponent />}></Route>
                    <Route path='/add-employee' element={<CreateEmployeeComponent />}></Route>
                    <Route path='/update-employee/:id' element={<UpdateEmployeeComponent />}></Route>
                    <Route path='/getEmployee/:id' element={<ShowEmployee />}></Route>
                </Routes>
            </div>
        </>
    )
}

export default App
