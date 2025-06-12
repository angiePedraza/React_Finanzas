import { AppBar, Box, Button, Toolbar, Typography, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Menuicon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CategoryIcon from '@mui/icons-material/Category';
import ClassIcon from '@mui/icons-material/Class';
import HistoryIcon from '@mui/icons-material/History';
import { useState } from 'react';

const NavItems = [
  { text: 'Inicio', path: '/inicio', icon: <HomeIcon sx={{ color: '#fff' }} /> },
  { text: 'Registro Usuarios', path: '/RegistroU', icon: <PersonAddAltIcon sx={{ color: '#fff' }} /> },
  { text: 'Transacciones', path: '/Transacciones', icon: <AccountBalanceWalletIcon sx={{ color: '#fff' }} /> },
  { text: 'Cuentas', path: '/Cuenta', icon: <AccountBalanceIcon sx={{ color: '#fff' }} /> },
  { text: 'Tipos de Cuenta', path: '/TipoCuenta', icon: <CategoryIcon sx={{ color: '#fff' }} /> },
  { text: 'Categorías', path: '/Categoria', icon: <ClassIcon sx={{ color: '#fff' }} /> },
  { text: 'Historial', path: '/Historial', icon: <HistoryIcon sx={{ color: '#fff' }} /> },
];

const Navbar = () => {
const [mobileOpen, setMobileOpen] = useState(false);
const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
}

const drawer =(
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center',background:'#1e1e1e',height:'100%' }}>
        <Typography variant="h6" sx={{ my: 2,color:'#fff' }}>
            Sistema Financiero
        </Typography>
        <List>
            {NavItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                    <RouterLink to={item.path}
                    style={{
                        textDecoration: 'none',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#fff',
                        width:'100%'
                    }}
                    >
                        {item.icon}
                        <ListItemText primary={item.text} />
                    </RouterLink>
                </ListItem>
            ))
            }
        </List>
    </Box>
);

return(
    <Box sx={{ flexGrow:1}}>
        <AppBar sx={{width:'100%',height:80, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white"}}>
            <Toolbar>
                <IconButton color="inherit" onClick={handleDrawerToggle} edge="start" sx={{mr:2,display:{sm:'none'}}} >
                    <Menuicon/>
                </IconButton>
                <Typography variant='h5'component="div" sx={{flexGrow:1}}>Sistema Financiero</Typography>
                <Box sx={{display:{xs:'none', sm:'flex'},gap:2}}>
                    {
                        NavItems.map((item) =>(
                            <Button
                            key={item.text}
                            component={RouterLink}
                            to={item.path}
                            startIcon={item.icon}
                            size="small"
                            sx={{ 
                                textTransform:"none",
                                color:"#fff",
                                fontSize: '0.8rem',
                                minWidth: 'auto',
                                px: 1,
                                '&:hover':{backgroundColor:"rgba(255,255,255,0.1)"}
                            }}
                            >
                                {item.text}
                            </Button>
                        ))
                    }
                </Box>
            </Toolbar>
        </AppBar>
        {/* Menu para mobiles */}
        <Drawer
        anchor='left'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
            keepMounted:true,
        }}
        sx={{
            display:{xs:'block', sm:'none'},
            '& .MuiDrawer-paper':{
                boxSizing:'border-box',
                width:240,
                backgroundColor:'#1e1e1e',
                color: '#fff'
            }
        }}>
            {drawer}
        </Drawer>
        {/* espacio para el contenido */}
        <Toolbar/>
        </Box>
)
}
export default Navbar;