import React from 'react';
import './cart.css';

function Cart({ prop }) {
  return (
    <div className="cart-card">
      <div className="card-header">
        <div className="subject-icon">{prop.sub.charAt(0)}</div>
        <div className="header-content">
          <h2 className="subject-title">{prop.sub}</h2>
          <div className="meta-info">
            <span className="questions">12 Questions</span>
            <span className="duration">30 mins</span>
          </div>
        </div>
      </div>
      
      <div className="card-body">
        <p className="description">{prop.des}</p>
        
        <div className="progress-section">
          <div className="progress-labels">
            <span>Difficulty</span>
            <span>Medium</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '65%' }}></div>
          </div>
        </div>
        
        <div className="stats">
          <div className="stat-item">
            <div className="stat-value">87%</div>
            <div className="stat-label">Pass Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">4.7</div>
            <div className="stat-label">Rating</div>
          </div>
        </div>
      </div>
      
      <div className="card-footer">
        <button className="start-button">Start Exam</button>
        <div className="action-icons">
          <span className="icon bookmark">🔖</span>
          <span className="icon share">📤</span>
        </div>
      </div>
    </div>
  );
}

export default Cart;