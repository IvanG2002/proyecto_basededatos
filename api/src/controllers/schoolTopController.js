import { pool } from "../dbConfig.js";

const getTopStudents = (req, res) =>
{
    pool.query(
        `SELECT
            Student.student_id,
            Student.full_name,
            Student.student_average
        FROM
            Student
        ORDER BY
            Student.student_average DESC
        LIMIT 3`,
        (err, results) =>
        {
            if (err)
            {
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            if (results.length === 0)
            {
                res.status(404).json({ error: "No data found for top students" });
                return;
            }

            const topStudents = results;
            res.json(topStudents);
        }
    );
};

export { getTopStudents };
