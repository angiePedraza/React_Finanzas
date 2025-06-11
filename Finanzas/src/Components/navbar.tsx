import { AppBar, Box, Button, Toolbar, Typography, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Menuicon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useState } from 'react';


const NavItems = [
  { text: 'Inicio', path: '/inicio', icon: <HomeIcon sx={{ color: '#fff' }} /> },
  { text: 'RegistroUsuarios', path: '/RegistroU', icon: <PersonAddAltIcon sx={{ color: '#fff' }} /> },
];


const Navbar = () => {
const [mobileOpen, setMobileOpen] = useState(false);
const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
}

const drawer =(
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center',background:'#1e1e1e',height:'100%' }}>
        <Typography variant="h6" sx={{ my: 2,color:'#fff' }}>
            Usuarios
        </Typography>
        <List>
            {NavItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                    <RouterLink to={item.path}
                    style={{
                        textDecoration: 'none',
                        padding: 'irem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',color: '#fff',width:'100%'
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
    <Box sx={{ flexGrow:10}}>
        <AppBar sx={{width:'100%',height:80, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white"}}>
            <Toolbar>
                <IconButton color="inherit" onClick={handleDrawerToggle} edge="start" sx={{mr:100,display:{sm:'none'}}} >
                    <Menuicon/>
                </IconButton>
                <Typography variant='h5'component="div" sx={{flexGrow:1}}>Usuarios</Typography>
                <Box sx={{display:{xs:'none', sm:'flex'},gap:7}}>
                    {
                        NavItems.map((item) =>(
                            <Button
                            key={item.text}
                            component={RouterLink}
                            to={item.path}
                            startIcon={item.icon}
                            sx={{ textTransform:"none",color:"#fff",
                                '&:hover':{backgroundColor:"#333"}}}
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