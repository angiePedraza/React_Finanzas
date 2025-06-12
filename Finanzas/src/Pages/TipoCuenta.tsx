// src/Pages/TipoCuenta.tsx - NUEVA PÁGINA
import React from 'react';
import FormularioTipoCuenta from '../Components/FormularioTipoCuentas';
import CategoryIcon from '@mui/icons-material/Category';
import { TipoCuentaService } from '../Services/TipoCuentaService';
import type { TipoCuenta } from '../Types';
import {
    Box,
    Container,
    Paper,
    Stack,
    Typography,
    Alert,
    Grid,
    Card,
    CardContent,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
} from "@mui/material";
import { Edit, Delete, Add, AccountBalance } from '@mui/icons-material';

const TipoCuentaPage = () => {
    const [tiposCuenta, setTiposCuenta] = React.useState<TipoCuenta[]>([]);
    const [selectedTipo, setSelectedTipo] = React.useState<TipoCuenta | null>(null);
    const [showForm, setShowForm] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    React.useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        setLoading(true);
        try {
            const data = await TipoCuentaService.getAll();
            setTiposCuenta(data);
            setError('');
        } catch (error) {
            console.error('Error al cargar tipos de cuenta:', error);
            setError('Error al cargar los tipos de cuenta');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (data: TipoCuenta) => {
        setLoading(true);
        try {
            if (data.id) {
                await TipoCuentaService.update(data.id, data);
                setSuccess('Tipo de cuenta actualizado correctamente');
            } else {
                await TipoCuentaService.create(data);
                setSuccess('Tipo de cuenta creado correctamente');
            }
            await cargarDatos();
            setShowForm(false);
            setSelectedTipo(null);
            setError('');
        } catch (error: any) {
            console.error('Error al guardar tipo de cuenta:', error);
            setError(error.response?.data?.message || 'Error al guardar el tipo de cuenta');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (tipo: TipoCuenta) => {
        setSelectedTipo(tipo);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este tipo de cuenta?')) {
            return;
        }

        setLoading(true);
        try {
            await TipoCuentaService.delete(id);
            setSuccess('Tipo de cuenta eliminado correctamente');
            await cargarDatos();
            setError('');
        } catch (error: any) {
            console.error('Error al eliminar tipo de cuenta:', error);
            setError(error.response?.data?.message || 'Error al eliminar el tipo de cuenta');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedTipo(null);
        setError('');
        setSuccess('');
    };

    const handleNew = () => {
        setSelectedTipo(null);
        setShowForm(true);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 5, mb: 4 }}>
            {/* Header */}
            <Paper elevation={1} sx={{ p: 4, mb: 3, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <CategoryIcon sx={{ fontSize: 60 }} />
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Tipos de Cuenta
                            </Typography>
                            <Typography variant="subtitle1">
                                Gestiona los tipos de cuentas disponibles
                            </Typography>
                        </Box>
                    </Stack>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleNew}
                        sx={{ 
                            backgroundColor: 'rgba(255,255,255,0.2)', 
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                        }}
                    >
                        Nuevo Tipo
                    </Button>
                </Stack>
            </Paper>

            {/* Alertas */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                    {error}
                </Alert>
            )}
            
            {success && (
                <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
                    {success}
                </Alert>
            )}

            {/* Resumen */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Resumen
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ textAlign: 'center' }}>
                            <CardContent>
                                <Typography variant="h4" color="primary">
                                    {tiposCuenta.length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tipos de Cuenta Registrados
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ textAlign: 'center' }}>
                            <CardContent>
                                <AccountBalance sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                    Organiza tus cuentas por categorías
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            {/* Formulario */}
            {showForm && (
                <Paper elevation={3} sx={{ mb: 3 }}>
                    <FormularioTipoCuenta
                        initialData={selectedTipo}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                </Paper>
            )}

            {/* Lista de Tipos de Cuenta */}
            <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Tipos de Cuenta Disponibles
                </Typography>
                
                {tiposCuenta.length > 0 ? (
                    <List>
                        {tiposCuenta.map((tipo, index) => (
                            <React.Fragment key={tipo.id}>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6" component="div">
                                                {tipo.nombre}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2" color="text.secondary">
                                                ID: {tipo.id}
                                            </Typography>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton 
                                            edge="end" 
                                            onClick={() => handleEdit(tipo)}
                                            color="primary"
                                            sx={{ mr: 1 }}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton 
                                            edge="end" 
                                            onClick={() => handleDelete(tipo.id!)}
                                            color="error"
                                        >
                                            <Delete />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {index < tiposCuenta.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <CategoryIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            No hay tipos de cuenta registrados
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Crea el primer tipo de cuenta para comenzar a organizar tus finanzas
                        </Typography>
                        <Button variant="contained" onClick={handleNew}>
                            Crear Primer Tipo
                        </Button>
                    </Box>
                )}
            </Paper>

            {/* Información adicional */}
            <Paper elevation={1} sx={{ p: 3, mt: 3, backgroundColor: 'info.light', color: 'info.contrastText' }}>
                <Typography variant="h6" gutterBottom>
                    💡 Información
                </Typography>
                <Typography variant="body2">
                    Los tipos de cuenta te permiten categorizar tus cuentas financieras. 
                    Ejemplos comunes: Efectivo, Cuenta Bancaria, Tarjeta de Crédito, Ahorros, etc.
                </Typography>
            </Paper>
        </Container>
    );
};

export default TipoCuentaPage;