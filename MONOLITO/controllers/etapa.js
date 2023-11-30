const { request, response } = require('express');
const Etapa = require('../models/etapa');


// crear
const CreateEtapa = async (req, res) => {
    try {
        const { nombre} = req.body;

        // Verificar si la etapa ya existe
        const etapaBD = await Etapa.findOne({ nombre });
        if (etapaBD) {
            return res.status(400).json({ msg: 'Ya existe la etapa' });
        }

        // Agregar 
        const datos = {
            nombre
            
        };

        // Crear instancia de la etapa con los datos
        const etapa = new Etapa(datos);

        // Guardar la universidad en la base de datos
        await etapa.save();

        // Retornar la respuesta con el objeto etapa creado
        return res.status(201).json(etapa);
    } catch (e) {
        // Manejar errores
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};


/**
 * Consultar por ID
 */
const getEtapaPorId = async (req = request, res = response) => {
    try{
        const { id }  = req.params;
        const query = { _id: id };
        const etapa = await Etapa.findOne(query);
        return res.json(etapa);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}

const updateEtapaPorId = async (req, res) => {
    try{
        const { id } = req.params;
        const data = req.body;// destructuring, spread (...)
        data.fechaActualizacion = new Date()
        const etapa = await Etapa.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(etapa);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}

// consultar todos

const getEtapas= async (req, res) => {
    try{
        const etapaBD= await Etapa.find()
        return res.json(etapaBD);
    }catch(e){
        return res.status(500).json({mjs: e})
    }

}






module.exports = {
    CreateEtapa,
    getEtapas,
    getEtapaPorId,
    updateEtapaPorId

 
 
} 