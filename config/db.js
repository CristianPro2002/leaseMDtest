require("dotenv").config(); // Cargar variables de entorno desde .env
const { Pool } = require("pg");
const { createTunnel } = require("tunnel-ssh");
const fs = require("fs");
const path = require("path");
const privateKeyPath = path.join(__dirname, "./private_key.pem");


// Configuración para el túnel SSH
const sshConfig = {
    host: "106.0.62.77",
    port: 7822,
    username: "studynow",
    privateKey: fs.readFileSync(privateKeyPath),
    passphrase: "!8Ku3ZMD5I#oL73@",
    dstHost: "127.0.0.1",
    dstPort: 5432, // Puerto de PostgreSQL
    localHost: "127.0.0.1",
    localPort: 5432,
    keepaliveInterval: 1000,
    readyTimeout: 10000,
};

const localPort = 5432;

// Configuración de la base de datos
const dbConfig = {
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: "!8Ku3ZMD5I#oL73@",
    host: "127.0.0.1", // Conexión al túnel local
};

// Función para crear el túnel y conectar a la base de datos
let dbPool;

const createDatabaseConnection = async () => {
    try {
        // Creamos el túnel SSH
        const [server, client] = await createTunnel(
            { autoClose: false },
            { port: localPort },
            sshConfig,
            { dstPort: 5432 },
        );

        // Ahora creamos el Pool de PostgreSQL usando la configuración local
        dbPool = new Pool(dbConfig);

        console.log("Túnel SSH y conexión a PostgreSQL establecidos.");
    } catch (error) {
        console.error(
            "Error al crear el túnel o conectar a la base de datos:",
            error
        );
    }
};


// Función para ejecutar consultas SQL
const queryDatabase = async (query, values = []) => {
    try {
        if (!dbPool) {
            await createDatabaseConnection();
        }
        const { rows } = await dbPool.query(query, values);
        return rows;
    } catch (err) {
        console.error("Error al ejecutar la consulta:", err);
        throw err;
    }
};

// Función para cerrar la conexión de la base de datos
const closeDatabaseConnection = async () => {
    try {
        if (dbPool) {
            await dbPool.end();
            console.log("Conexión a la base de datos cerrada.");
        }
    } catch (error) {
        console.error("Error al cerrar la conexión de la base de datos:", error);
    }
};

// Exportamos las funciones
module.exports = {
    createDatabaseConnection,
    queryDatabase,
    closeDatabaseConnection,
};
