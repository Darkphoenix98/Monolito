const { Router } = require('express');
const { 
    
    CreateEtapa,
    getEtapas,
    getEtapaPorId,
    updateEtapaPorId
} = require('../controllers/etapa');

const router = Router();

/**
 * Obtiene todos 
 */
router.get('/', getEtapas);

/**
 * Obtiene por id
 */
router.get('/:id', getEtapaPorId);

/**
 * Crear 
 */
router.post('/', CreateEtapa);

/**
 * Actualiza por id
 */
router.put('/:id', updateEtapaPorId);


module.exports = router;