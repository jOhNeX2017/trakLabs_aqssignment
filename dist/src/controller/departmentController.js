"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconnector_1 = __importDefault(require("../dbconfig/dbconnector"));
const logHandler_1 = __importDefault(require("../logHandler"));
class DepartmentController {
    getDepartmentdetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield dbconnector_1.default.connect();
                const sql = "SELECT * from Departments";
                const { rows } = yield client.query(sql);
                const departmentInformation = rows;
                client.release();
                logHandler_1.default.info("Getting the data from Departments");
                res.send(departmentInformation);
            }
            catch (error) {
                logHandler_1.default.error('Can not get the department information');
                res.status(400).send(error);
            }
        });
    }
    getDepartmentdetailsbyId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.departmentId);
                const client = yield dbconnector_1.default.connect();
                const sql = `SELECT * from Departments where id=${id}`;
                const { rows } = yield client.query(sql);
                const departmentInformation = rows;
                client.release();
                logHandler_1.default.info("Getting the data from Departments");
                res.send(departmentInformation);
            }
            catch (error) {
                logHandler_1.default.error('Can not get the department information');
                res.status(400).send(error);
            }
        });
    }
    postDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield dbconnector_1.default.connect();
                const { department_name } = req.body;
                // console.log(department_name)
                let sql = `INSERT INTO DEPARTMENTS(Name) VALUES('${department_name}')`;
                yield client.query(sql);
                sql = "SELECT * from Departments";
                const { rows } = yield client.query(sql);
                const departmentInformation = rows;
                client.release();
                logHandler_1.default.debug('Department added');
                res.status(201).send(departmentInformation);
            }
            catch (error) {
                logHandler_1.default.error('Can not insert values into Departments');
                res.status(400).send(error);
            }
        });
    }
    updateDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.departmentId);
                // console.log(id);
                const client = yield dbconnector_1.default.connect();
                const { department_name } = req.body;
                let sql = `UPDATE DEPARTMENTS set name='${department_name}' where id=${id}`;
                yield client.query(sql);
                sql = `SELECT * from Departments where id=${id}`;
                const { rows } = yield client.query(sql);
                const departmentInformation = rows;
                client.release();
                logHandler_1.default.warn('Department Updated');
                res.status(201).send(departmentInformation);
            }
            catch (error) {
                logHandler_1.default.error(`Can not update values of ${req.params.departmentId} in Departments`);
                res.status(400).send(error);
            }
        });
    }
    deleteDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.departmentId);
                const client = yield dbconnector_1.default.connect();
                let sql = `DELETE from DEPARTMENTS where id=${id}`;
                yield client.query(sql);
                sql = "SELECT * from Departments";
                const { rows } = yield client.query(sql);
                const departmentInformation = rows;
                client.release();
                logHandler_1.default.info('Department deleted');
                logHandler_1.default.warn('Employee with same department_id will be set to null');
                res.status(201).send(departmentInformation);
            }
            catch (error) {
                logHandler_1.default.error(`Can not delete the ${req.params.departmentId} in Departments`);
                res.status(400).send(error);
            }
        });
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=departmentController.js.map