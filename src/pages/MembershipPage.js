import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MembershipPage.module.css';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    emoji: '🌱',
    price: 0,
    period: 'Forever free',
    color: '#888',
    features: [
      'Browse all home cooks',
      'Order unlimited meals',
      'Donate meals to orphanages',
      'Standard delivery (₹30)',
      'Email support',
    ],
    notIncluded: ['Free delivery', 'Priority orders', 'Exclusive discounts', 'Early access'],
  },
  {
    id: 'home',
    name: 'Home',
    emoji: '🏠',
    price: 149,
    period: 'per month',
    color: '#D85A30',
    popular: true,
    features: [
      'Everything in Basic',
      'FREE delivery on all orders',
      'Priority order processing',
      '10% off every order',
      'Early access to new cooks',
      'Chat support',
    ],
    notIncluded: ['Dedicated account manager', 'Bulk order discounts'],
  },
  {
    id: 'family',
    name: 'Family',
    emoji: '👨‍👩‍👧‍👦',
    price: 299,
    period: 'per month',
    color: '#1D9E75',
    features: [
      'Everything in Home',
      '20% off every order',
      'Bulk order discounts',
      'Up to 5 family members',
      'Monthly surprise meal box',
      'Dedicated account manager',
      'Priority donation matching',
    ],
    notIncluded: [],
  },
];

const perks = [
  { emoji: '🚀', title: 'Priority Orders', desc: 'Your orders jump the queue. Fresh food, faster.' },
  { emoji: '🚚', title: 'Free Delivery', desc: 'Zero delivery charges on every order, every day.' },
  { emoji: '💰', title: 'Exclusive Discounts', desc: 'Save 10–20% on every meal you order.' },
  { emoji: '🤲', title: 'Donate More, Pay Less', desc: 'Members get matched donations at no extra cost.' },
  { emoji: '👩‍🍳', title: 'Meet the Cook', desc: 'Exclusive live cook sessions every month.' },
  { emoji: '🎁', title: 'Surprise Boxes', desc: 'Family plan gets monthly curated meal boxes.' },
];

export default function MembershipPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('home');
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const activePlan = plans.find(p => p.id === selectedPlan);

  const handleJoin = () => {
    if (selectedPlan === 'basic') {
      setJoined(true);
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); setJoined(true); }, 1800);
  };

  if (joined) {
    return (
      <div className={styles.app}>
        <nav className={styles.nav}>
          <div className={styles.logo} onClick={() => navigate('/')}>Home<em>ly</em></div>
        </nav>
        <div className={styles.successScreen}>
          <div className={styles.successCard}>
            <div className={styles.successEmoji}>{activePlan.emoji}</div>
            <h2 className={styles.successTitle}>Welcome to {activePlan.name}!</h2>
            <p className={styles.successMsg}>
              {selectedPlan === 'basic'
                ? "You're all set! Start ordering from Bangalore's best home cooks."
                : `Your ${activePlan.name} membership is active. Enjoy all your perks!`}
            </p>
            <div className={styles.successPerks}>
              {activePlan.features.slice(0, 3).map((f, i) => (
                <div key={i} className={styles.sPerk}>✓ {f}</div>
              ))}
            </div>
            <button className={styles.ctaBtn} onClick={() => navigate('/customer')}>
              Start Ordering 🍛
            </button>
            <button className={styles.homeBtn} onClick={() => navigate('/')}>Back to Home</button>
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
        <div className={styles.heroEyebrow}>🎁 Membership Plans</div>
        <h1 className={styles.heroTitle}>Eat better.<br /><em>Save more.</em></h1>
        <p className={styles.heroSub}>Join Homely membership and unlock free delivery, discounts, and exclusive perks — starting at ₹149/month.</p>
      </div>

      {/* PERKS STRIP */}
      <div className={styles.perksStrip}>
        {perks.map((p, i) => (
          <div key={i} className={styles.perkItem}>
            <div className={styles.perkEmoji}>{p.emoji}</div>
            <div className={styles.perkTitle}>{p.title}</div>
            <div className={styles.perkDesc}>{p.desc}</div>
          </div>
        ))}
      </div>

      {/* PLANS */}
      <div className={styles.plansSection}>
        <h2 className={styles.plansHeading}>Choose your plan</h2>
        <div className={styles.plansGrid}>
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`${styles.planCard} ${selectedPlan === plan.id ? styles.planActive : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
              style={{ '--plan-color': plan.color }}
            >
              {plan.popular && <div className={styles.popularBadge}>⭐ Most Popular</div>}
              <div className={styles.planEmoji}>{plan.emoji}</div>
              <div className={styles.planName}>{plan.name}</div>
              <div className={styles.planPrice}>
                {plan.price === 0 ? (
                  <><span className={styles.planAmount}>Free</span></>
                ) : (
                  <><span className={styles.planAmount}>₹{plan.price}</span><span className={styles.planPeriod}>/{plan.period.split(' ')[1]}</span></>
                )}
              </div>
              <div className={styles.planPeriodLabel}>{plan.period}</div>
              <div className={styles.featureList}>
                {plan.features.map((f, i) => (
                  <div key={i} className={styles.featureRow}>
                    <span className={styles.featureCheck} style={{ color: plan.color }}>✓</span>
                    {f}
                  </div>
                ))}
                {plan.notIncluded.map((f, i) => (
                  <div key={i} className={styles.featureRow} style={{ opacity: 0.35 }}>
                    <span className={styles.featureCheck}>✗</span>
                    {f}
                  </div>
                ))}
              </div>
              {selectedPlan === plan.id && (
                <div className={styles.selectedMark} style={{ background: plan.color }}>Selected ✓</div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaSummary}>
              <div>
                <div className={styles.ctaPlan}>{activePlan.emoji} {activePlan.name} Plan</div>
                <div className={styles.ctaPrice}>
                  {activePlan.price === 0 ? 'Free forever' : `₹${activePlan.price}/month`}
                </div>
              </div>
              <button
                className={styles.joinBtn}
                onClick={handleJoin}
                disabled={loading}
                style={{ background: activePlan.color }}
              >
                {loading ? 'Processing...' : selectedPlan === 'basic' ? 'Get Started Free' : `Join ${activePlan.name} →`}
              </button>
            </div>
            <div className={styles.ctaNote}>
              {selectedPlan === 'basic'
                ? '✓ No credit card needed. Always free.'
                : '✓ Cancel anytime · Secure payment via Razorpay · Instant activation'}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className={styles.faqSection}>
        <h2 className={styles.faqTitle}>Common questions</h2>
        <div className={styles.faqGrid}>
          {[
            { q: 'Can I cancel anytime?', a: 'Yes! Cancel anytime from your profile. No hidden fees.' },
            { q: 'Is it only for Bangalore?', a: 'Yes, Homely currently serves Bangalore only. More cities coming soon!' },
            { q: 'Does membership include donation perks?', a: 'Family plan members get matched donations — you donate ₹80, we match ₹40.' },
            { q: 'What payment methods are accepted?', a: 'UPI, cards, net banking via Razorpay. All secure.' },
          ].map((item, i) => (
            <div key={i} className={styles.faqCard}>
              <div className={styles.faqQ}>{item.q}</div>
              <div className={styles.faqA}>{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}