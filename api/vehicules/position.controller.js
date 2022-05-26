const { create, getPositions, getPositionById, deletePosition } = require('./position.service');
const { genSaltSync, hashSync } = require("bcrypt");
module.exports = {
    addPosition: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getPositionById: (req, res) => {
        const id = req.params.id;
        getPositionById(id, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "vehicle not found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            });
        })
    },

    getPositions: (req, res) => {
        getPositions((err, result) => {
            if (err) {
                console.log(err);
            }
            var arr = [];

            result.forEach(pos => {
                const posObj = {
                    idChauffeur: pos.idChauffeur,
                    nomChauffeur: pos.nomChauffeur,
                    position: {
                        lat: pos.lat,
                        lng: pos.lng
                    },
                    dateHeure: pos.Date
                };
                arr.push(posObj)
            });
            return res.json({
                success: 1,
                data: arr,
            });
        })
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "failed to update user"
                })
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        })
    },
    deletePosition: (req, res) => {
        const id = req.body;
        deletePosition(id, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.json({
                success: 1,
                message: "vehicle deleted succesfully"
            });
        })
    },
}