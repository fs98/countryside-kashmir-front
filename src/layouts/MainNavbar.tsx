import * as React from 'react';

import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import { AppBarProps, Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { ApplicationLogo } from '@/components/ApplicationLogo/ApplicationLogo';

const pages = [
  { name: 'Home', url: '/' },
  { name: 'About Us', url: '/about-us' },
  { name: 'Destinations', url: '/destinations' },
  { name: 'Packages', url: '/packages' },
  { name: 'Things to do', url: '/activities' },
  { name: 'Blog', url: '/blogs' },
  { name: 'Gallery', url: '/gallery' },
  { name: 'Contact Us', url: '/contact-us' },
];

export const MainNavbar: React.FC<AppBarProps> = ({ position, color }) => {
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

          <Box display="flex" alignItems="center" marginLeft="auto">
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
            <ApplicationLogo className="mr-1 bg-slate-50 p-2 rounded-xl w-28 h-auto" />
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
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Link sx={{ textDecoration: 'none' }} href={page.url}>
                    <Typography textAlign="center" color="text.primary">
                      {page.name}
                    </Typography>
                  </Link>
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
            <ApplicationLogo className="mr-1 bg-slate-50 p-2 rounded-xl w-28 h-auto" />
          </Box>
          <Box
            display={{
              xs: 'none',
              md: 'flex',
            }}
            flexGrow={1}>
            {pages.map((page, i) => (
              <Link key={i} sx={{ textDecoration: 'none' }} href={page.url}>
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                  }}>
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
