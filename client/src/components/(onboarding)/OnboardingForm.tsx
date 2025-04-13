import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Dumbbell,
  Weight,
  Clock,
  Calendar,
} from "lucide-react";
import OptionsStep from "./OptionsStep";
import male from '@/assets/onboarding/male.png'
import female from '@/assets/onboarding/female.png'

interface FormData {
  email: string;
  password: string;
  name: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  bodyFat: number;
  bodyType: string;
  injuries: string;
  motivation: String;
  trainingExperience: string;
  trainingDaysPerWeek: number;
  trainingDuration: number;
  waterIntake: number;
  sleepQuality: string;
  focusAreas: string[];
  bodySplit: string;
  fitnessGoal: string;
  weightGoal: number;
  bodyTypeGoal: string;
}

const OnboardingForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    gender: "",
    age: 0,
    height: 0,
    weight: 0,
    bodyFat: 0,
    bodyType: "",
    injuries: "",
    motivation: "",
    trainingExperience: "",
    trainingDaysPerWeek: 0,
    trainingDuration: 0,
    waterIntake: 0,
    sleepQuality: "",
    focusAreas: [],
    bodySplit: "",
    fitnessGoal: "",
    weightGoal: 0,
    bodyTypeGoal: "",
  });

  useEffect(() => {
    console.log("Form Data:", formData.gender);
  }, [formData]);

  const totalSteps = 10;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    nextStep();
  };

  // const handleCheckboxChange = (value: string, checked: boolean) => {
  //   setFormData((prev) => {
  //     if (checked) {
  //       return {
  //         ...prev,
  //         availableEquipment: [...prev.availableEquipment, value],
  //       };
  //     } else {
  //       return {
  //         ...prev,
  //         availableEquipment: prev.availableEquipment.filter(
  //           (item) => item !== value
  //         ),
  //       };
  //     }
  //   });
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);

    // Show success message
    toast.success(
      "Profile created successfully! Redirecting to subscription..."
    );

    // Redirect to subscription page
    setTimeout(() => {
      navigate("/subscription");
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OptionsStep
            title="Choose your gender"
            category="gender"
            values={[
              {
                label: "Male",
                image: male,
              },
              {
                label: "Female",
                image: female,
              },
            ]}
            selectedValue={formData.gender}
            handleSelectChange={handleSelectChange}
          />
        );
      case 2:
        return (
          <OptionsStep
            title="Pick your fitness level"
            category="fitnessLevel"
            values={[
              {
                label: "Beginner",
              },
              {
                label: "Intermediate",
              },
              {
                label: "Advanced",
              },
            ]}
            selectedValue={formData.trainingExperience}
            handleSelectChange={handleSelectChange}
          />
        );
      case 3:
        return (
          <OptionsStep
            title="Select your fitness goal"
            category="fitnessGoal"
            values={[
              {
                label: "Build Muscle",
              },
              {
                label: "Lose Weight",
              },
              {
                label: "Maintain Weight",
              },
            ]}
            selectedValue={formData.fitnessGoal}
            handleSelectChange={handleSelectChange}
          />
        );
      case 4:
        return (
          <OptionsStep
            title="Choose your weeky workout frequency"
            category="workoutFrequency"
            values={[
              {
                label: "3 days",
              },
              {
                label: "4 days",
              },
              {
                label: "5 days",
              },
              {
                label: "6 days",
              },
            ]}
            selectedValue={formData.trainingDaysPerWeek}
            handleSelectChange={handleSelectChange}
          />
        );
      case 5:
        return (
          <OptionsStep
            title="Select your workout duration"
            category="workoutDuration"
            values={[
              {
                label: "30 minutes",
              },
              {
                label: "45 minutes",
              },
              {
                label: "60 minutes",
              },
              {
                label: "90 minutes",
              },
            ]}
            selectedValue={formData.trainingDuration}
            handleSelectChange={handleSelectChange}
          />
        );
      case 6:
      //   case 1:
      //     return (
      //       <motion.div
      //         initial={{ opacity: 0, x: 20 }}
      //         animate={{ opacity: 1, x: 0 }}
      //         exit={{ opacity: 0, x: -20 }}
      //         className="space-y-6"
      //       >
      //         <CardTitle>Personal Information</CardTitle>
      //         <CardDescription>
      //           Let's start with some basic information about you.
      //         </CardDescription>

      //         <div className="grid grid-cols-2 gap-4">
      //           <div className="space-y-2">
      //             <Label htmlFor="firstName">First Name</Label>
      //             <Input
      //               id="firstName"
      //               name="firstName"
      //               value={formData.firstName}
      //               onChange={handleInputChange}
      //               placeholder="John"
      //               required
      //             />
      //           </div>

      //           <div className="space-y-2">
      //             <Label htmlFor="lastName">Last Name</Label>
      //             <Input
      //               id="lastName"
      //               name="lastName"
      //               value={formData.lastName}
      //               onChange={handleInputChange}
      //               placeholder="Doe"
      //               required
      //             />
      //           </div>
      //         </div>

      //         <div className="grid grid-cols-2 gap-4">
      //           <div className="space-y-2">
      //             <Label htmlFor="age">Age</Label>
      //             <Input
      //               id="age"
      //               name="age"
      //               type="number"
      //               value={formData.age}
      //               onChange={handleInputChange}
      //               placeholder="25"
      //               required
      //             />
      //           </div>

      //           <div className="space-y-2">
      //             <Label htmlFor="gender">Gender</Label>
      //             <Select
      //               value={formData.gender}
      //               onValueChange={(value) => handleSelectChange('gender', value)}
      //             >
      //               <SelectTrigger>
      //                 <SelectValue placeholder="Select gender" />
      //               </SelectTrigger>
      //               <SelectContent>
      //                 <SelectItem value="male">Male</SelectItem>
      //                 <SelectItem value="female">Female</SelectItem>
      //                 <SelectItem value="non_binary">Non-binary</SelectItem>
      //                 <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
      //               </SelectContent>
      //             </Select>
      //           </div>
      //         </div>

      //         <div className="grid grid-cols-2 gap-4">
      //           <div className="space-y-2">
      //             <Label htmlFor="height">Height (cm)</Label>
      //             <Input
      //               id="height"
      //               name="height"
      //               type="number"
      //               value={formData.height}
      //               onChange={handleInputChange}
      //               placeholder="175"
      //               required
      //             />
      //           </div>

      //           <div className="space-y-2">
      //             <Label htmlFor="weight">Weight (kg)</Label>
      //             <Input
      //               id="weight"
      //               name="weight"
      //               type="number"
      //               value={formData.weight}
      //               onChange={handleInputChange}
      //               placeholder="70"
      //               required
      //             />
      //           </div>
      //         </div>
      //       </motion.div>
      //     );

      //   case 2:
      //     return (
      //       <motion.div
      //         initial={{ opacity: 0, x: 20 }}
      //         animate={{ opacity: 1, x: 0 }}
      //         exit={{ opacity: 0, x: -20 }}
      //         className="space-y-6"
      //       >
      //         <CardTitle>Fitness Profile</CardTitle>
      //         <CardDescription>
      //           Tell us about your fitness experience and goals.
      //         </CardDescription>

      //         <div className="space-y-4">
      //           <Label>Current Fitness Level</Label>
      //           <RadioGroup
      //             value={formData.fitnessLevel}
      //             onValueChange={(value) => handleSelectChange('fitnessLevel', value)}
      //             className="flex flex-col space-y-2"
      //           >
      //             <div className="flex items-center space-x-2">
      //               <RadioGroupItem value="beginner" id="beginner" />
      //               <Label htmlFor="beginner">Beginner - New to working out</Label>
      //             </div>
      //             <div className="flex items-center space-x-2">
      //               <RadioGroupItem value="intermediate" id="intermediate" />
      //               <Label htmlFor="intermediate">Intermediate - Worked out for 6+ months</Label>
      //             </div>
      //             <div className="flex items-center space-x-2">
      //               <RadioGroupItem value="advanced" id="advanced" />
      //               <Label htmlFor="advanced">Advanced - Worked out for years</Label>
      //             </div>
      //           </RadioGroup>
      //         </div>

      //         <div className="space-y-4">
      //           <Label>Primary Fitness Goal</Label>
      //           <Tabs
      //             defaultValue={formData.fitnessGoal}
      //             onValueChange={(value) => handleSelectChange('fitnessGoal', value)}
      //             className="w-full"
      //           >
      //             <TabsList className="grid grid-cols-3 w-full">
      //               <TabsTrigger value="build_muscle">
      //                 <Dumbbell className="h-4 w-4 mr-2" />
      //                 Build Muscle
      //               </TabsTrigger>
      //               <TabsTrigger value="lose_weight">
      //                 <Weight className="h-4 w-4 mr-2" />
      //                 Lose Weight
      //               </TabsTrigger>
      //               <TabsTrigger value="improve_fitness">
      //                 <Dumbbell className="h-4 w-4 mr-2" />
      //                 Improve Fitness
      //               </TabsTrigger>
      //             </TabsList>
      //             <TabsContent value="build_muscle" className="p-4 bg-gray-50 rounded-md">
      //               Focus on progressive overload and muscle hypertrophy.
      //             </TabsContent>
      //             <TabsContent value="lose_weight" className="p-4 bg-gray-50 rounded-md">
      //               Emphasis on calorie deficit and metabolic conditioning.
      //             </TabsContent>
      //             <TabsContent value="improve_fitness" className="p-4 bg-gray-50 rounded-md">
      //               Balance of strength, endurance, and flexibility training.
      //             </TabsContent>
      //           </Tabs>
      //         </div>

      //         <div className="space-y-4">
      //           <Label>Years of Training Experience</Label>
      //           <div className="py-4">
      //             <Slider
      //               defaultValue={[formData.experienceLevel]}
      //               max={10}
      //               step={1}
      //               onValueChange={(value) => handleSelectChange('experienceLevel', value[0].toString())}
      //             />
      //             <div className="flex justify-between mt-2 text-sm text-gray-500">
      //               <span>0 years</span>
      //               <span>5 years</span>
      //               <span>10+ years</span>
      //             </div>
      //           </div>
      //         </div>
      //       </motion.div>
      //     );

      //   case 3:
      //     return (
      //       <motion.div
      //         initial={{ opacity: 0, x: 20 }}
      //         animate={{ opacity: 1, x: 0 }}
      //         exit={{ opacity: 0, x: -20 }}
      //         className="space-y-6"
      //       >
      //         <CardTitle>Workout Preferences</CardTitle>
      //         <CardDescription>
      //           Tell us how you'd like to structure your workouts.
      //         </CardDescription>

      //         <div className="space-y-4">
      //           <Label>Workouts per Week</Label>
      //           <div className="flex items-center space-x-4">
      //             <Select
      //               value={formData.workoutFrequency}
      //               onValueChange={(value) => handleSelectChange('workoutFrequency', value)}
      //             >
      //               <SelectTrigger className="w-full">
      //                 <SelectValue placeholder="Select days" />
      //               </SelectTrigger>
      //               <SelectContent>
      //                 <SelectItem value="2">2 days</SelectItem>
      //                 <SelectItem value="3">3 days</SelectItem>
      //                 <SelectItem value="4">4 days</SelectItem>
      //                 <SelectItem value="5">5 days</SelectItem>
      //                 <SelectItem value="6">6 days</SelectItem>
      //               </SelectContent>
      //             </Select>
      //             <Calendar className="h-5 w-5 text-gray-500" />
      //           </div>
      //         </div>

      //         <div className="space-y-4">
      //           <Label>Workout Duration (minutes)</Label>
      //           <div className="flex items-center space-x-4">
      //             <Select
      //               value={formData.workoutDuration}
      //               onValueChange={(value) => handleSelectChange('workoutDuration', value)}
      //             >
      //               <SelectTrigger className="w-full">
      //                 <SelectValue placeholder="Select duration" />
      //               </SelectTrigger>
      //               <SelectContent>
      //                 <SelectItem value="30">30 minutes</SelectItem>
      //                 <SelectItem value="45">45 minutes</SelectItem>
      //                 <SelectItem value="60">60 minutes</SelectItem>
      //                 <SelectItem value="90">90 minutes</SelectItem>
      //               </SelectContent>
      //             </Select>
      //             <Clock className="h-5 w-5 text-gray-500" />
      //           </div>
      //         </div>

      //         <div className="space-y-4">
      //           <Label>Available Equipment</Label>
      //           <div className="grid grid-cols-2 gap-2">
      //             <div className="flex items-center space-x-2">
      //               <Checkbox
      //                 id="eq-dumbbells"
      //                 checked={formData.availableEquipment.includes('dumbbells')}
      //                 onCheckedChange={(checked) => handleCheckboxChange('dumbbells', checked as boolean)}
      //               />
      //               <Label htmlFor="eq-dumbbells">Dumbbells</Label>
      //             </div>
      //             <div className="flex items-center space-x-2">
      //               <Checkbox
      //                 id="eq-barbell"
      //                 checked={formData.availableEquipment.includes('barbell')}
      //                 onCheckedChange={(checked) => handleCheckboxChange('barbell', checked as boolean)}
      //               />
      //               <Label htmlFor="eq-barbell">Barbell</Label>
      //             </div>
      //             <div className="flex items-center space-x-2">
      //               <Checkbox
      //                 id="eq-cables"
      //                 checked={formData.availableEquipment.includes('cables')}
      //                 onCheckedChange={(checked) => handleCheckboxChange('cables', checked as boolean)}
      //               />
      //               <Label htmlFor="eq-cables">Cable Machine</Label>
      //             </div>
      //             <div className="flex items-center space-x-2">
      //               <Checkbox
      //                 id="eq-machines"
      //                 checked={formData.availableEquipment.includes('machines')}
      //                 onCheckedChange={(checked) => handleCheckboxChange('machines', checked as boolean)}
      //               />
      //               <Label htmlFor="eq-machines">Weight Machines</Label>
      //             </div>
      //             <div className="flex items-center space-x-2">
      //               <Checkbox
      //                 id="eq-bands"
      //                 checked={formData.availableEquipment.includes('bands')}
      //                 onCheckedChange={(checked) => handleCheckboxChange('bands', checked as boolean)}
      //               />
      //               <Label htmlFor="eq-bands">Resistance Bands</Label>
      //             </div>
      //             <div className="flex items-center space-x-2">
      //               <Checkbox
      //                 id="eq-bodyweight"
      //                 checked={formData.availableEquipment.includes('bodyweight')}
      //                 onCheckedChange={(checked) => handleCheckboxChange('bodyweight', checked as boolean)}
      //               />
      //               <Label htmlFor="eq-bodyweight">Bodyweight Only</Label>
      //             </div>
      //           </div>
      //         </div>
      //       </motion.div>
      //     );

      //   case 4:
      //     return (
      //       <motion.div
      //         initial={{ opacity: 0, x: 20 }}
      //         animate={{ opacity: 1, x: 0 }}
      //         exit={{ opacity: 0, x: -20 }}
      //         className="space-y-6"
      //       >
      //         <CardTitle>Health Considerations</CardTitle>
      //         <CardDescription>
      //           Any health issues or preferences we should know about?
      //         </CardDescription>

      //         <div className="space-y-4">
      //           <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
      //           <Select
      //             value={formData.dietaryPreferences}
      //             onValueChange={(value) => handleSelectChange('dietaryPreferences', value)}
      //           >
      //             <SelectTrigger>
      //               <SelectValue placeholder="Select preference" />
      //             </SelectTrigger>
      //             <SelectContent>
      //               <SelectItem value="no_preference">No Specific Preference</SelectItem>
      //               <SelectItem value="vegetarian">Vegetarian</SelectItem>
      //               <SelectItem value="vegan">Vegan</SelectItem>
      //               <SelectItem value="keto">Keto</SelectItem>
      //               <SelectItem value="paleo">Paleo</SelectItem>
      //             </SelectContent>
      //           </Select>
      //         </div>

      //         <div className="space-y-2">
      //           <Label htmlFor="injuries">Injuries or Limitations</Label>
      //           <Input
      //             id="injuries"
      //             name="injuries"
      //             value={formData.injuries}
      //             onChange={handleInputChange}
      //             placeholder="E.g., Lower back issues, knee problems, etc."
      //           />
      //           <p className="text-sm text-gray-500">
      //             This helps us tailor workouts safely for your body.
      //           </p>
      //         </div>

      //         <div className="pt-6">
      //           <div className="bg-gym-blue/10 p-4 rounded-lg border border-gym-blue/30">
      //             <div className="flex gap-3">
      //               <CheckCircle className="text-gym-blue h-6 w-6 mt-0.5" />
      //               <div>
      //                 <h4 className="font-semibold text-gym-black">Ready to Generate Your Plan</h4>
      //                 <p className="text-sm text-gray-600">
      //                   Our AI will analyze your profile and create a personalized workout plan
      //                   tailored to your goals and preferences.
      //                 </p>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </motion.div>
      //     );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-20 px-44 bg-gray-100">
        <Card className="border-none bg-transparent flex-1 flex flex-col">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center text-gym-blue mb-2">
              BUILD YOUR PERSONALISED WORKOUT PLAN
            </h1>
            <p className="text-center text-gray-600">
              Answer a few questions to generate a smart monthly workout plan
              designed just for you.
            </p>
          </div>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-gym-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
          <CardContent className="flex-1 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <form onSubmit={handleSubmit}>{renderStep()}</form>
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            {currentStep < totalSteps ? null : (
              <Button
                type="submit"
                onClick={handleSubmit}
                className="bg-gym-blue hover:bg-gym-lightblue"
              >
                Complete Profile
              </Button>
            )}
          </CardFooter>
        </Card>
    </div>
  );
};

export default OnboardingForm;
