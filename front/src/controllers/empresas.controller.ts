import { useNavigate } from "react-router-dom";

import { empresaService } from "../services/empresas.service";
import { useNotification } from "../context/NotificationContext/NotificationContext";
import { useUser } from "../context/UserContext/UserContext";

interface CrearEmpresaData {
  nombre_empresa: string,
  sector: string,
  ubicacion: string,
  sitio_web: string,
  logo_url: string,
  descripcion: string,
  id_usuario: number
}

interface UpdateEmpresaData {
  nombre_empresa: string,
  sector: string,
  ubicacion: string,
  sitio_web: string,
  logo_url: string,
  descripcion: string
}

interface EstadisticasEmpresa {
  trabajos_creados: number;
  trabajos_completados: number;
}

export const useEmpresaController = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const create = async (data: CrearEmpresaData) => {

    try {
      const { data: response } = await empresaService.create(data);

      showNotification({
        type: "success",
        title: "Empresa Creada",
        description: "Se ha creado la empresa exitosamente",
      });

      console.log("EMPRESA CREADA")
      console.log(response);
      return response;

    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "Hubo un error al crear la empresa.",
      });
    }
  };

  const getById = async (id_empresa: number) => {
    try {
      const { data: response } = await empresaService.findById(id_empresa);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "No se pudo obtener la empresa.",
      });
    }
  };

  const getByUsuarioId = async (id_usuario: number) => {
    try {
      const { data: response } =
        await empresaService.findByUsuarioId(id_usuario);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "No se pudo obtener la empresa del usuario.",
      });
    }
  };

  const update = async (
    id_empresa: number,
    data: UpdateEmpresaData
  ) => {
    try {
      const { data: response } = await empresaService.update(
        id_empresa,
        data
      );

      showNotification({
        type: "success",
        title: "Empresa Actualizada",
        description: "Se ha actualizado la empresa exitosamente.",
      });

      console.log("EMPRESA ACTUALIZADA");
      console.log(response);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "Hubo un error al actualizar la empresa.",
      });
    }
  };const getEstadisticas = async (id_empresa: number) => {
    try {
      const { data: response }: { data: EstadisticasEmpresa } =
        await empresaService.getEstadisticas(id_empresa);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "No se pudieron obtener las estadísticas de la empresa.",
      });
    }
  };

  return {
    create,
    getByUsuarioId,
    getById,
    update,
    getEstadisticas,
  };
};