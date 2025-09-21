import { GalleryVerticalEnd } from 'lucide-react';
import { type FC, useState } from 'react';

import SignInForm from '@/components/SignIn-form';
import SignUpForm from '@/components/SignUp-form';

const AuthPage: FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggle = () => setIsSignUp((prevIsSignUp) => !prevIsSignUp);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <span>News App</span>
        </div>
        {isSignUp ? (
          <SignUpForm changeForm={handleToggle} />
        ) : (
          <SignInForm changeForm={handleToggle} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
