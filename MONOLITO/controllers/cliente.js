const { request, response } = require('express');
const Cliente= require('../models/cliente');

// crear
const CreateCliente = async (req, res) => {
    try {
        const { nombre, email } = req.body;

        // Verificar si el cliente existe ya existe
        const clienteBD = await Cliente.findOne({ nombre });
        if (clienteBD) {
            return res.status(400).json({ msg: 'Ya existe el cliente' });
        }
        // Agregar 
        const datos = {
            nombre, 
            email
        };

        // Crear instancia del cliente con los datos
        const cliente = new Cliente(datos);

        // Guardar el cliente en la base de datos
        await cliente.save();

        // Retornar la respuesta con el objeto cliente creado
        return res.status(201).json(cliente);
    } catch (e) {
        // Manejar errores
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};


 
// consultar todos
const getClientes= async (req, res = response) => {
    try{
        const clienteBD = await Cliente.find()
        return res.json(clienteBD);
    }catch(e){
        return res.status(500).json({mjs: e})
    }

}

/**
 * Consultar por ID
 */
const getClientePorID = async (req = request, res = response) => {
    try{
        const { id }  = req.params;
        const query = { _id: id };
        const cliente = await Cliente.findOne(query);
        return res.json(cliente);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}

/**
 * Actualiza por ID
 */
const updateClientePorId = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const data = req.body;// destructuring, spread (...)
        data.fechaActualizacion = new Date()
        const cliente = await Cliente.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(cliente);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}



module.exports = {
    
    CreateCliente,
    getClientes,
    getClientePorID,
    updateClientePorId


} 