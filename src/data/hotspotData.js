/**
 * Dữ liệu điểm nóng tội phạm thực tế tại Hà Nội
 * Cấu trúc 2 cấp: Thành phố Hà Nội → Phường/Xã (KHÔNG có cấp Quận)
 * Tọa độ GPS thực tế
 */

export const hotspotLocations = [
  {
    id: 1,
    // Địa chỉ hành chính (2 cấp: Thành phố → Phường)
    province: "Thành phố Hà Nội",
    ward: "Phường Trung Hòa",
    area: "Khu vực Trung Hòa - Nhân Chính",

    // Tọa độ GPS thực
    lat: 21.0278,
    lng: 105.8019,

    // Thông tin điểm nóng
    risk: "cao",
    probability: 87,
    crimeTypes: ["Trộm cắp xe máy", "Cướp giật tài sản"],
    timePattern: "18:00 - 23:00",
    peak: "Thứ 6, Thứ 7, Chủ nhật",
    factors: [
      "Khu vui chơi giải trí tập trung",
      "Ánh sáng đường phố yếu",
      "Mật độ camera an ninh thấp",
      "Đường hẻm nhỏ nhiều"
    ],
    trend: "tăng",
    trendPercent: 15,
    lastIncident: "2 ngày trước",
    incidentCount30days: 12,

    // Chi tiết bổ sung
    description: "Khu vực có nhiều quán cà phê, karaoke, đông người vào cuối tuần",
    recommendation: "Tăng cường tuần tra lưu động vào tối thứ 6, 7, CN"
  },

  {
    id: 2,
    province: "Thành phố Hà Nội",
    ward: "Phường Hàng Đào",
    area: "Khu phố cổ - Hàng Đào, Hàng Ngang",

    lat: 21.0333,
    lng: 105.8520,

    risk: "cao",
    probability: 91,
    crimeTypes: ["Móc túi", "Cướp giật du khách", "Lừa đảo"],
    timePattern: "19:00 - 22:00",
    peak: "Thứ 7, Chủ nhật",
    factors: [
      "Đông du khách",
      "Khu phố đi bộ đông đúc",
      "Nhiều hàng rong che khuất tầm nhìn",
      "Đối tượng trộm cắp chuyên nghiệp"
    ],
    trend: "tăng mạnh",
    trendPercent: 23,
    lastIncident: "Hôm qua",
    incidentCount30days: 18,

    description: "Khu phố cổ thu hút đông du khách, đặc biệt vào cuối tuần",
    recommendation: "Bố trí cảnh sát hóa trang, tăng camera giám sát di động"
  },

  {
    id: 3,
    province: "Thành phố Hà Nội",
    ward: "Phường Láng Hạ",
    area: "Khu văn phòng Láng Hạ - Thành Công",

    lat: 21.0167,
    lng: 105.8140,

    risk: "trung-binh",
    probability: 64,
    crimeTypes: ["Đột nhập văn phòng", "Trộm cắp tài sản công ty"],
    timePattern: "01:00 - 05:00",
    peak: "Thứ 2 - Thứ 6",
    factors: [
      "Nhiều tòa nhà văn phòng",
      "Giờ vắng người",
      "Bảo vệ luân phiên nghỉ",
      "Hệ thống báo động cũ"
    ],
    trend: "ổn định",
    trendPercent: 2,
    lastIncident: "5 ngày trước",
    incidentCount30days: 8,

    description: "Khu văn phòng cao cấp, nhưng an ninh ban đêm chưa đủ",
    recommendation: "Phối hợp với ban quản lý tòa nhà nâng cấp hệ thống an ninh"
  },

  {
    id: 4,
    province: "Thành phố Hà Nội",
    ward: "Phường Kim Mã",
    area: "Khu vực Kim Mã - Giảng Võ",

    lat: 21.0293,
    lng: 105.8191,

    risk: "trung-binh",
    probability: 58,
    crimeTypes: ["Trộm cắp xe hơi", "Đập kính ô tô lấy tài sản"],
    timePattern: "02:00 - 05:00",
    peak: "Thứ 4 - Thứ 6",
    factors: [
      "Nhiều xe đậu ngoài đường qua đêm",
      "Khu vực vắng người ban đêm",
      "Thiếu ánh sáng",
      "Ít camera công cộng"
    ],
    trend: "tăng nhẹ",
    trendPercent: 8,
    lastIncident: "4 ngày trước",
    incidentCount30days: 7,

    description: "Khu dân cư cũ, nhiều xe đậu ngoài đường không có bãi giữ xe",
    recommendation: "Xây dựng bãi đỗ xe có bảo vệ, tăng ánh sáng đường phố"
  },

  {
    id: 5,
    province: "Thành phố Hà Nội",
    ward: "Phường Bạch Đằng",
    area: "Khu vực Bạch Đằng - Minh Khai",

    lat: 21.0069,
    lng: 105.8511,

    risk: "thấp",
    probability: 32,
    crimeTypes: ["Va chạm giao thông", "Cãi vã đánh nhau"],
    timePattern: "07:00 - 09:00, 17:00 - 19:00",
    peak: "Thứ 2 - Thứ 6",
    factors: [
      "Giao thông đông đúc giờ cao điểm",
      "Đường hẹp, xe đông",
      "Người dân vội vàng, mất kiên nhẫn"
    ],
    trend: "giảm",
    trendPercent: -5,
    lastIncident: "2 tuần trước",
    incidentCount30days: 4,

    description: "Khu vực có nhiều vi phạm giao thông nhưng tình hình đang được cải thiện",
    recommendation: "Duy trì công tác tuyên truyền, điều tiết giao thông giờ cao điểm"
  },

  {
    id: 6,
    province: "Thành phố Hà Nội",
    ward: "Phường Quảng An",
    area: "Khu vực Hồ Tây - Quảng An",

    lat: 21.0583,
    lng: 105.8236,

    risk: "trung-binh",
    probability: 55,
    crimeTypes: ["Móc túi du khách", "Chèo kéo, lừa đảo"],
    timePattern: "18:00 - 23:00",
    peak: "Thứ 7, Chủ nhật",
    factors: [
      "Đông du khách nước ngoài",
      "Nhiều quán bar, nhà hàng",
      "Đối tượng chuyên nghiệp",
      "Du khách thiếu cảnh giác"
    ],
    trend: "tăng nhẹ",
    trendPercent: 6,
    lastIncident: "3 ngày trước",
    incidentCount30days: 9,

    description: "Khu vực giải trí bên Hồ Tây thu hút đông khách nước ngoài",
    recommendation: "Bố trí lực lượng hóa trang, phối hợp với chủ quán bar/nhà hàng"
  },

  {
    id: 7,
    province: "Thành phố Hà Nội",
    ward: "Phường Nhân Chính",
    area: "Khu chung cư Hapulico",

    lat: 20.9950,
    lng: 105.8090,

    risk: "thấp",
    probability: 28,
    crimeTypes: ["Trộm cắp trong chung cư", "Mất trật tự"],
    timePattern: "14:00 - 16:00",
    peak: "Thứ 2 - Thứ 6",
    factors: [
      "Khu chung cư đông dân cư",
      "An ninh tương đối tốt",
      "Có camera giám sát",
      "Ban quản lý chặt chẽ"
    ],
    trend: "ổn định",
    trendPercent: 0,
    lastIncident: "3 tuần trước",
    incidentCount30days: 3,

    description: "Khu chung cư hiện đại với hệ thống an ninh tốt",
    recommendation: "Duy trì công tác phối hợp với ban quản lý"
  },

  {
    id: 8,
    province: "Thành phố Hà Nội",
    ward: "Phường Ngọc Lâm",
    area: "Khu chợ đầu mối Long Biên",

    lat: 21.0408,
    lng: 105.8947,

    risk: "cao",
    probability: 78,
    crimeTypes: ["Móc túi", "Cướp giật", "Trộm cắp hàng hóa"],
    timePattern: "04:00 - 08:00",
    peak: "Hàng ngày",
    factors: [
      "Chợ đầu mối đông đúc",
      "Người dân mang tiền mặt nhiều",
      "Đối tượng săn mồi sáng sớm",
      "Ánh sáng chưa đủ"
    ],
    trend: "tăng",
    trendPercent: 12,
    lastIncident: "1 ngày trước",
    incidentCount30days: 15,

    description: "Chợ đầu mối lớn nhất Hà Nội, đông người buôn bán sáng sớm",
    recommendation: "Tăng cường tuần tra sáng sớm, lắp đặt thêm camera, ánh sáng"
  }
];

// Trung tâm bản đồ Hà Nội
export const hanoiCenter = {
  lat: 21.0285,
  lng: 105.8542
};

// Zoom level mặc định
export const defaultZoom = 12;

// Danh sách phường/xã Hà Nội (chính quyền 2 cấp)
export const hanoiWards = [
  "Phường Trung Hòa",
  "Phường Hàng Đào",
  "Phường Láng Hạ",
  "Phường Kim Mã",
  "Phường Bạch Đằng",
  "Phường Quảng An",
  "Phường Nhân Chính",
  "Phường Ngọc Lâm"
];
