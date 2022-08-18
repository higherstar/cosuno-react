// Http
import Http from './api';

// Export products apis
export const readAll = (params?: {
  searchKey?: string;
  contains?: string[];
  skip?: number;
  take?: number;
}): Promise<any> => {
  return Http.get('/companies', params);
};
