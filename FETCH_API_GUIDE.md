# 📡 Hướng Dẫn Sử Dụng Fetch API

## Giới Thiệu Fetch API

**Fetch API** là cách hiện đại để gửi request đến server (thay thế XMLHttpRequest cũ).

Cú pháp cơ bản:
```javascript
fetch(URL, OPTIONS)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
```

---

## 1️⃣ Lấy Dữ Liệu (GET Request)

### Ví Dụ 1: Lấy Tất Cả Phòng
```javascript
fetch('http://localhost:3000/rooms')
  .then(response => response.json())
  .then(data => {
    console.log('Danh sách phòng:', data);
    // data là một array của các object phòng
    // [
    //   { id: 1, roomNumber: '101', roomType: 'Single', ... },
    //   { id: 2, roomNumber: '102', roomType: 'Double', ... }
    // ]
  })
  .catch(error => console.error('Lỗi:', error));
```

### Ví Dụ 2: Lấy Chi Tiết 1 Phòng
```javascript
const roomId = 1;
fetch(`http://localhost:3000/rooms/${roomId}`)
  .then(response => response.json())
  .then(data => {
    console.log('Chi tiết phòng:', data);
    // { id: 1, roomNumber: '101', roomType: 'Single', ... }
  })
  .catch(error => console.error('Lỗi:', error));
```

### Ví Dụ 3: Lọc Phòng Theo Trạng Thái
```javascript
fetch('http://localhost:3000/rooms?status=available')
  .then(response => response.json())
  .then(data => {
    console.log('Phòng khả dụng:', data);
  })
  .catch(error => console.error('Lỗi:', error));
```

### Hàm Tái Sử Dụng: fetchData()
```javascript
async function fetchData(endpoint) {
  try {
    const response = await fetch(`http://localhost:3000${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi fetch:', error);
    return [];
  }
}

// Sử dụng:
const rooms = await fetchData('/rooms');
const room1 = await fetchData('/rooms/1');
```

---

## 2️⃣ Thêm Dữ Liệu (POST Request)

### Ví Dụ 1: Thêm Phòng Mới
```javascript
const newRoom = {
  roomNumber: '105',
  roomType: 'Suite',
  floor: 1,
  price: 150,
  status: 'available',
  description: 'Suite phòng rộng'
};

fetch('http://localhost:3000/rooms', {
  method: 'POST',  // Phương thức POST
  headers: {
    'Content-Type': 'application/json'  // Kiểu dữ liệu
  },
  body: JSON.stringify(newRoom)  // Chuyển object thành JSON string
})
  .then(response => response.json())
  .then(data => {
    console.log('Phòng mới được tạo:', data);
    // { id: 5, roomNumber: '105', roomType: 'Suite', ... }
  })
  .catch(error => console.error('Lỗi:', error));
```

### Ví Dụ 2: Thêm Khách Hàng Mới
```javascript
const newCustomer = {
  fullName: 'Nguyễn Văn A',
  email: 'nguyenvana@email.com',
  phone: '0123456789',
  address: '123 Đường ABC, TP.HCM',
  country: 'Vietnam',
  idPassport: 'ABC123456'
};

fetch('http://localhost:3000/customers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newCustomer)
})
  .then(response => response.json())
  .then(data => console.log('Khách hàng mới:', data))
  .catch(error => console.error('Lỗi:', error));
```

### Hàm Tái Sử Dụng: createData()
```javascript
async function createData(endpoint, data) {
  try {
    const response = await fetch(`http://localhost:3000${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Lỗi tạo dữ liệu:', error);
    return null;
  }
}

// Sử dụng:
const newRoom = { roomNumber: '105', ... };
const result = await createData('/rooms', newRoom);
```

---

## 3️⃣ Cập Nhật Dữ Liệu (PUT Request)

### Ví Dụ 1: Cập Nhật Phòng
```javascript
const roomId = 1;
const updatedRoom = {
  roomNumber: '101A',
  roomType: 'Double',
  floor: 1,
  price: 120,
  status: 'occupied',
  description: 'Phòng double có ban công'
};

fetch(`http://localhost:3000/rooms/${roomId}`, {
  method: 'PUT',  // Phương thức PUT
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updatedRoom)
})
  .then(response => response.json())
  .then(data => {
    console.log('Phòng được cập nhật:', data);
  })
  .catch(error => console.error('Lỗi:', error));
```

### Ví Dụ 2: Cập Nhật Khách Hàng
```javascript
const customerId = 1;
const updatedCustomer = {
  fullName: 'Nguyễn Văn B',
  email: 'nguyenvanb@email.com',
  phone: '0987654321',
  // ... các field khác
};

fetch(`http://localhost:3000/customers/${customerId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updatedCustomer)
})
  .then(response => response.json())
  .then(data => console.log('Khách hàng được cập nhật:', data))
  .catch(error => console.error('Lỗi:', error));
```

### Hàm Tái Sử Dụng: updateData()
```javascript
async function updateData(endpoint, id, data) {
  try {
    const response = await fetch(`http://localhost:3000${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Lỗi cập nhật:', error);
    return null;
  }
}

// Sử dụng:
const updatedRoom = { roomNumber: '101A', ... };
const result = await updateData('/rooms', 1, updatedRoom);
```

---

## 4️⃣ Xóa Dữ Liệu (DELETE Request)

### Ví Dụ 1: Xóa Phòng
```javascript
const roomId = 1;

fetch(`http://localhost:3000/rooms/${roomId}`, {
  method: 'DELETE'  // Phương thức DELETE
})
  .then(response => {
    if (response.ok) {
      console.log('Phòng đã được xóa');
    } else {
      console.error('Xóa thất bại');
    }
  })
  .catch(error => console.error('Lỗi:', error));
```

### Ví Dụ 2: Xóa Khách Hàng
```javascript
const customerId = 1;

fetch(`http://localhost:3000/customers/${customerId}`, {
  method: 'DELETE'
})
  .then(response => {
    if (response.ok) {
      console.log('Khách hàng đã được xóa');
    } else {
      console.error('Xóa thất bại');
    }
  })
  .catch(error => console.error('Lỗi:', error));
```

### Hàm Tái Sử Dụng: deleteData()
```javascript
async function deleteData(endpoint, id) {
  try {
    const response = await fetch(`http://localhost:3000${endpoint}/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Lỗi xóa:', error);
    return false;
  }
}

// Sử dụng:
const success = await deleteData('/rooms', 1);
```

---

## 5️⃣ Async/Await vs .then()

### Cách 1: .then() (Promise chaining)
```javascript
fetch('/rooms')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Cách 2: async/await (Hiện đại hơn)
```javascript
async function loadRooms() {
  try {
    const response = await fetch('/rooms');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

loadRooms();
```

**Khuyến nghị:** Sử dụng async/await vì dễ đọc hơn!

---

## 6️⃣ Error Handling

### Ví Dụ: Xử Lý Lỗi Chi Tiết
```javascript
async function fetchDataWithErrorHandling(endpoint) {
  try {
    // 1. Gửi request
    const response = await fetch(`http://localhost:3000${endpoint}`);
    
    // 2. Kiểm tra HTTP status
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // 3. Parse JSON
    const data = await response.json();
    
    // 4. Kiểm tra dữ liệu
    if (!data || data.length === 0) {
      console.warn('Không có dữ liệu');
      return [];
    }
    
    return data;
  } catch (error) {
    // 5. Xử lý lỗi
    if (error instanceof TypeError) {
      console.error('Lỗi mạng:', error.message);
    } else if (error instanceof SyntaxError) {
      console.error('Lỗi JSON:', error.message);
    } else {
      console.error('Lỗi không xác định:', error.message);
    }
    
    return [];
  }
}
```

---

## 7️⃣ Timeout trong Fetch

```javascript
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return await response.json();
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      console.error('Request timeout!');
    } else {
      console.error('Fetch error:', error);
    }
  }
}

// Sử dụng:
await fetchWithTimeout('http://localhost:3000/rooms', 3000);
```

---

## 8️⃣ Request với Headers Khác

```javascript
// Request với Authorization header
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

fetch('http://localhost:3000/rooms', {
  method: 'GET',
  headers: headers
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

---

## 9️⃣ Upload File

```javascript
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];

const formData = new FormData();
formData.append('file', file);

fetch('http://localhost:3000/upload', {
  method: 'POST',
  body: formData
  // Không đặt Content-Type header, browser sẽ tự set
})
  .then(response => response.json())
  .then(data => console.log('File uploaded:', data))
  .catch(error => console.error('Upload error:', error));
```

---

## 🔟 Ví Dụ Thực Tế: Form Thêm Phòng

```html
<!-- HTML -->
<form id="roomForm">
  <input type="text" id="roomNumber" placeholder="Số phòng" required>
  <select id="roomType" required>
    <option value="Single">Single</option>
    <option value="Double">Double</option>
    <option value="Suite">Suite</option>
  </select>
  <input type="number" id="floor" placeholder="Tầng" required>
  <input type="number" id="price" placeholder="Giá" required>
  <button type="submit">Thêm Phòng</button>
</form>
```

```javascript
// JavaScript
document.getElementById('roomForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Ngăn submit mặc định
  
  // 1. Lấy dữ liệu từ form
  const formData = {
    roomNumber: document.getElementById('roomNumber').value,
    roomType: document.getElementById('roomType').value,
    floor: parseInt(document.getElementById('floor').value),
    price: parseFloat(document.getElementById('price').value),
    status: 'available'
  };
  
  // 2. Gửi request POST
  try {
    const response = await fetch('http://localhost:3000/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    // 3. Xử lý response
    if (response.ok) {
      const newRoom = await response.json();
      console.log('Phòng mới được tạo:', newRoom);
      alert('Thêm phòng thành công!');
      
      // 4. Reset form
      document.getElementById('roomForm').reset();
      
      // 5. Refresh danh sách phòng
      loadRooms(); // Gọi hàm load lại danh sách
    } else {
      alert('Lỗi: ' + response.statusText);
    }
  } catch (error) {
    console.error('Lỗi:', error);
    alert('Lỗi: ' + error.message);
  }
});
```

---

## 1️⃣1️⃣ Best Practices

### ✅ Nên Làm:
- ✅ Luôn check response status trước khi parse JSON
- ✅ Sử dụng async/await cho code dễ đọc
- ✅ Validate dữ liệu client-side
- ✅ Xử lý lỗi đầy đủ
- ✅ Sử dụng baseURL config
- ✅ Thêm loading indicator khi fetch

### ❌ Không Nên Làm:
- ❌ Không bỏ qua response.ok check
- ❌ Không để lộ API key/token trong client code
- ❌ Không parse JSON mà không try/catch
- ❌ Không validate dữ liệu server-side (server phải validate lại)
- ❌ Không cho phép CORS từ bất kỳ domain nào

---

## 1️⃣2️⃣ Ví Dụ Config Fetch API Global

```javascript
// config.js
const API_CONFIG = {
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Hàm fetch generic
async function apiRequest(endpoint, options = {}) {
  const url = `${API_CONFIG.baseURL}${endpoint}`;
  const defaultHeaders = API_CONFIG.headers;
  
  const finalOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };
  
  try {
    const response = await fetch(url, finalOptions);
    
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Sử dụng:
const rooms = await apiRequest('/rooms', { method: 'GET' });
const newRoom = await apiRequest('/rooms', { 
  method: 'POST',
  body: JSON.stringify(roomData)
});
```

---

## Tổng Kết

| Phương Thức | Mục Đích | Ví Dụ |
|-----------|---------|------|
| GET | Lấy dữ liệu | `fetch('/rooms')` |
| POST | Tạo mới | `fetch('/rooms', { method: 'POST', body: ... })` |
| PUT | Cập nhật | `fetch('/rooms/1', { method: 'PUT', body: ... })` |
| DELETE | Xóa | `fetch('/rooms/1', { method: 'DELETE' })` |
| PATCH | Cập nhật một phần | `fetch('/rooms/1', { method: 'PATCH', body: ... })` |

---

**Happy Fetching! 🚀**
