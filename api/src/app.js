// app.js
import express from "express";
import cors from "cors";
import { studentRoutes } from "./routes/studentRoutes.js";
import { groupRoutes } from './routes/groupRoutes.js';
import { teacherRoutes } from './routes/teacherRoutes.js';
import { expensesRoutes } from './routes/expensesRoutes.js';
import { schoolTopRoutes } from './routes/schoolTopRoutes.js';
import { loginRoutes } from "./routes/loginRoutes.js";
import { infoRoutes } from "./routes/userInfoRoutes.js"
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/students", studentRoutes);
app.use('/groups', groupRoutes);
app.use('/teachers', teacherRoutes);
app.use('/school', expensesRoutes);
app.use('/top', schoolTopRoutes);
app.use("/login", loginRoutes);
app.use("/info", infoRoutes);

app.use((err, req, res, next) =>
{
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () =>
{
    console.log(`Server listening on PORT ${PORT}`);
});
