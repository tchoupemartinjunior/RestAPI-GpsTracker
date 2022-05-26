const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into user (email, password) values(?,?)`, [
                data.email,
                data.password
            ],
            (error, results) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUsers: callBack => {
        pool.query(
            'select * from user', [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },
    getUserById: (id, callBack) => {
        pool.query(
            'select * from user where idUser=?', [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            });
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update user set email=?, password=? where idUser=?`, [
                data.email,
                data.password,
                data.idUser
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteUser: (data, callBack) => {
        pool.query(
            `delete from user where idUser=?`, [data.idUser],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}