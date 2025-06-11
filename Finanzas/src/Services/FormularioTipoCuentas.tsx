// src/Components/FormularioTipoCuenta.tsx
import React from "react";
import {
    Paper,
    Stack,
    TextField,
    Typography,
    Button,
    Box,
} from "@mui/material";
import type { FormularioTipoCuentaProps } from '../Types';

const FormularioTipoCuenta: React.FC<FormularioTipoCuentaProps> = ({ 
    initialData, 
    onSubmit, 
    onCancel 
}) => {
    const [formData, setFormData] = React.useState({
        nombre: ""
    });
    
    React.useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre || ""
            });
        } else {
            setFormData({ nombre: "" });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.nombre.trim()) {
            alert('Por favor, ingresa el nombre del tipo de cuenta');
            return;
        }

        onSubmit({
            id: initialData?.id,
            nombre: formData.nombre.trim()
        });
        
        // Limpiar formulario si es creación
        if (!initialData) {
            setFormData({ nombre: "" });
        }
    };

    return (
        <Box
            sx={{
                minHeight: '40vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                p: 2
            }}
        >
            <Paper elevation={5} sx={{ p: 6, maxWidth: 600, width: '100%' }}>
                <Typography variant="h6" gutterBottom align="center">
                    {initialData ? "Editar Tipo de Cuenta" : "Crear Tipo de Cuenta"}
                </Typography>
                
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            label="Nombre del Tipo de Cuenta"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            fullWidth
                            placeholder="Ej: Efectivo, Bancaria, Tarjeta"
                            helperText="Ingresa un nombre descriptivo para el tipo de cuenta"
                        />
                    </Stack>
                    
                    <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
                        <Button 
                            variant="contained" 
                            type="submit" 
                            color="primary"
                            sx={{ minWidth: 120 }}
                        >
                            {initialData ? "Actualizar" : "Crear"}
                        </Button>
                        <Button 
                            variant="outlined" 
                            onClick={onCancel}
                            sx={{ minWidth: 120 }}
                        >
                            Cancelar
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default FormularioTipoCuenta;