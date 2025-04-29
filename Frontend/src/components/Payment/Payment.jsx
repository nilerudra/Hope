import React, { useState } from 'react';
import axios from 'axios';
import './payment.css'
import { useLocation } from "react-router-dom";


const Payment = () => {
  const location = useLocation();
  const { ngoId } = location.state || {};
  console.log(ngoId)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    amount: '',
    userId:localStorage.getItem("user_id"),
    ngoIds:[ngoId]
  });
  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/create-order', formData);
      console.log(response.data);
      window.location.href = response.data.url;
    } catch (error) {
      console.log("Error in payment", error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Donate Now</h1>
      <form>
        <div className="mb-4">
          <label className="input-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="input-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="input-label">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter your mobile number"
          />
        </div>
        <div className="mb-4">
          <label className="input-label">Donation Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter donation amount"
          />
        </div>
       
        <button
          type="button"
          onClick={handlePayment}
          className="button"
        >
          Donate Now
        </button>
       
      </form>
      
    </div>
  );
};

export default Payment;
