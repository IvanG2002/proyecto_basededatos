import { pool } from "../dbConfig.js";

const getAllGroups = (req, res) =>
{
    pool.query("SELECT * FROM schoolgroup", (err, results) =>
    {
        if (err)
        {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        res.json(results);
    })
}

const getStudentsByGroup = (req, res) =>
{
    const groupId = req.params.id;

    pool.query(
        "SELECT SchoolGroup.group_name, Student.* FROM SchoolGroup JOIN Student ON SchoolGroup.school_group_id = Student.school_group_id WHERE SchoolGroup.school_group_id = ?",
        [groupId],
        (err, results) =>
        {
            if (err)
            {
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            if (results.length === 0)
            {
                res.status(404).json({ error: "No students found for the group" });
                return;
            }

            const students = results;
            res.json(students);
        }
    );
};

const getTeacherByGroup = (req, res) =>
{
    const groupId = req.params.id;

    pool.query(
        "SELECT SchoolGroup.group_name, Teacher.full_name AS teacher_name " +
        "FROM SchoolGroup " +
        "JOIN Teacher ON SchoolGroup.teacher_id = Teacher.teacher_id " +
        "WHERE SchoolGroup.school_group_id = ?",
        [groupId],
        (err, results) =>
        {
            if (err)
            {
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            if (results.length === 0)
            {
                res.status(404).json({ error: "Group not found or no teacher assigned" });
                return;
            }

            const groupInfo = results[0];
            res.json(groupInfo);
        }
    );
};

export { getStudentsByGroup, getTeacherByGroup, getAllGroups };
