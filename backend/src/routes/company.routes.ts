import { Router } from 'express';

import { companyController } from '../controllers/company.controller';

const companyRoutes = Router();

companyRoutes.get('/', companyController.list);

export default companyRoutes;
