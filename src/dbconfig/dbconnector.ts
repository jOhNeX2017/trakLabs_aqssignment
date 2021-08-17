import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://user:password@hostname:5432/dbname',
    idleTimeoutMillis: 30000
});



// Password change command for the user in postgres
// sudo -u postgres psql -c "ALTER USER username PASSWORD 'password';"