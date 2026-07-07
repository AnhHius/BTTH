# 📖 Hướng Dẫn Cài Đặt Toàn Bộ Hệ Thống

## ✅ Yêu Cầu Hệ Thống
- **Node.js** v16+ (Tải từ https://nodejs.org/)
- **MySQL** v5.7+ hoặc MariaDB (Tải từ https://www.mysql.com/)
- **Git** (Tải từ https://git-scm.com/)
- **Code Editor** (VS Code, WebStorm, v.v.)
- **Web Browser** hiện đại (Chrome, Firefox, Edge, Safari)

---

## 🎯 BƯỚC 1: Cài Đặt Backend (NestJS)

### 1.1 Tải Dự Án
```bash
# Clone hoặc tải dự án backend
cd baitapquanlikhacsan-main
```

### 1.2 Cài Đặt Dependencies
```bash
npm install
```

### 1.3 Cấu Hình Database
Tạo file `.env` trong thư mục gốc của backend:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hotel

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 1.4 Tạo Database trong MySQL
```bash
# Đăng nhập MySQL
mysql -u root -p

# Tạo database
CREATE DATABASE hotel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Thoát
EXIT;
```

### 1.5 Import SQL Schema
```bash
# Nhập dữ liệu ban đầu
mysql -u root -p hotel < sql/Quan_Ly_Khach_San.sql
```

### 1.6 Khởi Động Backend
```bash
# Development mode (auto reload)
npm run start:dev

# Production mode
npm run build
npm run start
```

✅ Backend sẽ chạy ở: `http://localhost:3000`

---

## 🎯 BƯỚC 2: Cài Đặt Frontend (HTML/CSS/JS)

### 2.1 Chuẩn Bị File Frontend
Tạo một folder mới cho frontend:
```bash
mkdir hotel-management-frontend
cd hotel-management-frontend
```

### 2.2 Copy File Frontend
Copy 3 file này vào folder frontend:
- `index.html`
- `styles.css`
- `app.js`

Cấu trúc folder sẽ là:
```
hotel-management-frontend/
├── index.html
├── styles.css
├── app.js
└── README_FRONTEND.md
```

### 2.3 Chạy Frontend

**Cách 1: Sử dụng Live Server (VS Code)**
1. Cài extension "Live Server" trong VS Code
2. Nhấp chuột phải vào `index.html`
3. Chọn "Open with Live Server"

**Cách 2: Sử dụng Python (Nếu đã cài Python)**
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```
Truy cập: `http://localhost:8000`

**Cách 3: Sử dụng Node.js http-server**
```bash
npm install -g http-server
http-server
```
Truy cập: `http://localhost:8080`

**Cách 4: Mở trực tiếp trong trình duyệt**
- Nhấp đôi vào `index.html` để mở trực tiếp

---

## 🧪 BƯỚC 3: Kiểm Tra Kết Nối

### 3.1 Mở Console Browser
1. Mở Frontend trong trình duyệt
2. Nhấn F12 hoặc Ctrl+Shift+I
3. Chuyển sang tab "Console"

### 3.2 Kiểm Tra API Connection
Chạy lệnh trong Console:
```javascript
// Test fetch API
fetch('http://localhost:3000/rooms')
  .then(r => r.json())
  .then(d => console.log('Dữ liệu phòng:', d))
  .catch(e => console.error('Lỗi:', e))
```

### 3.3 Kết Quả Mong Đợi
- ✅ Nếu thấy dữ liệu: Kết nối thành công!
- ❌ Nếu thấy lỗi CORS: Cần enable CORS ở backend

---

## 🔧 BƯỚC 4: Enable CORS ở Backend (Nếu Cần)

Mở file `src/main.ts` và thêm:
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:8000', // Địa chỉ frontend
    credentials: true,
  });
  
  await app.listen(3000);
}
bootstrap();
```

Sau đó restart backend:
```bash
npm run start:dev
```

---

## 📊 BƯỚC 5: Test Toàn Bộ Hệ Thống

### Test Checklist:
- [ ] Backend chạy ở `http://localhost:3000`
- [ ] Frontend chạy ở `http://localhost:8000` (hoặc port khác)
- [ ] Mở Dashboard và thấy 4 card thống kê
- [ ] Click "Phòng" → Thấy danh sách phòng
- [ ] Click "Thêm Phòng" → Form hiện ra
- [ ] Nhập dữ liệu → Click "Thêm Phòng"
- [ ] Thấy alert "Thêm mới thành công!"
- [ ] Danh sách phòng update với dữ liệu mới

---

## 🚀 BƯỚC 6: Deploy (Production)

### 6.1 Deploy Backend
Có nhiều platform:
- **Heroku** (miễn phí)
- **Railway** (miễn phí)
- **Render** (miễn phí)
- **AWS EC2** (trả phí)
- **DigitalOcean** (trả phí)

### 6.2 Deploy Frontend
Cách đơn giản nhất:
- **GitHub Pages** (miễn phí)
- **Netlify** (miễn phí)
- **Vercel** (miễn phí)

### 6.3 Cập Nhật API URL
Thay đổi `API_BASE_URL` trong `app.js`:
```javascript
// Thay từ:
const API_BASE_URL = 'http://localhost:3000';

// Thành:
const API_BASE_URL = 'https://your-backend-domain.com';
```

---

## 🐛 Troubleshooting

### Lỗi: "Cannot GET /"
**Nguyên nhân:** Cổng port bị chiếm hoặc server không khởi động
```bash
# Kiểm tra process đang dùng port 3000
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000

# Kill process (Windows)
taskkill /PID <PID> /F

# Kill process (Mac/Linux)
kill -9 <PID>
```

### Lỗi: "CORS error"
**Giải pháp:** Enable CORS ở backend (xem BƯỚC 4)

### Lỗi: "Cannot find module"
```bash
# Xóa node_modules và cài lại
rm -rf node_modules
npm install
```

### Lỗi: "Database connection failed"
1. Kiểm tra MySQL đang chạy
2. Kiểm tra credentials ở file `.env`
3. Kiểm tra database đã được tạo

### Dữ liệu không hiển thị
1. Mở DevTools (F12) → Network tab
2. Kiểm tra request đến `/rooms`, `/customers` v.v.
3. Xem response là gì
4. Kiểm tra lại backend endpoints

---

## 📋 Danh Sách Endpoints Có Sẵn

```
ROOMS (Phòng)
├── GET    /rooms                  → Danh sách tất cả phòng
├── GET    /rooms/:id              → Chi tiết 1 phòng
├── POST   /rooms                  → Thêm phòng mới
├── PUT    /rooms/:id              → Cập nhật phòng
└── DELETE /rooms/:id              → Xóa phòng

CUSTOMERS (Khách Hàng)
├── GET    /customers              → Danh sách khách hàng
├── GET    /customers/:id          → Chi tiết khách hàng
├── POST   /customers              → Thêm khách hàng mới
├── PUT    /customers/:id          → Cập nhật khách hàng
└── DELETE /customers/:id          → Xóa khách hàng

BOOKINGS (Đặt Phòng)
├── GET    /bookings               → Danh sách đặt phòng
├── GET    /bookings/:id           → Chi tiết đặt phòng
├── POST   /bookings               → Tạo đặt phòng mới
├── PUT    /bookings/:id           → Cập nhật đặt phòng
└── DELETE /bookings/:id           → Xóa đặt phòng

SERVICES (Dịch Vụ)
├── GET    /services               → Danh sách dịch vụ
├── GET    /services/:id           → Chi tiết dịch vụ
├── POST   /services               → Thêm dịch vụ mới
├── PUT    /services/:id           → Cập nhật dịch vụ
└── DELETE /services/:id           → Xóa dịch vụ

STAFF (Nhân Viên)
├── GET    /staff                  → Danh sách nhân viên
├── GET    /staff/:id              → Chi tiết nhân viên
├── POST   /staff                  → Thêm nhân viên mới
├── PUT    /staff/:id              → Cập nhật nhân viên
└── DELETE /staff/:id              → Xóa nhân viên

INVOICES (Hóa Đơn)
├── GET    /invoices               → Danh sách hóa đơn
└── GET    /invoices/:id           → Chi tiết hóa đơn
```

---

## 📚 Tài Liệu Bổ Sung

- **Backend:** Xem `README.md` trong thư mục `baitapquanlikhacsan-main`
- **Frontend:** Xem `README_FRONTEND.md`
- **API Docs:** Khi backend chạy, truy cập `http://localhost:3000/api`

---

## ✨ Các Tính Năng Có Thể Mở Rộng

- [ ] Authentication & Authorization (Đăng nhập)
- [ ] Email notifications (Gửi email)
- [ ] SMS notifications (Gửi SMS)
- [ ] Payment integration (Thanh toán)
- [ ] Report & Analytics (Báo cáo)
- [ ] Mobile app (Ứng dụng di động)
- [ ] Real-time updates (WebSocket)
- [ ] File upload (Upload ảnh/tài liệu)

---

## 🎓 Để Học Thêm

- **JavaScript:** https://javascript.info/
- **Fetch API:** https://mdn.io/fetch
- **NestJS:** https://docs.nestjs.com/
- **Bootstrap:** https://getbootstrap.com/
- **REST API:** https://restfulapi.net/

---

## ✅ Hoàn Thành!

Nếu bạn đã theo dõi tất cả các bước trên, hệ thống của bạn đã sẵn sàng sử dụng. 

**Chúc mừng! 🎉**

Nếu gặp vấn đề, hãy:
1. Kiểm tra lại các bước
2. Mở DevTools (F12) để xem lỗi chi tiết
3. Kiểm tra console của backend
4. Tìm kiếm lỗi trên Google/StackOverflow

**Happy Coding! 🚀**
