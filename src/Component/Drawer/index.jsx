import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import routes from '../../routes.js';
import { Link, Route, Switch } from 'react-router-dom';
import './Drawer.css';

const drawerWidth = 160;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
  },
  appBar: {
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },

  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth,
    background: '#f5f5f5 0% 0% no-repeat padding-box',
    opacity: 0.9,
    boxShadow: '3px 0px 10px #00000029',
    border: 0,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

export default function PersistentDrawerLeft(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, 'app-bar-background')}
      >
        <Toolbar>
          <Typography className={'app-bar-app-name'} variant='h6' noWrap>
            Digi<span className={'bold-app-name'}>Mov</span>
          </Typography>

          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={clsx(classes.menuButton, 'app-bar-button')}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <List>
            {routes
              .filter((route) => route.isShowOnDrawer)
              .map((route) => (
                <Link
                  className={'router-link'}
                  to={route.path}
                  onClick={handleDrawerToggle}
                  key={route.name}
                >
                  <ListItem button>{route.description}</ListItem>
                </Link>
              ))}
          </List>
        </Drawer>
      </nav>

      <main className={classes.content}>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              component={route.component}
              exact
            />
          ))}
        </Switch>
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
