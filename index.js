const express = require('express');
const cors = require('cors')
const router = require('./app/v1/routes/index');
require('dotenv').config();
const { validationGeneralError, resError } = require('./app/helpers');
const { createDatabaseConnection, closeDatabaseConnection } = require("./config/db");


// Servidor de express
const app = express();

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json({
    limit: '50mb'
}));

// Rutas
app.use("/api/v1", router);

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
    if (err) {
        const { statusCode = 500, message } = validationGeneralError(err.statusCode, err.message);
        return resError(res, statusCode, message);
    }
    next();
});

// Puerto y escucha peticiones
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}/`);
});

// Manejo de cierre de la aplicación
process.on("SIGINT", async () => {
    console.log("Deteniendo el servidor...");
    try {
        await closeDatabaseConnection();
        server.close(() => {
            console.log("Servidor detenido");
            process.exit(0);
        });
    } catch (err) {
        console.error("Error al cerrar el servidor:", err.message);
        process.exit(1);
    }
});

// Conexión a la base de datos
createDatabaseConnection();