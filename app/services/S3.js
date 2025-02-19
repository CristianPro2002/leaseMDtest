const {
    PutObjectCommand,
    DeleteObjectCommand,
    S3Client,
    ListObjectsV2Command,
    GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const dotenv = require("dotenv");
dotenv.config();

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRECT_KEY;

const storage = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    maxAttempts: 5,
    requestHandler: {
        timeout: 300000,
    },
});


const getBucket = async (bucketName) => {
    const params = {
        Bucket: bucketName,
    };

    try {
        const command = new ListObjectsV2Command(params);
        const data = await storage.send(command);
        return data;
    } catch (err) {
        throw new Error(`Error al listar objetos del bucket: ${err.message}`);
    }
};

// Subir un archivo al bucket
const uploadFileBucket = async (key, bucketName, body) => {
    try {
        console.log("Iniciando la subida del archivo:", key);
        const upload = new Upload({
            client: storage,
            params: {
                Bucket: bucketName,
                Key: key,
                Body: body,
            },
        });

        upload.on("httpUploadProgress", (progress) => {
            console.log(`Progreso: ${progress.loaded} bytes subidos`);
        });

        const result = await upload.done();
        const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
        console.log("Archivo subido correctamente:", url);
        return { message: "Archivo subido correctamente", url };
    } catch (err) {
        throw new Error(`Error al subir el archivo: ${err.message}`);
    }
};

// Obtener un archivo del bucket
const getFileBucket = async (key, bucketName) => {
    const params = {
        Bucket: bucketName,
        Key: key,
    };

    try {
        const command = new GetObjectCommand(params);
        const response = await storage.send(command);

        // Convertir el cuerpo del archivo a una cadena o buffer
        const streamToString = (stream) =>
            new Promise((resolve, reject) => {
                const chunks = [];
                stream.on("data", (chunk) => chunks.push(chunk));
                stream.on("error", reject);
                stream.on("end", () => resolve(Buffer.concat(chunks).toString('utf-8')));
            });

        const bodyContent = await streamToString(response.Body);
        return { content: bodyContent };
    } catch (err) {
        throw new Error(`Error al obtener el archivo del bucket: ${err.message}`);
    }
};




module.exports = { 
    getBucket, 
    uploadFileBucket,
    getFileBucket
};