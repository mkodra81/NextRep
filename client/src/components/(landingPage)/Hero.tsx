import { useInView } from "@/hooks/useInView";
import { Button } from "@/components/ui/button";
import { ScrollFadeIn } from "@/components/ScrollFadeIn";

const Hero = ({ handleGetStarted, handleLogin }) => {

  return (
    <section className="min-h-screen text-white flex flex-col items-center justify-center py-20 px-4 md:px-6 lg:px-8 bg-fixed md:bg-[url('@/assets/landing/nextrep-hero.jpeg')] bg-[url('@/assets/landing/nextrep-hero-mobile.png')] bg-cover bg-center">
      <div className="absolute inset-0 md:bg-gradient-to-l md:from-[#1e1d1d] md:from-60% md:opacity-95 md:to=[#222222] md:to-100%">
        <ScrollFadeIn
          className="container h-screen mx-auto md:text-right flex flex-col md:items-end justify-between md:pr-12 relative z-10 pt-40 pb-12"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-10">
              Transform Your Fitness Journey with <br />
              <span className="text-gym-blue"> AI-Powered</span> Guidance
            </h1>
            <p className="text-xl md:text-xl mb-8 max-w-3xl">
              Personalized workout plans, progress tracking, <br /> and
              real-time recommendations tailored to your fitness goals.
            </p>
          </div>
          <div className="flex flex-col gap-4 content-end">
            <Button
              onClick={handleGetStarted}
              className="bg-gym-blue hover:bg-gym-lightblue text-white px-8 py-6 text-lg rounded-full"
            >
              Get Your Plan Now
            </Button>
            <Button
              onClick={handleLogin}
              variant="outline"
              className="border-white text-gym-black hover:bg-white/10 px-8 py-6 text-lg rounded-full"
            >
              Login
            </Button>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
};

export default Hero;
