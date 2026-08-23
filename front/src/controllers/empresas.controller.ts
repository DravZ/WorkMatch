import { useNavigate } from "react-router-dom";

import { empresaSerive } from "../services/empresas.service"; 
import { useNotification } from "../context/NotificationContext/NotificationContext";

interface CrearEmpresaData {
  nombre_empresa: string,
  sector: string,
  ubicacion: string,
  sitio_web: string,
  logo_url: string,
  id_usuario: number
}

export const useEmpresaController = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const create = async (data: CrearEmpresaData) => {

    try {
      const { data: response } = await empresaSerive.create(data);

      showNotification({
        type: "success",
        title: "Empresa Creada",
        description: "Se ha creado la empresa exitosamente",
      });

    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        description: "Hubo un error al crear la empresa.",
      });
    }
  };

  return {
    create
  };
};