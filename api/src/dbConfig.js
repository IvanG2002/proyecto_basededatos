import mysql from "mysql";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Sparky97!",
    database: "school_privateDB",
});

export { pool };
