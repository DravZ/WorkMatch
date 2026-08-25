import { api } from '../api/axios';

export const habilidadService = {

    findAll() {
        return api.get<any>('/habilidades');
    },

};