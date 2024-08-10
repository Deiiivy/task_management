import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./db/dbConnection.js";
import bcrypt from "bcrypt"

dotenv.config();

const app = express();


app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;


let db;
connect().then(connection => {
    db = connection;
}).catch(error => {
    console.error("Database connection failed:", error);
    process.exit(1);
});





// user routers
app.post("/register", async (req, res) => {
    try {
        const { name, gmail, password } = req.body;

        if (!name || !gmail || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute("INSERT INTO User (name, gmail, password) VALUES (?, ?, ?)", [name, gmail, hashedPassword]);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});


app.post("/login", async (req, res) => {
    try {
        const { gmail, password } = req.body;

        if (!gmail || !password) {
            return res.status(400).json({ message: "Gmail and password are required" });
        }

        const [rows] = await db.execute("SELECT * FROM User WHERE gmail = ?", [gmail]);
        const user = rows[0];

        if (!user) {
            console.log("No user found with that gmail");
            return res.status(401).json({ message: "Invalid gmail or password" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            console.log("Password does not match");
            return res.status(401).json({ message: "Invalid gmail or password" });
        }

        const [tasks] = await db.execute("SELECT * FROM Task WHERE id_user = ?", [user.id]);
        res.status(200).json({ message: "User login success", user, tasks });
    } catch (error) {
        console.log("Error logging in: ", error);
        res.status(500).json({ message: "Error logging in", error });
    }
});



app.get("/getAllUsers", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM User");
        res.send(rows)
        console.log(rows);
    } catch (error) {
        console.log("error al obtener todos los usuarios " + error);
    }
});



//routes task

app.get("/getAllTask", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM Task")
        res.send(rows)
        console.log(rows);
    } catch (error) {
        res.send("server error" + error)
        throw error;
    }
})

app.post("/createTask", async (req, res) => {
    try {
        const { title, description, id_user } = req.body;

        if (!title || !description || !id_user) {
            return res.status(400).json({ message: "Title, description, and id_user are required" });
        }

        const [rows] = await db.query("INSERT INTO Task (title, description, id_user) VALUES (?, ?, ?)", [title, description, id_user]);
        res.status(201).json({ message: "Task created successfully", rows });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
});


app.delete("/deleteTask/:id", async(req, res) => {
    try {
        const {id} = req.params
        await db.execute("DELETE FROM Task WHERE id = ?", [id])
        res.send("task delete success")
    } catch (error) {
        res.send("server error " + error)
        throw error
    }
})



app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
