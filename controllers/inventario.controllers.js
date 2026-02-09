import inventarioModel from "../models/inventario.models.js";
import { getDatabaseError } from "../lib/errors/database.errors.js";

const readAllLimit = async (req, res) => {
  const queryStrings = req.query;
  try {
    const joyas = await inventarioModel.getAllJoyasLimit(queryStrings);

    if (!joyas) {
      return res
        .status(404)
        .json({ message: "Requested Element(s) Not Found" });
    }

    const HATEOAS = await inventarioModel.prepareHATEOAS(joyas)
    return res.status(200).json(HATEOAS);
  } catch (error) {
    console.error(error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }

    return res.status(500).json({ message: error.message });
  }
};

const readFilter = async (req, res) => {
  const queryStrings = req.query;
  try {
    const joyas = await inventarioModel.getFilteredJoyas(queryStrings);

    if (!joyas) {
      return res
        .status(404)
        .json({ message: "Requested element(s) Not Found" });
    }
    return res.status(200).json(joyas);
  } catch (error) {
    console.error(error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }

    return res.status(500).json({ message: error.message });
  }
};

const inventarioController = {
  readAllLimit,
  readFilter,
};

export default inventarioController;
