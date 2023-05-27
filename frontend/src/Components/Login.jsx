import React, { useState, useEffect } from 'react';

const Login = ({ url, values, setValues, user, setUser }) => {
  const URL = `${url}/api/auth`

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  const handleRegister = async () => {
    const { email, username, password, isMember } = values;
    if (isMember) {
      const userData = { username, email, password };
      const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    }
    const userData = { username, email, password };
    const response = await fetch(`${URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, isMember } = values;
    if (!email || !password || (!isMember && !username)) {
      console.log('Please fill out all fields');
      return;
    }
    const data = await handleRegister();
    if (data.token) {
      console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);
      setUser(data.user.username);
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  return (
    <>
      <div>
          <form className='login-form' onSubmit={onSubmit}>
            <h3>{values.isMember ? 'Login' : 'Register'}</h3>
            {/* name field */}
            {!values.isMember && (
              <div>
                <label htmlFor='username' className='form-label'>
                  Username
                </label>
                <input
                  id='username'
                  type='text'
                  name='username'
                  value={values.username}
                  onChange={handleChange}
                />
              </div>
            )}
            {/* email field */}
            <div className='form-row'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                id='email'
                type='email'
                name='email'
                value={values.email}
                onChange={handleChange}
              />
            </div>
            {/* password field */}
            <div>
              <label htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                className='form-input'
              />
            </div>
            <button type='submit' className='btn' >
              Submit
            </button>
            <p>
              {values.isMember ? 'Not a member yet?' : 'Already a member?'}
              <button type='button' onClick={toggleMember} className='btn single-mode'>
                {values.isMember ? 'Register' : 'Login'}
              </button>
            </p>
          </form>
      </div>
    </>
  );
}
export default Login;