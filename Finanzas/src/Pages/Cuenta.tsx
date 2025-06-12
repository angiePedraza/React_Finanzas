// src/Pages/Cuenta.tsx - CORREGIDO
import React from 'react';
import FormularioCuenta from '../Components/FormularioCuenta';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { CuentaService } from '../Services/CuentaService';
import { TipoCuentaService } from '../Services/TipoCuentaService';
import type { Cuenta, TipoCuenta } from '../Types';
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
} from "@mui/material";
import { Edit, Delete, Add } from '@mui/icons-material';

const CuentaPage = () => {
    const [cuentas, setCuentas] = React.useState<Cuenta[]>([]);
    const [tiposCuenta, setTiposCuenta] = React.useState<TipoCuenta[]>([]);
    const [selectedCuenta, setSelectedCuenta] = React.useState<Cuenta | null>(null);
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
            const [cuentasData, tiposCuentaData] = await Promise.all([
                CuentaService.getAll(),
                TipoCuentaService.getAll()
            ]);
            setCuentas(cuentasData);
            setTiposCuenta(tiposCuentaData);
            setError('');
        } catch (error) {
            console.error('Error al cargar datos:', error);
            setError('Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (data: Cuenta) => {
        setLoading(true);
        try {
            if (data.id) {
                await CuentaService.update(data.id, data);
                setSuccess('Cuenta actualizada correctamente');
            } else {
                await CuentaService.create(data);
                setSuccess('Cuenta creada correctamente');
            }
            await cargarDatos();
            setShowForm(false);
            setSelectedCuenta(null);
            setError('');
        } catch (error: any) {
            console.error('Error al guardar cuenta:', error);
            setError(error.response?.data?.message || 'Error al guardar la cuenta');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (cuenta: Cuenta) => {
        setSelectedCuenta(cuenta);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de que deseas eliminar esta cuenta?')) {
            return;
        }

        setLoading(true);
        try {
            await CuentaService.delete(id);
            setSuccess('Cuenta eliminada correctamente');
            await cargarDatos();
            setError('');
        } catch (error: any) {
            console.error('Error al eliminar cuenta:', error);
            setError(error.response?.data?.message || 'Error al eliminar la cuenta');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedCuenta(null);
        setError('');
        setSuccess('');
    };

    const handleNew = () => {
        setSelectedCuenta(null);
        setShowForm(true);
    };

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(amount);
    };

    const getTotalSaldo = () => {
        return cuentas.reduce((total, cuenta) => total + cuenta.saldo, 0);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 5, mb: 4 }}>
            {/* Header */}
            <Paper elevation={1} sx={{ p: 4, mb: 3, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <AccountBalanceIcon sx={{ fontSize: 60 }} />
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Gestión de Cuentas
                            </Typography>
                            <Typography variant="subtitle1">
                                Administra tus cuentas financieras
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
                        Nueva Cuenta
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
                    Resumen General
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ textAlign: 'center' }}>
                            <CardContent>
                                <Typography variant="h4" color="primary">
                                    {cuentas.length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total de Cuentas
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Card sx={{ textAlign: 'center' }}>
                            <CardContent>
                                <Typography variant="h4" color="success.main">
                                    {formatMoney(getTotalSaldo())}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Saldo Total
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            {/* Formulario */}
            {showForm && (
                <Paper elevation={3} sx={{ mb: 3 }}>
                    <FormularioCuenta
                        initialData={selectedCuenta}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        tiposCuenta={tiposCuenta}
                    />
                </Paper>
            )}

            {/* Lista de Cuentas */}
            <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Mis Cuentas
                </Typography>
                <Grid container spacing={3}>
                    {cuentas.map((cuenta) => (
                        <Grid item xs={12} md={6} lg={4} key={cuenta.id}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Stack spacing={2}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="start">
                                            <Box>
                                                <Typography variant="h6" component="div">
                                                    {cuenta.nombre}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {cuenta.tipo_cuenta_nombre}
                                                </Typography>
                                            </Box>
                                            <Stack direction="row" spacing={1}>
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleEdit(cuenta)}
                                                    color="primary"
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleDelete(cuenta.id!)}
                                                    color="error"
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Stack>
                                        </Stack>
                                        <Box>
                                            <Typography variant="h5" color="primary" fontWeight="bold">
                                                {formatMoney(cuenta.saldo)}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Saldo disponible
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {cuentas.length === 0 && !loading && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            No tienes cuentas registradas
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Crea tu primera cuenta para empezar a gestionar tus finanzas
                        </Typography>
                        <Button variant="contained" onClick={handleNew}>
                            Crear Primera Cuenta
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default CuentaPage;