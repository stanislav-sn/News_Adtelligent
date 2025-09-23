import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TEST_USER = {
  email: 'test@test.com',
  password: '123456',
};

const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .max(50, 'Email must be 50 characters or less')
    .email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(40, 'Password must be 40 characters or less'),
});

type FormData = z.infer<typeof signInSchema>;

interface SignInFormProps {
  changeForm: () => void;
}

const SignInForm: FC<SignInFormProps> = ({ changeForm }) => {
  const emailId = useId();
  const passwordId = useId();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  });

  const checkUser = (email: string, password: string) => {
    return email === TEST_USER.email && password === TEST_USER.password;
  };

  const onSubmit = (data: FormData) => {
    if (checkUser(data.email, data.password)) {
      localStorage.setItem('isAuth', 'true');
      navigate('/');
    } else {
      setError('password', {
        type: 'manual',
        message: 'Wrong email or password',
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <p className="text-sm text-muted-foreground">Login with your account</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Button variant="outline" className="w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 mr-2"
              >
                <title>Google Logo</title>
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Login with Google
            </Button>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <Label className="mb-1" htmlFor={emailId}>
                    Email
                  </Label>
                  <Input
                    id={emailId}
                    {...register('email')}
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                  <div className="h-5">
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <Label htmlFor={passwordId}>Password</Label>
                    <button
                      type="button"
                      onClick={() => {
                        /* Handle forgot password */
                      }}
                      className="ml-auto text-sm underline-offset-4 hover:underline text-left"
                    >
                      Forgot your password?
                    </button>
                  </div>
                  <Input id={passwordId} {...register('password')} type="password" required />
                  <div className="h-5">
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={changeForm}
                    className="text-primary underline underline-offset-4"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs">
        By clicking continue, you agree to our{' '}
        <button
          type="button"
          onClick={() => {
            /* Handle terms of service */
          }}
          className="text-primary underline underline-offset-4 hover:no-underline"
        >
          Terms of Service
        </button>{' '}
        and{' '}
        <button
          type="button"
          onClick={() => {
            /* Handle privacy policy */
          }}
          className="text-primary underline underline-offset-4 hover:no-underline"
        >
          Privacy Policy
        </button>
        .
      </div>
    </div>
  );
};

export default SignInForm;
