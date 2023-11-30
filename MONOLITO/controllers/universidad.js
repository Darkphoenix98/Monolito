const { request, response } = require('express');

const Universidad= require('../models/universidad');

// crear

const CreateUniversidad = async (req, res) => {
    try {
        const { nombre, direccion, telefono } = req.body;

        // Verificar si la universidad ya existe
        const universidadBD = await Universidad.findOne({ nombre });
        if (universidadBD) {
            return res.status(400).json({ msg: 'Ya existe la universidad' });
        }

        // Agregar dirección y teléfono a los datos
        const datos = {
            nombre,
            direccion,
            telefono
        };

        // Crear instancia de la Universidad con los datos
        const universidad = new Universidad(datos);

        // Guardar la universidad en la base de datos
        await universidad.save();

        // Retornar la respuesta con el objeto universidad creado
        return res.status(201).json(universidad);
    } catch (e) {
        // Manejar errores
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};



 
// consultar todos
const getUniversidades= async (req, res) => {
    try{
        const universidadBD= await Universidad.find()
        return res.json(universidadBD);
    }catch(e){
        return res.status(500).json({mjs: e})
    }

}

/**
 * Consultar por ID
 */
const getUniversidadesPorID = async (req, res) => {
    try{
        const { id }  = req.params;
        const query = { _id: id };
        const universidad = await Universidad.findOne(query);
        return res.json(universidad);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}

/**
 * Actualiza por ID
 */
const updateUniversidadPorId = async (req, res) => {
    try{
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date()
        const universidad = await Universidad.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(universidad);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}


module.exports = {
    
    CreateUniversidad,
    getUniversidades,
    getUniversidadesPorID,
    updateUniversidadPorId


} 