import { SyntheticEvent, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { ApplicationLogo } from '@/components/ApplicationLogo/ApplicationLogo';
import { AuthCard } from '@/components/AuthCard/AuthCard';
import { AuthSessionStatus } from '@/components/AuthSessionStatus/AuthSessionStatus';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { InputError } from '@/components/InputError/InputError';
import { Label } from '@/components/Label/Label';
import { useAuth } from '@/hooks/auth';
import { GuestLayout } from '@/layouts/GuestLayout';

type ValidationErrors = {
  email?: any[];
  password?: any[];
  remember?: any[];
  length?: number;
};

const Login = () => {
  const router = useRouter();

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/admin/dashboard',
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (router.query.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(String(router.query.reset)));
    } else {
      setStatus(null);
    }
  }, [errors.length, router.query.reset]);

  const submitForm = async (event: SyntheticEvent) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    };

    login(loginData);
  };

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/">
            <a>
              <ApplicationLogo className="h-10" />
            </a>
          </Link>
        }>
        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status} />

        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={event => setEmail(event.target.value)}
              required
              autoFocus
            />

            <InputError messages={errors.email} className="mt-2" />
          </div>

          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full"
              onChange={event => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />

            <InputError messages={errors.password} className="mt-2" />
          </div>

          {/* Remember Me */}
          <div className="block mt-4">
            <label htmlFor="remember_me" className="inline-flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                name="remember"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={event => setShouldRemember(event.target.checked)}
              />

              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link href="/forgot-password">
              <a className="underline text-sm text-gray-600 hover:text-gray-900">
                Forgot your password?
              </a>
            </Link>

            <Button className="ml-3">Login</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default Login;
