import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ShowEmployee = () => {
  const id = useParams().id

  const [employee, setEmployee] = useState({})

  const getEmployee = async () => {
    const res = await axios.get(`http://localhost:9999/api/v1/employees/${id}`)
    console.log(res);
    setEmployee(res.data)
  }

  useEffect(() => {
    getEmployee()
  }, [])


  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <h2>
                Employee Details
              </h2>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <p id="firstName">{employee.firstName}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <p id="lastName">{employee.lastName}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <p id="email">{employee.emailId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link to={'/'} className='btn btn-outline-dark mt-3'>
        Go Back
      </Link>
    </>
  )
}

export default ShowEmployee