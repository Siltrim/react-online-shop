import React, { useState } from 'react';

import styles from '../../styles/User.module.css';
import { useDispatch } from 'react-redux';
import { createUser } from '../../features/user/userSlice';

const UserSignUpForm = ({ closeForm, toggleCurrentFormType }) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);

    if (!isNotEmpty) return;

    dispatch(createUser(values));
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

      <div className={styles.title}>Sign Up</div>

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
            value={values.name}
            onChange={handleChange}
            type="name"
            placeholder="Your name"
            name="name"
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

        <div className={styles.group}>
          <input
            value={values.avatar}
            onChange={handleChange}
            type="avatar"
            placeholder="Your avatar"
            name="avatar"
            autoComplete="off"
            required
          />
        </div>

        <div onClick={() => toggleCurrentFormType('login')} className={styles.link}>
          I already have an account
        </div>

        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignUpForm;
