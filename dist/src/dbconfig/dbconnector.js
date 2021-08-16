"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Pool({
    max: 20,
    connectionString: 'postgres://johnex:root@localhost:5432/johnex',
    idleTimeoutMillis: 30000
});
// Password change command for the user in postgres
// sudo -u postgres psql -c "ALTER USER username PASSWORD 'password';"
//# sourceMappingURL=dbconnector.js.map