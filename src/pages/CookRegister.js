import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CookRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    idProof: '',
    speciality: '',
    agreed: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert('Please agree to food safety guidelines!');
      return;
    }
    // ✅ Navigate to Cook Dashboard after registration
    navigate('/cook-dashboard');
  };

  return (
    <div className="form-page">
      <div className="form-container">

        <div className="form-header">
          <h2>Cook Registration</h2>
          <p>Join Homely and start earning from your kitchen!</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your mobile number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Full Address</label>
            <textarea
              name="address"
              placeholder="Enter your complete address in Bangalore"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>ID Proof Type</label>
            <select
              name="idProof"
              value={formData.idProof}
              onChange={handleChange}
              required
            >
              <option value="">Select ID proof</option>
              <option value="aadhar">Aadhar Card</option>
              <option value="pan">PAN Card</option>
              <option value="voter">Voter ID</option>
              <option value="passport">Passport</option>
            </select>
          </div>

          <div className="form-group">
            <label>Your Food Speciality</label>
            <input
              type="text"
              name="speciality"
              placeholder="eg: South Indian, North Indian, Biryani"
              value={formData.speciality}
              onChange={handleChange}
              required
            />
          </div>

          <div className="safety-box">
            <h3>Food Safety Guidelines</h3>
            <ul>
              <li>Always cook in a clean and hygienic kitchen</li>
              <li>Wash hands before preparing any food</li>
              <li>Use fresh ingredients only</li>
              <li>Pack food in sealed, clean containers</li>
              <li>Never prepare food if you are unwell</li>
            </ul>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="agreed"
              id="agreed"
              checked={formData.agreed}
              onChange={handleChange}
            />
            <label htmlFor="agreed">
              I agree to follow all food safety guidelines
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Submit Registration 🚀
          </button>

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>

        </form>
      </div>
    </div>
  );
}

export default CookRegister;