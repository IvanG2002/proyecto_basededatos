import { pool } from "../dbConfig.js";

const getSchoolExpenses = (req, res) =>
{
    pool.query(
        `SELECT
            COUNT(*) AS total_students,
            COUNT(*) * 10000 AS total_revenue,
            COUNT(DISTINCT Teacher.teacher_id) * 8000 AS total_teacher_costs,
            ((COUNT(*) * 10000) - (COUNT(DISTINCT Teacher.teacher_id) * 8000)) AS net_profit
        FROM Student
        JOIN SchoolGroup ON Student.school_group_id = SchoolGroup.school_group_id
        JOIN Teacher ON SchoolGroup.teacher_id = Teacher.teacher_id`,
        (err, results) =>
        {
            if (err)
            {
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            if (results.length === 0)
            {
                res.status(404).json({ error: "No data found for school expenses" });
                return;
            }

            const expenses = results[0];
            res.json(expenses);
        }
    );
};

export { getSchoolExpenses };
