import React from 'react';

import styles from '../../styles/Home.module.css';

import bannerimg from '../../images/banner.png';

const Banner = () => (
  <section className={styles.banner}>
    <div className={styles.left}>
      <p className={styles.content}>
        NEW YEAR
        <span>SALE</span>
      </p>
      <button className={styles.more}>See more</button>
    </div>
    <div className={styles.right} style={{ backgroundImage: `url(${bannerimg})` }}>
      <p className={styles.discount}>
        save up to <span>50%</span> off
      </p>
    </div>
  </section>
);

export default Banner;
