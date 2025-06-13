// src/Pages/Categoria.tsx - CORREGIDO
import React from "react";
import FormularioCategoria from "../Components/FormularioCategoria";
import { AuthService } from "../Services/AuthService";
import {
    Box,
    Container,
    Paper,
    Stack,
    Typography,
    Divider,
} from "@mui/material";

type TipoCategoria = 'ingreso' | 'gasto';

interface CategoriaData {
    idCategoria?: number | null;
    nombre: string;
    tipo: TipoCategoria;
}

const Categoria = () => {
    const [categorias, setCategorias] = React.useState<CategoriaData[]>([]);
    const [selectedCategoria, setSelectedCategoria] = React.useState<CategoriaData | null>(null);

    React.useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const token = AuthService.getToken();
            const res = await fetch("http://localhost:8000/categorias", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            if (data.success) {
                setCategorias(data.data);
            } else {
                console.error("Error cargando categorías:", data.msg);
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
        }
    };

    const handleSubmit = async (categoria: CategoriaData) => {
        try {
            const token = AuthService.getToken();
            const method = categoria.idCategoria ? "PUT" : "POST";
            const url = "http://localhost:8000/categorias";
            
            const res = await fetch(url, {
                method,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(categoria),
            });
            const result = await res.json();

            if (result.success) {
                alert("Operación exitosa");
                setSelectedCategoria(null);
                cargarCategorias();
            } else {
                alert(result.msg || "Error en la operación");
            }
        } catch (error) {
            console.error("Error en el envío:", error);
            alert("Error al procesar la solicitud");
        }
    };

    const handleCancel = () => {
        setSelectedCategoria(null);
    };

    const handleEditar = (categoria: CategoriaData) => {
        setSelectedCategoria(categoria);
    };

    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        {selectedCategoria ? "Editar Categoría" : "Registrar Nueva Categoría"}
                    </Typography>

                    <FormularioCategoria
                        initialData={selectedCategoria}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                </Paper>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom>
                    Lista de Categorías
                </Typography>

                <Stack spacing={2}>
                    {categorias.length > 0 ? (
                        categorias.map((cat) => (
                            <Paper 
                                key={cat.idCategoria} 
                                sx={{ p: 2, cursor: "pointer" }} 
                                onClick={() => handleEditar(cat)}
                            >
                                <Typography><strong>Nombre:</strong> {cat.nombre}</Typography>
                                <Typography><strong>Tipo:</strong> {cat.tipo}</Typography>
                            </Paper>
                        ))
                    ) : (
                        <Paper sx={{ p: 3, textAlign: 'center' }}>
                            <Typography color="text.secondary">
                                No hay categorías registradas
                            </Typography>
                        </Paper>
                    )}
                </Stack>
            </Box>
        </Container>
    );
};

export default Categoria;