import LoginForm from '@/components/signin';
import { GalleryVerticalEnd, Sprout } from 'lucide-react';

export default async function Signin() {
  return  (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Sprout className="size-4" />
          </div>
          {process.env.NEXT_PUBLIC_APP_NAME || 'Dashboard'}
        </a>
        <LoginForm />
      </div>
    </div>
);
}
