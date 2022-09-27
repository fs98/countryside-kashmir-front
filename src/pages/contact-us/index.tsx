import {
  Alert,
  Button,
  Fade,
  FormControl,
  FormGroup,
  Grid,
  Input,
  InputLabel,
} from '@mui/material';
import { SyntheticEvent, useRef, useState } from 'react';
import { Block } from '@/components/Block/Block';
import { ImageHeaderLayout } from '@/layouts/ImageHeaderLayout';
import { axios } from '@/lib/axios';

export const ContactUs = () => {
  const [message, setMessage] = useState<{ title: string; type: 'success' | 'error' }>();

  const firstNameRef = useRef<HTMLInputElement>();
  const lastNameRef = useRef<HTMLInputElement>();
  const phoneNumberRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const contentRef = useRef<HTMLInputElement>();

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const email = emailRef.current.value;
    const content = contentRef.current.value;

    axios
      .post('/api/guest/messages', {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email,
        content: content,
      })
      .then(res =>
        setMessage({
          title: res.data.message,
          type: 'success',
        }),
      )
      .catch(error => {
        const errors = [];

        // Get first_name errors
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

        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
      })
      .finally(() => {
        firstNameRef.current.value = '';
        lastNameRef.current.value = '';
        phoneNumberRef.current.value = '';
        emailRef.current.value = '';
        contentRef.current.value = '';
      });
  };

  return (
    <ImageHeaderLayout title="Contact us - Countryside Kashmir" heading="Contact us">
      <Block title="Contact Us">
        {message && (
          <Fade in={true}>
            <Alert onClose={() => setMessage(undefined)} color={message.type}>
              {message.title}
            </Alert>
          </Fade>
        )}
        <Grid container spacing={2} sx={{ marginTop: 4 }}>
          {/* Left Side */}
          <Grid item md={6}>
            {/* Contact Form */}
            <form onSubmit={submitHandler}>
              <FormGroup row={true}>
                <FormControl color="warning">
                  <InputLabel htmlFor="first-name">First name</InputLabel>
                  <Input id="first-name" inputRef={firstNameRef} />
                </FormControl>
                <FormControl sx={{ marginLeft: 2 }}>
                  <InputLabel htmlFor="last-name">Last name</InputLabel>
                  <Input id="last-name" inputRef={lastNameRef} />
                </FormControl>
              </FormGroup>
              <FormGroup row={true} sx={{ marginTop: 4 }}>
                <FormControl color="warning">
                  <InputLabel htmlFor="phone-number">Phone number</InputLabel>
                  <Input id="phone-number" inputRef={phoneNumberRef} />
                </FormControl>
                <FormControl sx={{ marginLeft: 2 }}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" inputRef={emailRef} />
                </FormControl>
              </FormGroup>
              <FormGroup sx={{ marginTop: 4 }}>
                <FormControl color="warning" sx={{ width: '70%' }}>
                  <InputLabel htmlFor="email">Content</InputLabel>
                  <Input id="content" multiline rows={3} inputRef={contentRef} />
                </FormControl>
              </FormGroup>
              <Button variant="outlined" color="warning" type="submit" sx={{ marginTop: 4 }}>
                Submit
              </Button>
            </form>
          </Grid>

          {/* Right Side */}
          <Grid item md={6}>
            second side
          </Grid>
        </Grid>
      </Block>
    </ImageHeaderLayout>
  );
};

export default ContactUs;
