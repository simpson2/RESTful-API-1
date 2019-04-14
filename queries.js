const mysql = require("mysql");
const pool = mysql.createPool({
    connLimit: 100,
    host: "localhost",
    user: "api",
    password: "",
    database: "api",
    debug: false
});

const getUsers = (req, res) => {
    pool.query("SELECT * FROM users ORDER BY id ASC", (err, results) => {
        if (err) {
            return res.json({ "error": true, "message": "Error occured" + err });
        }
        else {
            return res.json(results);
        }
    });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query("SELECT * FROM users WHERE id = ?", id, (err, results) => {
        if (err) {
            return res.json({ "error": true, "message": "Error occured" + err });
        }
        else {
            return res.json(results);
        }
    });
};

const createUser = (req, res) => {
    const { name, email } = req.body;

    pool.query("INSERT INTO users (name, email) VALUES (?, ?)",
        [name, email],
        (err, results) => {
            if (err) {
                return res.json({ "error": true, "message": "Error occured" + err });
            }
            else {
                return res.status(201).send("User added with ID: " + results.insertId);
            }
        });
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    pool.query(
        "UPDATE users SET name = ?, email = ? WHERE id = ?",
        [name, email, id],
        (err, results) => {
            if (err) {
                return res.json({ "error": true, "message": "Error occured" + err });
            }
            else {
                return res.send("User modified with ID: " + id);
            }
        }
    );
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.json({ "error": true, "message": "Error occured" + err });
        }
        else {
            return res.send("User deleted with ID: " + id);
        }
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};