import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { useNotification } from "../context/NotificationContext/NotificationContext";

export const useLoginController = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const login = async (data: any) => {
        console.log(data);

        const body = {
            email : data.email,
            contrasena: data.password
        }
        try {
            const { data: response } = await authService.login(body);

            console.log(data);

            sessionStorage.setItem('token', response.token);

            showNotification({
                type: 'success',
                title: 'Bienvenido',
                description: 'Inicio de sesión exitoso.',
            });

            navigate('/dashboard');
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