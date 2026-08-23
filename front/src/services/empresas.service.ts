import { api } from '../api/axios';

export const empresaSerive = {
  create(data: any) {
    return api.post<any>('/empresa', data);
  },
};