import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CookDashboard.module.css';

const BACKEND = 'https://legendary-xylophone-5g74jjx6pr4376qx-5000.app.github.dev';
const categories = ['Breakfast', 'Lunch', 'Dinner', 'Tiffin', 'Snacks', 'Sweets'];
const cuisines = ['South Indian', 'North Indian', 'Chinese', 'Continental', 'Desserts'];

export default function CookDashboard() {
  const navigate = useNavigate();
  const cookId = localStorage.getItem('userId');
  const cookName = localStorage.getItem('name') || 'Cook';

  const [activeTab, setActiveTab] = useState('dashboard');
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [foodForm, setFoodForm] = useState({
    name: '', price: '', category: '', cuisine: '', description: '', veg: 'veg', serves: '1',
  });

  useEffect(() => {
    if (!cookId) { navigate('/login'); return; }
    fetch(`${BACKEND}/api/auth/meals/${cookId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFoods(data.meals.map(m => ({
            id: m.id,
            name: m.meal_name,
            price: m.price,
            category: m.category,
            orders: 0,
            active: true
          })));
        }
      })
      .catch(err => console.error(err));
  }, [cookId, navigate]);

  const showToast = (msg) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleFoodChange = (e) => {
    setFoodForm({ ...foodForm, [e.target.name]: e.target.value });
  };

  const handlePostFood = async (e) => {
    e.preventDefault();
    if (!foodForm.name || !foodForm.price || !foodForm.category) {
      showToast('Please fill all required fields!');
      return;
    }
    try {
      const response = await fetch(`${BACKEND}/api/auth/add-meal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cookId, ...foodForm })
      });
      const data = await response.json();
      if (data.success) {
        setFoods(prev => [{
          id: data.mealId,
          name: foodForm.name,
          price: Number(foodForm.price),
          category: foodForm.category,
          orders: 0,
          active: true
        }, ...prev]);
        setFoodForm({ name: '', price: '', category: '', cuisine: '', description: '', veg: 'veg', serves: '1' });
        showToast('🎉 Food posted successfully!');
        setActiveTab('myfoods');
      }
    } catch (error) {
      showToast('Something went wrong!');
    }
  };

  const toggleActive = (id) => {
    setFoods(prev => prev.map(f => f.id === id ? { ...f, active: !f.active } : f));
    showToast('Food item updated!');
  };

  const deleteFood = (id) => {
    setFoods(prev => prev.filter(f => f.id !== id));
    showToast('Food item removed');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order ${orderId} updated!`);
  };

  const totalEarnings = orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0);
  const newOrders = orders.filter(o => o.status === 'new').length;
  const activeItems = foods.filter(f => f.active).length;

  return (
    <div className={styles.page}>

      <nav className={styles.nav}>
        <div className={styles.logo}>Home<em>ly</em> <span className={styles.cookBadge}>👩‍🍳 Cook</span></div>
        <div className={styles.navTabs}>
          {[
            { key: 'dashboard', label: '📊 Dashboard' },
            { key: 'postfood', label: '➕ Post Food' },
            { key: 'myfoods', label: '🍱 My Foods' },
            { key: 'orders', label: `🔔 Orders ${newOrders > 0 ? `(${newOrders})` : ''}` },
          ].map(tab => (
            <button
              key={tab.key}
              className={`${styles.tabBtn} ${activeTab === tab.key ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button className={styles.exitBtn} onClick={() => navigate('/')}>← Home</button>
      </nav>

      <div className={styles.content}>

        {activeTab === 'dashboard' && (
          <div className={styles.dashWrap}>
            <div className={styles.welcomeBar}>
              <div>
                <h2 className={styles.welcomeTitle}>Welcome back, {cookName}! 👋</h2>
                <p className={styles.welcomeSub}>Here's how your kitchen is doing today</p>
              </div>
              <button className={styles.postBtn} onClick={() => setActiveTab('postfood')}>
                + Post New Food
              </button>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #D85A30, #f0845a)' }}>
                <div className={styles.statIcon}>💰</div>
                <div className={styles.statValue}>₹{totalEarnings}</div>
                <div className={styles.statLabel}>Total Earnings</div>
              </div>
              <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #378ADD, #5a9fe0)' }}>
                <div className={styles.statIcon}>📦</div>
                <div className={styles.statValue}>{orders.length}</div>
                <div className={styles.statLabel}>Total Orders</div>
              </div>
              <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #1D9E75, #3dba8f)' }}>
                <div className={styles.statIcon}>🍱</div>
                <div className={styles.statValue}>{activeItems}</div>
                <div className={styles.statLabel}>Active Items</div>
              </div>
              <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #9B59B6, #b07cc6)' }}>
                <div className={styles.statIcon}>🔔</div>
                <div className={styles.statValue}>{newOrders}</div>
                <div className={styles.statLabel}>New Orders</div>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Recent Orders</h3>
                <button className={styles.seeAllBtn} onClick={() => setActiveTab('orders')}>See all →</button>
              </div>
              {orders.length === 0 ? (
                <p style={{ color: '#999', padding: '1rem' }}>No orders yet!</p>
              ) : orders.slice(0, 3).map(order => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderLeft}>
                    <div className={styles.orderId}>{order.id}</div>
                    <div className={styles.orderItem}>{order.item} × {order.qty}</div>
                    <div className={styles.orderCustomer}>👤 {order.customer} · {order.area}</div>
                  </div>
                  <div className={styles.orderRight}>
                    <div className={styles.orderTotal}>₹{order.total}</div>
                    <div className={`${styles.statusBadge} ${styles['status_' + order.status]}`}>
                      {order.status === 'new' ? '🆕 New' : order.status === 'preparing' ? '👩‍🍳 Preparing' : '✅ Delivered'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.tipsCard}>
              <h3 className={styles.tipsTitle}>💡 Tips to get more orders</h3>
              <div className={styles.tipsList}>
                <div className={styles.tip}>📸 Add photos to your food items — gets 3x more orders!</div>
                <div className={styles.tip}>⏰ Be available during breakfast (7–10am) and lunch (12–2pm)</div>
                <div className={styles.tip}>🏷️ Keep prices competitive — ₹60–150 works best in Bangalore</div>
                <div className={styles.tip}>⭐ Quick delivery = better ratings = more orders!</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'postfood' && (
          <div className={styles.formWrap}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2>➕ Post a Food Item</h2>
                <p>Share your delicious home food with Bangalore!</p>
              </div>
              <form onSubmit={handlePostFood}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroupFull}>
                    <label>Food Name *</label>
                    <input name="name" placeholder="e.g. Chicken Biryani" value={foodForm.name} onChange={handleFoodChange} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Price per Serving (₹) *</label>
                    <input name="price" type="number" placeholder="e.g. 120" value={foodForm.price} onChange={handleFoodChange} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Serves (persons)</label>
                    <select name="serves" value={foodForm.serves} onChange={handleFoodChange}>
                      <option value="1">1 person</option>
                      <option value="2">2 persons</option>
                      <option value="3">3 persons</option>
                      <option value="4">4+ persons</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Category *</label>
                    <select name="category" value={foodForm.category} onChange={handleFoodChange} required>
                      <option value="">Select category</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Cuisine</label>
                    <select name="cuisine" value={foodForm.cuisine} onChange={handleFoodChange}>
                      <option value="">Select cuisine</option>
                      {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroupFull}>
                    <label>Description</label>
                    <textarea name="description" placeholder="Describe your dish..." value={foodForm.description} onChange={handleFoodChange} rows={3} />
                  </div>
                  <div className={styles.formGroupFull}>
                    <label>Food Type *</label>
                    <div className={styles.vegToggle}>
                      <button type="button" className={`${styles.vegBtn} ${foodForm.veg === 'veg' ? styles.vegActive : ''}`} onClick={() => setFoodForm({ ...foodForm, veg: 'veg' })}>
                        🟢 Vegetarian
                      </button>
                      <button type="button" className={`${styles.vegBtn} ${foodForm.veg === 'nonveg' ? styles.nonvegActive : ''}`} onClick={() => setFoodForm({ ...foodForm, veg: 'nonveg' })}>
                        🔴 Non-Vegetarian
                      </button>
                    </div>
                  </div>
                </div>
                <button type="submit" className={styles.submitBtn}>🚀 Post Food Item</button>
                <button type="button" className={styles.cancelBtn} onClick={() => setActiveTab('dashboard')}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'myfoods' && (
          <div className={styles.myFoodsWrap}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>🍱 My Food Items</h2>
              <button className={styles.postBtn} onClick={() => setActiveTab('postfood')}>+ Post New</button>
            </div>
            {foods.length === 0 ? (
              <div className={styles.emptyState}>
                <div style={{ fontSize: 56 }}>🍱</div>
                <h3>No food items yet!</h3>
                <p>Post your first dish to start getting orders</p>
                <button className={styles.postBtn} onClick={() => setActiveTab('postfood')}>+ Post Food</button>
              </div>
            ) : (
              <div className={styles.foodsGrid}>
                {foods.map(food => (
                  <div key={food.id} className={`${styles.foodCard} ${!food.active ? styles.foodInactive : ''}`}>
                    <div className={styles.foodCardTop}>
                      <div className={styles.foodEmoji}>🍛</div>
                      <div className={`${styles.activePill} ${food.active ? styles.pillActive : styles.pillInactive}`}>
                        {food.active ? '● Live' : '○ Paused'}
                      </div>
                    </div>
                    <div className={styles.foodName}>{food.name}</div>
                    <div className={styles.foodMeta}>
                      <span className={styles.foodCategory}>{food.category}</span>
                      <span className={styles.foodPrice}>₹{food.price}</span>
                    </div>
                    <div className={styles.foodOrders}>📦 {food.orders} orders received</div>
                    <div className={styles.foodActions}>
                      <button className={`${styles.actionBtn} ${food.active ? styles.pauseBtn : styles.resumeBtn}`} onClick={() => toggleActive(food.id)}>
                        {food.active ? 'Pause' : 'Resume'}
                      </button>
                      <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => deleteFood(food.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className={styles.ordersWrap}>
            <h2 className={styles.sectionTitle}>🔔 Incoming Orders</h2>
            {orders.length === 0 ? (
              <div className={styles.emptyState}>
                <div style={{ fontSize: 56 }}>📭</div>
                <h3>No orders yet!</h3>
                <p>Orders will appear here once customers start ordering</p>
              </div>
            ) : (
              <div className={styles.ordersList}>
                {orders.map(order => (
                  <div key={order.id} className={styles.orderDetailCard}>
                    <div className={styles.orderDetailTop}>
                      <div>
                        <div className={styles.orderId}>{order.id}</div>
                        <div className={styles.orderItem}>{order.item} × {order.qty}</div>
                        <div className={styles.orderCustomer}>👤 {order.customer} · 📍 {order.area}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className={styles.orderTotal}>₹{order.total}</div>
                        <div className={`${styles.statusBadge} ${styles['status_' + order.status]}`}>
                          {order.status === 'new' ? '🆕 New' : order.status === 'preparing' ? '👩‍🍳 Preparing' : '✅ Delivered'}
                        </div>
                      </div>
                    </div>
                    {order.status === 'new' && (
                      <div className={styles.orderBtns}>
                        <button className={styles.acceptBtn} onClick={() => updateOrderStatus(order.id, 'preparing')}>✅ Accept & Start Cooking</button>
                      </div>
                    )}
                    {order.status === 'preparing' && (
                      <div className={styles.orderBtns}>
                        <button className={styles.deliverBtn} onClick={() => updateOrderStatus(order.id, 'delivered')}>🛵 Mark as Delivered</button>
                      </div>
                    )}
                    {order.status === 'delivered' && (
                      <div className={styles.deliveredNote}>✅ Order completed successfully!</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      <div className={`${styles.toast} ${toastVisible ? styles.toastShow : ''}`}>{toast}</div>
    </div>
  );
}