import { motion } from "framer-motion";
import { ScrollFadeIn } from "../ScrollFadeIn";
import { Star } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      name: "alexx453",
      review:
        "NextRep has totally upgraded how I train. The workouts feel like they're made just for me, and I'm finally seeing steady progress without getting overwhelmed.",
      rating: 5,
      date: "2025-03-15",
    },
    {
      name: "sarahh_24",
      review:
        "The personalized plans fit perfectly into my schedule. I never thought an AI trainer could be this helpful. It keeps me accountable and progressing.",
      rating: 4,
      date: "2025-03-28",
    },
    {
      name: "james_b",
      review:
        "Being able to track my performance each week is super motivating. The progress graphs and PR logs make it feel like a real athlete’s dashboard.",
      rating: 5,
      date: "2025-04-01",
    },
    {
      name: "Mike Johnson",
      review:
        "I’ve tried a bunch of apps, but this one actually keeps me consistent. The progress tracking and weekly insights make a huge difference.",
      rating: 5,
      date: "2025-04-10",
    },
  ];

  return (
    <section className="min-h-screen text-white flex flex-col items-start justify-start md:p-20 py-10 px-2 bg-gray-100">
      <h2 className="text-xl md:text-4xl font-bold mb-4 md:mb-10 pl-3 md:pl-0 text-gym-blue">
        What Our Users Say
      </h2>
      <p className="text-md md:text-xl mb-8 max-w-3xl pl-3 md:pl-0 text-gray-700">
        Hear from our satisfied users who have transformed their fitness journey
        with GymAI Planner.
      </p>
      <div className="w-full flex flex-col md:flex-row">
        <ScrollFadeIn
          className="w-full flex flex-row flex-wrap gap-6"
          staggerChildren={0.3}
        >
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-around flex-1 md:min-w-[250px] h-80"
            >
              <StarRating rating={r.rating} />
              <p className="text-gray-700 text-xs md:text-sm">{r.review}</p>
              <div>
                <h3 className="text-sm md:text-lg font-semibold text-gray-900">
                  {r.name}
                </h3>
                <p className="text-gray-500 mt-1 text-2xs md:text-xs">{r.date}</p>
              </div>
            </motion.div>
          ))}
        </ScrollFadeIn>
      </div>
    </section>
  );
};

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <Star
        key={i}
        className={`w-4 md:w-5 h-4 md:h-5 mb-3 md:mb-6 ${
          i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    );
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default Reviews;
