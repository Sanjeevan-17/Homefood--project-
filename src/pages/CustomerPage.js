import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CustomerPage.module.css';

const BACKEND = 'https://legendary-xylophone-5g74jjx6pr4376qx-5000.app.github.dev';

function getInitials(name) {
  if (!name) return '??';
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function CustomerPage() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('rating');
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    fetch(`${BACKEND}/api/auth/all-meals`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setFoods(data.meals);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: 1 }));
    showToast('Added to cart! 🛒');
  };

  const changeQty = (id, delta) => {
    setCart(prev => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const cartTotal = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleCartClick = () => {
    if (cartTotal === 0) {
      showToast('Your cart is empty!');
      return;
    }
    const cartItems = foods
      .filter(f => cart[f.id])
      .map(f => ({
        id: f.id,
        name: f.meal_name,
        cook: f.cook_name || 'Home Cook',
        area: f.category,
        price: Number(f.price),
        qty: cart[f.id],
        veg: f.veg === 'veg'
      }));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/cart');
  };

  const sideFilters = [
    { label: 'Category', items: [
      { name: 'All', color: '#888780' },
      { name: 'Breakfast', color: '#EF9F27' },
      { name: 'Lunch', color: '#D85A30' },
      { name: 'Dinner', color: '#9B59B6' },
      { name: 'Tiffin', color: '#1D9E75' },
      { name: 'Snacks', color: '#378ADD' },
    ]},
    { label: 'Diet', items: [
      { name: 'Veg', color: '#639922' },
      { name: 'NonVeg', color: '#A32D2D' },
    ]},
  ];

  const filtered = foods
    .filter(f => {
      if (activeFilter === 'Veg') return f.veg === 'veg';
      if (activeFilter === 'NonVeg') return f.veg === 'nonveg';
      if (activeFilter !== 'All') return f.category === activeFilter;
      return true;
    })
    .filter(f =>
      (f.meal_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (f.cook_name || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'price_low') return a.price - b.price;
      if (sort === 'price_high') return b.price - a.price;
      return 0;
    });

  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Home<em>ly</em>
        </div>
        <div className={styles.navCenter}>
          <span className={styles.pin}></span> Bangalore
        </div>
        <div className={styles.cartWrap} onClick={handleCartClick}>
          <div className={styles.cartIcon}>🛒</div>
          {cartTotal > 0 && <div className={styles.cartBubble}>{cartTotal}</div>}
        </div>
      </nav>

      <div className={styles.hero}>
        <div className={styles.heroEyebrow}>Fresh · Home-cooked · Bangalore</div>
        <h1 className={styles.heroTitle}>Food made with<br /><em>love & tradition</em></h1>
        <p className={styles.heroSub}>Order from real home cooks near you. No restaurants, just amma's kitchen.</p>
        <div className={styles.searchPill}>
          <input
            placeholder="Search dishes, cooks, areas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button>Search</button>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.sidebar}>
          {sideFilters.map(section => (
            <div key={section.label}>
              <div className={styles.sidebarLabel}>{section.label}</div>
              {section.items.map(item => (
                <button
                  key={item.name}
                  className={`${styles.sideChip} ${activeFilter === item.name ? styles.active : ''}`}
                  onClick={() => setActiveFilter(item.name)}
                >
                  <span className={styles.chipDot} style={{ background: item.color }}></span>
                  {item.name}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.sortRow}>
            <p className={styles.resultTxt}>
              {loading ? 'Loading meals...' : <>Showing <strong>{filtered.length} dish{filtered.length !== 1 ? 'es' : ''}</strong> near you</>}
            </p>
            <select value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSelect}>
              <option value="rating">Latest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>Loading meals...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
              <div style={{ fontSize: 56 }}>🍽️</div>
              <h3>No meals found</h3>
              <p>Try a different filter or check back later!</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map(f => (
                <div key={f.id} className={styles.card}>
                  <div className={styles.cardThumb}>
                    <div style={{
                      width: '100%', height: '160px',
                      background: 'linear-gradient(135deg, #f5e6d3, #e8c4a0)',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: 48
                    }}>🍛</div>
                    <div className={`${styles.vegDot} ${f.veg === 'veg' ? styles.veg : styles.nonveg}`}></div>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.dish}>{f.meal_name}</div>
                    <div className={styles.cookLine}>
                      <span className={styles.av}>{getInitials(f.cook_name || 'Cook')}</span>
                      {f.cook_name || 'Home Cook'} · {f.category}
                    </div>
                    {f.description && (
                      <div style={{ fontSize: '0.8rem', color: '#888', margin: '4px 0' }}>{f.description}</div>
                    )}
                    <div className={styles.cardFoot}>
                      <div className={styles.price}>₹{f.price} <span>/ serving</span></div>
                      {cart[f.id] ? (
                        <div className={styles.qtyCtrl}>
                          <button className={styles.qb} onClick={() => changeQty(f.id, -1)}>−</button>
                          <span className={styles.qn}>{cart[f.id]}</span>
                          <button className={styles.qb} onClick={() => changeQty(f.id, 1)}>+</button>
                        </div>
                      ) : (
                        <button className={styles.addBtn} onClick={() => addToCart(f.id)}>+ Add</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.donateStrip} onClick={() => navigate('/donate')}>
            <span className={styles.donateIcon}>🤲</span>
            <div className={styles.donateText}>
              <h3>Donate a meal to an orphanage</h3>
              <p>Your ₹80 feeds a child today. Tap to contribute.</p>
            </div>
            <span className={styles.donateArrow}>→</span>
          </div>
        </div>
      </div>

      {cartTotal > 0 && (
        <div className={styles.cartBar} onClick={handleCartClick}>
          <span>🛒 {cartTotal} item{cartTotal !== 1 ? 's' : ''} in cart</span>
          <span className={styles.cartBarBtn}>View Cart →</span>
        </div>
      )}

      <div className={`${styles.toast} ${toastVisible ? styles.toastShow : ''}`}>{toast}</div>
    </div>
  );
}