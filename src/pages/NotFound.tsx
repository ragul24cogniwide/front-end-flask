
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Balloon from '@/components/Balloon';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-celebration-pink/20 via-celebration-blue/10 to-celebration-purple/20 relative overflow-hidden">
      {/* Background balloons */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <Balloon 
            key={i} 
            color={['celebration-pink', 'celebration-yellow', 'celebration-blue', 'celebration-purple', 'celebration-green'][i % 5]} 
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 60}%`,
              animationDelay: `${i * 0.5}s`
            }} 
          />
        ))}
      </div>

      <div className="text-center bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold mb-4 text-celebration-pink">Oops! 404</h1>
        <p className="text-xl text-gray-700 mb-6">Looks like this page floated away</p>
        <Link to="/">
          <Button className="bg-celebration-purple hover:bg-celebration-purple/90">
            Back to Celebration
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
