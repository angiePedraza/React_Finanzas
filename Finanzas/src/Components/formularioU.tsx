/* eslint-disable @typescript-eslint/no-explicit-any */
import React  from "react";
import {
    Paper,
    Stack,
    TextField,
    Typography,
    Button,
    Box,
} from "@mui/material";

interface FormularioUsuarioProps {

    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    initialData?: any;
}

const FormularioUsuario: React.FC<FormularioUsuarioProps> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] =React.useState({
        nombre: "",
        email: "",
        password: "",
        fecha_registro: ""
    });
    const [selectedImage, setSelectedImage]= React.useState<File | null>(null);
    
    React.useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            setSelectedImage(null);
        } else {
            setFormData({nombre:'',email: '',password: '',fecha_registro:''});
            setSelectedImage(null);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setFormData({...formData,[e.target.name]:e.target.value});
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]){
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
       const data = new FormData();
       data.append('nombre', formData.nombre);
       data.append('email', formData.email);
       data.append('password',formData.password);
       data.append('fecha_registro',formData.fecha_registro);
       if(selectedImage){
        data.append('imagenUsuario',selectedImage);
       }
       onSubmit(data);
       onCancel();
        };

    return (
        <Box
            sx={{
                minHeight: '50vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                p: 2
            }}
        >
            <Paper elevation={5} sx={{ p: 6, maxWidth: 800, width: '100%' }}>
                <Typography variant="h6" gutterBottom align="center">
                    {initialData ? "Editar Usuario" : "Registrar Usuario"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Fecha de registro"
                            name="fecha_registro"
                            value={formData.fecha_registro}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                       <Button variant="contained" component="label" color="primary" fullWidth>
                    Seleccionar Imagen
                    <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                </Button>
                {initialData?.imagenUsuario && !selectedImage && (
                    <div style={{ marginTop: 10 }}>
                        <img
                            src={`http://localhost:8000/serverImagen/uploads/${initialData.imagenUsuario}`}
                            alt="Imagen actual"
                            style={{ maxWidth: 100, maxHeight: 100, display: 'block', marginBottom: 8 }}
                        />
                        <span style={{ fontSize: 12, color: '#888' }}>Imagen actual</span>
                    </div>
                )}
                {selectedImage && (
                    <span style={{ marginLeft: 10 }}>{selectedImage.name}</span>
                )}
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
                        <Button variant="contained" type="submit" color="primary">
                            {initialData ? "Actualizar" : "Registrar"}
                        </Button>
                        <Button variant="outlined" onClick={onCancel}>
                            Cancelar
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default FormularioUsuario;