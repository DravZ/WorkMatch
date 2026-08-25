import { useNotification } from "../context/NotificationContext/NotificationContext";

import { habilidadService } from "../services/habilidades.service";

export const useHabilidadController = () => {

  const { showNotification } = useNotification();

  const getAll = async () => {
    try {

      const { data: response } = await habilidadService.findAll();

      return response;

    } catch (error) {

      showNotification({
        type: "error",
        title: "Error",
        description: "No se pudieron obtener las habilidades.",
      });

    }
  };

  return {
    getAll,
  };
};