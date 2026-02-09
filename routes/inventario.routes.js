import { Router } from "express";
import inventarioController from "../controllers/inventario.controllers.js";

const router = Router();

router.get("/", inventarioController.readAllLimit);
router.get("/filtros", inventarioController.readFilter);

export default router;
