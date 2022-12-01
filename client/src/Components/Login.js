import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className="row row-cols-1 row-cols-lg-8">
    <section className="col mb-4 align-self-center">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-11">
            <div className="card shadow-2-strong" >
            {data ? (
                      <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                    ) : (
              <form className="card-body p-5 text-center login-form" onSubmit={handleFormSubmit}>
                <h3 className="mb-5">Sign in</h3>
                <div className="form-outline mb-4">
                  <input  name="email"
                       type="email"
                       value={formState.email}
                       onChange={handleChange}  placeholder="Email Address" className="form-control form-control-lg" />
                  <label className="form-label" >Email</label>
                </div>
                <div className="form-outline mb-4">
                  <input    name="password"
                       type="password"
                       value={formState.password}
                       onChange={handleChange} placeholder="Password" className="form-control form-control-lg" />
                  <label className="form-label" >Password</label>
                </div>
                <div className="form-check d-flex justify-content-start mb-4">
                  <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                  <label className="form-check-label" > Remember password </label>
                </div>
                <button className="btn btn-secondary btn-lg btn-block" type="submit">Login</button>
              </form>
                )}
                {error && (
                    <div className="my-3 p-3 bg-danger text-white">
                      {error.message}
                    </div>
                  )}
            </div>
          </div>
        </div>
      </div>
    </section>
      </div>
  );
};

export default Login;







































