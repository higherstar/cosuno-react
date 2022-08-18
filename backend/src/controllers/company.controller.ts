import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import mockCompanies from '../data/companies.json';

export class CompanyController {
  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { searchKey, contains, skip, take }: { searchKey?: string, contains?: string[], skip?: number, take?: number } = req.query;

      const filteredCompanies = mockCompanies.filter(({ name, specialities: s }) => {
        let flag = name.toLowerCase().includes(searchKey.toLowerCase());
        if (contains && flag) {
          contains.forEach(c => {
            if (!(s.indexOf(c) > -1)) {
              flag = false;
            }
          });
        }

        return flag;
      });

      const pagedCompanies = filteredCompanies.filter((_, index) => index >= skip && index < skip + take);

      let pagination;
      if (skip && take) {
        pagination = {
          totalPage: filteredCompanies.length
        };
      }

      res.status(StatusCodes.OK).json({
        companies: pagedCompanies,
        pagination
      });
    } catch (err) {
      next(err);
    }
  };
}

export const companyController = new CompanyController();

