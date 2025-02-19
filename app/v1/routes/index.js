const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const pathRouter = __dirname;

// Función para quitar la extensión de un archivo
const removeExtension = (filename) => filename.split(".").shift();

// Leer y registrar dinámicamente las rutas
fs.readdirSync(pathRouter).filter((file) => {
  const fileWithoutExtension = removeExtension(file);
  const skip = ["index"].includes(fileWithoutExtension);
  if (!skip) {
    router.use(`/${fileWithoutExtension}`, require(`./${fileWithoutExtension}`));
  }
});

// Ruta genérica para errores 404
router.use("*", (req, res) => {
  res.status(404).json({
    error: `La ruta ${req.originalUrl} no fue encontrada.`,
  });
});

module.exports = router;