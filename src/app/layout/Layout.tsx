import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen bg-muted">
      <main className="container mx-auto flex w-full flex-col items-center justify-center px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
