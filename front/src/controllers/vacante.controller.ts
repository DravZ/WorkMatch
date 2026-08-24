import { useNotification } from "../context/NotificationContext/NotificationContext";
import { vacanteService } from "../services/vacante.service"; 
import type { EstadoVacante } from "../types/estadoVacante";

interface CrearVacanteData {
  id_empresa: number;
  id_categoria: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  salario?: string;
  fecha_inicio?: string;
  empleados_necesarios?: number;
  horario?: string;
  duracion_estimada?: string;
  requerimientos?: string;
  habilidades_optimas?: string;
  estado?: EstadoVacante;
  urgente?: boolean;
  tipo_pago: "hora" | "fijo";
}

interface UpdateVacanteData {
  id_categoria?: number;
  titulo?: string;
  descripcion?: string;
  ubicacion?: string;
  salario?: string;
  fecha_inicio?: string;
  empleados_necesarios?: number;
  horario?: string;
  duracion_estimada?: string;
  requerimientos?: string;
  habilidades_optimas?: string;
  estado?: EstadoVacante;
  urgente?: boolean;
  tipo_pago?: "hora" | "fijo";
}

export const useVacanteController = () => {

  const { showNotification } = useNotification();

  const create = async (data: CrearVacanteData) => {
    try {
      const { data: response } = await vacanteService.create(data);

      showNotification({
        type: "success",
        title: "Vacante Creada",
        description: "Se ha creado la vacante exitosamente.",
      });

      console.log("VACANTE CREADA");
      console.log(response);

      return response;

    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "Hubo un error al crear la vacante.",
      });
    }
  };

  const getAll = async () => {
    try {
      const { data: response } = await vacanteService.findAll();

      return response;

    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "No se pudieron obtener las vacantes.",
      });
    }
  };

  const getById = async (id_vacante: number) => {
    try {
      const { data: response } = await vacanteService.findById(id_vacante);

      return response;

    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "No se pudo obtener la vacante.",
      });
    }
  };

  const update = async (
    id_vacante: number,
    data: UpdateVacanteData
  ) => {
    try {
      const { data: response } = await vacanteService.update(
        id_vacante,
        data
      );

      showNotification({
        type: "success",
        title: "Vacante Actualizada",
        description: "Se ha actualizado la vacante exitosamente.",
      });

      console.log("VACANTE ACTUALIZADA");
      console.log(response);

      return response;

    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "Hubo un error al actualizar la vacante.",
      });
    }
  };

  const remove = async (id_vacante: number) => {
    try {
      const { data: response } = await vacanteService.remove(id_vacante);

      showNotification({
        type: "success",
        title: "Vacante Eliminada",
        description: "Se ha eliminado la vacante exitosamente.",
      });

      console.log("VACANTE ELIMINADA");
      console.log(response);

      return response;

    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "Hubo un error al eliminar la vacante.",
      });
    }
  };

  return {
    create,
    getAll,
    getById,
    update,
    remove,
  };
};