import { Router } from "express";
import { healthCheck,errorCheck,loginUser,checkTokens,refreshToken } from "../controllers/healthcheck.js";
import { authenticateToken } from "../utils/Authenticate.js";
const router = Router();

router.route('/').get(healthCheck);
router.route('/error').get(errorCheck);
router.route('/login').get(loginUser);
router.route('/checktoken').get(authenticateToken,checkTokens);
router.route('/refreshToken').get(refreshToken);

export { router as healthcheckRouter };

