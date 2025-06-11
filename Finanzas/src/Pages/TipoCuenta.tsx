// src/Pages/Transacciones.tsx - CORREGIDO
import React from 'react';
import FormularioTransaccion from '../Components/FormularioTransaccion';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { TransaccionService } from '../Services/TransaccionService';
import type  { Transaccion, Categoria, Cuenta } from '../Types';
import {
    Box,
    Container,
    Paper,
    Stack,
    Typography,
    Alert,
} from "@mui/material";

const TransaccionesPage = () => {
    const [categorias, setCategorias] = React.useState<Categoria[]>([]);
    const [cuentas, setCuentas] = React.useState<Cuenta[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    React.useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        setLoading(true);
        try {
            const [categoriasData, cuentasData] = await Promise.all([
                TransaccionService.getCategorias(),
                TransaccionService.getCuentas()
            ]);
            setCategorias(categoriasData);
            setCuentas(cuentasData);
            setError('');
        } catch (error) {
            console.error('Error al cargar datos:', error);
            setError('Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (data: Transaccion) => {
        setLoading(true);
        try {
            await TransaccionService.create(data);
            setSuccess('Transacción registrada correctamente');
            setError('');
        } catch (error: any) {
            console.error('Error al guardar transacción:', error);
            setError(error.response?.data?.message || 'Error al guardar la transacción');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setError('');
        setSuccess('');
    };

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(amount);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 5, mb: 4 }}>
            {/* Header Simple */}
            <Paper elevation={1} sx={{ p: 4, mb: 3, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <AccountBalanceWalletIcon sx={{ fontSize: 60 }} />
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            Transacciones
                        </Typography>
                        <Typography variant="subtitle1">
                            Registra tus ingresos y gastos
                        </Typography>
                    </Box>
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

            {/* Formulario */}
            <Paper elevation={3}>
                <FormularioTransaccion
                    initialData={null}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    categorias={categorias}
                    cuentas={cuentas}
                />
            </Paper>
        </Container>
    );
};

export default TransaccionesPage;