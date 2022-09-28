import {
  Alert,
  Box,
  Button,
  Fade,
  FormControl,
  FormGroup,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import PeopleIcon from '@mui/icons-material/People';
import { useForm } from 'react-hook-form';
import { Block } from '@/components/Block/Block';
import { ImageHeaderLayout } from '@/layouts/ImageHeaderLayout';
import { axios } from '@/lib/axios';

type FormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  content: string;
};

const ContactUs = () => {
  const {
    register,
    // setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(data => {
    axios
      .post('/api/guest/messages', {
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
        email: data.email,
        content: data.content,
      })
      .then(res =>
        setMessage({
          title: res.data.message,
          type: 'success',
        }),
      )
      .catch(error => {
        const errors = [];

        if (error.response.status === 500) {
          setMessage({
            title: error.response.data.message,
            type: 'error',
          });
        }

        if (error.response.status === 422) {
          if (error.response.data.errors.first_name) {
            error.response.data.errors.first_name.map((error: string) => {
              errors.push(error);
            });
          }

          if (error.response.data.errors.phone_number) {
            error.response.data.errors.phone_number.map((error: string) => {
              errors.push(error);
            });
          }

          setMessage({
            title: errors.join(' '),
            type: 'error',
          });
        }

        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
      })
      .finally(() => {});
  });

  const [message, setMessage] = useState<{ title: string; type: 'success' | 'error' }>();

  return (
    <ImageHeaderLayout title="Contact us - Countryside Kashmir" heading="Contact us">
      <Block>
        <Grid container spacing={2} sx={{ marginTop: 4 }}>
          {/* Left Side */}
          <Grid item sm={12} md={6}>
            <Typography variant="h5" fontWeight="bold" marginBottom={4}>
              Please Feel Free To Contact Us
            </Typography>
            <Stack marginBottom={4}>
              <Typography variant="h6" fontWeight="bold" color="warning.main">
                <LocationOnIcon />
                Head Office:
              </Typography>
              <Typography variant="body1">Gulmarg Road, Chandilora Tangmarg Baramulla</Typography>
              <Typography variant="body1">193402 Jammu and Kashmir - India</Typography>
            </Stack>
            <Stack marginBottom={4}>
              <Typography variant="h6" fontWeight="bold" color="warning.main">
                <LocationOnIcon />
                Branch Office:
              </Typography>
              <Typography variant="body1">
                33, Kazi Nazrul Islam Avenue, Hafiz Menstion (3rd Floor) kawran Bazar
              </Typography>
              <Typography variant="body1">Dhaka, Bangladesh</Typography>
              <Typography variant="body1">Contact : +8801700767245</Typography>
            </Stack>
            <Stack marginBottom={4}>
              <Typography variant="h6" fontWeight="bold" color="warning.main">
                <MailIcon />
                Email:
              </Typography>
              <Typography variant="body1">countrysidekashmir@gmail.com</Typography>
            </Stack>
            <Stack marginBottom={4}>
              <Typography variant="h6" fontWeight="bold" color="warning.main">
                <PhoneEnabledIcon />
                Phone:
              </Typography>
              <Typography variant="body1">+91-9596404872</Typography>
              <Typography variant="body1">+91-9596404875</Typography>
              <Typography variant="body1">+91-9419555772</Typography>
            </Stack>
            <Stack marginBottom={4}>
              <Typography variant="h6" fontWeight="bold" color="warning.main">
                <PeopleIcon />
                Social Media:
              </Typography>
              <Box display="flex" alignItems="center" marginTop={1}>
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
                <Link
                  marginLeft={1}
                  href="https://www.youtube.com/channel/UCxe23fscAkpQ2TOsnnKtkpQ">
                  <img width={30} src="https://countrysidekashmir.com/img/youtube.png" alt="" />
                </Link>
              </Box>
            </Stack>
          </Grid>

          {/* Left Side */}
          <Grid item sm={12} md={6}>
            <Typography variant="h5" fontWeight="bold" marginBottom={4}>
              Or Fill Out Our Contact Form
            </Typography>
            {/* Contact Form */}
            <form onSubmit={onSubmit}>
              <FormGroup row={true}>
                <FormControl color="warning">
                  <InputLabel htmlFor="first-name">First name</InputLabel>

                  <Input {...register('firstName', { required: true })} id="first-name" />

                  {errors.firstName?.type === 'required' && (
                    <FormHelperText error id="component-error-text">
                      First name is required.
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl sx={{ marginLeft: 2 }}>
                  <InputLabel htmlFor="last-name">Last name</InputLabel>

                  <Input {...register('lastName')} id="last-name" />
                </FormControl>
              </FormGroup>
              <FormGroup row={true} sx={{ marginTop: 4 }}>
                <FormControl color="warning">
                  <InputLabel htmlFor="phone-number">Phone number</InputLabel>

                  <Input {...register('phoneNumber', { required: true })} id="phone-number" />

                  {errors.phoneNumber?.type === 'required' && (
                    <FormHelperText error id="component-error-text">
                      Phone number is required.
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl sx={{ marginLeft: 2 }}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input {...register('email')} id="email" />
                </FormControl>
              </FormGroup>
              <FormGroup sx={{ marginTop: 4 }}>
                <FormControl color="warning" sx={{ width: '70%' }}>
                  <InputLabel htmlFor="email">Content</InputLabel>
                  <Input {...register('content')} id="content" multiline rows={3} />
                </FormControl>
              </FormGroup>
              <Button variant="outlined" color="warning" type="submit" sx={{ marginTop: 4 }}>
                Submit
              </Button>
            </form>
            {message && (
              <Fade in={true}>
                <Alert
                  sx={{ marginTop: 2 }}
                  onClose={() => setMessage(undefined)}
                  color={message.type}>
                  {message.title}
                </Alert>
              </Fade>
            )}
          </Grid>
        </Grid>
      </Block>
    </ImageHeaderLayout>
  );
};

export default ContactUs;
