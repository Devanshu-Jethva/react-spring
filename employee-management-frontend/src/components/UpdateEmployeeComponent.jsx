import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateEmployeeComponent = () => {

  const id = useParams().id

  const { register, handleSubmit } = useForm({
    defaultValues: async () => {
      const res = await axios.get(`http://localhost:9999/api/v1/employees/${id}`)
      console.log(res.data);

      return ({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        emailId: res.data.emailId
      })
    }
  });

  const navigate = useNavigate();


  const submit = async (formData) => {

    console.log(formData);
    const res = await axios.put(`http://localhost:9999/api/v1/update-employee/${id}`, formData)
    console.log(res);

    navigate("/", { state: { data: 'Data Updated' } })
  }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3'>
            <h3 className='text-center'>Update Employee</h3>
            <div className='card-body'>
              <form onSubmit={handleSubmit(submit)} className='form'>

                <div className='form-group'>
                  <div style={{ textAlign: 'left' }} className='mb-1'>
                    <label className="form-label">FirstName</label>
                  </div>
                  <input type="text" className='form-control mb-3' placeholder='FirstName' {...register("firstName")} />
                </div>

                <div className='form-group mb-1'>
                  <div style={{ textAlign: 'left' }}>
                    <label className="form-label">LastName</label>
                  </div>
                  <input type="text" className='form-control mb-3' placeholder='LastName' {...register("lastName")} />
                </div>

                <div className='form-group mb-1'>
                  <div style={{ textAlign: 'left' }}>
                    <label className="form-label">Email</label>
                  </div>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder='Email'
                    {...register("emailId")}
                  />
                </div>

                <button type="submit" className="btn btn-outline-success">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
