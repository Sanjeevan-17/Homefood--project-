import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserProfile.module.css';

const pastOrders = [
  { id:'HL2024', date:'Today, 12:30 PM', items:'Chicken Biryani × 1, Roti Sabzi × 2', total:280, status:'Delivered', rating:5 },
  { id:'HL2019', date:'Yesterday, 1:15 PM', items:'Dosa & Chutney × 2', total:120, status:'Delivered', rating:4 },
  { id:'HL2015', date:'2 days ago, 7:45 PM', items:'Mutton Curry Rice × 1', total:150, status:'Delivered', rating:5 },
  { id:'HL2008', date:'4 days ago, 12:00 PM', items:'Paneer Masala × 1, Meals Thali × 1', total:190, status:'Delivered', rating:4 },
];

const addresses = [
  { id:1, label:'Home', address:'42, 3rd Cross, Koramangala 4th Block, Bangalore - 560034', default:true },
  { id:2, label:'Office', address:'Prestige Tech Park, Marathahalli, Bangalore - 560037', default:false },
];

const tabs = ['Orders', 'Addresses', 'Donations', 'Settings'];

export default function UserProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Orders');
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({ name: 'Manoj Kumar', phone: '9876543210', email: 'manoj@gmail.com' });
  const [draft, setDraft] = useState({ ...profile });

  const donations = [
    { date: 'Today', orphanage: 'Little Stars Home', meals: 3, amount: 240 },
    { date: '3 days ago', orphanage: 'Asha Bhavan', meals: 1, amount: 80 },
    { date: '1 week ago', orphanage: 'Sneha Sadan', meals: 5, amount: 400 },
  ];

  const totalDonated = donations.reduce((a, b) => a + b.amount, 0);
  const totalMeals = donations.reduce((a, b) => a + b.meals, 0);
  const totalSpent = pastOrders.reduce((a, b) => a + b.total, 0);

  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => navigate('/')}>Home<em>ly</em></div>
        <div className={styles.navCenter}>📍 Bangalore</div>
        <button className={styles.backLink} onClick={() => navigate('/')}>← Home</button>
      </nav>

      <div className={styles.profileHeader}>
        <div className={styles.avatarBig}>MK</div>
        <div className={styles.profileInfo}>
          {editMode ? (
            <div className={styles.editFields}>
              <input className={styles.editField} value={draft.name} onChange={e => setDraft({...draft,name:e.target.value})} />
              <input className={styles.editField} value={draft.phone} onChange={e => setDraft({...draft,phone:e.target.value})} />
              <input className={styles.editField} value={draft.email} onChange={e => setDraft({...draft,email:e.target.value})} />
              <div className={styles.editBtns}>
                <button className={styles.cancelEdit} onClick={() => { setDraft({...profile}); setEditMode(false); }}>Cancel</button>
                <button className={styles.saveEdit} onClick={() => { setProfile({...draft}); setEditMode(false); }}>Save Changes</button>
              </div>
            </div>
          ) : (
            <>
              <h1 className={styles.profileName}>{profile.name}</h1>
              <div className={styles.profilePhone}>📞 {profile.phone}</div>
              <div className={styles.profileEmail}>✉️ {profile.email}</div>
              <button className={styles.editBtn} onClick={() => setEditMode(true)}>Edit Profile ✏️</button>
            </>
          )}
        </div>
        <div className={styles.profileStats}>
          <div className={styles.pStat}><span>{pastOrders.length}</span><small>Orders</small></div>
          <div className={styles.pDivider} />
          <div className={styles.pStat}><span>₹{totalSpent}</span><small>Spent</small></div>
          <div className={styles.pDivider} />
          <div className={styles.pStat}><span>{totalMeals}</span><small>Meals Donated</small></div>
        </div>
      </div>

      <div className={styles.tabsBar}>
        {tabs.map(t => (
          <button key={t} className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 'Orders' && (
          <div className={styles.ordersList}>
            {pastOrders.map(o => (
              <div key={o.id} className={styles.orderCard}>
                <div className={styles.orderTop}>
                  <div>
                    <div className={styles.orderId}>Order #{o.id}</div>
                    <div className={styles.orderDate}>{o.date}</div>
                  </div>
                  <div className={styles.orderStatus}>✓ {o.status}</div>
                </div>
                <div className={styles.orderItems}>{o.items}</div>
                <div className={styles.orderFoot}>
                  <div className={styles.orderTotal}>₹{o.total}</div>
                  <div className={styles.orderRating}>{'★'.repeat(o.rating)}{'☆'.repeat(5-o.rating)}</div>
                  <button className={styles.reorderBtn} onClick={() => navigate('/customer')}>Reorder →</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Addresses' && (
          <div className={styles.addressList}>
            {addresses.map(a => (
              <div key={a.id} className={styles.addressCard}>
                <div className={styles.addressIcon}>{a.label === 'Home' ? '🏠' : '🏢'}</div>
                <div className={styles.addressInfo}>
                  <div className={styles.addressLabel}>{a.label} {a.default && <span className={styles.defaultTag}>Default</span>}</div>
                  <div className={styles.addressText}>{a.address}</div>
                </div>
                <button className={styles.editAddrBtn}>Edit</button>
              </div>
            ))}
            <button className={styles.addAddrBtn}>+ Add New Address</button>
          </div>
        )}

        {activeTab === 'Donations' && (
          <div>
            <div className={styles.donationSummary}>
              <div className={styles.dStat}><span>₹{totalDonated}</span><small>Total Donated</small></div>
              <div className={styles.dDivider} />
              <div className={styles.dStat}><span>{totalMeals}</span><small>Meals Given</small></div>
              <div className={styles.dDivider} />
              <div className={styles.dStat}><span>3</span><small>Orphanages</small></div>
            </div>
            <div className={styles.donationList}>
              {donations.map((d, i) => (
                <div key={i} className={styles.donationCard}>
                  <div className={styles.donationIcon}>🤲</div>
                  <div className={styles.donationInfo}>
                    <div className={styles.donationOrphanage}>{d.orphanage}</div>
                    <div className={styles.donationDate}>{d.date} · {d.meals} meal{d.meals > 1 ? 's' : ''}</div>
                  </div>
                  <div className={styles.donationAmount}>₹{d.amount}</div>
                </div>
              ))}
            </div>
            <button className={styles.donateMoreBtn} onClick={() => navigate('/donate')}>Donate More 🤲</button>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className={styles.settingsList}>
            {[
              { icon:'🔔', label:'Notifications', desc:'Order updates, offers', toggle:true, on:true },
              { icon:'🌙', label:'Dark Mode', desc:'Easy on the eyes', toggle:true, on:false },
              { icon:'📍', label:'Location', desc:'For delivery accuracy', toggle:true, on:true },
              { icon:'🔒', label:'Change Password', desc:'Keep your account safe', toggle:false },
              { icon:'🎁', label:'Membership', desc:'Upgrade your plan', toggle:false },
              { icon:'🚪', label:'Logout', desc:'See you soon!', toggle:false, danger:true },
            ].map((s, i) => (
              <div
                key={i}
                className={`${styles.settingRow} ${s.danger ? styles.dangerRow : ''}`}
                onClick={() => { if(s.label==='Membership') navigate('/membership'); if(s.label==='Logout') navigate('/'); }}
              >
                <div className={styles.settingIcon}>{s.icon}</div>
                <div className={styles.settingInfo}>
                  <div className={styles.settingLabel}>{s.label}</div>
                  <div className={styles.settingDesc}>{s.desc}</div>
                </div>
                {s.toggle ? (
                  <div className={`${styles.toggle} ${s.on ? styles.toggleOn : ''}`}>
                    <div className={styles.toggleThumb} />
                  </div>
                ) : (
                  <span className={styles.settingArrow}>›</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}