import React, { useState } from 'react';

import styles from '../../styles/User.module.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/user/userSlice';

const UserSignUpForm = ({ closeForm, toggleCurrentFormType }) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);

    if (!isNotEmpty) return;

    dispatch(loginUser(values));
    closeForm();
  };

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <div className={styles.wrapper}>
      <div onClick={closeForm} className={styles.close}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Log In</div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <input
            value={values.email}
            onChange={handleChange}
            type="email"
            placeholder="Your email"
            name="email"
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.group}>
          <input
            value={values.password}
            onChange={handleChange}
            type="password"
            placeholder="Your password"
            name="password"
            autoComplete="off"
            required
          />
        </div>

        <div onClick={() => toggleCurrentFormType('signup')} className={styles.link}>
          Create an account
        </div>

        <button type="submit" className={styles.submit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default UserSignUpForm;
