import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      <span className="ml-2 text-lg text-foreground">Loading...</span>
    </div>
  );
};

export default Loader;
