import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { useNotification } from "../context/NotificationContext/NotificationContext";
import { useUser } from "../context/UserContext/UserContext";

export const useLoginController = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { setUser } = useUser();

    const login = async (data: any) => {
        console.log(data);

        const body = {
            email: data.email,
            contrasena: data.password
        }
        try {
            const { data: response } = await authService.login(body);

            console.log("RESPONSE: ");
            console.log(response)


            showNotification({
                type: 'success',
                title: 'Bienvenido',
                description: 'Inicio de sesión exitoso.',
            });

            setUser({
                id: response.usuario.id_usuario,
                nombreCompleto: response.usuario.fullName,
                email: response.usuario.email,
                role: response.usuario.role
            });

            navigate('/');
        } catch (error) {
            showNotification({
                type: 'error',
                title: 'Error',
                description: 'Correo o contraseña incorrectos.',
            });
        }
    };

    return {
        login,
    };
};

export const useRegisterController = () => {
  const { showNotification } = useNotification();

  const register = async (data: any) => {
    const body = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    try {
      const { data: response } = await authService.register(body);

      console.log('RESPONSE:');
      console.log(response);

      showNotification({
        type: 'success',
        title: 'Cuenta creada',
        description: 'Tu cuenta se creó correctamente.',
      });

      return response;
    } catch (error: any) {
      if (error.response) {
        showNotification({
          type: 'error',
          title: 'No se pudo crear la cuenta',
          description:
            error.response.data?.mensaje ||
            'El correo se encuentra en uso.',
        });
      } else {
        showNotification({
          type: 'error',
          title: 'Error de conexión',
          description:
            'No se pudo conectar con el servidor. Inténtalo nuevamente.',
        });
      }

      return false;
    }
  };

  return {
    register,
  };
};

export const useLogoutController = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { clearUser } = useUser();

  const logout = () => {
    clearUser();

    showNotification({
      type: 'success',
      title: 'Sesión cerrada',
      description: 'Has cerrado sesión correctamente.',
    });

    navigate('/login');
  };

  return {
    logout,
  };
};