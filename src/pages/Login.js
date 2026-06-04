import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://legendary-xylophone-5g74jjx6pr4376qx-5000.app.github.dev/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);

        if (data.role === 'cook') {
          navigate('/cook-dashboard');
        } else {
          navigate('/customer');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">

        <div className="form-header">
          <h2>Welcome Back 👋</h2>
          <p>Login to your Homely account</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

          <button type="submit" className="submit-btn">
            Login 🚀
          </button>

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>

        </form>

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          New cook?{' '}
          <span
            style={{ color: '#e67e22', cursor: 'pointer' }}
            onClick={() => navigate('/cook-register')}
          >
            Register here
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;