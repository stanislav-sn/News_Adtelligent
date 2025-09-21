import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

interface SignUpFormProps {
  changeForm: () => void;
}

const SignUpForm: FC<SignUpFormProps> = ({ changeForm }) => {
  const emailId = useId();
  const passwordId = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
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
              <div className="mb-4">
                <div className="flex items-center">
                  <Label htmlFor={passwordId} className="mb-1">
                    Password
                  </Label>
                </div>
                <Input id={passwordId} {...register('password')} type="password" required />
                <div className="h-5">
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>

              <div className="text-center mt-5 text-sm">
                Have an account?{' '}
                <button
                  type="button"
                  onClick={changeForm}
                  className="text-primary underline underline-offset-4 hover:no-underline"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
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

export default SignUpForm;
