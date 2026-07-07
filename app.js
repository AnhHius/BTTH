// ============================================
// API CONFIGURATION
// ============================================

const API_BASE_URL = 'http://localhost:3000'; // Change to your backend URL

// ============================================
// FETCH UTILITY FUNCTIONS
// ============================================

async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        showAlert('Lỗi khi tải dữ liệu: ' + error.message, 'danger');
        return [];
    }
}

async function createData(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
        showAlert('Thêm mới thành công!', 'success');
        return result;
    } catch (error) {
        console.error('Create error:', error);
        showAlert('Lỗi khi thêm mới: ' + error.message, 'danger');
        return null;
    }
}

async function updateData(endpoint, id, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
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
        showAlert('Cập nhật thành công!', 'success');
        return result;
    } catch (error) {
        console.error('Update error:', error);
        showAlert('Lỗi khi cập nhật: ' + error.message, 'danger');
        return null;
    }
}

async function deleteData(endpoint, id) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        showAlert('Xóa thành công!', 'success');
        return true;
    } catch (error) {
        console.error('Delete error:', error);
        showAlert('Lỗi khi xóa: ' + error.message, 'danger');
        return false;
    }
}

// ============================================
// UI HELPER FUNCTIONS
// ============================================

function loadSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.add('d-none');
    });
    
    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('d-none');
        
        // Load data based on section
        switch (sectionId) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'rooms':
                loadRooms();
                break;
            case 'customers':
                loadCustomers();
                break;
            case 'bookings':
                loadBookings();
                break;
            case 'services':
                loadServices();
                break;
            case 'staff':
                loadStaff();
                break;
            case 'invoices':
                loadInvoices();
                break;
        }
    }
}

function showAlert(message, type = 'success') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert at the beginning of content section
    const contentSection = document.querySelector('.content-section');
    contentSection.insertBefore(alertDiv, contentSection.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ============================================
// DASHBOARD
// ============================================

async function loadDashboard() {
    // Load all counts
    const rooms = await fetchData('/rooms');
    const customers = await fetchData('/customers');
    const bookings = await fetchData('/bookings');
    const services = await fetchData('/services');
    
    document.getElementById('roomCount').textContent = rooms.length || 0;
    document.getElementById('customerCount').textContent = customers.length || 0;
    document.getElementById('bookingCount').textContent = bookings.length || 0;
    document.getElementById('serviceCount').textContent = services.length || 0;
}

// ============================================
// ROOMS
// ============================================

async function loadRooms() {
    const rooms = await fetchData('/rooms');
    const container = document.getElementById('roomsList');
    
    if (!rooms || rooms.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Không có dữ liệu phòng</p>';
        return;
    }
    
    container.innerHTML = rooms.map(room => `
        <div class="data-card">
            <div class="card-header-custom">
                <i class="fas fa-door-open"></i> Phòng ${room.roomNumber}
            </div>
            <div class="card-body-custom">
                <p><strong>Loại:</strong> ${room.roomType || 'N/A'}</p>
                <p><strong>Tầng:</strong> ${room.floor || 'N/A'}</p>
                <p><strong>Giá:</strong> $${room.price || 0}</p>
                <p><strong>Trạng thái:</strong> 
                    <span class="badge badge-status ${getStatusClass(room.status)}">
                        ${getStatusText(room.status)}
                    </span>
                </p>
                <p><strong>Mô tả:</strong> ${room.description || 'N/A'}</p>
            </div>
            <div class="card-footer-custom">
                <button class="btn btn-sm btn-edit" onclick="showEditRoomForm(${room.id})">
                    <i class="fas fa-edit"></i> Sửa
                </button>
                <button class="btn btn-sm btn-delete" onclick="deleteRoom(${room.id})">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </div>
        </div>
    `).join('');
}

async function deleteRoom(id) {
    if (confirm('Bạn chắc chắn muốn xóa phòng này?')) {
        if (await deleteData('/rooms', id)) {
            loadRooms();
        }
    }
}

function showAddRoomForm() {
    const modal = new bootstrap.Modal(document.getElementById('formModal'));
    document.getElementById('formTitle').textContent = 'Thêm Phòng Mới';
    document.getElementById('formBody').innerHTML = `
        <form id="roomForm">
            <div class="form-group">
                <label class="form-label">Số Phòng</label>
                <input type="text" class="form-control" id="roomNumber" required>
            </div>
            <div class="form-group">
                <label class="form-label">Loại Phòng</label>
                <select class="form-select" id="roomType" required>
                    <option value="">-- Chọn loại phòng --</option>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Suite">Suite</option>
                    <option value="Deluxe">Deluxe</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Tầng</label>
                <input type="number" class="form-control" id="floor" required>
            </div>
            <div class="form-group">
                <label class="form-label">Giá (USD)</label>
                <input type="number" class="form-control" id="price" required>
            </div>
            <div class="form-group">
                <label class="form-label">Trạng Thái</label>
                <select class="form-select" id="status" required>
                    <option value="available">Khả dụng</option>
                    <option value="occupied">Đã đặt</option>
                    <option value="maintenance">Bảo trì</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Mô Tả</label>
                <textarea class="form-control" id="description" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100">Thêm Phòng</button>
        </form>
    `;
    
    document.getElementById('roomForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            roomNumber: document.getElementById('roomNumber').value,
            roomType: document.getElementById('roomType').value,
            floor: parseInt(document.getElementById('floor').value),
            price: parseFloat(document.getElementById('price').value),
            status: document.getElementById('status').value,
            description: document.getElementById('description').value
        };
        
        if (await createData('/rooms', data)) {
            modal.hide();
            loadRooms();
        }
    });
    
    modal.show();
}

function showEditRoomForm(id) {
    // Implementation similar to add form
    showAlert('Tính năng sửa đang được phát triển', 'warning');
}

function getStatusClass(status) {
    switch(status) {
        case 'available': return 'badge-available';
        case 'occupied': return 'badge-occupied';
        case 'maintenance': return 'badge-maintenance';
        default: return '';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'available': return 'Khả dụng';
        case 'occupied': return 'Đã đặt';
        case 'maintenance': return 'Bảo trì';
        default: return status;
    }
}

// ============================================
// CUSTOMERS
// ============================================

async function loadCustomers() {
    const customers = await fetchData('/customers');
    const container = document.getElementById('customersList');
    
    if (!customers || customers.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Không có dữ liệu khách hàng</p>';
        return;
    }
    
    container.innerHTML = customers.map(customer => `
        <div class="data-card">
            <div class="card-header-custom">
                <i class="fas fa-user"></i> ${customer.fullName || 'N/A'}
            </div>
            <div class="card-body-custom">
                <p><strong>Email:</strong> ${customer.email || 'N/A'}</p>
                <p><strong>Điện thoại:</strong> ${customer.phone || 'N/A'}</p>
                <p><strong>Địa chỉ:</strong> ${customer.address || 'N/A'}</p>
                <p><strong>Quốc gia:</strong> ${customer.country || 'N/A'}</p>
                <p><strong>ID Passport:</strong> ${customer.idPassport || 'N/A'}</p>
            </div>
            <div class="card-footer-custom">
                <button class="btn btn-sm btn-edit" onclick="showEditCustomerForm(${customer.id})">
                    <i class="fas fa-edit"></i> Sửa
                </button>
                <button class="btn btn-sm btn-delete" onclick="deleteCustomer(${customer.id})">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </div>
        </div>
    `).join('');
}

async function deleteCustomer(id) {
    if (confirm('Bạn chắc chắn muốn xóa khách hàng này?')) {
        if (await deleteData('/customers', id)) {
            loadCustomers();
        }
    }
}

function showAddCustomerForm() {
    const modal = new bootstrap.Modal(document.getElementById('formModal'));
    document.getElementById('formTitle').textContent = 'Thêm Khách Hàng Mới';
    document.getElementById('formBody').innerHTML = `
        <form id="customerForm">
            <div class="form-group">
                <label class="form-label">Họ Tên</label>
                <input type="text" class="form-control" id="fullName" required>
            </div>
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" id="email" required>
            </div>
            <div class="form-group">
                <label class="form-label">Điện Thoại</label>
                <input type="tel" class="form-control" id="phone" required>
            </div>
            <div class="form-group">
                <label class="form-label">Địa Chỉ</label>
                <input type="text" class="form-control" id="address">
            </div>
            <div class="form-group">
                <label class="form-label">Quốc Gia</label>
                <input type="text" class="form-control" id="country">
            </div>
            <div class="form-group">
                <label class="form-label">ID Passport</label>
                <input type="text" class="form-control" id="idPassport">
            </div>
            <button type="submit" class="btn btn-primary w-100">Thêm Khách Hàng</button>
        </form>
    `;
    
    document.getElementById('customerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            country: document.getElementById('country').value,
            idPassport: document.getElementById('idPassport').value
        };
        
        if (await createData('/customers', data)) {
            modal.hide();
            loadCustomers();
        }
    });
    
    modal.show();
}

function showEditCustomerForm(id) {
    showAlert('Tính năng sửa đang được phát triển', 'warning');
}

// ============================================
// BOOKINGS
// ============================================

async function loadBookings() {
    const bookings = await fetchData('/bookings');
    const container = document.getElementById('bookingsList');
    
    if (!bookings || bookings.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Không có dữ liệu đặt phòng</p>';
        return;
    }
    
    container.innerHTML = bookings.map(booking => `
        <div class="data-card">
            <div class="card-header-custom">
                <i class="fas fa-calendar-check"></i> Đặt Phòng #${booking.id}
            </div>
            <div class="card-body-custom">
                <p><strong>Khách Hàng:</strong> ${booking.customerId || 'N/A'}</p>
                <p><strong>Phòng:</strong> ${booking.roomId || 'N/A'}</p>
                <p><strong>Ngày Nhận:</strong> ${formatDate(booking.checkInDate)}</p>
                <p><strong>Ngày Trả:</strong> ${formatDate(booking.checkOutDate)}</p>
                <p><strong>Số Đêm:</strong> ${booking.numberOfNights || 'N/A'}</p>
                <p><strong>Tổng Tiền:</strong> $${booking.totalPrice || 0}</p>
                <p><strong>Ghi Chú:</strong> ${booking.notes || 'N/A'}</p>
            </div>
            <div class="card-footer-custom">
                <button class="btn btn-sm btn-view" onclick="viewBooking(${booking.id})">
                    <i class="fas fa-eye"></i> Xem
                </button>
                <button class="btn btn-sm btn-delete" onclick="deleteBooking(${booking.id})">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </div>
        </div>
    `).join('');
}

async function deleteBooking(id) {
    if (confirm('Bạn chắc chắn muốn xóa đặt phòng này?')) {
        if (await deleteData('/bookings', id)) {
            loadBookings();
        }
    }
}

function showAddBookingForm() {
    const modal = new bootstrap.Modal(document.getElementById('formModal'));
    document.getElementById('formTitle').textContent = 'Thêm Đặt Phòng Mới';
    document.getElementById('formBody').innerHTML = `
        <form id="bookingForm">
            <div class="form-group">
                <label class="form-label">Khách Hàng ID</label>
                <input type="number" class="form-control" id="customerId" required>
            </div>
            <div class="form-group">
                <label class="form-label">Phòng ID</label>
                <input type="number" class="form-control" id="roomId" required>
            </div>
            <div class="form-group">
                <label class="form-label">Ngày Nhận</label>
                <input type="date" class="form-control" id="checkInDate" required>
            </div>
            <div class="form-group">
                <label class="form-label">Ngày Trả</label>
                <input type="date" class="form-control" id="checkOutDate" required>
            </div>
            <div class="form-group">
                <label class="form-label">Tổng Tiền</label>
                <input type="number" class="form-control" id="totalPrice" required>
            </div>
            <div class="form-group">
                <label class="form-label">Ghi Chú</label>
                <textarea class="form-control" id="notes" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100">Thêm Đặt Phòng</button>
        </form>
    `;
    
    document.getElementById('bookingForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const checkInDate = new Date(document.getElementById('checkInDate').value);
        const checkOutDate = new Date(document.getElementById('checkOutDate').value);
        const numberOfNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        
        const data = {
            customerId: parseInt(document.getElementById('customerId').value),
            roomId: parseInt(document.getElementById('roomId').value),
            checkInDate: document.getElementById('checkInDate').value,
            checkOutDate: document.getElementById('checkOutDate').value,
            numberOfNights: numberOfNights,
            totalPrice: parseFloat(document.getElementById('totalPrice').value),
            notes: document.getElementById('notes').value
        };
        
        if (await createData('/bookings', data)) {
            modal.hide();
            loadBookings();
        }
    });
    
    modal.show();
}

function viewBooking(id) {
    showAlert('Tính năng xem chi tiết đang được phát triển', 'info');
}

// ============================================
// SERVICES
// ============================================

async function loadServices() {
    const services = await fetchData('/services');
    const container = document.getElementById('servicesList');
    
    if (!services || services.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Không có dữ liệu dịch vụ</p>';
        return;
    }
    
    container.innerHTML = services.map(service => `
        <div class="data-card">
            <div class="card-header-custom">
                <i class="fas fa-concierge-bell"></i> ${service.serviceName || 'N/A'}
            </div>
            <div class="card-body-custom">
                <p><strong>Mô Tả:</strong> ${service.description || 'N/A'}</p>
                <p><strong>Giá:</strong> $${service.price || 0}</p>
                <p><strong>Trạng Thái:</strong> ${service.status || 'N/A'}</p>
            </div>
            <div class="card-footer-custom">
                <button class="btn btn-sm btn-edit" onclick="showEditServiceForm(${service.id})">
                    <i class="fas fa-edit"></i> Sửa
                </button>
                <button class="btn btn-sm btn-delete" onclick="deleteService(${service.id})">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </div>
        </div>
    `).join('');
}

async function deleteService(id) {
    if (confirm('Bạn chắc chắn muốn xóa dịch vụ này?')) {
        if (await deleteData('/services', id)) {
            loadServices();
        }
    }
}

function showAddServiceForm() {
    const modal = new bootstrap.Modal(document.getElementById('formModal'));
    document.getElementById('formTitle').textContent = 'Thêm Dịch Vụ Mới';
    document.getElementById('formBody').innerHTML = `
        <form id="serviceForm">
            <div class="form-group">
                <label class="form-label">Tên Dịch Vụ</label>
                <input type="text" class="form-control" id="serviceName" required>
            </div>
            <div class="form-group">
                <label class="form-label">Mô Tả</label>
                <textarea class="form-control" id="description" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Giá (USD)</label>
                <input type="number" class="form-control" id="price" required>
            </div>
            <div class="form-group">
                <label class="form-label">Trạng Thái</label>
                <select class="form-select" id="status" required>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary w-100">Thêm Dịch Vụ</button>
        </form>
    `;
    
    document.getElementById('serviceForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            serviceName: document.getElementById('serviceName').value,
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            status: document.getElementById('status').value
        };
        
        if (await createData('/services', data)) {
            modal.hide();
            loadServices();
        }
    });
    
    modal.show();
}

function showEditServiceForm(id) {
    showAlert('Tính năng sửa đang được phát triển', 'warning');
}

// ============================================
// STAFF
// ============================================

async function loadStaff() {
    const staff = await fetchData('/staff');
    const container = document.getElementById('staffList');
    
    if (!staff || staff.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Không có dữ liệu nhân viên</p>';
        return;
    }
    
    container.innerHTML = staff.map(member => `
        <div class="data-card">
            <div class="card-header-custom">
                <i class="fas fa-user-tie"></i> ${member.name || 'N/A'}
            </div>
            <div class="card-body-custom">
                <p><strong>Vị Trí:</strong> ${member.position || 'N/A'}</p>
                <p><strong>Email:</strong> ${member.email || 'N/A'}</p>
                <p><strong>Điện Thoại:</strong> ${member.phone || 'N/A'}</p>
                <p><strong>Ngày Vào Làm:</strong> ${formatDate(member.hireDate)}</p>
                <p><strong>Lương:</strong> $${member.salary || 0}</p>
            </div>
            <div class="card-footer-custom">
                <button class="btn btn-sm btn-edit" onclick="showEditStaffForm(${member.id})">
                    <i class="fas fa-edit"></i> Sửa
                </button>
                <button class="btn btn-sm btn-delete" onclick="deleteStaff(${member.id})">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </div>
        </div>
    `).join('');
}

async function deleteStaff(id) {
    if (confirm('Bạn chắc chắn muốn xóa nhân viên này?')) {
        if (await deleteData('/staff', id)) {
            loadStaff();
        }
    }
}

function showAddStaffForm() {
    const modal = new bootstrap.Modal(document.getElementById('formModal'));
    document.getElementById('formTitle').textContent = 'Thêm Nhân Viên Mới';
    document.getElementById('formBody').innerHTML = `
        <form id="staffForm">
            <div class="form-group">
                <label class="form-label">Tên</label>
                <input type="text" class="form-control" id="name" required>
            </div>
            <div class="form-group">
                <label class="form-label">Vị Trí</label>
                <input type="text" class="form-control" id="position" required>
            </div>
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" id="email" required>
            </div>
            <div class="form-group">
                <label class="form-label">Điện Thoại</label>
                <input type="tel" class="form-control" id="phone" required>
            </div>
            <div class="form-group">
                <label class="form-label">Ngày Vào Làm</label>
                <input type="date" class="form-control" id="hireDate" required>
            </div>
            <div class="form-group">
                <label class="form-label">Lương</label>
                <input type="number" class="form-control" id="salary" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Thêm Nhân Viên</button>
        </form>
    `;
    
    document.getElementById('staffForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('name').value,
            position: document.getElementById('position').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            hireDate: document.getElementById('hireDate').value,
            salary: parseFloat(document.getElementById('salary').value)
        };
        
        if (await createData('/staff', data)) {
            modal.hide();
            loadStaff();
        }
    });
    
    modal.show();
}

function showEditStaffForm(id) {
    showAlert('Tính năng sửa đang được phát triển', 'warning');
}

// ============================================
// INVOICES
// ============================================

async function loadInvoices() {
    const invoices = await fetchData('/invoices');
    const container = document.getElementById('invoicesList');
    
    if (!invoices || invoices.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Không có dữ liệu hóa đơn</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="table-responsive-custom">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Booking ID</th>
                        <th>Ngày Tạo</th>
                        <th>Tổng Tiền</th>
                        <th>Trạng Thái</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoices.map(invoice => `
                        <tr>
                            <td>#${invoice.id}</td>
                            <td>${invoice.bookingId || 'N/A'}</td>
                            <td>${formatDate(invoice.createdDate)}</td>
                            <td>$${invoice.totalAmount || 0}</td>
                            <td><span class="badge badge-status ${getInvoiceStatusClass(invoice.status)}">${getInvoiceStatusText(invoice.status)}</span></td>
                            <td>
                                <button class="btn btn-sm btn-view" onclick="viewInvoice(${invoice.id})">
                                    <i class="fas fa-eye"></i> Xem
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function viewInvoice(id) {
    showAlert('Tính năng xem chi tiết hóa đơn đang được phát triển', 'info');
}

function getInvoiceStatusClass(status) {
    switch(status) {
        case 'paid': return 'badge-available';
        case 'pending': return 'badge-maintenance';
        case 'cancelled': return 'badge-occupied';
        default: return '';
    }
}

function getInvoiceStatusText(status) {
    switch(status) {
        case 'paid': return 'Đã thanh toán';
        case 'pending': return 'Chờ thanh toán';
        case 'cancelled': return 'Đã hủy';
        default: return status;
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Load dashboard on page load
    loadDashboard();
});
