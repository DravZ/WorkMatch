import { useNotification } from "../context/NotificationContext/NotificationContext";

import { trabajadorService } from "../services/trabajador.service";

interface CrearTrabajadorData {
  idUsuario: number;
  ubicacion?: string;
  tarifa_hora?: number;
  trabajos_completados?: number;
  calificacion?: number;
  total_calificaciones?: number;
  acercaDe?: string;
  experienciaLaboral?: string;
  especialidad_carrera?: string;
  area_trabajo?:
    | "Delivery"
    | "Moving"
    | "Construction"
    | "Cleaning"
    | "Events"
    | "Hospitality"
    | "Administrative"
    | "Security";
  is_verified?: boolean;
  disponibilidad?: string;
  habilidades?: number[];
  categorias?: number[];
}

interface UpdateTrabajadorData {
  ubicacion?: string;
  tarifa_hora?: number;
  trabajos_completados?: number;
  calificacion?: number;
  total_calificaciones?: number;
  acercaDe?: string;
  experienciaLaboral?: string;
  especialidad_carrera?: string;
  area_trabajo?:
    | "Delivery"
    | "Moving"
    | "Construction"
    | "Cleaning"
    | "Events"
    | "Hospitality"
    | "Administrative"
    | "Security";
  is_verified?: boolean;
  disponibilidad?: string;
  habilidades?: number[];
  categorias?: number[];
}

export const useTrabajadorController = () => {
  const { showNotification } = useNotification();

  const create = async (data: CrearTrabajadorData) => {
    try {
      const { data: response } = await trabajadorService.create(data);

      showNotification({
        type: "success",
        title: "Trabajador Creado",
        description: "Se ha creado el perfil de trabajador exitosamente.",
      });

      console.log("TRABAJADOR CREADO");
      console.log(response);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "Hubo un error al crear el perfil de trabajador.",
      });
    }
  };

  const getAll = async () => {
    try {
      const { data: response } = await trabajadorService.findAll();

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "No se pudieron obtener los trabajadores.",
      });
    }
  };

  const getById = async (id_trabajador: number) => {
    try {
      const { data: response } =
        await trabajadorService.findById(id_trabajador);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "No se pudo obtener el trabajador.",
      });
    }
  };

  const getByIdUsuario = async (idUsuario: number) => {
    try {
      const { data: response } =
        await trabajadorService.findByIdUsuario(idUsuario);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "No se pudo obtener el trabajador del usuario.",
      });
    }
  };

  const update = async (
    id_trabajador: number,
    data: UpdateTrabajadorData
  ) => {
    try {
      const { data: response } = await trabajadorService.update(
        id_trabajador,
        data
      );

      showNotification({
        type: "success",
        title: "Trabajador Actualizado",
        description: "Se ha actualizado el perfil exitosamente.",
      });

      console.log("TRABAJADOR ACTUALIZADO");
      console.log(response);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "Hubo un error al actualizar el perfil de trabajador.",
      });
    }
  };

  const updateByIdUsuario = async (
    idUsuario: number,
    data: UpdateTrabajadorData
  ) => {
    try {
      const { data: response } =
        await trabajadorService.updateByIdUsuario(idUsuario, data);

      showNotification({
        type: "success",
        title: "Trabajador Actualizado",
        description: "Se ha actualizado el perfil exitosamente.",
      });

      console.log("TRABAJADOR ACTUALIZADO POR USUARIO");
      console.log(response);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description:
          "Hubo un error al actualizar el perfil de trabajador.",
      });
    }
  };

  const remove = async (id_trabajador: number) => {
    try {
      const { data: response } =
        await trabajadorService.remove(id_trabajador);

      showNotification({
        type: "success",
        title: "Trabajador Eliminado",
        description: "Se ha eliminado el perfil de trabajador exitosamente.",
      });

      console.log("TRABAJADOR ELIMINADO");
      console.log(response);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "Hubo un error al eliminar el trabajador.",
      });
    }
  };

  return {
    create,
    getAll,
    getById,
    getByIdUsuario,
    update,
    updateByIdUsuario,
    remove,
  };
};