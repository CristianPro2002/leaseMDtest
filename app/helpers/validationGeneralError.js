const validationGeneralError = (statusCode, personalizedMessage) => {
    const defaultMessages = {
        400: 'Solicitud incorrecta: El servidor no pudo procesar la solicitud enviada.',
        401: 'No autorizado: Acceso denegado debido a credenciales inválidas.',
        403: 'Prohibido: No tienes permiso para acceder a este recurso.',
        404: 'No encontrado: El recurso solicitado no está disponible.',
        413: 'Entidad demasiado grande: La carga enviada es demasiado grande.',
        429: 'Demasiadas solicitudes: Has excedido el límite permitido.',
        456: 'Error irrecuperable: Código de estado específico para un caso particular.',
        500: 'Error interno del servidor: Ocurrió un problema inesperado.',
        504: 'Tiempo de espera agotado: El servidor no recibió una respuesta a tiempo.',
        529: 'Servicio sobrecargado: El servicio está actualmente saturado.',
    };

    const message = personalizedMessage || defaultMessages[statusCode] || 'Ha ocurrido un error.';
    return {
        statusCode,
        message,
    };
};

module.exports = validationGeneralError;