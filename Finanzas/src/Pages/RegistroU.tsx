import * as React from 'react';
import FormularioUsuario from '../Components/formularioU';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { AuthService } from '../Services/AuthService';
import {
    Box,
    Container,
    Paper,
    Stack,
    Typography,
} from "@mui/material";


interface UsuarioData {
    id: number | null;
    idUsuario: number | null;
    nombre: string;
    email: string;
    password: string;
    fecha_registro: Date;
    imagenUsuario:string;
}

const Usuarios = () => {
    const [usuarios, setUsuarios] = React.useState<UsuarioData[]>([]);
    const [selectedUsuario, setSelectedUsuario] = React.useState<UsuarioData | null>(null);

    React.useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = () => {
    const token = AuthService.getToken(); // Asegúrate de obtener el token correctamente
    
    fetch('http://localhost:8000/users', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,  // Corregido
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: No autorizado`);
        }
        return response.json();
    })
    .then((Response) => {
        if (Response.data) {
            setUsuarios(
                Response.data.map((row: { idUsuario: any }) => ({
                    ...row,
                    id: row.idUsuario
                }))
            );
        } else {
            console.error("Error: Datos recibidos están vacíos o mal formateados");
        }
    })
    .catch((error) => console.error(`Error al traer los datos: ${error.message}`, error));
};


    const handleEditSave = (formData: FormData) => {
        const url = selectedUsuario
            ? `http://localhost:8000/users/${selectedUsuario.idUsuario}`
            : 'http://localhost:8000/users';

        const method = selectedUsuario ? 'PUT' : 'POST';

        fetch(url, {
            method,
            body: formData
        })
            .then((res) => res.json())
            .then(() => {
                cargarUsuarios();
                setSelectedUsuario(null);
            })
            .catch((error) =>
                console.error(
                    selectedUsuario ? 'Error al editar usuario' : 'Error al agregar usuario',
                    error
                ));
    };





    // Cancelar edición
    const handleCancel = () => {
        setSelectedUsuario(null);
    };

 

    return (
        <Container maxWidth="xl" sx={{ mt: 5, mb: 4 }}>
            <Paper elevation={1} sx={{ p: 5, mb: 1, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
                <Stack direction="row" alignItems="center" spacing={20}>
                    <PersonAddAltIcon sx={{ fontSize: 80, p: 4 }} />
                    <Box>
                        <Typography variant="h3" gutterBottom>
                            Gestión de Usuarios
                        </Typography>
                        <Typography variant="subtitle1">
                            Registra y administra los usuarios del sistema
                        </Typography>
                    </Box>
                </Stack>
            </Paper>

            {/* Formulario siempre visible */}
            <Paper elevation={24} sx={{ p: 6, mb: 4 }}>
                <FormularioUsuario
                    initialData={selectedUsuario}
                    onSubmit={handleEditSave}
                    onCancel={handleCancel}
                />
            </Paper>

         

   {/* Lista de usuarios */}
{/* 
<Stack spacing={2}>
    {usuarios.map((usuario) => (
        <Paper
            key={usuario.idUsuario}
            elevation={10}
            sx={{
                p: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <Stack direction="row" spacing={3} alignItems="center">
                <Avatar
                    src={usuario.imagenUsuario ? http://localhost:8000/${usuario.imagenUsuario} : undefined}
                    sx={{ width: 56, height: 56 }}
                />
                <Box>
                    <Typography variant="h6" fontWeight="bold">
                        {usuario.nombre}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Documento:</strong> {usuario.tipoDocumento} - {usuario.numeroDocumento}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Email:</strong> {usuario.email}
                    </Typography>
                </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
                <Button variant="outlined" size="small" onClick={() => handleEdit(usuario)}>
                    Editar
                </Button>
                <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(usuario.idUsuario!)}>
                    Eliminar
                </Button>
            </Stack>
        </Paper>
    ))}
</Stack>
*/} 

        </Container>
    );
};

export default Usuarios;