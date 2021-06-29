const mysql = require('mysql');
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 100,
})

class Database {
    static db_connect() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.log('[MySQL]: Connection Failed.')
                    console.log('[MySQL]: '+err)
                    process.exit();
                }
                connection.release();
                resolve(connection);
            });
        });
    }

    static db_disconnect() {
        return new Promise((resolve, reject) => {
            pool.end(function (err) {
                if (err) {
                    console.log('[MySQL]: '+err)
                }
            });
        });
    }

    static guild_check(g) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT 1 AS result FROM guilds WHERE guild_id = ?', [g.id], function (err, results, fields) {
                if (err) {
                    console.log('[MySQL]: '+err);
                }
                if (results.length) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    static guild_create(g, existed=false) {
        return new Promise((resolve, reject) => {
            if (existed) {
                pool.query('UPDATE guilds SET status = 1 WHERE guild_id = ?', [g.id], function (err) {
                    if (err) {
                        console.log('[MySQL]: ' + err);
                    }
                    resolve(true);
                });
            } else {
                pool.query('INSERT INTO guilds (guild_id, guild_owner) VALUES (?, ?)', [g.id, g.ownerID], function (err) {
                    if (err) {
                        console.log('[MySQL]: ' + err);
                    }
                    resolve(true);
                });
            }
        });
    }

    static guild_delete(g) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE guilds SET status = 0 WHERE guild_id = ?', [g.id], function (err) {
                if (err) {
                    console.log('[MySQL]: '+err);
                }
                resolve(true);
            });
        });
    }
}

module.exports = Database;