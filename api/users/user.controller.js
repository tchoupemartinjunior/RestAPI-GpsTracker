const { create, getUsers, getUserById, updateUser, deleteUser } = require('./user.service');
const { genSaltSync, hashSync } = require("bcrypt");
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
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
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "User not found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            });
        })
    },

    getUsers: (req, res) => {
        getUsers((err, result) => {
            if (err) {
                console.log(err);
            }
            return res.status(200).json({
                success: 1,
                data: result
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
    deleteUser: (req, res) => {
        const id = req.body;
        deleteUser(id, (err, result) => {
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
                message: "user deleted succesfully"
            });
        })
    },
}