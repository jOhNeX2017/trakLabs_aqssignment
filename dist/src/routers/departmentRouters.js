"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departmentController_1 = __importDefault(require("../controller/departmentController"));
const departmentRouters = express_1.Router();
const departmentController = new departmentController_1.default();
departmentRouters.get('/', departmentController.getDepartmentdetails);
departmentRouters.get('/:departmentId', departmentController.getDepartmentdetailsbyId);
departmentRouters.post('/', departmentController.postDepartment);
departmentRouters.put('/:departmentId', departmentController.updateDepartment);
departmentRouters.delete('/:departmentId', departmentController.deleteDepartment);
exports.default = departmentRouters;
//# sourceMappingURL=departmentRouters.js.map