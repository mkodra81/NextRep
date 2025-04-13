
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Calendar, 
  Dumbbell,
  Trophy,
  TrendingUp, 
  Crown,
  Flame,
  Clock,
  Award,
  BrainCircuit,
  Check
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from './UserNavbar';

// Sample data for charts
const progressData = [
  { day: 'Mon', weight: 120 },
  { day: 'Tue', weight: 122 },
  { day: 'Wed', weight: 125 },
  { day: 'Thu', weight: 123 },
  { day: 'Fri', weight: 128 },
  { day: 'Sat', weight: 130 },
  { day: 'Sun', weight: 135 },
];

const workoutHistory = [
  { date: 'April 9, 2025', name: 'Push Day A', duration: '48 min', completed: true },
  { date: 'April 7, 2025', name: 'Leg Day A', duration: '52 min', completed: true },
  { date: 'April 6, 2025', name: 'Pull Day A', duration: '45 min', completed: true },
  { date: 'April 4, 2025', name: 'Push Day B', duration: '50 min', completed: true },
  { date: 'April 3, 2025', name: 'Rest Day', duration: '-', completed: true },
];

const personalRecords = [
  { exercise: 'Bench Press', weight: '225 lbs', date: 'Mar 28, 2025' },
  { exercise: 'Squat', weight: '315 lbs', date: 'Apr 2, 2025' },
  { exercise: 'Deadlift', weight: '405 lbs', date: 'Mar 25, 2025' },
  { exercise: 'Shoulder Press', weight: '135 lbs', date: 'Apr 8, 2025' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in (in a real app this would be handled by an auth provider)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      
      <Navbar/>    
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              icon={<Flame className="h-8 w-8 text-orange-500" />} 
              title="Current Streak" 
              value="7 Days" 
              trend="+2 this week"
              positive
            />
            <StatCard 
              icon={<Award className="h-8 w-8 text-purple-500" />} 
              title="XP Level" 
              value="Level 8" 
              trend="241 XP to Level 9"
            />
            <StatCard 
              icon={<Crown className="h-8 w-8 text-yellow-500" />} 
              title="Achievements" 
              value="12 Badges" 
              trend="+3 this month"
              positive
            />
            <StatCard 
              icon={<Clock className="h-8 w-8 text-blue-500" />} 
              title="Workout Time" 
              value="17.5 Hours" 
              trend="This month"
            />
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="records">Records</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Today's Workout */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Today's Workout</CardTitle>
                    <CardDescription>Your push day workout for April 10th</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg">Push Day B</h3>
                        <Badge className="bg-gym-blue">Chest & Shoulders</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <WorkoutExercise 
                          name="Bench Press" 
                          sets="4 sets x 8-10 reps" 
                          weight="185 lbs" 
                        />
                        <WorkoutExercise 
                          name="Incline Dumbbell Press" 
                          sets="3 sets x 10-12 reps" 
                          weight="65 lbs" 
                        />
                        <WorkoutExercise 
                          name="Seated Shoulder Press" 
                          sets="3 sets x 10-12 reps" 
                          weight="50 lbs" 
                        />
                        <WorkoutExercise 
                          name="Lateral Raises" 
                          sets="3 sets x 12-15 reps" 
                          weight="20 lbs" 
                        />
                        <WorkoutExercise 
                          name="Tricep Pushdowns" 
                          sets="3 sets x 12-15 reps" 
                          weight="45 lbs" 
                        />
                      </div>
                      
                      <div className="flex justify-between pt-4">
                        <Button className="bg-gym-blue hover:bg-gym-lightblue">
                          Start Workout
                        </Button>
                        <Button variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Workout Streak */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Streak</CardTitle>
                    <CardDescription>Your consistency this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2 text-center mb-4">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                        <div key={day} className="flex flex-col items-center">
                          <div className="text-sm text-gray-500 mb-2">{day}</div>
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index <= 3 
                                ? 'bg-green-500 text-white' 
                                : index === 4 
                                  ? 'bg-gray-200 text-gray-400'
                                  : 'bg-gym-blue text-white'
                            }`}
                          >
                            {index <= 3 ? '✓' : index === 4 ? 'R' : '•'}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Week Progress</span>
                        <span className="font-medium">6/7 days</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      
                      <div className="bg-green-50 border border-green-100 rounded-md p-3 mt-4">
                        <div className="flex gap-2">
                          <Flame className="h-5 w-5 text-orange-500" />
                          <div>
                            <p className="text-sm font-medium">You're on fire!</p>
                            <p className="text-xs text-gray-500">Complete tomorrow's workout to maintain your streak</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Recent PRs */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Personal Records</CardTitle>
                    <CardDescription>Your latest achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {personalRecords.slice(0, 3).map((record, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                          <div>
                            <div className="font-medium">{record.exercise}</div>
                            <div className="text-sm text-gray-500">{record.date}</div>
                          </div>
                          <Badge variant="outline" className="font-bold text-green-600 border-green-200 bg-green-50">
                            {record.weight}
                          </Badge>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full mt-2">
                        View All Records
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Progress Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Bench Press Progress</CardTitle>
                    <CardDescription>Your progress over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={progressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="weight" 
                            stroke="#1EAEDB" 
                            strokeWidth={2}
                            dot={{ fill: '#1EAEDB', r: 4 }}
                            activeDot={{ r: 6 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="workouts">
              <Card>
                <CardHeader>
                  <CardTitle>Workout History</CardTitle>
                  <CardDescription>Your recent training sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workoutHistory.map((workout, index) => (
                      <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            workout.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {workout.completed ? <Check className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                          </div>
                          <div>
                            <div className="font-medium">{workout.name}</div>
                            <div className="text-sm text-gray-500">{workout.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{workout.duration}</div>
                          <div className="text-sm text-gray-500">
                            {workout.completed ? 'Completed' : 'Scheduled'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Training Progress</CardTitle>
                  <CardDescription>Track your improvement over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="weight" 
                          stroke="#1EAEDB" 
                          strokeWidth={2}
                          dot={{ fill: '#1EAEDB', r: 4 }}
                          activeDot={{ r: 6 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="records">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Records</CardTitle>
                  <CardDescription>Your best lifts and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {personalRecords.map((record, index) => (
                      <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0">
                        <div>
                          <div className="font-medium">{record.exercise}</div>
                          <div className="text-sm text-gray-500">{record.date}</div>
                        </div>
                        <Badge variant="outline" className="font-bold text-green-600 border-green-200 bg-green-50">
                          {record.weight}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* AI Insights */}
          <Card className="mb-6 border-gym-blue border bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <BrainCircuit className="mr-2 h-5 w-5 text-gym-blue" />
                AI Training Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Based on your recent workouts and progress, our AI suggests:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold mb-2 text-gym-blue">Increase Bench Press Weight</h4>
                    <p className="text-sm text-gray-600">
                      You've been consistently hitting your rep targets. Try increasing by 5lbs next session.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold mb-2 text-gym-blue">Focus on Shoulder Mobility</h4>
                    <p className="text-sm text-gray-600">
                      Adding 5 minutes of shoulder mobility work before pressing exercises could improve performance.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold mb-2 text-gym-blue">Recovery Optimization</h4>
                    <p className="text-sm text-gray-600">
                      Your recovery metrics suggest increasing protein intake by 15-20g on training days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Gamification Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <AchievementBadge 
                    name="Early Bird" 
                    icon="🌅" 
                    unlocked
                  />
                  <AchievementBadge 
                    name="Iron Pumper" 
                    icon="💪" 
                    unlocked
                  />
                  <AchievementBadge 
                    name="Consistent" 
                    icon="📅" 
                    unlocked
                  />
                  <AchievementBadge 
                    name="Beast Mode" 
                    icon="🔥" 
                    unlocked
                  />
                  <AchievementBadge 
                    name="PR King" 
                    icon="👑" 
                    unlocked
                  />
                  <AchievementBadge 
                    name="Marathon" 
                    icon="🏃" 
                  />
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Badges
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5 text-purple-500" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-end mb-1">
                    <div>
                      <div className="font-bold text-xl">Level 8</div>
                      <div className="text-sm text-gray-500">Fitness Enthusiast</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">759 / 1000 XP</div>
                    </div>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Weekly Workouts</span>
                    <span>+120 XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New PR - Bench Press</span>
                    <span>+50 XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>7-Day Streak</span>
                    <span>+70 XP</span>
                  </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-100 rounded-md p-3 mt-4">
                  <div className="flex gap-2">
                    <Trophy className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium">Next Reward at Level 9</p>
                      <p className="text-xs text-gray-500">Custom workout template unlocks</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  Upcoming Workouts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border-l-4 border-gym-blue pl-3 pb-3">
                    <div className="font-semibold">Tomorrow - April 11</div>
                    <div className="text-sm font-medium">Leg Day A</div>
                    <div className="text-xs text-gray-500">Squats, Lunges, Leg Press</div>
                  </div>
                  
                  <div className="border-l-4 border-gray-200 pl-3 pb-3">
                    <div className="font-semibold">Saturday - April 12</div>
                    <div className="text-sm font-medium">Pull Day A</div>
                    <div className="text-xs text-gray-500">Deadlifts, Rows, Pull-ups</div>
                  </div>
                  
                  <div className="border-l-4 border-gray-200 pl-3">
                    <div className="font-semibold">Sunday - April 13</div>
                    <div className="text-sm font-medium">Rest Day</div>
                    <div className="text-xs text-gray-500">Recovery & Mobility Work</div>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-gym-blue hover:bg-gym-lightblue">
                  View Full Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, title, value, trend, positive = false }: { 
  icon: React.ReactNode; 
  title: string; 
  value: string;
  trend: string;
  positive?: boolean;
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-500">{title}</h3>
          {icon}
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{value}</div>
          <div className={`text-sm flex items-center ${positive ? 'text-green-500' : 'text-gray-500'}`}>
            {positive && <TrendingUp className="h-4 w-4 mr-1" />}
            {trend}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const WorkoutExercise = ({ name, sets, weight }: { name: string; sets: string; weight: string }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
      <div className="flex items-center">
        <Dumbbell className="h-4 w-4 text-gray-400 mr-3" />
        <span className="font-medium">{name}</span>
      </div>
      <div className="text-right">
        <div className="text-sm text-gray-600">{sets}</div>
        <div className="text-sm font-medium">{weight}</div>
      </div>
    </div>
  );
};

const AchievementBadge = ({ name, icon, unlocked = false }: { name: string; icon: string; unlocked?: boolean }) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
        unlocked ? 'bg-yellow-100' : 'bg-gray-100 text-gray-400'
      }`}>
        {icon}
      </div>
      <div className="text-xs text-center mt-1">{name}</div>
    </div>
  );
};

export default Dashboard;
