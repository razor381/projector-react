import React, { useState } from 'react';

import Card from '../../dumb/Card';
import formStyles from '../form.module.css';

/**
* @TODO refactor form into separate generic component
*/

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (e) => {
    setEmail(e.target.value);
  };

  const validatePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    props.onSubmit({
      email,
      password,
    });
  };

  return (
    <Card>
      <form className={formStyles.form} onSubmit={submitHandler}>
        <h3 className={formStyles['form-header']}>Login</h3>

        <div className={formStyles['form-element']}>
          <label htmlFor="login-email" className={formStyles['form-element__label']}>Email</label>
          <input
            id="login-email"
            required
            onChange={validateEmail}
            value={email}
            type="text"
            placeholder="Enter Email"
            className={formStyles['form-element__input']}
          />
        </div>

        <div className={formStyles['form-element']}>
          <label htmlFor="login-password" className={formStyles['form-element__label']}>Password</label>
          <input
            id="login-password"
            required
            onChange={validatePassword}
            value={password}
            type="password"
            placeholder="Enter Password"
            className={formStyles['form-element__input']}
          />
        </div>

        <div className={formStyles['form-element']}>
          <button type="submit" className={formStyles['form-element__submit-btn']}>Send</button>
        </div>

      </form>
    </Card>
  );
};

export default Login;
