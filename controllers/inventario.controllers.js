import inventarioModel from "../models/inventario.models.js";

const readAllLimit = async (req,res) =>{
    const queryStrings = req.query
    try {
        const joyas = await inventarioModel.getAllJoyasLimit(queryStrings)

        if(!joyas){
            return res.status(404).json({message: 'Requeste Element(s) Not Found'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const readFilter = async (req,res) =>{
    const queryStrings = req.query
try {
    const joyas = await inventarioModel.getFilteredJoyas(queryStrings)
    
        if(!joyas){
            return res.status(404).json({message: 'Requested element(s) Not Found'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const inventarioController = {
    readAllLimit,
    readFilter,
}

export default inventarioController