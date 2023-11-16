import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

export const CreateEmployeeComponent = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = async (formData) => {
    console.log(formData);
    const res = await axios.post('http://localhost:9999/api/v1/employees', formData)
    console.log(res);

    if (res.status === 200) {
      navigate("/", { state: { data: 'Record Added' } })
    }
  }

  return (
    <div>

      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3'>
            <h3 className='text-center'>Add Employee</h3>
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
