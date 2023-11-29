import { pool } from "../dbConfig.js";

const getAllStudents = (req, res) =>
{
    pool.query("SELECT * FROM student", (err, results) =>
    {
        if (err)
        {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        res.json(results);
    });
};


const getUserById = (req, res) =>
{
    const userId = req.params.id;

    pool.query("SELECT * FROM User WHERE user_id = ?", [userId], (err, results) =>
    {
        if (err)
        {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }

        if (results.length === 0)
        {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const user = results[0];
        res.json(user);
    });
};


export { getAllStudents, getUserById };
