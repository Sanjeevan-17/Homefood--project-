import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => navigate('/')}>Home<em>ly</em></div>
      </nav>
      <div className={styles.container}>
        <div className={styles.emojiStack}>
          <span className={styles.mainEmoji}>🍱</span>
          <span className={styles.sadEmoji}>😢</span>
        </div>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>This page went missing<br /><em>like biryani at a party</em></h2>
        <p className={styles.sub}>The page you're looking for doesn't exist. Maybe the cook took the day off?</p>
        <div className={styles.btns}>
          <button className={styles.btnPrimary} onClick={() => navigate('/')}>🏠 Back to Home</button>
          <button className={styles.btnSecondary} onClick={() => navigate('/customer')}>🍛 Browse Food</button>
        </div>
        <div className={styles.suggestions}>
          <p className={styles.suggestLabel}>Maybe you were looking for:</p>
          <div className={styles.suggestLinks}>
            <span onClick={() => navigate('/customer')}>Order Food</span>
            <span onClick={() => navigate('/cook-register')}>Become a Cook</span>
            <span onClick={() => navigate('/donate')}>Donate a Meal</span>
            <span onClick={() => navigate('/membership')}>Membership</span>
          </div>
        </div>
      </div>
    </div>
  );
}