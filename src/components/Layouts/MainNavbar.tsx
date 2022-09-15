import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { AppBarProps, Avatar, Link } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const pages = [
  'Home',
  'About Us',
  'Destinations',
  'Packages',
  'Things To do',
  'Blog',
  'Gallery',
  'Contact Us',
];

const MainNavbar: React.FC<AppBarProps> = ({ position, color }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position={position} elevation={0} color={color}>
      <Container maxWidth="xl">
        <Toolbar>
          <Box
            display={{
              xs: 'none',
              md: 'flex',
            }}>
            <PhoneIcon htmlColor="white" />
            <Typography marginLeft={1} textAlign="center" color="white">
              +91-9596404872 / 75
            </Typography>

            <EmailIcon
              htmlColor="white"
              sx={{
                ml: 3,
              }}
            />
            <Link
              sx={{
                ml: 1,
                textDecoration: 'none',
                color: 'white',
              }}
              href="mailto: countrysidekashmir@gmail.com">
              countrysidekashmir@gmail.com
            </Link>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            marginLeft={{
              ml: 'auto',
            }}>
            <Link href="https://www.tripadvisor.in/Attraction_Review-g297623-d15557712-Reviews-Countryside_Kashmir_Tour_Travel-Srinagar_Srinagar_District_Kashmir_Jammu_and_Kas.html">
              <img width={30} src="https://countrysidekashmir.com/img/tripadvisor.png" alt="" />
            </Link>
            <Link marginLeft={1} href="https://www.fLinkcebook.com/countrysidekashmir">
              <img width={30} src="https://countrysidekashmir.com/img/facebook.png" alt="" />
            </Link>
            <Link marginLeft={1} href="https://www.instagram.com/countrysidekashmir/">
              <img width={30} src="https://countrysidekashmir.com/img/instagram.png" alt="" />
            </Link>
            <Link
              marginLeft={1}
              href="https://www.google.com/maps/place/Countryside+Kashmir+Tour+%26+Travel/@34.0690528,74.4500511,15z/data=!4m5!3m4!1s0x0:0x8ce50dbaaad9ca86!8m2!3d34.0690528!4d74.4500511?shorturl=1">
              <img width={30} src="https://countrysidekashmir.com/img/google_map.png" alt="" />
            </Link>
            <Link marginLeft={1} href="https://www.youtube.com/channel/UCxe23fscAkpQ2TOsnnKtkpQ">
              <img width={30} src="https://countrysidekashmir.com/img/youtube.png" alt="" />
            </Link>
          </Box>
        </Toolbar>
      </Container>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            display={{
              xs: 'none',
              md: 'flex',
            }}>
            <img
              width={120}
              className="mr-1 bg-slate-50 p-2 rounded-xl"
              src="https://countrysidekashmir.com/img/inline-logo.png"
              alt="logo"
            />
          </Box>

          <Box
            flexGrow={1}
            display={{
              xs: 'flex',
              md: 'none',
            }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  xs: 'block',
                  md: 'none',
                },
              }}>
              {pages.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            display={{
              xs: 'flex',
              md: 'none',
            }}
            marginRight={2}>
            <img
              width={120}
              className="mr-1 bg-slate-50 p-2 rounded-xl"
              src="https://countrysidekashmir.com/img/inline-logo.png"
              alt="logo"
            />
          </Box>
          <Box
            display={{
              xs: 'none',
              md: 'flex',
            }}
            flexGrow={1}>
            {pages.map(page => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}>
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainNavbar;
