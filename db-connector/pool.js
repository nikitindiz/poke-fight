const { Pool } = require('pg');
// 	postgres://rdvnbpfq:Rg_vbAeEbvkpiFnl_QsAMXzwYxa4qvvA@ruby.db.elephantsql.com:5432/rdvnbpfq
const pool = new Pool({
    user: 'rdvnbpfq',
    host: 'ruby.db.elephantsql.com',
    database: 'rdvnbpfq',
    password: 'Rg_vbAeEbvkpiFnl_QsAMXzwYxa4qvvA',
    port: 5432,
    // connectionString: 'postgres://rdvnbpfq:Rg_vbAeEbvkpiFnl_QsAMXzwYxa4qvvA@ruby.db.elephantsql.com:5432/rdvnbpfq',
});

pool.connect();

module.exports = pool;