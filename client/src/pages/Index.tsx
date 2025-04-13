
import { useNavigate } from 'react-router-dom';
import LandingPage from '../components/(landingPage)/LandingPage';

const Index = () => {
  const navigate = useNavigate();
  
  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  
  // If logged in, redirect to dashboard
  if (isLoggedIn) {
    navigate('/dashboard');
    return null;
  }
  
  return <LandingPage />;
};

export default Index;
