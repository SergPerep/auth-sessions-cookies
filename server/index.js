const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pool = require('./db');
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const TWO_HOURS = 1000 * 60 * 60 * 2; // 2 hours

const {
    PORT = 5000,
} = process.env;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "session secret",
    store: new pgSession({
        pool: pool,
        tableName: "session"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
    }
}));

// app.use("/auth", require('./routes/auth'));

app.get("/", (req, res) => {
    res.json(req.session);
});

/*
app.get("/", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (error) {
        // Feedback to client
        console.error(error.message);
    }
})
*/
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});