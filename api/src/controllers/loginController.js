import bcrypt from "bcrypt";
import { pool } from "../dbConfig.js";

const loginUser = async (req, res) =>
{
    const { username, password } = req.body;

    try
    {
        const user = await getUserByUsername(username);
        if (user)
        {
            if (user.password_hash === password)
            {
                console.log("Login successful (sin encriptar)");
                res.status(200).json({ message: "Login successful" });
            } else
            {
                const isPasswordCorrect = bcrypt.compareSync(password, user.password_hash);
                if (isPasswordCorrect)
                {
                    console.log("Login successful (con encriptación)");
                    res.status(200).json({ message: "Login successful" });
                } else
                {
                    console.log("Invalid username or password");
                    res.status(401).json({ error: "Invalid username or password" });
                }
            }
        } else
        {
            console.log("User not found");
            res.status(401).json({ error: "User not found" });
        }
    } catch (error)
    {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const createUser = async (req, res) =>
{
    const { username, password, email, role } = req.body;
    try
    {
        const existingUser = await getUserByUsername(username);

        if (existingUser)
        {
            return res.status(400).json({ error: "Username already exists" });
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        const userId = await createUserInDB(username, passwordHash, email, role);

        res.json({ message: "User created successfully", userId });
    } catch (error)
    {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const createUserInDB = (username, passwordHash, email, role) =>
{
    return new Promise((resolve, reject) =>
    {
        pool.query(
            'INSERT INTO User (username, password_hash, email, role) VALUES (?, ?, ?, ?)',
            [username, passwordHash, email, role],
            (err, result) =>
            {
                if (err)
                {
                    reject(err);
                } else
                {
                    resolve(result.insertId);
                }
            }
        );
    });
};


const getUserByUsername = (username) =>
{
    return new Promise((resolve, reject) =>
    {
        pool.query(
            "SELECT * FROM User WHERE username = ?",
            [username],
            (err, results) =>
            {
                if (err)
                {
                    reject(err);
                } else
                {
                    resolve(results[0]);
                }
            }
        );
    });
};

export { loginUser, createUser };
