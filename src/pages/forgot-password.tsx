import ApplicationLogo from '@/components/ApplicationLogo/ApplicationLogo';
import AuthCard from '@/components/AuthCard/AuthCard';
import AuthSessionStatus from '@/components/AuthSessionStatus/AuthSessionStatus';
import Button from '@/components/Button/Button';
import { GuestLayout } from '@/layouts/GuestLayout';
import Input from '@/components/Input/Input';
import InputError from '@/components/InputError/InputError';
import Label from '@/components/Label/Label';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import { useState } from 'react';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth({ middleware: 'guest' });

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{
    email?: any[];
  }>({});
  const [status, setStatus] = useState(null);

  const submitForm = event => {
    event.preventDefault();

    forgotPassword({ email, setErrors, setStatus });
  };

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/">
            <a>
              <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
            </a>
          </Link>
        }>
        <div className="mb-4 text-sm text-gray-600">
          Forgot your password? No problem. Just let us know your email address and we will email
          you a password reset link that will allow you to choose a new one.
        </div>

        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status} />

        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={email}
              className="block mt-1 w-full"
              onChange={event => setEmail(event.target.value)}
              required
              autoFocus
            />

            <InputError messages={errors.email} className="mt-2" />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button>Email Password Reset Link</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default ForgotPassword;
