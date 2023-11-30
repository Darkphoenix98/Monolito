const { Router } = require('express');
const { 
    
    CreateUniversidad,
    getUniversidades,
    getUniversidadesPorID,
    updateUniversidadPorId
} = require('../controllers/universidad');

const router = Router();

/**
 * Obtiene todos 
 */
router.get('/', getUniversidades);

/**
 * Obtiene por id
 */
router.get('/:id', getUniversidadesPorID);

/**
 * Crear 
 */
router.post('/', CreateUniversidad);

/**
 * Actualiza por id
 */
router.put('/:id', updateUniversidadPorId);


module.exports = router;