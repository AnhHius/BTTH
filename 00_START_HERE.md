# 🏨 HỆ THỐNG QUẢN LÝ KHÁCH SẠN - GIAO DIỆN FRONTEND

## 📌 TỔNG QUAN

Đây là **giao diện Frontend chuyên nghiệp** cho hệ thống quản lý khách sạn, được thiết kế theo yêu cầu:
- ✅ Bố cục: **Header/Banner/Content/Footer**
- ✅ Sử dụng: **Fetch API** để giao tiếp với backend
- ✅ Hiển thị dữ liệu động từ database
- ✅ Responsive Design (Mobile/Tablet/Desktop)
- ✅ UI/UX chuyên nghiệp với Bootstrap 5 + Font Awesome

---

## 📂 CÁC FILE TRONG PACKAGE

### 📄 Core Files (Bắt Buộc)
| File | Mô Tả |
|------|-------|
| **index.html** | Trang chính với bố cục Header/Banner/Content/Footer |
| **styles.css** | Toàn bộ CSS styling (14KB) |
| **app.js** | JavaScript logic với Fetch API (30KB) |

### 📚 Documentation Files (Hướng Dẫn)
| File | Nội Dung |
|------|---------|
| **SETUP_GUIDE.md** | Hướng dẫn cài đặt từ A-Z |
| **README_FRONTEND.md** | Tài liệu chi tiết về frontend |
| **FETCH_API_GUIDE.md** | Hướng dẫn sử dụng Fetch API với 10+ ví dụ |
| **00_START_HERE.md** | File này - Điểm khởi đầu |

---

## 🚀 BẮT ĐẦU NHANH (Quick Start)

### 1️⃣ Chuẩn Bị Backend (5 phút)
```bash
cd baitapquanlikhacsan-main
npm install
npm run start:dev
# Backend chạy ở http://localhost:3000
```

### 2️⃣ Mở Frontend (3 phút)
Chọn 1 trong 4 cách:

**Cách A: Live Server (VS Code) - Đơn Giản Nhất**
- Cài extension "Live Server" trong VS Code
- Right-click `index.html` → "Open with Live Server"
- Tự động mở ở `http://localhost:5500`

**Cách B: Python**
```bash
python -m http.server 8000
# Truy cập http://localhost:8000
```

**Cách C: Node http-server**
```bash
npm install -g http-server
http-server
# Truy cập http://localhost:8080
```

**Cách D: Mở Trực Tiếp**
- Nhấp đôi vào `index.html`

### 3️⃣ Test Kết Nối
1. Mở Console (F12)
2. Nhấn vào "Phòng" trong menu
3. Nếu thấy danh sách phòng → ✅ Thành công!

---

## 📊 CẤU TRÚC GIAO DIỆN

### Bố Cục Trang (Page Layout)
```
┌─────────────────────────────────────────┐
│          HEADER (Navigation Bar)         │
├─────────────────────────────────────────┤
│                                         │
│          BANNER (Welcome Section)       │
│          (Hình ảnh background)          │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│        CONTENT (Main Section)           │
│  ┌─────────────────────────────────┐   │
│  │  Dashboard / Rooms / Customers  │   │
│  │  / Bookings / Services / etc    │   │
│  └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│       FOOTER (About & Contact)          │
└─────────────────────────────────────────┘
```

### Content Sections (6 Modules)
1. **Dashboard** - Thống kê tổng quan
2. **Rooms** - Quản lý phòng
3. **Customers** - Quản lý khách hàng
4. **Bookings** - Quản lý đặt phòng
5. **Services** - Quản lý dịch vụ
6. **Staff** - Quản lý nhân viên
7. **Invoices** - Quản lý hóa đơn

---

## 🔌 Fetch API - Cách Hoạt Động

### Công Thức Chung
```javascript
fetch(URL, OPTIONS)
  .then(response => response.json())
  .then(data => console.log(data))
```

### 4 Phương Thức Cơ Bản

#### 1. GET - Lấy Dữ Liệu
```javascript
// Lấy tất cả phòng
const rooms = await fetchData('/rooms');

// Lấy 1 phòng
const room = await fetchData('/rooms/1');
```

#### 2. POST - Tạo Mới
```javascript
const newRoom = {
  roomNumber: '105',
  roomType: 'Suite',
  price: 150
};
await createData('/rooms', newRoom);
```

#### 3. PUT - Cập Nhật
```javascript
const updatedRoom = { roomNumber: '105A', ... };
await updateData('/rooms', 1, updatedRoom);
```

#### 4. DELETE - Xóa
```javascript
await deleteData('/rooms', 1);
```

**Xem chi tiết:** Mở file `FETCH_API_GUIDE.md`

---

## 📋 Danh Sách API Endpoints

### Rooms (Phòng)
```
GET    /rooms          → Danh sách tất cả
GET    /rooms/:id      → Chi tiết 1 phòng
POST   /rooms          → Thêm mới
PUT    /rooms/:id      → Cập nhật
DELETE /rooms/:id      → Xóa
```

### Customers (Khách Hàng)
```
GET    /customers      → Danh sách tất cả
GET    /customers/:id  → Chi tiết 1 khách
POST   /customers      → Thêm mới
PUT    /customers/:id  → Cập nhật
DELETE /customers/:id  → Xóa
```

### Bookings (Đặt Phòng)
```
GET    /bookings       → Danh sách tất cả
GET    /bookings/:id   → Chi tiết
POST   /bookings       → Thêm mới
PUT    /bookings/:id   → Cập nhật
DELETE /bookings/:id   → Xóa
```

### Services, Staff, Invoices
Tương tự như trên

---

## 🎨 Tính Năng Giao Diện

### ✅ Đã Xây Dựng
- [x] Bố cục Header/Banner/Content/Footer
- [x] Navigation menu 6 modules
- [x] Dashboard với 4 stat cards
- [x] Danh sách data dạng card grid
- [x] Form thêm mới (Modal)
- [x] Nút xóa dữ liệu
- [x] Loading spinner
- [x] Alert notifications (Success/Error)
- [x] Responsive design (Mobile/Tablet/Desktop)
- [x] Date formatting
- [x] Status badges
- [x] Bootstrap 5 + Font Awesome icons

### ⏳ Có Thể Mở Rộng
- [ ] Form sửa dữ liệu
- [ ] Tìm kiếm & Lọc
- [ ] Pagination
- [ ] Charts/Graphs
- [ ] Export PDF/Excel
- [ ] Login/Authentication
- [ ] Upload ảnh
- [ ] Validation form nâng cao

---

## 🎯 Các Bước Chi Tiết

### Bước 1: Thiết Lập Backend
```bash
# 1.1 Mở Terminal
cd baitapquanlikhacsan-main

# 1.2 Cài đặt
npm install

# 1.3 Tạo .env file
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=pass
# DB_NAME=hotel

# 1.4 Tạo database
mysql -u root -p < sql/Quan_Ly_Khach_San.sql

# 1.5 Chạy
npm run start:dev
```

### Bước 2: Thiết Lập Frontend
```bash
# 2.1 Copy 3 file vào folder mới
# - index.html
# - styles.css
# - app.js

# 2.2 Chạy một trong các server
# Option A: Live Server (VS Code)
# Option B: python -m http.server 8000
# Option C: http-server
# Option D: Mở trực tiếp index.html

# 2.3 Truy cập
# http://localhost:5500 (Live Server)
# http://localhost:8000 (Python)
# http://localhost:8080 (http-server)
```

### Bước 3: Test Kết Nối
```javascript
// Mở Console (F12) và chạy:
fetch('http://localhost:3000/rooms')
  .then(r => r.json())
  .then(d => console.log(d))
```

### Bước 4: Sử Dụng
1. Click menu "Phòng" → Xem danh sách
2. Click "Thêm Phòng" → Form hiện ra
3. Nhập dữ liệu → Click "Thêm Phòng"
4. Kiểm tra kết quả

---

## 🐛 Troubleshooting

### ❌ "Không thấy dữ liệu"
**Giải pháp:**
1. Mở F12 → Console
2. Kiểm tra lỗi gì được hiển thị
3. Chắc chắn backend chạy ở `http://localhost:3000`
4. Kiểm tra database có dữ liệu không

### ❌ "CORS error"
**Giải pháp:**
Thêm vào backend `src/main.ts`:
```typescript
app.enableCors({
  origin: 'http://localhost:8000',
  credentials: true,
});
```

### ❌ "Form không gửi dữ liệu"
**Giải pháp:**
1. Mở F12 → Network tab
2. Xem request đi đâu
3. Kiểm tra backend endpoint có tồn tại
4. Kiểm tra dữ liệu form có đúng format

### ❌ "Giao diện lỗi CSS"
**Giải pháp:**
1. Xóa cache (Ctrl+Shift+Delete)
2. Tải lại (F5)
3. Kiểm tra file `styles.css` được load

---

## 📖 Hướng Dẫn Chi Tiết

| Chủ Đề | File | Mục Đích |
|--------|------|---------|
| Cài đặt toàn bộ | **SETUP_GUIDE.md** | A-Z setup |
| Frontend details | **README_FRONTEND.md** | Tài liệu chi tiết |
| Fetch API | **FETCH_API_GUIDE.md** | 10+ ví dụ code |

---

## 💡 Tips & Tricks

### Tip 1: Thay Đổi API URL
Mở `app.js`, tìm dòng:
```javascript
const API_BASE_URL = 'http://localhost:3000';
```
Thay đổi thành URL backend của bạn

### Tip 2: Customize Màu Sắc
Mở `styles.css`, tìm `:root`:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #e74c3c;
    /* ... v.v ... */
}
```

### Tip 3: Thêm Logo
Thay đổi trong `index.html`:
```html
<a class="navbar-brand" href="#">
    <img src="logo.png"> LUXE HOTEL
</a>
```

### Tip 4: Đổi Ngôn Ngữ
Tìm text tiếng Việt và thay bằng tiếng Anh (hoặc ngôn ngữ khác)

---

## 📊 Cấu Trúc Dữ Liệu API

### Room Object
```json
{
  "id": 1,
  "roomNumber": "101",
  "roomType": "Single",
  "floor": 1,
  "price": 100,
  "status": "available",
  "description": "Phòng đơn tiêu chuẩn"
}
```

### Customer Object
```json
{
  "id": 1,
  "fullName": "Nguyễn Văn A",
  "email": "nguyenvana@email.com",
  "phone": "0123456789",
  "address": "123 Đường ABC",
  "country": "Vietnam",
  "idPassport": "ABC123456"
}
```

### Booking Object
```json
{
  "id": 1,
  "customerId": 1,
  "roomId": 1,
  "checkInDate": "2024-01-20",
  "checkOutDate": "2024-01-25",
  "numberOfNights": 5,
  "totalPrice": 500,
  "notes": "..."
}
```

---

## 🌐 Deploy (Optional)

### Deploy Frontend
- **Netlify** (Free) - Kéo & thả files
- **Vercel** (Free) - GitHub integration
- **GitHub Pages** (Free) - Push code

### Deploy Backend
- **Railway** (Free tier)
- **Render** (Free tier)
- **Heroku** (Free deprecated)
- **AWS EC2** (Paid)

---

## 📝 Checklist Hoàn Thành

- [ ] Backend chạy thành công ở port 3000
- [ ] Frontend chạy thành công ở port 8000
- [ ] Kết nối Fetch API thành công
- [ ] Dashboard hiển thị 4 stat cards
- [ ] Danh sách phòng load được
- [ ] Form thêm phòng hoạt động
- [ ] Xóa dữ liệu hoạt động
- [ ] Responsive design trên mobile

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra lại các bước setup
2. Mở DevTools (F12) → Console xem lỗi
3. Kiểm tra file `SETUP_GUIDE.md` phần Troubleshooting
4. Google lỗi đó

---

## 🎉 Hoàn Thành!

**Chúc mừng!** Bạn đã có một hệ thống quản lý khách sạn chuyên nghiệp với:
- ✅ Frontend modern responsive
- ✅ Backend NestJS API
- ✅ Fetch API integration
- ✅ Đầy đủ CRUD operations
- ✅ Beautiful UI/UX

**Hãy mở rộng và tùy chỉnh nó theo nhu cầu!**

---

## 📚 Tài Liệu Bổ Sung

- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- https://getbootstrap.com/docs/5.3/
- https://fontawesome.com/icons
- https://docs.nestjs.com/

---

**Happy Coding! 🚀**

*Tạo bởi: AI Assistant*
*Ngày: 2024*
*Version: 1.0*
