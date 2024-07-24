import mysql from 'mysql2/promise'

async function connect() {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "2006",
            database: "task_management"
        })
        console.log("connect to database success");
        return connection;
    } catch (error) {
        throw error
    }
}


export default connect;