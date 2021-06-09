import React, { useState } from 'react';

import Card from '../../dumb/Card';
import formStyles from '../form.module.css';

/**
* @TODO refactor form into separate generic component
*/

const Signup = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateName = (e) => {
    setName(e.target.value);
  };

  const validateEmail = (e) => {
    setEmail(e.target.value);
  };

  const validatePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    props.onSubmit({
      name,
      email,
      password,
      password_confirm: confirmPassword,
    });
  };

  return (
    <Card>
      <form className={formStyles.form} onSubmit={submitHandler}>
        <h3 className={formStyles['form-header']}>Signup</h3>

        <div className={formStyles['form-element']}>
          <label htmlFor="signup-name" className={formStyles['form-element__label']}>Username</label>
          <input
            id="signup-name"
            required
            onChange={validateName}
            value={name}
            type="text"
            placeholder="Enter username"
            className={formStyles['form-element__input']}
          />
        </div>

        <div className={formStyles['form-element']}>
          <label htmlFor="signup-email" className={formStyles['form-element__label']}>Email</label>
          <input
            id="signup-email"
            required
            onChange={validateEmail}
            value={email}
            type="text"
            placeholder="Enter Email"
            className={formStyles['form-element__input']}
          />
        </div>

        <div className={formStyles['form-element']}>
          <label htmlFor="signup-password" className={formStyles['form-element__label']}>Password</label>
          <input
            id="signup-password"
            required
            onChange={validatePassword}
            value={password}
            type="password"
            placeholder="Enter Password"
            className={formStyles['form-element__input']}
          />
        </div>

        <div className={formStyles['form-element']}>
          <label htmlFor="signup-password-confirm" className={formStyles['form-element__label']}>Confirm Password</label>
          <input
            id="signup-password-confirm"
            required
            onChange={validateConfirmPassword}
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
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

export default Signup;
