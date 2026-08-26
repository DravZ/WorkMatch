import { useNotification } from "../context/NotificationContext/NotificationContext";
import { postulacionService } from "../services/postulaciones.service";

interface CrearPostulacionData {
  id_usuario: number;
  id_vacante: number;
}

export const usePostulacionController = () => {
  const { showNotification } = useNotification();

  // =========================================================
  // CREAR POSTULACIÓN
  // =========================================================
  const create = async (data: CrearPostulacionData) => {
    try {
      const { data: response } = await postulacionService.create(data);

      showNotification({
        type: "success",
        title: "Postulación Enviada",
        description: "Te has postulado exitosamente a esta vacante.",
      });

      console.log("POSTULACIÓN CREADA");
      console.log(response);

      return response;
    } catch (error: any) {
      showNotification({
        type: "error",
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Hubo un error al enviar la postulación.",
      });
    }
  };

  // =========================================================
  // OBTENER TODAS
  // =========================================================
  const getAll = async () => {
    try {
      const { data: response } = await postulacionService.findAll();

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "No se pudieron obtener las postulaciones.",
      });
    }
  };

  // =========================================================
  // OBTENER POR USUARIO
  // =========================================================
  const getByUsuario = async (id_usuario: number) => {
    try {
      const { data: response } =
        await postulacionService.findByUsuario(id_usuario);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description:
          "No se pudieron obtener las postulaciones del usuario.",
      });
    }
  };

  // =========================================================
  // OBTENER POR VACANTE
  // =========================================================
  const getByVacante = async (id_vacante: number) => {
    try {
      const { data: response } =
        await postulacionService.findByVacante(id_vacante);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description:
          "No se pudieron obtener las postulaciones de la vacante.",
      });
    }
  };
  
  // =========================================================
  // OBTENER POR EMPRESA
  // =========================================================
  const getByEmpresa = async (id_empresa: number) => {
    try {
      const { data: response } =
        await postulacionService.findByEmpresa(id_empresa);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description:
          "No se pudieron obtener las postulaciones de la empresa.",
      });
    }
  };

  // =========================================================
  // OBTENER POR ID
  // =========================================================
  const getById = async (id_postulacion: number) => {
    try {
      const { data: response } =
        await postulacionService.findById(id_postulacion);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "No se pudo obtener la postulación.",
      });
    }
  };

  // =========================================================
  // ACEPTAR
  // =========================================================
  const aceptar = async (id_postulacion: number) => {
    try {
      const { data: response } =
        await postulacionService.aceptar(id_postulacion);

      showNotification({
        type: "success",
        title: "Postulación Aceptada",
        description: "La postulación ha sido aceptada exitosamente.",
      });

      console.log("POSTULACIÓN ACEPTADA");
      console.log(response);

      return response;
    } catch (error: any) {
      showNotification({
        type: "error",
        title: "Error",
        description:
          error?.response?.data?.message ||
          "No se pudo aceptar la postulación.",
      });
    }
  };

  // =========================================================
  // RECHAZAR
  // =========================================================
  const rechazar = async (id_postulacion: number) => {
    try {
      const { data: response } =
        await postulacionService.rechazar(id_postulacion);

      showNotification({
        type: "success",
        title: "Postulación Rechazada",
        description: "La postulación ha sido rechazada.",
      });

      console.log("POSTULACIÓN RECHAZADA");
      console.log(response);

      return response;
    } catch (error: any) {
      showNotification({
        type: "error",
        title: "Error",
        description:
          error?.response?.data?.message ||
          "No se pudo rechazar la postulación.",
      });
    }
  };

  // =========================================================
  // REVOCAR
  // =========================================================
  const revocar = async (id_postulacion: number) => {
    try {
      const { data: response } =
        await postulacionService.revocar(id_postulacion);

      showNotification({
        type: "success",
        title: "Postulación Revocada",
        description: "La aceptación de la postulación ha sido revocada.",
      });

      console.log("POSTULACIÓN REVOCADA");
      console.log(response);

      return response;
    } catch (error: any) {
      showNotification({
        type: "error",
        title: "Error",
        description:
          error?.response?.data?.message ||
          "No se pudo revocar la postulación.",
      });
    }
  };

  // =========================================================
  // FINALIZAR
  // =========================================================
  const finalizar = async (id_postulacion: number) => {
    try {
      const { data: response } =
        await postulacionService.finalizar(id_postulacion);

      showNotification({
        type: "success",
        title: "Trabajo Finalizado",
        description: "El trabajo ha sido marcado como finalizado.",
      });

      console.log("TRABAJO FINALIZADO");
      console.log(response);

      return response;
    } catch (error: any) {
      showNotification({
        type: "error",
        title: "Error",
        description:
          error?.response?.data?.message ||
          "No se pudo finalizar el trabajo.",
      });
    }
  };

  // =========================================================
  // ELIMINAR
  // =========================================================
  const remove = async (id_postulacion: number) => {
    try {
      const { data: response } =
        await postulacionService.remove(id_postulacion);

      showNotification({
        type: "success",
        title: "Postulación Eliminada",
        description: "La postulación ha sido eliminada exitosamente.",
      });

      console.log("POSTULACIÓN ELIMINADA");
      console.log(response);

      return response;
    } catch (error: any) {
      showNotification({
        type: "error",
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Hubo un error al eliminar la postulación.",
      });
    }
  };

  return {
    create,
    getAll,
    getByUsuario,
    getByVacante,
    getByEmpresa,
    getById,
    aceptar,
    rechazar,
    revocar,
    finalizar,
    remove,
  };
};