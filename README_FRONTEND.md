# Hệ Thống Quản Lý Khách Sạn - Frontend (Hotel Management System - Frontend)

## 📋 Mô Tả Dự Án
Đây là giao diện người dùng (Frontend) cho hệ thống quản lý khách sạn. Được xây dựng bằng HTML5, CSS3 và JavaScript vanilla với Fetch API để giao tiếp với backend NestJS.

## 🎨 Bố Cục Giao Diện (UI Layout)
Theo yêu cầu, giao diện được thiết kế với 4 phần chính:

### 1. **HEADER (Đầu Trang)**
- Logo và thương hiệu khách sạn (LUXE HOTEL MANAGEMENT)
- Menu điều hướng với các mục:
  - Phòng (Rooms)
  - Khách Hàng (Customers)
  - Đặt Phòng (Bookings)
  - Dịch Vụ (Services)
  - Nhân Viên (Staff)
  - Hóa Đơn (Invoices)
- Sticky header (gắn ở đầu khi cuộn trang)
- Responsive menu cho mobile

### 2. **BANNER (Biểu Ngữ)**
- Hình ảnh nền gradient chuyên nghiệp
- Tiêu đề chính: "Chào Mừng Đến Hệ Thống Quản Lý Khách Sạn"
- Slogan: "Quản lý hiệu quả, phục vụ khách tốt hơn"
- Hiệu ứng parallax scroll

### 3. **CONTENT (Nội Dung Chính)**
Bao gồm các section có thể chuyển đổi:

#### **Dashboard (Bảng Điều Khiển)**
- Hiển thị 4 card thống kê:
  - Tổng số phòng
  - Tổng số khách hàng
  - Tổng số đặt phòng
  - Tổng số dịch vụ
- Tải dữ liệu từ API khi khởi động

#### **Quản Lý Phòng (Rooms Management)**
- Danh sách phòng dạng card grid
- Hiển thị: Số phòng, loại, tầng, giá, trạng thái
- Nút: Thêm, Sửa, Xóa
- Modal form để thêm phòng mới

#### **Quản Lý Khách Hàng (Customers Management)**
- Danh sách khách hàng dạng card
- Hiển thị: Tên, Email, Điện thoại, Địa chỉ, Quốc gia
- Nút: Thêm, Sửa, Xóa
- Modal form để thêm khách hàng

#### **Quản Lý Đặt Phòng (Bookings Management)**
- Danh sách đặt phòng dạng card
- Hiển thị: ID, Khách hàng, Phòng, Ngày nhận/trả, Tổng tiền
- Nút: Xem, Xóa

#### **Quản Lý Dịch Vụ (Services Management)**
- Danh sách dịch vụ dạng card
- Hiển thị: Tên, Mô tả, Giá, Trạng thái
- Nút: Thêm, Sửa, Xóa

#### **Quản Lý Nhân Viên (Staff Management)**
- Danh sách nhân viên dạng card
- Hiển thị: Tên, Vị trí, Email, Điện thoại, Ngày vào làm, Lương
- Nút: Thêm, Sửa, Xóa

#### **Quản Lý Hóa Đơn (Invoices Management)**
- Danh sách hóa đơn dạng table
- Hiển thị: ID, Booking ID, Ngày tạo, Tổng tiền, Trạng thái
- Nút: Xem chi tiết

### 4. **FOOTER (Chân Trang)**
- Giới thiệu về hệ thống
- Liên kết nhanh đến các module
- Thông tin liên hệ (Điện thoại, Email, Địa chỉ)
- Bản quyền

## 🚀 Cách Sử Dụng

### Yêu Cầu
- Frontend chỉ cần một trình duyệt web hiện đại
- Backend NestJS đang chạy trên `http://localhost:3000` (hoặc thay đổi trong file `app.js`)

### Bước 1: Chuẩn Bị Backend
```bash
# Di chuyển đến thư mục backend
cd baitapquanlikhacsan-main

# Cài đặt dependencies
npm install

# Tạo file .env với cấu hình database
touch .env
# Nội dung:
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=hotel

# Khởi động server
npm run start:dev
# Server sẽ chạy ở http://localhost:3000
```

### Bước 2: Mở Frontend
Cách 1: Dùng Live Server
```bash
# Cài đặt Live Server trong VS Code
# Click chuột phải vào index.html -> Open with Live Server
```

Cách 2: Dùng Python server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Cách 3: Dùng Node.js http-server
```bash
npm install -g http-server
http-server
```

Cách 4: Mở trực tiếp trong trình duyệt
- Đơn giản nhất: Nhấp đôi vào `index.html` hoặc kéo vào trình duyệt

## 📁 Cấu Trúc File

```
frontend/
├── index.html          # HTML chính
├── styles.css          # CSS toàn bộ giao diện
├── app.js              # JavaScript - Fetch API + Logic
├── README_FRONTEND.md  # Tài liệu này
└── .gitignore          # (Optional)
```

## 🔌 API Endpoints Được Sử Dụng

### Fetch API Configuration
```javascript
const API_BASE_URL = 'http://localhost:3000';

// GET - Lấy dữ liệu
await fetchData('/rooms')
await fetchData('/customers')
await fetchData('/bookings')
await fetchData('/services')
await fetchData('/staff')
await fetchData('/invoices')

// POST - Tạo mới
await createData('/rooms', roomData)
await createData('/customers', customerData)
// ...v.v

// PUT - Cập nhật
await updateData('/rooms', id, updatedData)
// ...v.v

// DELETE - Xóa
await deleteData('/rooms', id)
// ...v.v
```

### Backend API Endpoints
```
GET    /rooms              - Lấy tất cả phòng
POST   /rooms              - Tạo phòng mới
GET    /rooms/:id          - Lấy thông tin 1 phòng
PUT    /rooms/:id          - Cập nhật phòng
DELETE /rooms/:id          - Xóa phòng
GET    /rooms?status=...   - Lọc theo trạng thái

GET    /customers          - Lấy tất cả khách hàng
POST   /customers          - Tạo khách hàng mới
GET    /customers/:id      - Lấy thông tin 1 khách
PUT    /customers/:id      - Cập nhật khách hàng
DELETE /customers/:id      - Xóa khách hàng

GET    /bookings           - Lấy tất cả đặt phòng
POST   /bookings           - Tạo đặt phòng mới
GET    /bookings/:id       - Lấy thông tin 1 đặt phòng
PUT    /bookings/:id       - Cập nhật đặt phòng
DELETE /bookings/:id       - Xóa đặt phòng

GET    /services           - Lấy tất cả dịch vụ
POST   /services           - Tạo dịch vụ mới
GET    /services/:id       - Lấy thông tin 1 dịch vụ
PUT    /services/:id       - Cập nhật dịch vụ
DELETE /services/:id       - Xóa dịch vụ

GET    /staff              - Lấy tất cả nhân viên
POST   /staff              - Tạo nhân viên mới
GET    /staff/:id          - Lấy thông tin 1 nhân viên
PUT    /staff/:id          - Cập nhật nhân viên
DELETE /staff/:id          - Xóa nhân viên

GET    /invoices           - Lấy tất cả hóa đơn
POST   /invoices           - Tạo hóa đơn mới
GET    /invoices/:id       - Lấy thông tin 1 hóa đơn
```

## 🎯 Tính Năng Chính

✅ **Đã Xây Dựng:**
- [x] Bố cục Header/Banner/Content/Footer
- [x] Navigation giữa các modules
- [x] Fetch API để giao tiếp backend
- [x] Dashboard với thống kê
- [x] Danh sách rooms, customers, bookings, services, staff, invoices
- [x] Form thêm mới dữ liệu (Modal)
- [x] Xóa dữ liệu
- [x] Responsive design cho mobile/tablet/desktop
- [x] Alert notifications
- [x] Spinner loading
- [x] Date formatting

⏳ **Sắp Xây Dựng:**
- [ ] Form sửa dữ liệu (Edit)
- [ ] Tìm kiếm và lọc dữ liệu
- [ ] Export dữ liệu ra Excel/PDF
- [ ] Pagination cho danh sách dài
- [ ] Chart/Graph hiển thị thống kê
- [ ] Authentication/Login
- [ ] Upload ảnh
- [ ] Validation form nâng cao

## 🎨 Thiết Kế

### Màu Sắc
- **Primary Color:** #2c3e50 (Xanh đậm)
- **Secondary Color:** #e74c3c (Đỏ cam)
- **Success:** #27ae60 (Xanh lá)
- **Warning:** #f39c12 (Vàng)

### Font
- Font chính: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Kích thước: Responsive

### Icon
- Sử dụng Font Awesome 6.4.0 từ CDN

## 📱 Responsive Design

- **Desktop:** > 992px - Full layout
- **Tablet:** 768px - 991px - Adjusted layout
- **Mobile:** < 768px - Single column, responsive menu

## 🔧 Troubleshooting

### Problem: "Cannot fetch data from backend"
**Solution:**
1. Kiểm tra backend đang chạy: `http://localhost:3000`
2. Kiểm tra CORS được enable trong backend
3. Thay đổi `API_BASE_URL` trong `app.js` nếu backend chạy ở port khác

### Problem: "Form tidak gửi dữ liệu"
**Solution:**
1. Mở DevTools (F12) → Console để xem lỗi
2. Kiểm tra dữ liệu form có đúng định dạng
3. Kiểm tra backend có endpoint tương ứng

### Problem: "Giao diện không đẹp/lỗi CSS"
**Solution:**
1. Xóa cache trình duyệt (Ctrl+Shift+Delete)
2. Tải lại trang (F5 hoặc Ctrl+R)
3. Kiểm tra file `styles.css` được load đúng

## 📚 Tài Liệu Tham Khảo

- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [NestJS Documentation](https://docs.nestjs.com/)

## 👤 Tác Giả
- Sinh viên: [Your Name]
- Lớp: [Your Class]
- Trường: [Your School]

## 📝 Ghi Chú
- Tất cả form hiện được validate ở client-side (basic)
- Hãy thêm validation server-side ở backend để bảo mật
- CORS cần được enable trong backend
- Hãy sử dụng HTTPS trong production

## 📞 Liên Hệ Support
Nếu có bất kỳ vấn đề, vui lòng liên hệ người phát triển hoặc tạo issue trên repository.

---

**Happy Coding! 🚀**
