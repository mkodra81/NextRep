
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Zap, Crown, Flame, Shield, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = (plan: string) => {
    // In a real application, this would redirect to a payment processor
    console.log(`Subscribing to ${plan} plan (${billingCycle})`);
    toast.success(`Successfully subscribed to ${plan} plan!`);
    
    // Store subscription info in localStorage (in a real app, this would come from your backend)
    localStorage.setItem('subscriptionPlan', plan);
    localStorage.setItem('userLoggedIn', 'true');
    
    // Redirect to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gym-black mb-4">
          Choose Your Fitness Journey
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Select the plan that fits your goals and unlock your full potential with AI-powered training.
        </p>
        
        <Tabs 
          defaultValue="monthly" 
          className="w-full" 
          onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-64 grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <Badge variant="secondary" className="ml-2 bg-gym-blue/20 text-gym-blue">
                  Save 20%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="monthly" className="mt-0">
            <div className="grid md:grid-cols-3 gap-8">
              <PricingCard
                title="Basic"
                price={9.99}
                description="Perfect for beginners starting their fitness journey"
                features={[
                  "AI Workout Plan Generator",
                  "Progress Tracking",
                  "Basic Workout Library",
                  "Web Access"
                ]}
                limitations={[
                  "No AI Chat Assistant",
                  "Limited Exercise Variety",
                  "No Custom Workouts"
                ]}
                icon={<Flame className="h-6 w-6" />}
                buttonText="Start Basic Plan"
                onClick={() => handleSubscribe('basic')}
              />
              
              <PricingCard
                title="Pro"
                price={19.99}
                description="Most popular choice for serious fitness enthusiasts"
                features={[
                  "Everything in Basic",
                  "Advanced AI Workout Plans",
                  "AI Chat Assistant",
                  "Nutrition Recommendations",
                  "Custom Workout Creator",
                  "Full Exercise Library"
                ]}
                limitations={[
                  "Limited Analytics"
                ]}
                icon={<Crown className="h-6 w-6" />}
                buttonText="Get Pro Access"
                onClick={() => handleSubscribe('pro')}
                highlighted={true}
              />
              
              <PricingCard
                title="Elite"
                price={29.99}
                description="Ultimate package for maximum results and features"
                features={[
                  "Everything in Pro",
                  "Priority Support",
                  "Advanced Analytics",
                  "Body Composition Analysis",
                  "Recovery Optimization",
                  "Technique Analysis",
                  "Unlimited Custom Plans"
                ]}
                limitations={[]}
                icon={<Shield className="h-6 w-6" />}
                buttonText="Go Elite"
                onClick={() => handleSubscribe('elite')}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="yearly" className="mt-0">
            <div className="grid md:grid-cols-3 gap-8">
              <PricingCard
                title="Basic"
                price={95.88}
                priceDetails="$7.99/mo billed annually"
                description="Perfect for beginners starting their fitness journey"
                features={[
                  "AI Workout Plan Generator",
                  "Progress Tracking",
                  "Basic Workout Library",
                  "Web Access"
                ]}
                limitations={[
                  "No AI Chat Assistant",
                  "Limited Exercise Variety",
                  "No Custom Workouts"
                ]}
                icon={<Flame className="h-6 w-6" />}
                buttonText="Start Basic Plan"
                onClick={() => handleSubscribe('basic-yearly')}
              />
              
              <PricingCard
                title="Pro"
                price={191.88}
                priceDetails="$15.99/mo billed annually"
                description="Most popular choice for serious fitness enthusiasts"
                features={[
                  "Everything in Basic",
                  "Advanced AI Workout Plans",
                  "AI Chat Assistant",
                  "Nutrition Recommendations",
                  "Custom Workout Creator",
                  "Full Exercise Library"
                ]}
                limitations={[
                  "Limited Analytics"
                ]}
                icon={<Crown className="h-6 w-6" />}
                buttonText="Get Pro Access"
                onClick={() => handleSubscribe('pro-yearly')}
                highlighted={true}
              />
              
              <PricingCard
                title="Elite"
                price={287.88}
                priceDetails="$23.99/mo billed annually"
                description="Ultimate package for maximum results and features"
                features={[
                  "Everything in Pro",
                  "Priority Support",
                  "Advanced Analytics",
                  "Body Composition Analysis",
                  "Recovery Optimization",
                  "Technique Analysis",
                  "Unlimited Custom Plans"
                ]}
                limitations={[]}
                icon={<Shield className="h-6 w-6" />}
                buttonText="Go Elite"
                onClick={() => handleSubscribe('elite-yearly')}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 max-w-2xl mx-auto">
            All plans come with a 14-day money-back guarantee. No contracts, cancel anytime.
            Need help choosing? <a href="#" className="text-gym-blue underline">Contact our team</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

interface PricingCardProps {
  title: string;
  price: number;
  priceDetails?: string;
  description: string;
  features: string[];
  limitations: string[];
  icon: React.ReactNode;
  buttonText: string;
  onClick: () => void;
  highlighted?: boolean;
}

const PricingCard = ({
  title,
  price,
  priceDetails,
  description,
  features,
  limitations,
  icon,
  buttonText,
  onClick,
  highlighted = false,
}: PricingCardProps) => {
  return (
    <Card className={`h-full border ${highlighted ? 'border-gym-blue shadow-lg shadow-gym-blue/10 relative' : 'border-gray-200'}`}>
      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <Badge className="bg-gym-blue text-white px-3 py-1">
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto ${highlighted ? 'bg-gym-blue text-white' : 'bg-gray-100 text-gym-black'}`}>
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-center">{title}</CardTitle>
        <div className="text-center">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-gray-500 ml-1">/month</span>
        </div>
        {priceDetails && (
          <p className="text-sm text-gray-500 text-center">{priceDetails}</p>
        )}
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <p className="font-medium mb-2">What's included:</p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {limitations.length > 0 && (
          <div>
            <p className="font-medium mb-2">Limitations:</p>
            <ul className="space-y-2">
              {limitations.map((limitation, index) => (
                <li key={index} className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                  <span className="text-sm text-gray-600">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={onClick} 
          className={`w-full ${highlighted ? 'bg-gym-blue hover:bg-gym-lightblue' : 'bg-white border-2 border-gym-blue text-gym-blue hover:bg-gym-blue/10'}`}
        >
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPage;
