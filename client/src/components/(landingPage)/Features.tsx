import {
  DumbbellIcon,
  BrainCircuit,
  CalendarDays,
  Target,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollFadeIn } from "../ScrollFadeIn";

import featured1 from "@/assets/landing/NextRep-featured-1.png";
import featured2 from "@/assets/landing/NextRep-featured-2.png";

const Features = ({ handleGetStarted }: { handleGetStarted: () => void }) => {
  const features = [
    {
      title: "AI-Powered Workouts",
      icon: BrainCircuit,
      description:
        "Train smarter, not harder. Our AI crafts fully personalized workout plans that continuously evolve based on your goals, performance, recovery, and available equipment — giving you exactly what you need, when you need it.",
    },
    {
      title: "Smart Scheduling",
      icon: CalendarDays,
      description:
        "No more missed workouts. Our intelligent scheduling system adapts to your lifestyle — whether you’re training three days a week or twice a day — to optimize rest, recovery, and performance without disrupting your routine.",
    },
    {
      title: "Goal Tracking",
      icon: Target,
      description:
        "Define your fitness objectives and track your journey with precision. From weight loss and muscle gain to performance milestones, we’ll keep you motivated with real-time progress updates, insights, and visualized analytics.",
    },
    {
      title: "PR Tracking",
      icon: DumbbellIcon,
      description:
        "Smash your records and make every rep count. Automatically log and highlight your personal bests across lifts, runs, and movements — so you never lose sight of how far you’ve come.",
    },
    {
      title: "Gamified Experience",
      icon: Zap,
      description:
        "Fitness meets fun. Earn XP, unlock achievements, and level up your profile as you hit milestones. Compete with friends or push your personal limits in a system designed to make progress addictive.",
    },
    {
      title: "AI Assistant",
      icon: BrainCircuit,
      description:
        "Get 24/7 access to your virtual fitness coach. Whether you need a form check, training advice, or motivation on a tough day, your AI Assistant is always ready — with personalized responses, real-time support, and actionable feedback.",
    },
  ];

  const featureImages = [featured1, featured2];

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentImage, setCurrentImage] = useState(featureImages[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      const index = cardRefs.current.findIndex((ref) => {
        if (!ref) return false;
        const rect = ref.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = rect.bottom + window.scrollY;
        return scrollY >= top && scrollY <= bottom;
      });

      if (index !== -1) {
        const newImage = index < 3 ? featured1 : featured2;
        if (newImage !== currentImage) {
          setCurrentImage(newImage);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentImage]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white flex flex-row items-start md:gap-12 mb-10">
      {/* Feature Cards */}
      <div className="w-1/2 md:w-3/5">
        {features.map((feature, index) => (
          <div key={index} ref={(el) => (cardRefs.current[index] = el)}>
            <FeatureCard
              title={feature.title}
              icon={
                <feature.icon className="text-gym-blue h-6 w-6 md:h-12 md:w-12" />
              }
              description={feature.description}
              handleGetStarted={handleGetStarted}
            />
          </div>
        ))}
      </div>

      {/* Sticky Image (desktop) / Responsive Image (mobile) */}
      <ScrollFadeIn className="block w-3/5 sticky top-60 md:top-36 h-[400px] md:px-10 ">
        <img
          src={currentImage}
          loading="lazy"
          alt="Smart feature"
          className="w-full h-full md:px-16 object-cover"
        />
        
        <Button
          onClick={handleGetStarted}
          className="bg-gym-blue hover:bg-gym-lightblue text-white w-full px-6 py-4 mt-6 text-lg rounded-full md:hidden flex"
        >
          Get Your Plan Now
        </Button>
      </ScrollFadeIn>
    </section>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
  handleGetStarted,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  handleGetStarted: () => void;
}) => {
  return (
    <ScrollFadeIn className="md:border rounded-lg p-4 sm:p-6 md:p-10 md:shadow-md mb-6 bg-transparent md:bg-gray-100 md:hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-10 gap-4">
        <div>{icon}</div>
        <h3 className="text-md sm:text-2xl md:text-4xl font-semibold">
          {title}
        </h3>
      </div>
      <p className="text-gray-700 text-xs sm:text-base md:text-lg mb-6">
        {description}
      </p>
      <div className="flex justify-center sm:justify-start">
        <Button
          onClick={handleGetStarted}
          className="bg-gym-blue hover:bg-gym-lightblue text-white px-6 py-4 text-lg rounded-full md:flex hidden"
        >
          Get Your Plan Now
        </Button>
      </div>
    </ScrollFadeIn>
  );
};

export default Features;
