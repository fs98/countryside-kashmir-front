import { useState } from 'react';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import {
  Alert,
  Box,
  Button,
  Fade,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import { fromPairs } from 'lodash';
import { useForm } from 'react-hook-form';

import { Block } from '@/components/Block/Block';
import { contactUsFormFields } from '@/forms/contactFieldsData';
import { ImageHeaderLayout } from '@/layouts/ImageHeaderLayout';
import { axios } from '@/lib/axios';
import { Message } from '@/types/message';

export type FormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  content: string;
};

const SOCIAL_NETWORKS = [
  {
    link:
      'https://www.tripadvisor.in/Attraction_Review-g297623-d15557712-Reviews-Countryside_Kashmir_Tour_Travel-Srinagar_Srinagar_District_Kashmir_Jammu_and_Kas.html',
    image: {
      url: 'https://countrysidekashmir.com/img/tripadvisor.png',
      alt: 'Trip Advisor Social Media Photo',
    },
  },
  {
    link: 'https://www.fLinkcebook.com/countrysidekashmir',
    image: {
      url: 'https://countrysidekashmir.com/img/facebook.png',
      alt: 'Facebook Social Media Photo',
    },
  },
  {
    link: 'https://www.instagram.com/countrysidekashmir/',
    image: {
      url: 'https://countrysidekashmir.com/img/instagram.png',
      alt: 'Instagram Social Media Photo',
    },
  },
  {
    link:
      'https://www.google.com/maps/place/Countryside+Kashmir+Tour+%26+Travel/@34.0690528,74.4500511,15z/data=!4m5!3m4!1s0x0:0x8ce50dbaaad9ca86!8m2!3d34.0690528!4d74.4500511?shorturl=1',
    image: {
      url: 'https://countrysidekashmir.com/img/google_map.png',
      alt: 'Google Maps Logo',
    },
  },
  {
    link: 'https://www.youtube.com/channel/UCxe23fscAkpQ2TOsnnKtkpQ',
    image: {
      url: 'https://countrysidekashmir.com/img/youtube.png',
      alt: 'YouTube Channel Logo',
    },
  },
];

const ContactUs = (): JSX.Element => {
  const {
    register,
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
        if (error.response.status === 500) {
          setMessage({
            title: error.response.data.message,
            type: 'error',
          });
        }

        if (error.response.status === 422) {
          setMessage({
            title: error.response.data.message,
            type: 'error',
          });
        }

        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
      });
  });

  const [message, setMessage] = useState<Message>();

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

              <Box display="flex" alignItems="center" marginTop={1} gap={1}>
                {SOCIAL_NETWORKS.map((network, i) => (
                  <Link key={i} href={network.link}>
                    <img width={30} src={network.image.url} alt="" />
                  </Link>
                ))}
              </Box>
            </Stack>
          </Grid>

          {/* Right Side */}
          <Grid item sm={12} md={6}>
            <Typography variant="h5" fontWeight="bold" marginBottom={4}>
              Or Fill Out Our Contact Form
            </Typography>

            {/* Contact Form */}
            <form onSubmit={onSubmit}>
              <Stack spacing={2}>
                {contactUsFormFields.map(({ id, label, type, rules }) => {
                  const errorHelperText =
                    errors?.[id]?.type && rules.find(err => err.name === errors[id].type);

                  return (
                    <FormControl key={id} fullWidth={true} color="warning">
                      <InputLabel htmlFor={id} {...(type === 'date' && { shrink: true })}>
                        {label}
                      </InputLabel>

                      <Input
                        {...register(id, fromPairs(rules.map(rule => [rule.name, rule.value])))}
                        id={id}
                        type={type}
                      />

                      {errorHelperText?.text && (
                        <FormHelperText error id="component-error-text">
                          {errorHelperText.text}
                        </FormHelperText>
                      )}
                    </FormControl>
                  );
                })}

                <Button variant="outlined" color="warning" type="submit" sx={{ marginTop: 4 }}>
                  Submit
                </Button>
              </Stack>
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
