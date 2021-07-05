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

    static prefixes() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT guild_id, prefix FROM prefixes', function (err, results, fields) {
                if (err) {
                    console.log('[MySQL]: '+err);
                }
                resolve(results);
            });
        });
    }

    static set_prefix(guild_id, prefix) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT 1 AS result FROM prefixes WHERE guild_id = ?', [guild_id], function (err, results, fields) {
                if (err) {
                    console.log('[MySQL]: ' + err);
                }
                let result = !!results.length;

                if (result) {
                    pool.query('UPDATE prefixes SET prefix = ? WHERE guild_id = ?', [prefix, guild_id], function (err) {
                        if (err) {
                            console.log('[MySQL]: ' + err);
                        }
                        resolve(true);
                    });
                } else {
                    pool.query('INSERT INTO prefixes (guild_id, prefix) VALUES (?, ?)', [guild_id, prefix], function (err) {
                        if (err) {
                            console.log('[MySQL]: ' + err);
                        }
                        resolve(true);
                    });
                }
            });
        });
    }

    static default_prefix(guild_id) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM prefixes WHERE guild_id = ?', [guild_id], function (err) {
                if (err) {
                    console.log('[MySQL]: ' + err);
                }
                resolve(true);
            });
        });
    }
}

module.exports = Database;