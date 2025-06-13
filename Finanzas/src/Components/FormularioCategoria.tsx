// src/Components/FormularioCategoria.tsx - CORREGIDO
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

type TipoCategoria = 'ingreso' | 'gasto';

interface CategoriaData {
    idCategoria?: number | null;
    nombre: string;
    tipo: TipoCategoria;
}

interface FormularioCategoriaProps {
    onSubmit: (data: CategoriaData) => void;
    onCancel: () => void;
    initialData?: CategoriaData | null;
}

const FormularioCategoria: React.FC<FormularioCategoriaProps> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = React.useState<CategoriaData>({
        nombre: "",
        tipo: "ingreso",
    });

    React.useEffect(() => {
        if (initialData) {
            setFormData({
                idCategoria: initialData.idCategoria,
                nombre: initialData.nombre,
                tipo: initialData.tipo
            });
        } else {
            setFormData({ nombre: '', tipo: 'ingreso' });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        if (name) {
            setFormData(prev => ({ ...prev, [name]: value as string }));
        }
    };

    const handleSubmit = () => {
        if (!formData.nombre.trim()) {
            alert('Por favor, ingresa el nombre de la categoría');
            return;
        }
        onSubmit(formData);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Formulario de Categoría
                </Typography>

                <Stack spacing={3} sx={{ mt: 2 }}>
                    <TextField
                        name="nombre"
                        label="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        required
                    />

                    <FormControl fullWidth required>
                        <InputLabel id="tipo-label">Tipo</InputLabel>
                        <Select
                            labelId="tipo-label"
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            label="Tipo"
                        >
                            <MenuItem value="ingreso">Ingreso</MenuItem>
                            <MenuItem value="gasto">Gasto</MenuItem>
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            fullWidth
                        >
                            {initialData ? "Actualizar" : "Guardar"}
                        </Button>

                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={onCancel}
                            fullWidth
                        >
                            Cancelar
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
};

export default FormularioCategoria;