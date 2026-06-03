import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CustomerPage.module.css';

import biryani from '../assets/images/food/biryani.jpg';
import dosa from '../assets/images/food/dosa.jpg';
import fish from '../assets/images/food/fish.jpg';
import meals from '../assets/images/food/meals.jpg';
import mutton from '../assets/images/food/mutton.jpg';
import paneer from '../assets/images/food/paneer.jpg';
import roti from '../assets/images/food/roti.jpg';

const foods = [
  { id:1, img:biryani, name:'Chicken Biryani', cook:'Meena Amma', area:'Jayanagar', price:120, rating:4.8, veg:false, category:'Lunch', cuisine:'South Indian' },
  { id:2, img:dosa, name:'Dosa & Chutney', cook:'Radha Akka', area:'Koramangala', price:60, rating:4.6, veg:true, category:'Breakfast', cuisine:'South Indian' },
  { id:3, img:roti, name:'Roti Sabzi Set', cook:'Sunita Didi', area:'Indiranagar', price:80, rating:4.7, veg:true, category:'Breakfast', cuisine:'North Indian' },
  { id:4, img:meals, name:'Meals Thali', cook:'Lakshmi Akka', area:'BTM Layout', price:100, rating:4.5, veg:true, category:'Lunch', cuisine:'South Indian' },
  { id:5, img:mutton, name:'Mutton Curry Rice', cook:'Fatima Bi', area:'Shivajinagar', price:150, rating:4.9, veg:false, category:'Lunch', cuisine:'North Indian' },
  { id:6, img:paneer, name:'Paneer Masala', cook:'Savitha Amma', area:'Marathahalli', price:90, rating:4.7, veg:true, category:'Lunch', cuisine:'North Indian' },
  { id:7, img:fish, name:'Fish Curry Rice', cook:'Meena Amma', area:'Jayanagar', price:130, rating:4.8, veg:false, category:'Lunch', cuisine:'South Indian' },
  { id:8, img:dosa, name:'Rava Dosa Set', cook:'Radha Akka', area:'Koramangala', price:70, rating:4.6, veg:true, category:'Tiffin', cuisine:'South Indian' },
];

const sideFilters = [
  { label:'Category', items:[
    { name:'All', color:'#888780', count:8 },
    { name:'Breakfast', color:'#EF9F27', count:2 },
    { name:'Lunch', color:'#D85A30', count:5 },
    { name:'Tiffin', color:'#1D9E75', count:1 },
  ]},
  { label:'Cuisine', items:[
    { name:'South Indian', color:'#378ADD', count:5 },
    { name:'North Indian', color:'#D4537E', count:3 },
  ]},
  { label:'Diet', items:[
    { name:'Veg', color:'#639922', count:5 },
    { name:'NonVeg', color:'#A32D2D', count:3 },
  ]},
];

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2);
}

export default function CustomerPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('rating');
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

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
    } else {
      navigate('/cart');
    }
  };

  const filtered = foods
    .filter(f => {
      if (activeFilter === 'Veg') return f.veg;
      if (activeFilter === 'NonVeg') return !f.veg;
      if (activeFilter === 'South Indian' || activeFilter === 'North Indian') return f.cuisine === activeFilter;
      if (activeFilter !== 'All') return f.category === activeFilter;
      return true;
    })
    .filter(f =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.cook.toLowerCase().includes(search.toLowerCase()) ||
      f.area.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'price_low') return a.price - b.price;
      return b.price - a.price;
    });

  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        {/* Logo → goes to Home */}
        <div className={styles.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Home<em>ly</em>
        </div>
        <div className={styles.navCenter}>
          <span className={styles.pin}></span> Bangalore
        </div>
        {/* Cart icon → goes to /cart */}
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
                  <span className={styles.chipCount}>{item.count}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.sortRow}>
            <p className={styles.resultTxt}>
              Showing <strong>{filtered.length} dish{filtered.length !== 1 ? 'es' : ''}</strong> near you
            </p>
            <select value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSelect}>
              <option value="rating">Top rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>

          <div className={styles.grid}>
            {filtered.map(f => (
              <div key={f.id} className={styles.card}>
                <div className={styles.cardThumb}>
                  <img src={f.img} alt={f.name} className={styles.cardImg} />
                  <div className={`${styles.vegDot} ${f.veg ? styles.veg : styles.nonveg}`}></div>
                  <div className={styles.starsBadge}>★ {f.rating}</div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.dish}>{f.name}</div>
                  <div className={styles.cookLine}>
                    <span className={styles.av}>{getInitials(f.cook)}</span>
                    {f.cook} · {f.area}
                  </div>
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

          {/* Donate Strip → goes to /donate (coming soon) */}
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

      {/* Cart bottom bar — shows when items in cart */}
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