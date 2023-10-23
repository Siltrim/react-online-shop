import React, { useEffect, useState } from 'react';

import styles from '../../styles/Profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/user/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);

    if (!isNotEmpty) return;

    dispatch(updateUser(values));
  };

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>You need to log in</span>
      ) : (
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

          <button type="submit" className={styles.submit}>
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
