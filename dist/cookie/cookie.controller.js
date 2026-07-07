"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieController = void 0;
const common_1 = require("@nestjs/common");
let CookieController = class CookieController {
    // Tạo cookie
    setCookie(res) {
        res.cookie('username', 'NguyenQuan', {
            maxAge: 60 * 60 * 1000, // 1 giờ
            httpOnly: true,
        });
        return res.send('Cookie đã được tạo');
    }
    // Đọc cookie
    getCookie(req) {
        return {
            cookie: req.cookies,
        };
    }
    // Xóa cookie
    clearCookie(res) {
        res.clearCookie('username');
        return res.send('Đã xóa cookie');
    }
};
exports.CookieController = CookieController;
__decorate([
    (0, common_1.Get)('set'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CookieController.prototype, "setCookie", null);
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CookieController.prototype, "getCookie", null);
__decorate([
    (0, common_1.Get)('clear'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CookieController.prototype, "clearCookie", null);
exports.CookieController = CookieController = __decorate([
    (0, common_1.Controller)('cookie')
], CookieController);
//# sourceMappingURL=cookie.controller.js.map