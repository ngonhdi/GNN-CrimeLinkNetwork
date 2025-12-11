import React, { useState, useEffect } from "react";

/**
 * StorytellingIntro - Component giới thiệu theo phong cách detective story
 * Tạo sự cuốn hút bằng cách kể một câu chuyện vụ án bí ẩn
 */
const StorytellingIntro = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState("");

  const storySteps = [
    {
      title: "🌙 Hà Nội, 2:30 sáng - 05/11/2024",
      text: "Chị Nguyễn Thu H., 28 tuổi, được phát hiện tử vong tại căn hộ chung cư cao cấp quận Cầu Giấy. Hiện trường không có dấu hiệu đột nhập, tài sản nguyên vẹn. Nạn nhân bị siết cổ bằng dây điện. Camera hành lang bị vô hiệu hóa từ 1:45 sáng. Không có nhân chứng. Không có dấu vết DNA.",
      image: "🏢",
      theory: null,
    },
    {
      title: "🔍 15 ngày điều tra - Không manh mối",
      text: "Cơ quan điều tra rà soát mọi mối quan hệ của nạn nhân: gia đình, bạn bè, đồng nghiệp. Tất cả đều có alibi vững chắc. Phân tích camera trong bán kính 2km - không phát hiện người khả nghi. Kiểm tra hồ sơ tội phạm có tiền án tương tự - không có kết quả. Vụ án tưởng chừng đi vào ngõ cụt...",
      image: "📋",
      theory: null,
    },
    {
      title: "💡 Quyết định đột phá - Áp dụng AI",
      text: "Lãnh đạo Công an TP quyết định triển khai thử nghiệm 'Hệ thống Truy vết Tội phạm GNN' - công nghệ mới nhất về phân tích mạng lưới. Toàn bộ dữ liệu: 87,000 vụ án hình sự từ 2020-2024, 3.2 triệu hồ sơ cư dân, 15,000 camera an ninh được đưa vào phân tích đồ thị đa chiều trong 6 giờ...",
      image: "🧠",
      theory: "routine_activity",
    },
    {
      title: "⚡ Phát hiện rùng rợn - Mạng lưới ẩn",
      text: "Hệ thống GNN báo động: phát hiện 8 vụ án tương tự trong 18 tháng qua ở 4 quận/huyện khác nhau! Cùng thủ đoạn: nạn nhân nữ độc thân, 2:00-3:30 sáng, siết cổ bằng dây điện, camera bị vô hiệu hóa 15-20 phút trước. Tương đồng 94.7%. Các vụ trước bị xử lý riêng lẻ, không ai nhận ra đây là cùng một đối tượng!",
      image: "🔗",
      theory: "crime_pattern",
    },
    {
      title: "🎯 48 giờ phá án - Bắt giữ thành công",
      text: "GNN phân tích di chuyển không gian-thời gian, dự đoán khu vực tiếp theo với xác suất 89%. Triển khai 120 cán bộ, giám sát 15 tòa chung cư trọng điểm. Rạng sáng 23/11, phát hiện đối tượng Lê Văn T., 34 tuổi, thợ điện, đang theo dõi mục tiêu. Bắt giữ tại trận, thu được dụng cụ gây án. Đối tượng khai nhận toàn bộ 9 vụ!",
      image: "⚖️",
      theory: "hot_spots",
    },
  ];

  // Typing animation effect
  useEffect(() => {
    if (currentStep >= storySteps.length) return;

    const fullText = storySteps[currentStep].text;
    let index = 0;
    setDisplayText("");
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < storySteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (currentStep >= storySteps.length) {
    return null;
  }

  const step = storySteps[currentStep];

  return (
    <div className="storytelling-overlay">
      <div className="storytelling-container">
        {/* Progress dots */}
        <div className="story-progress">
          {storySteps.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${index === currentStep ? "active" : ""} ${
                index < currentStep ? "completed" : ""
              }`}
            />
          ))}
        </div>

        {/* Story content */}
        <div className="story-content">
          <div className="story-image">
            <div className="story-emoji">{step.image}</div>
          </div>

          <h2 className="story-title">{step.title}</h2>

          <div className="story-text-container">
            <p className="story-text">
              {displayText}
              {isTyping && <span className="typing-cursor">▊</span>}
            </p>
          </div>

          {/* Theory tag if applicable */}
          {step.theory && !isTyping && (
            <div className="theory-tag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              {step.theory === "routine_activity"
                ? "Lý thuyết Hoạt động Thường Ngày"
                : "Lý thuyết Tội phạm học"}
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="story-actions">
          <button className="story-btn secondary" onClick={handleSkip}>
            Bỏ qua
          </button>
          <button
            className="story-btn primary"
            onClick={handleNext}
            disabled={isTyping}
          >
            {currentStep === storySteps.length - 1 ? "Bắt đầu khám phá" : "Tiếp tục"}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ marginLeft: "8px" }}
            >
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </button>
        </div>

        {/* Easter egg: Click on emoji for fun animation */}
        <div className="story-hint">
          💡 Mẹo: {currentStep + 1} / {storySteps.length}
        </div>
      </div>
    </div>
  );
};

export default StorytellingIntro;
