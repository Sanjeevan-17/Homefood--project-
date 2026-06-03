import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import biryani from '../assets/images/food/biryani.jpg';
import dosa from '../assets/images/food/dosa.jpg';
import roti from '../assets/images/food/roti.jpg';
import meals from '../assets/images/food/meals.jpg';
import mutton from '../assets/images/food/mutton.jpg';
import paneer from '../assets/images/food/paneer.jpg';
import fish from '../assets/images/food/fish.jpg';

const slides = [
  { img: biryani, label: 'Chicken Biryani', cook: 'Meena Amma · Jayanagar' },
  { img: dosa, label: 'Dosa & Chutney', cook: 'Radha Akka · Koramangala' },
  { img: roti, label: 'Roti Sabzi', cook: 'Sunita Didi · Indiranagar' },
  { img: meals, label: 'Meals Thali', cook: 'Lakshmi Akka · BTM Layout' },
  { img: mutton, label: 'Mutton Curry', cook: 'Fatima Bi · Shivajinagar' },
  { img: paneer, label: 'Paneer Masala', cook: 'Savitha Amma · Marathahalli' },
];

function FoodSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => goNext(), 2500);
    return () => clearInterval(timer);
  }, [current]);

  const goNext = () => {
    setCurrent(prev => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  };

  const getIndex = (offset) => (current + offset + slides.length) % slides.length;

  return (
    <div style={sliderWrap}>
      <p style={sliderHeading}>🍽️ Fresh today in Bangalore</p>

      <div style={trackWrap}>
        <button style={arrowBtn} onClick={goPrev}>‹</button>

        <div style={track}>
          {[-1, 0, 1].map((offset) => {
            const slide = slides[getIndex(offset)];
            const isCenter = offset === 0;
            return (
              <div
                key={getIndex(offset)}
                style={{
                  ...card,
                  transform: isCenter ? 'scale(1.08)' : 'scale(0.9)',
                  opacity: isCenter ? 1 : 0.5,
                  transition: 'all 0.35s ease',
                  filter: isCenter ? 'none' : 'blur(1px)',
                  zIndex: isCenter ? 2 : 1,
                }}
              >
                <img src={slide.img} alt={slide.label} style={slideImg} />
                <div style={cardLabel}>{slide.label}</div>
                <div style={cardCook}>{slide.cook}</div>
                {isCenter && (
                  <div style={orderBtn}>Order Now →</div>
                )}
              </div>
            );
          })}
        </div>

        <button style={arrowBtn} onClick={goNext}>›</button>
      </div>

      <div style={dotsWrap}>
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              ...dot,
              background: i === current ? '#D85A30' : '#ddd',
              width: i === current ? 20 : 8,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- STYLES ----------
const sliderWrap = {
  padding: '32px 0 24px',
  background: '#fff',
  borderBottom: '0.5px solid #e0e0da',
};
const sliderHeading = {
  textAlign: 'center',
  fontSize: 13,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  color: '#D85A30',
  fontWeight: 500,
  marginBottom: 24,
};
const trackWrap = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  padding: '0 16px',
};
const track = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  overflow: 'hidden',
  width: '100%',
  maxWidth: 700,
};
const card = {
  minWidth: 180,
  maxWidth: 200,
  borderRadius: 16,
  padding: '0 0 16px',
  textAlign: 'center',
  cursor: 'pointer',
  flex: '0 0 auto',
  background: '#fff',
  overflow: 'hidden',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
};
const slideImg = {
  width: '100%',
  height: 130,
  objectFit: 'cover',
  borderRadius: '12px 12px 0 0',
  marginBottom: 10,
  display: 'block',
};
const cardLabel = {
  fontSize: 15,
  fontWeight: 600,
  color: '#1a1a18',
  marginBottom: 4,
  padding: '0 12px',
};
const cardCook = {
  fontSize: 11,
  color: '#888',
  marginBottom: 14,
  padding: '0 12px',
};
const orderBtn = {
  display: 'inline-block',
  background: '#D85A30',
  color: '#fff',
  fontSize: 12,
  fontWeight: 500,
  padding: '6px 16px',
  borderRadius: 99,
};
const arrowBtn = {
  background: '#fff',
  border: '0.5px solid #ddd',
  borderRadius: '50%',
  width: 36,
  height: 36,
  fontSize: 22,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: '#555',
};
const dotsWrap = {
  display: 'flex',
  justifyContent: 'center',
  gap: 6,
  marginTop: 20,
};
const dot = {
  height: 8,
  borderRadius: 99,
  cursor: 'pointer',
  transition: 'all 0.3s',
};

// ---------- OPTION CARD ----------
function OptionCard({ icon, title, description, path }) {
  const navigate = useNavigate();
  return (
    <div className="option-card" onClick={() => navigate(path)}>
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// ---------- HOME ----------
function Home() {
  const navigate = useNavigate();

  return (
    <div>

      {/* ── HERO WITH FISH IMAGE BACKGROUND ── */}
      <div style={heroSection}>
        <img src={fish} alt="hero bg" style={heroBgImg} />
        <div style={heroOverlay} />
        <div style={heroContent}>
          <div style={heroEyebrow}>🍴 Bangalore's Home Kitchen</div>
          <h2 style={heroTitle}>Real home food,<br />made with love</h2>
          <p style={heroSub}>Order from home cooks near you in Bangalore</p>
          <div style={heroBtns}>
            <button style={btnPrimary} onClick={() => navigate('/customer')}>
              Order Now 🍛
            </button>
            <button style={btnSecondary} onClick={() => navigate('/cook-register')}>
              Become a Cook 👩‍🍳
            </button>
          </div>
        </div>
      </div>

      <FoodSlider />

      <div className="options">
        <OptionCard icon="👩‍🍳" title="Cook" description="Register and sell your home food" path="/cook-register" />
        <OptionCard icon="🍱" title="Customer" description="Order fresh homemade food" path="/customer" />
        <OptionCard icon="❤️" title="Donate Meal" description="Feed nearby orphanages" path="/donate" />
        <OptionCard icon="⭐" title="Reviews" description="See what people are saying" path="/reviews" />
        <OptionCard icon="🎁" title="Membership" description="Special offers and discounts" path="/membership" />
      </div>

      <div className="food-banner">
        <h2>No investment. No risk. Just cook!</h2>
        <p>Women at home can earn by sharing what they love making</p>
      </div>

    </div>
  );
}

// ---------- HERO STYLES ----------
const heroSection = {
  position: 'relative',
  height: '100vh',
  minHeight: 500,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const heroBgImg = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 0,
};
const heroOverlay = {
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.7) 100%)',
  zIndex: 1,
};
const heroContent = {
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  color: '#fff',
  padding: '0 24px',
};
const heroEyebrow = {
  fontSize: 13,
  letterSpacing: 2,
  textTransform: 'uppercase',
  color: '#F4A35A',
  fontWeight: 500,
  marginBottom: 16,
};
const heroTitle = {
  fontSize: 'clamp(32px, 6vw, 64px)',
  fontWeight: 700,
  lineHeight: 1.15,
  marginBottom: 16,
  fontFamily: "'Playfair Display', serif",
  color: '#fff',
};
const heroSub = {
  fontSize: 18,
  color: 'rgba(255,255,255,0.85)',
  marginBottom: 32,
  fontWeight: 400,
};
const heroBtns = {
  display: 'flex',
  gap: 16,
  justifyContent: 'center',
  flexWrap: 'wrap',
};
const btnPrimary = {
  background: '#D85A30',
  color: '#fff',
  border: 'none',
  padding: '14px 32px',
  borderRadius: 99,
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 4px 20px rgba(216,90,48,0.4)',
};
const btnSecondary = {
  background: 'rgba(255,255,255,0.15)',
  color: '#fff',
  border: '1.5px solid rgba(255,255,255,0.5)',
  padding: '14px 32px',
  borderRadius: 99,
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
  backdropFilter: 'blur(4px)',
};

export default Home;