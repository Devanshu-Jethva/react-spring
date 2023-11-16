import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Delete, Edit, RemoveRedEye } from '@mui/icons-material';

const ListEmployeesComponent = () => {
  const [employees, setEmployees] = useState([]);

  const location = useLocation()

  const fetchEmployees = async (toastText) => {
    const res = await axios.get('http://localhost:9999/api/v1/employees');
    if (res.status === 200) {
      toast.success(location.state ? location.state.data : toastText + ' ✅', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (location.state) {
      location.state = null;
    }
    setEmployees(res.data);
  }


  useEffect(() => {
    fetchEmployees('Data Fetched');
  }, [])

  const deleteEmployee = async (id) => {
    const res = await axios.delete(`http://localhost:9999/api/v1/delete-employee/${id}`)
    console.log(res);
    if (res.status === 200) {
      toast.warn('Record Deleted ✔️', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    fetchEmployees('Data Updated');
  }


  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <h2 className='text-center mb-2'>Employee List</h2>

      <div className='row mb-2'>
        <div className='col-2'>
          <Link to={'/add-employee'} className='btn btn-outline-primary'>+ Add Employee</Link>
        </div>
      </div>

      <table className="table table-hover table-bordered table-striped">
        <thead className='table-dark'>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
            <th scope="col" className='w-25'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            employees?.map((data, index) => {
              return (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.emailId}</td>
                  <td className='d-flex justify-content-evenly'>
                    <Link to={`/update-employee/${data.id}`} className='btn btn-outline-success'>
                      <Edit />
                    </Link>
                    <button onClick={() => deleteEmployee(data.id)} className='btn btn-outline-danger'>
                      <Delete />
                    </button>
                    <Link to={`/getEmployee/${data.id}`} className='btn btn-outline-info'>
                      <RemoveRedEye />
                    </Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default ListEmployeesComponent