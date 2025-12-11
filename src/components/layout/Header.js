import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <div className="logo-text">
          <h1>Hệ thống Truy vết Tội phạm</h1>
          <span>Phân tích Mạng lưới Bằng Mạng Nơ-ron Đồ thị</span>
        </div>
      </div>
      <div className="header-stats">
        <div className="stat-item">
          <div className="stat-value">30,000</div>
          <div className="stat-label">Vụ án</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">976K</div>
          <div className="stat-label">Mối liên hệ</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">92.4%</div>
          <div className="stat-label">Độ chính xác</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
