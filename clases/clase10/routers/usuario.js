import express from 'express'
import Usuario from '../controllers/usuario.js'
const router = express.Router()


router.get('/usuarios', Usuario.traer);
router.post('/registrar', Usuario.registrar);
router.post('/login', Usuario.login);
router.put('/logout', Usuario.validar, Usuario.logout);
router.get('/info', Usuario.validar, Usuario.info);

export default router;