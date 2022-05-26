const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'insert into position (idChauffeur, lat, lng, idVehicule) values(?,?,?,?)', [
                data.idChauffeur,
                data.lat,
                data.lng,
                data.idVehicule
            ],
            (error, results) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPositions: callBack => {
        pool.query(
            'select * from position natural join chauffeur order by Date', [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },
    getPositionById: (id, callBack) => {
        pool.query(
            'select * from user where idChauffeur=?', [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            });
    },
    /* updateUser: (data, callBack) => {
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
     },*/
    deletePosition: (data, callBack) => {
        pool.query(
            `delete from position where idChauffeur=?`, [data.idChauffeur],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}