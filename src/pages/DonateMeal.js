import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DonateMeal.module.css';

const orphanages = [
  { id: 1, name: 'Little Stars Home', area: 'Jayanagar', children: 42, emoji: '⭐', meals: 312 },
  { id: 2, name: 'Asha Bhavan', area: 'Koramangala', children: 28, emoji: '🌟', meals: 198 },
  { id: 3, name: 'Sneha Sadan', area: 'BTM Layout', children: 55, emoji: '💛', meals: 420 },
  { id: 4, name: 'Bal Mandir', area: 'Indiranagar', children: 34, emoji: '🌸', meals: 275 },
];

const mealOptions = [
  { count: 1, price: 80, label: '1 Meal', desc: 'Feed 1 child today' },
  { count: 3, price: 240, label: '3 Meals', desc: 'Feed a small group', popular: true },
  { count: 5, price: 400, label: '5 Meals', desc: 'Make a real difference' },
  { count: 10, price: 800, label: '10 Meals', desc: 'Be a hero today' },
];

export default function DonateMeal() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(mealOptions[1]);
  const [selectedOrphanage, setSelectedOrphanage] = useState(orphanages[0]);
  const [donated, setDonated] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDonate = () => {
    if (!anonymous && (!name.trim() || !phone.trim())) {
      alert('Please fill your name and phone, or choose to donate anonymously.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDonated(true);
    }, 1800);
  };

  if (donated) {
    return (
      <div className={styles.app}>
        <nav className={styles.nav}>
          <div className={styles.logo} onClick={() => navigate('/')}>Home<em>ly</em></div>
        </nav>
        <div className={styles.successScreen}>
          <div className={styles.successCard}>
            <div className={styles.successEmoji}>🤲</div>
            <h2 className={styles.successTitle}>Thank you, {anonymous ? 'kind soul' : name}!</h2>
            <p className={styles.successMsg}>
              You just donated <strong>{selected.label}</strong> to <strong>{selectedOrphanage.name}</strong>, {selectedOrphanage.area}.
            </p>
            <div className={styles.successStats}>
              <div className={styles.sStat}>
                <span className={styles.sNum}>₹{selected.price}</span>
                <span className={styles.sLbl}>donated</span>
              </div>
              <div className={styles.sDivider} />
              <div className={styles.sStat}>
                <span className={styles.sNum}>{selected.count}</span>
                <span className={styles.sLbl}>child{selected.count > 1 ? 'ren' : ''} fed</span>
              </div>
              <div className={styles.sDivider} />
              <div className={styles.sStat}>
                <span className={styles.sNum}>😊</span>
                <span className={styles.sLbl}>smiles created</span>
              </div>
            </div>
            <div className={styles.successQuote}>"A meal shared is a life changed."</div>
            <button className={styles.backBtn} onClick={() => navigate('/')}>Back to Home</button>
            <button className={styles.donateAgainBtn} onClick={() => setDonated(false)}>Donate Again 🤲</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => navigate('/')}>Home<em>ly</em></div>
        <div className={styles.navCenter}><span>📍</span> Bangalore</div>
        <button className={styles.backLink} onClick={() => navigate('/')}>← Home</button>
      </nav>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroEyebrow}>🤲 Donate a Meal</div>
        <h1 className={styles.heroTitle}>Feed a child.<br /><em>Change a life.</em></h1>
        <p className={styles.heroSub}>₹80 is all it takes to give a warm home-cooked meal to a child in Bangalore.</p>
        <div className={styles.heroStats}>
          <div className={styles.hStat}><span>1,205+</span><small>meals donated</small></div>
          <div className={styles.hDot} />
          <div className={styles.hStat}><span>159+</span><small>children fed</small></div>
          <div className={styles.hDot} />
          <div className={styles.hStat}><span>4</span><small>orphanages</small></div>
        </div>
      </div>

      <div className={styles.layout}>
        {/* LEFT COLUMN */}
        <div className={styles.left}>

          {/* MEAL SELECTOR */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>How many meals?</h2>
            <div className={styles.mealGrid}>
              {mealOptions.map(opt => (
                <div
                  key={opt.count}
                  className={`${styles.mealCard} ${selected.count === opt.count ? styles.mealActive : ''}`}
                  onClick={() => setSelected(opt)}
                >
                  {opt.popular && <div className={styles.popularTag}>Most Popular</div>}
                  <div className={styles.mealCount}>{opt.label}</div>
                  <div className={styles.mealPrice}>₹{opt.price}</div>
                  <div className={styles.mealDesc}>{opt.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ORPHANAGE SELECTOR */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Choose an orphanage</h2>
            <div className={styles.orphanageList}>
              {orphanages.map(o => (
                <div
                  key={o.id}
                  className={`${styles.orphanageCard} ${selectedOrphanage.id === o.id ? styles.orphanageActive : ''}`}
                  onClick={() => setSelectedOrphanage(o)}
                >
                  <div className={styles.orphEmoji}>{o.emoji}</div>
                  <div className={styles.orphInfo}>
                    <div className={styles.orphName}>{o.name}</div>
                    <div className={styles.orphArea}>📍 {o.area} · {o.children} children</div>
                  </div>
                  <div className={styles.orphMeals}>
                    <span>{o.meals}</span>
                    <small>meals so far</small>
                  </div>
                  {selectedOrphanage.id === o.id && <div className={styles.orphCheck}>✓</div>}
                </div>
              ))}
            </div>
          </div>

          {/* DONOR DETAILS */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Your details</h2>
            <label className={styles.anonRow}>
              <input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} />
              <span>Donate anonymously</span>
            </label>
            {!anonymous && (
              <div className={styles.formFields}>
                <input
                  className={styles.field}
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <input
                  className={styles.field}
                  placeholder="Phone number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — SUMMARY */}
        <div className={styles.right}>
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Donation Summary</h3>
            <div className={styles.summaryOrphanage}>
              {selectedOrphanage.emoji} {selectedOrphanage.name}
              <span>{selectedOrphanage.area}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>{selected.label} × ₹80</span>
              <span>₹{selected.price}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Platform fee</span>
              <span className={styles.free}>FREE</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{selected.price}</span>
            </div>
            <div className={styles.impactBox}>
              🌟 Your donation will feed <strong>{selected.count} child{selected.count > 1 ? 'ren' : ''}</strong> at <strong>{selectedOrphanage.name}</strong>
            </div>
            <button
              className={styles.donateBtn}
              onClick={handleDonate}
              disabled={loading}
            >
              {loading ? '🤲 Processing...' : `Donate ₹${selected.price} →`}
            </button>
            <div className={styles.secure}>🔒 100% secure · Razorpay protected</div>
          </div>
        </div>
      </div>
    </div>
  );
}