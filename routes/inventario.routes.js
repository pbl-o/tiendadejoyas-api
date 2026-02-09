import { Router } from "epxress";
import inventarioController from "../controllers/inventario.controllers";

const router = Router();

router.get("/", inventarioController.readAllLimit);
router.get("/filtros", inventarioController.readFilter);

export default router;
