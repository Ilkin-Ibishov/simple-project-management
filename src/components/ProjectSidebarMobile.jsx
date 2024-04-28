import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const ProjectSidebarMobile = ({projects, onStartNewProject, selectedProjectId, onSelectProject}, props) => {
    const navItems = projects.map(project=>{return project.title})
    console.log(navItems);
    const { window } = props;
    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
            YOUR PROJECTS
            </Typography>
            <Divider />
            <List>
                <div><Button onClick={onStartNewProject}> + Add project</Button></div>
                {projects.map((item) => {
                    let cssClasses = ' w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800'
                    if(item.id === selectedProjectId){
                        cssClasses += ' bg-stone-800 text-stone-200'
                    }else{
                        cssClasses += ' text-stone-400'
                    }
                    return(
                        <ListItem onClick={()=>onSelectProject(item.id)} className={cssClasses} key={item.id} disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                        )
                } )}
            </List>
        </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;



  return (<Box sx={{ display: 'flex' }}>
    <AppBar component="nav" sx={{backgroundColor: 'rgb(28 25 23)'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
            <p>YOUR PROJECTS</p>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            YOUR PROJECTS
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    <nav>
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>
  </nav>
  </Box>
  )
}
