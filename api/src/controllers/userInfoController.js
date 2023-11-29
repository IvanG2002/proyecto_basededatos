import { pool } from "../dbConfig.js";

const getInfoByUsername = (req, res) =>
{
    const username = req.body.username;

    pool.query(`
        SELECT
        User.username,
        User.role,
        COALESCE(Student.full_name, Teacher.full_name) AS full_name,
        COALESCE(Student.student_id, Teacher.teacher_id) AS user_id,
        Student.school_group_id,
        Student.student_average,
        Teacher.subject_id,
        Teacher.group_name
        FROM
            User
        LEFT JOIN
            Student ON User.user_id = Student.user_id
        LEFT JOIN
            Teacher ON User.user_id = Teacher.user_id
        WHERE
            User.username = ?;
    `, [username], (err, results) =>
    {
        if (err)
        {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        console.log(results);
        res.json(results);
    });
};

export { getInfoByUsername };
