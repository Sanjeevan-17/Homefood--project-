import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ReviewsPage.module.css';

const reviews = [
  { id:1, name:'Priya S.', area:'Koramangala', avatar:'PS', dish:'Chicken Biryani', cook:'Meena Amma', rating:5, date:'2 days ago', text:'Absolutely the best biryani I\'ve had outside my mom\'s kitchen! The rice was perfectly cooked and the masala was so aromatic. Ordered twice this week already 😍', helpful:24, tags:['Authentic','Generous Portion','On Time'] },
  { id:2, name:'Rahul M.', area:'Indiranagar', avatar:'RM', dish:'Dosa & Chutney', cook:'Radha Akka', rating:5, date:'3 days ago', text:'Radha Akka\'s dosas are crispy on the outside, soft on the inside — exactly how my grandma used to make. The coconut chutney is restaurant level! Will definitely order again.', helpful:18, tags:['Crispy','Homely Taste','Fresh'] },
  { id:3, name:'Anjali K.', area:'BTM Layout', avatar:'AK', dish:'Meals Thali', cook:'Lakshmi Akka', rating:4, date:'5 days ago', text:'Great value for money! Got sambar, rasam, 2 curries, rice and papad for just ₹100. Tastes like a proper South Indian home meal. Delivery was slightly late but totally worth it.', helpful:15, tags:['Value for Money','Filling','South Indian'] },
  { id:4, name:'Mohammed F.', area:'Shivajinagar', avatar:'MF', dish:'Mutton Curry Rice', cook:'Fatima Bi', rating:5, date:'1 week ago', text:'Fatima Bi\'s mutton curry is absolutely fire 🔥 The meat is so tender and the gravy has this deep flavour that you can only get from slow cooking. This is what home food should taste like!', helpful:31, tags:['Slow Cooked','Rich Gravy','Tender Meat'] },
  { id:5, name:'Sneha R.', area:'Marathahalli', avatar:'SR', dish:'Paneer Masala', cook:'Savitha Amma', rating:5, date:'1 week ago', text:'As a vegetarian, it\'s so hard to find good paneer dishes that feel like home food and not just restaurant reheats. Savitha Amma\'s paneer masala is creamy, spiced perfectly and packed with love!', helpful:22, tags:['Vegetarian','Creamy','Spiced Right'] },
  { id:6, name:'Karthik V.', area:'Jayanagar', avatar:'KV', dish:'Fish Curry Rice', cook:'Meena Amma', rating:4, date:'2 weeks ago', text:'Really good fish curry — fresh fish, tangy gravy, perfect with rice. Reminded me of coastal Karnataka food. Only thing is I wish there was a little more fish! Otherwise perfect.', helpful:9, tags:['Coastal Style','Fresh Fish','Tangy'] },
];

const stats = [
  { label: 'Total Reviews', value: '1,240+' },
  { label: 'Avg Rating', value: '4.8 ★' },
  { label: 'Happy Customers', value: '890+' },
  { label: 'Home Cooks Rated', value: '42' },
];

const cookHighlights = [
  { name: 'Meena Amma', area: 'Jayanagar', rating: 4.9, reviews: 128, emoji: '👩‍🍳', specialty: 'Biryani & Fish Curry' },
  { name: 'Fatima Bi', area: 'Shivajinagar', rating: 4.9, reviews: 96, emoji: '🍖', specialty: 'Mutton & Chicken' },
  { name: 'Radha Akka', area: 'Koramangala', rating: 4.8, reviews: 114, emoji: '🥞', specialty: 'Dosas & Tiffin' },
  { name: 'Savitha Amma', area: 'Marathahalli', rating: 4.8, reviews: 87, emoji: '🥘', specialty: 'Paneer & Veg Curries' },
];

function Stars({ rating, size = 14 }) {
  return (
    <span style={{ fontSize: size, letterSpacing: 1 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= rating ? '#F4A35A' : '#e0ddd8' }}>★</span>
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [helpfulClicked, setHelpfulClicked] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', dish: '', rating: 5, text: '' });
  const [submitted, setSubmitted] = useState(false);

  const filtered = filter === 'All' ? reviews : reviews.filter(r => r.rating === parseInt(filter));

  const toggleHelpful = (id) => {
    setHelpfulClicked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = () => {
    if (!newReview.name || !newReview.dish || !newReview.text) return;
    setSubmitted(true);
    setShowForm(false);
  };

  return (
    <div className={styles.app}>
      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => navigate('/')}>Home<em>ly</em></div>
        <div className={styles.navCenter}>📍 Bangalore</div>
        <button className={styles.backLink} onClick={() => navigate('/')}>← Home</button>
      </nav>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroEyebrow}>⭐ Real Reviews</div>
        <h1 className={styles.heroTitle}>What Bangalore<br /><em>is saying</em></h1>
        <p className={styles.heroSub}>Real reviews from real customers. No filters, no fake ratings — just honest home food love.</p>
        <div className={styles.statsRow}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statBox}>
              <div className={styles.statVal}>{s.value}</div>
              <div className={styles.statLbl}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.layout}>
        {/* LEFT */}
        <div className={styles.left}>
          {/* FILTER + WRITE */}
          <div className={styles.filterRow}>
            <div className={styles.filterChips}>
              {['All','5','4','3'].map(f => (
                <button
                  key={f}
                  className={`${styles.chip} ${filter === f ? styles.chipActive : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'All' ? 'All Reviews' : `${f} ★`}
                </button>
              ))}
            </div>
            <button className={styles.writeBtn} onClick={() => setShowForm(true)}>
              + Write a Review
            </button>
          </div>

          {/* WRITE REVIEW FORM */}
          {showForm && (
            <div className={styles.reviewForm}>
              <h3 className={styles.formTitle}>Share your experience</h3>
              <input className={styles.field} placeholder="Your name" value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})} />
              <input className={styles.field} placeholder="Dish you ordered" value={newReview.dish} onChange={e => setNewReview({...newReview, dish: e.target.value})} />
              <div className={styles.ratingPick}>
                <span style={{fontSize:13,color:'#888'}}>Your rating:</span>
                {[1,2,3,4,5].map(s => (
                  <span key={s} onClick={() => setNewReview({...newReview, rating: s})} style={{ fontSize: 24, cursor: 'pointer', color: s <= newReview.rating ? '#F4A35A' : '#ddd' }}>★</span>
                ))}
              </div>
              <textarea className={styles.field} rows={4} placeholder="Tell us about your experience..." value={newReview.text} onChange={e => setNewReview({...newReview, text: e.target.value})} />
              <div className={styles.formBtns}>
                <button className={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
                <button className={styles.submitBtn} onClick={handleSubmit}>Submit Review →</button>
              </div>
            </div>
          )}

          {submitted && (
            <div className={styles.submittedBanner}>
              🎉 Thank you! Your review has been submitted and will appear shortly.
            </div>
          )}

          {/* REVIEW CARDS */}
          <div className={styles.reviewList}>
            {filtered.map(r => (
              <div key={r.id} className={styles.reviewCard}>
                <div className={styles.reviewTop}>
                  <div className={styles.avatar}>{r.avatar}</div>
                  <div className={styles.reviewMeta}>
                    <div className={styles.reviewName}>{r.name} <span className={styles.reviewArea}>· {r.area}</span></div>
                    <Stars rating={r.rating} />
                    <div className={styles.reviewDish}>Ordered: <strong>{r.dish}</strong> from <strong>{r.cook}</strong></div>
                  </div>
                  <div className={styles.reviewDate}>{r.date}</div>
                </div>
                <p className={styles.reviewText}>{r.text}</p>
                <div className={styles.reviewTags}>
                  {r.tags.map((t, i) => <span key={i} className={styles.tag}>{t}</span>)}
                </div>
                <div className={styles.reviewFoot}>
                  <button
                    className={`${styles.helpfulBtn} ${helpfulClicked[r.id] ? styles.helpfulActive : ''}`}
                    onClick={() => toggleHelpful(r.id)}
                  >
                    👍 Helpful ({helpfulClicked[r.id] ? r.helpful + 1 : r.helpful})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — TOP COOKS */}
        <div className={styles.right}>
          <div className={styles.topCooksCard}>
            <h3 className={styles.sideTitle}>🏆 Top Rated Cooks</h3>
            {cookHighlights.map((c, i) => (
              <div key={i} className={styles.cookRow}>
                <div className={styles.cookRank}>#{i + 1}</div>
                <div className={styles.cookEmoji}>{c.emoji}</div>
                <div className={styles.cookInfo}>
                  <div className={styles.cookName}>{c.name}</div>
                  <div className={styles.cookArea}>{c.area} · {c.specialty}</div>
                  <div className={styles.cookRating}>
                    <Stars rating={5} size={11} /> {c.rating} · {c.reviews} reviews
                  </div>
                </div>
              </div>
            ))}
            <button className={styles.orderBtn} onClick={() => navigate('/customer')}>
              Order from them →
            </button>
          </div>

          <div className={styles.ratingBreakdown}>
            <h3 className={styles.sideTitle}>Rating Breakdown</h3>
            {[
              { stars: 5, pct: 78 },
              { stars: 4, pct: 16 },
              { stars: 3, pct: 4 },
              { stars: 2, pct: 1 },
              { stars: 1, pct: 1 },
            ].map(r => (
              <div key={r.stars} className={styles.breakRow}>
                <span className={styles.breakStar}>{r.stars} ★</span>
                <div className={styles.breakBar}>
                  <div className={styles.breakFill} style={{ width: `${r.pct}%` }} />
                </div>
                <span className={styles.breakPct}>{r.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}