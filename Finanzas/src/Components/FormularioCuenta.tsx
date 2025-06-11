// src/Components/FormularioCuenta.tsx
import React from "react";
import {
    Paper,
    Stack,
    TextField,
    Typography,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import type  { FormularioCuentaProps } from '../Types';

const FormularioCuenta: React.FC<FormularioCuentaProps> = ({ 
    initialData, 
    onSubmit, 
    onCancel,
    tiposCuenta
}) => {
    const [formData, setFormData] = React.useState({
        nombre: "",
        tipo_cuenta_id: "",
        saldo: ""
    });
    
    React.useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre || "",
                tipo_cuenta_id: initialData.tipo_cuenta_id?.toString() || "",
                saldo: initialData.saldo?.toString() || ""
            });
        } else {
            setFormData({ 
                nombre: "", 
                tipo_cuenta_id: "", 
                saldo: "0" 
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: any) => {
        setFormData({ ...formData, tipo_cuenta_id: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.nombre.trim()) {
            alert('Por favor, ingresa el nombre de la cuenta');
            return;
        }

        if (!formData.tipo_cuenta_id) {
            alert('Por favor, selecciona un tipo de cuenta');
            return;
        }

        const saldo = parseFloat(formData.saldo) || 0;
        if (saldo < 0) {
            alert('El saldo no puede ser negativo');
            return;
        }

        onSubmit({
            id: initialData?.id,
            usuario_id: initialData?.usuario_id || 0,
            nombre: formData.nombre.trim(),
            tipo_cuenta_id: parseInt(formData.tipo_cuenta_id),
            saldo: saldo
        });
        
        // Limpiar formulario si es creación
        if (!initialData) {
            setFormData({ nombre: "", tipo_cuenta_id: "", saldo: "0" });
        }
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
                    {initialData ? "Editar Cuenta" : "Crear Nueva Cuenta"}
                </Typography>
                
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            label="Nombre de la Cuenta"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            fullWidth
                            placeholder="Ej: Cuenta Principal, Ahorros, etc."
                            helperText="Ingresa un nombre descriptivo para identificar la cuenta"
                        />

                        <FormControl fullWidth required>
                            <InputLabel>Tipo de Cuenta</InputLabel>
                            <Select
                                value={formData.tipo_cuenta_id}
                                label="Tipo de Cuenta"
                                onChange={handleSelectChange}
                            >
                                {tiposCuenta.map((tipo) => (
                                    <MenuItem key={tipo.id} value={tipo.id?.toString()}>
                                        {tipo.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Saldo Inicial"
                            name="saldo"
                            value={formData.saldo}
                            onChange={handleChange}
                            type="number"
                            fullWidth
                            inputProps={{ 
                                min: 0, 
                                step: 0.01 
                            }}
                            helperText="Ingresa el saldo inicial de la cuenta (puede ser 0)"
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

export default FormularioCuenta;