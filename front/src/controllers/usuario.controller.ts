import { useNotification } from "../context/NotificationContext/NotificationContext";

import { usuarioService } from "../services/usuario.service";

interface UpdateUsuarioData {
  fullName?: string;
  email?: string;
  password?: string;
  role?: "work" | "hire";
}

export const useUsuarioController = () => {
  const { showNotification } = useNotification();

  const getAll = async () => {
    try {
      const { data: response } = await usuarioService.findAll();

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "No se pudieron obtener los usuarios.",
      });
    }
  };

  const getById = async (id_usuario: number) => {
    try {
      const { data: response } =
        await usuarioService.findById(id_usuario);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "No se pudo obtener el usuario.",
      });
    }
  };

  const update = async (
    id_usuario: number,
    data: UpdateUsuarioData
  ) => {
    try {
      const { data: response } = await usuarioService.update(
        id_usuario,
        data
      );

      showNotification({
        type: "success",
        title: "Usuario Actualizado",
        description: "Se ha actualizado el usuario exitosamente.",
      });

      console.log("USUARIO ACTUALIZADO");
      console.log(response);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "Hubo un error al actualizar el usuario.",
      });
    }
  };

  const remove = async (id_usuario: number) => {
    try {
      const { data: response } =
        await usuarioService.remove(id_usuario);

      showNotification({
        type: "success",
        title: "Usuario Eliminado",
        description: "Se ha eliminado el usuario exitosamente.",
      });

      console.log("USUARIO ELIMINADO");
      console.log(response);

      return response;
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "Hubo un error al eliminar el usuario.",
      });
    }
  };

  return {
    getAll,
    getById,
    update,
    remove,
  };
};