import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import Navbar from '../Navbar';
import Features from './Features';
import Articles from './Reviews';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">

      <Navbar handleGetStarted={handleGetStarted} handleLogin={handleLogin} />
      <Hero handleGetStarted={handleGetStarted} handleLogin={handleLogin} />
      <Features handleGetStarted={handleGetStarted}/>
      <Articles />

      <footer className="bg-gym-black text-white py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold">GymAI Planner</h2>
              <p className="text-gray-400 mt-2">Your AI-powered fitness companion</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 GymAI Planner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};



export default LandingPage;
