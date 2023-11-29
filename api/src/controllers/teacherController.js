import { pool } from "../dbConfig.js";

const getAllTeachers = (req, res) =>
{
    pool.query("SELECT * FROM Teacher", (err, results) =>
    {
        if (err)
        {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        res.json(results);
    });
};

const getSubjectsByTeacher = (req, res) =>
{
    const teacherId = req.params.id;

    pool.query(
        "SELECT Teacher.full_name AS teacher_name, Subject.subject_name, SchoolGroup.group_name FROM Teacher JOIN Subject ON Teacher.subject_id = Subject.subject_id LEFT JOIN SchoolGroup ON Teacher.teacher_id = SchoolGroup.teacher_id WHERE Teacher.teacher_id = ?",
        [teacherId],
        (err, results) =>
        {
            if (err)
            {
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            if (results.length === 0)
            {
                res.status(404).json({ error: "No subjects found for the teacher" });
                return;
            }

            const subjects = results;
            res.json(subjects);
        }
    );
};

export { getAllTeachers, getSubjectsByTeacher };
