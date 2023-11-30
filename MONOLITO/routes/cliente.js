const { Router } = require('express');
const { 
    
    CreateCliente,
    getClientes,
    getClientePorID,
    updateClientePorId
} = require('../controllers/cliente');

const router = Router();

/**
 * Obtiene todos 
 */
router.get('/', getClientes);

/**
 * Obtiene por id
 */
router.get('/:id', getClientePorID);

/**
 * Crear 
 */
router.post('/', CreateCliente);

/**
 * Actualiza por id
 */
router.put('/:id', updateClientePorId);


module.exports = router;