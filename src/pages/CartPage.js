import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.css';

// Cart page receives cart items as props from CustomerPage
// For now we use sample data to show the UI
const sampleCartItems = [
  { id: 1, name: 'Chicken Biryani', cook: 'Meena Amma', area: 'Jayanagar', price: 120, qty: 2, veg: false },
  { id: 2, name: 'Dosa & Chutney', cook: 'Radha Akka', area: 'Koramangala', price: 60, qty: 1, veg: true },
  { id: 4, name: 'Meals Thali', cook: 'Lakshmi Akka', area: 'BTM Layout', price: 100, qty: 1, veg: true },
];

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2);
}

export default function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(sampleCartItems);
  const [donate, setDonate] = useState(false);
  const [step, setStep] = useState('cart'); // 'cart' | 'address' | 'success'
  const [address, setAddress] = useState({
    name: '', phone: '', flat: '', area: '', landmark: '', pincode: '',
  });
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const changeQty = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from cart');
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal > 300 ? 0 : 30;
  const donateFee = donate ? 80 : 0;
  const total = subtotal + deliveryFee + donateFee;

  const handlePlaceOrder = () => {
    const { name, phone, flat, area, pincode } = address;
    if (!name || !phone || !flat || !area || !pincode) {
      showToast('Please fill all required fields!');
      return;
    }
    if (phone.length !== 10) {
      showToast('Enter a valid 10-digit phone number!');
      return;
    }
    setStep('success');
  };

  // ── SUCCESS SCREEN ──
  if (step === 'success') {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>🎉</div>
          <h2 className={styles.successTitle}>Order Placed!</h2>
          <p className={styles.successSub}>Your home food is being prepared with love 🍛</p>
          <div className={styles.successInfo}>
            <div className={styles.successRow}>
              <span>Order ID</span>
              <strong>#HML{Math.floor(Math.random() * 90000) + 10000}</strong>
            </div>
            <div className={styles.successRow}>
              <span>Total Paid</span>
              <strong>₹{total}</strong>
            </div>
            <div className={styles.successRow}>
              <span>Estimated Delivery</span>
              <strong>30–45 mins</strong>
            </div>
            {donate && (
              <div className={styles.successRow}>
                <span>Meal Donated 🤲</span>
                <strong>₹80 to Orphanage</strong>
              </div>
            )}
          </div>
          <div className={styles.successTrack}>
            <div className={styles.trackStep + ' ' + styles.trackDone}>✓ Order Placed</div>
            <div className={styles.trackLine} />
            <div className={styles.trackStep + ' ' + styles.trackActive}>👩‍🍳 Preparing</div>
            <div className={styles.trackLine} />
            <div className={styles.trackStep}>🛵 On the way</div>
            <div className={styles.trackLine} />
            <div className={styles.trackStep}>📦 Delivered</div>
          </div>
          <button className={styles.backHomeBtn} onClick={() => navigate('/')}>
            Back to Home
          </button>
          <button className={styles.browseMoreBtn} onClick={() => navigate('/customer')}>
            Order More Food
          </button>
        </div>
      </div>
    );
  }

  // ── ADDRESS SCREEN ──
  if (step === 'address') {
    return (
      <div className={styles.page}>
        <nav className={styles.nav}>
          <button className={styles.backBtn} onClick={() => setStep('cart')}>← Back</button>
          <div className={styles.logo}>Home<em>ly</em></div>
          <div />
        </nav>

        <div className={styles.addressWrap}>
          <div className={styles.addressCard}>
            <h2 className={styles.sectionTitle}>📍 Delivery Address</h2>
            <p className={styles.sectionSub}>We deliver only within Bangalore</p>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input
                  placeholder="Your full name"
                  value={address.name}
                  onChange={e => setAddress({ ...address, name: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number *</label>
                <input
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  value={address.phone}
                  onChange={e => setAddress({ ...address, phone: e.target.value.replace(/\D/, '') })}
                />
              </div>
              <div className={styles.formGroupFull}>
                <label>Flat / House No / Building *</label>
                <input
                  placeholder="e.g. Flat 204, Green Apartments"
                  value={address.flat}
                  onChange={e => setAddress({ ...address, flat: e.target.value })}
                />
              </div>
              <div className={styles.formGroupFull}>
                <label>Area / Street *</label>
                <input
                  placeholder="e.g. Koramangala 5th Block"
                  value={address.area}
                  onChange={e => setAddress({ ...address, area: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Landmark</label>
                <input
                  placeholder="e.g. Near Metro Station"
                  value={address.landmark}
                  onChange={e => setAddress({ ...address, landmark: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Pincode *</label>
                <input
                  placeholder="560001"
                  maxLength={6}
                  value={address.pincode}
                  onChange={e => setAddress({ ...address, pincode: e.target.value.replace(/\D/, '') })}
                />
              </div>
            </div>

            {/* Order Summary Mini */}
            <div className={styles.miniSummary}>
              <div className={styles.miniRow}><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className={styles.miniRow}><span>Delivery</span><span>{deliveryFee === 0 ? 'FREE 🎉' : `₹${deliveryFee}`}</span></div>
              {donate && <div className={styles.miniRow}><span>Donate Meal 🤲</span><span>₹80</span></div>}
              <div className={styles.miniTotal}><span>Total</span><span>₹{total}</span></div>
            </div>

            <button className={styles.placeOrderBtn} onClick={handlePlaceOrder}>
              Place Order · ₹{total} 🛵
            </button>
            <p className={styles.payNote}>💳 Payment via Razorpay — coming soon! Cash on delivery for now.</p>
          </div>
        </div>
        <div className={`${styles.toast} ${toastVisible ? styles.toastShow : ''}`}>{toast}</div>
      </div>
    );
  }

  // ── CART SCREEN ──
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <button className={styles.backBtn} onClick={() => navigate('/customer')}>← Back</button>
        <div className={styles.logo}>Home<em>ly</em></div>
        <div className={styles.navRight}>{items.length} item{items.length !== 1 ? 's' : ''}</div>
      </nav>

      {items.length === 0 ? (
        <div className={styles.emptyCart}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2>Your cart is empty!</h2>
          <p>Go back and add some delicious home food</p>
          <button className={styles.browseBtn} onClick={() => navigate('/customer')}>
            Browse Food
          </button>
        </div>
      ) : (
        <div className={styles.cartLayout}>

          {/* LEFT — Cart Items */}
          <div className={styles.cartLeft}>
            <h2 className={styles.sectionTitle}>🛒 Your Cart</h2>

            {items.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemLeft}>
                  <div className={`${styles.vegIndicator} ${item.veg ? styles.vegGreen : styles.nonvegRed}`} />
                  <div>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemCook}>
                      <span className={styles.av}>{getInitials(item.cook)}</span>
                      {item.cook} · {item.area}
                    </div>
                    <div className={styles.itemPrice}>₹{item.price} × {item.qty} = <strong>₹{item.price * item.qty}</strong></div>
                  </div>
                </div>
                <div className={styles.itemRight}>
                  <div className={styles.qtyCtrl}>
                    <button className={styles.qb} onClick={() => changeQty(item.id, -1)}>−</button>
                    <span className={styles.qn}>{item.qty}</span>
                    <button className={styles.qb} onClick={() => changeQty(item.id, 1)}>+</button>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>🗑</button>
                </div>
              </div>
            ))}

            {/* Donate Strip */}
            <div
              className={`${styles.donateStrip} ${donate ? styles.donateActive : ''}`}
              onClick={() => { setDonate(!donate); showToast(donate ? 'Donation removed' : '🤲 Meal donation added!'); }}
            >
              <span className={styles.donateIcon}>🤲</span>
              <div className={styles.donateText}>
                <h3>Donate a meal to an orphanage</h3>
                <p>Add ₹80 to feed a child today</p>
              </div>
              <div className={styles.donateToggle}>
                {donate ? '✅ Added' : '+ Add ₹80'}
              </div>
            </div>
          </div>

          {/* RIGHT — Bill Summary */}
          <div className={styles.cartRight}>
            <div className={styles.billCard}>
              <h2 className={styles.billTitle}>🧾 Bill Summary</h2>

              {items.map(item => (
                <div key={item.id} className={styles.billRow}>
                  <span>{item.name} × {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}

              <div className={styles.billDivider} />

              <div className={styles.billRow}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className={styles.billRow}>
                <span>Delivery Fee</span>
                <span style={{ color: deliveryFee === 0 ? '#1D9E75' : '#333' }}>
                  {deliveryFee === 0 ? 'FREE 🎉' : `₹${deliveryFee}`}
                </span>
              </div>
              {deliveryFee === 0 && (
                <div className={styles.freeDeliveryNote}>✓ Free delivery on orders above ₹300!</div>
              )}
              {donate && (
                <div className={styles.billRow}>
                  <span>Donate Meal 🤲</span>
                  <span>₹80</span>
                </div>
              )}

              <div className={styles.billDivider} />
              <div className={styles.billTotal}>
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button className={styles.checkoutBtn} onClick={() => setStep('address')}>
                Proceed to Checkout →
              </button>

              <div className={styles.safeNote}>
                🔒 Safe & secure · Bangalore only
              </div>
            </div>
          </div>

        </div>
      )}

      <div className={`${styles.toast} ${toastVisible ? styles.toastShow : ''}`}>{toast}</div>
    </div>
  );
}