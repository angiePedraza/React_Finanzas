/* eslint-disable @typescript-eslint/no-explicit-any */
// src/Components/FormularioTransaccion.tsx - CORREGIDO
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
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
} from "@mui/material";
import type { FormularioTransaccionProps } from '../Types';

const FormularioTransaccion: React.FC<FormularioTransaccionProps> = ({ 
    initialData, 
    onSubmit, 
    onCancel,
    categorias = [],
    cuentas = []
}) => {
    const [formData, setFormData] = React.useState({
        cuenta_id: "",
        categoria_id: "",
        tipo: "gasto" as 'ingreso' | 'gasto',
        monto: "",
        fecha: "",
        descripcion: ""
    });

    const [categoriasFiltradas, setCategoriasFiltradas] = React.useState(categorias);
    
    React.useEffect(() => {
        if (initialData) {
            setFormData({
                cuenta_id: initialData.cuenta_id?.toString() || "",
                categoria_id: initialData.categoria_id?.toString() || "",
                tipo: initialData.tipo || "gasto",
                monto: initialData.monto?.toString() || "",
                fecha: initialData.fecha || "",
                descripcion: initialData.descripcion || ""
            });
        } else {
            const today = new Date().toISOString().split('T')[0];
            setFormData({ 
                cuenta_id: "",
                categoria_id: "",
                tipo: "gasto",
                monto: "",
                fecha: today,
                descripcion: ""
            });
        }
    }, [initialData]);

    // Filtrar categorías según el tipo seleccionado
    React.useEffect(() => {
        const filtered = categorias.filter(cat => cat.tipo === formData.tipo);
        setCategoriasFiltradas(filtered);
        
        // Si la categoría actual no coincide con el tipo, resetearla
        const categoriaActual = categorias.find(cat => {
            const catId = cat.id || cat.idCategoria;
            return catId?.toString() === formData.categoria_id;
        });
        if (categoriaActual && categoriaActual.tipo !== formData.tipo) {
            setFormData(prev => ({ ...prev, categoria_id: "" }));
        }
    }, [formData.tipo, categorias]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTipoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ 
            ...formData, 
            tipo: e.target.value as 'ingreso' | 'gasto',
            categoria_id: "" // Reset categoría al cambiar tipo
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.cuenta_id) {
            alert('Por favor, selecciona una cuenta');
            return;
        }

        if (!formData.categoria_id) {
            alert('Por favor, selecciona una categoría');
            return;
        }

        if (!formData.monto || parseFloat(formData.monto) <= 0) {
            alert('Por favor, ingresa un monto válido mayor a 0');
            return;
        }

        if (!formData.fecha) {
            alert('Por favor, selecciona una fecha');
            return;
        }

        onSubmit({
            id: initialData?.id,
            cuenta_id: parseInt(formData.cuenta_id),
            categoria_id: parseInt(formData.categoria_id),
            tipo: formData.tipo,
            monto: parseFloat(formData.monto),
            fecha: formData.fecha,
            descripcion: formData.descripcion.trim() || undefined
        });
        
        // Limpiar formulario si es creación
        if (!initialData) {
            const today = new Date().toISOString().split('T')[0];
            setFormData({ 
                cuenta_id: "",
                categoria_id: "",
                tipo: "gasto",
                monto: "",
                fecha: today,
                descripcion: ""
            });
        }
    };

    return (
        <Box
            sx={{
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                p: 2
            }}
        >
            <Paper elevation={5} sx={{ p: 6, maxWidth: 900, width: '100%' }}>
                <Typography variant="h6" gutterBottom align="center">
                    {initialData ? "Editar Transacción" : "Nueva Transacción"}
                </Typography>
                
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        {/* Tipo de transacción */}
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Tipo de Transacción</FormLabel>
                            <RadioGroup
                                row
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleTipoChange}
                            >
                                <FormControlLabel 
                                    value="ingreso" 
                                    control={<Radio />} 
                                    label="Ingreso" 
                                />
                                <FormControlLabel 
                                    value="gasto" 
                                    control={<Radio />} 
                                    label="Gasto" 
                                />
                            </RadioGroup>
                        </FormControl>

                        {/* Cuenta */}
                        <FormControl fullWidth required>
                            <InputLabel>Cuenta</InputLabel>
                            <Select
                                name="cuenta_id"
                                value={formData.cuenta_id}
                                label="Cuenta"
                                onChange={handleSelectChange}
                            >
                                {cuentas.map((cuenta) => (
                                    <MenuItem key={cuenta.id} value={cuenta.id?.toString()}>
                                        {cuenta.nombre} {cuenta.tipo_cuenta_nombre ? `- ${cuenta.tipo_cuenta_nombre}` : ''}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Categoría */}
                        <FormControl fullWidth required>
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                name="categoria_id"
                                value={formData.categoria_id}
                                label="Categoría"
                                onChange={handleSelectChange}
                            >
                                {categoriasFiltradas.map((categoria) => {
                                    const catId = categoria.id || categoria.idCategoria;
                                    return (
                                        <MenuItem key={catId} value={catId?.toString()}>
                                            {categoria.nombre}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        {/* Monto */}
                        <TextField
                            label="Monto"
                            name="monto"
                            value={formData.monto}
                            onChange={handleChange}
                            type="number"
                            required
                            fullWidth
                            inputProps={{ 
                                min: 0, 
                                step: 0.01 
                            }}
                            helperText="Ingresa el monto de la transacción"
                        />

                        {/* Fecha */}
                        <TextField
                            label="Fecha"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            type="date"
                            required
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        {/* Descripción */}
                        <TextField
                            label="Descripción (Opcional)"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Describe la transacción..."
                        />
                    </Stack>
                    
                    <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
                        <Button 
                            variant="contained" 
                            type="submit" 
                            color="primary"
                            sx={{ minWidth: 120 }}
                        >
                            {initialData ? "Actualizar" : "Registrar"}
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

export default FormularioTransaccion;