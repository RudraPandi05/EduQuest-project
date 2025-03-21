
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import QuestionCard, { Question } from '@/components/tests/QuestionCard';
import TestResults from '@/components/tests/TestResults';
import { Button } from '@/components/ui/button';
import { PlayCircle, Timer, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Sample full-length test questions
const fullLengthQuestions: Question[] = [
  // Physics questions
  {
    id: 1,
    question: "A body is thrown vertically upward with velocity u, the height reached by the body after time t is:",
    options: [
      "u·t - g·t²/2",
      "u·t + g·t²/2",
      "u·t - g·t",
      "u·t"
    ],
    correctOption: 0,
    explanation: "When a body is thrown upward, its height after time t is given by s = ut - (1/2)gt², where u is the initial velocity, g is acceleration due to gravity, and t is time."
  },
  {
    id: 2,
    question: "In a simple harmonic motion, the acceleration is:",
    options: [
      "Directly proportional to displacement",
      "Inversely proportional to displacement",
      "Directly proportional to velocity",
      "Inversely proportional to velocity"
    ],
    correctOption: 0,
    explanation: "In simple harmonic motion, acceleration is directly proportional to displacement from equilibrium position but in opposite direction: a = -ω²x where ω is angular frequency and x is displacement."
  },
  {
    id: 3,
    question: "The period of oscillation of a simple pendulum depends on:",
    options: [
      "Mass of the bob",
      "Length of the pendulum",
      "Initial displacement",
      "Material of the bob"
    ],
    correctOption: 1,
    explanation: "The period of a simple pendulum is T = 2π√(L/g), where L is the length and g is acceleration due to gravity. It doesn't depend on mass, initial displacement (for small angles), or material."
  },
  
  // Chemistry questions
  {
    id: 4,
    question: "Which of the following is a noble gas?",
    options: [
      "Oxygen",
      "Neon",
      "Nitrogen",
      "Hydrogen"
    ],
    correctOption: 1,
    explanation: "Neon (Ne) is a noble gas in Group 18 of the periodic table. Noble gases are characterized by having a full outer shell of electrons."
  },
  {
    id: 5,
    question: "The pH of a neutral solution at 25°C is:",
    options: [
      "0",
      "5",
      "7",
      "14"
    ],
    correctOption: 2,
    explanation: "At 25°C, a neutral solution has a pH of 7. Solutions with pH < 7 are acidic, and solutions with pH > 7 are basic."
  },
  {
    id: 6,
    question: "Which element has the highest electronegativity?",
    options: [
      "Oxygen",
      "Nitrogen",
      "Fluorine",
      "Chlorine"
    ],
    correctOption: 2,
    explanation: "Fluorine has the highest electronegativity (3.98 on the Pauling scale) of all elements, making it the most electronegative element in the periodic table."
  },
  
  // Math questions
  {
    id: 7,
    question: "What is the derivative of sin(x)?",
    options: [
      "cos(x)",
      "-cos(x)",
      "-sin(x)",
      "tan(x)"
    ],
    correctOption: 0,
    explanation: "The derivative of sin(x) with respect to x is cos(x)."
  },
  {
    id: 8,
    question: "What is the value of log₁₀(100)?",
    options: [
      "10",
      "1",
      "2",
      "100"
    ],
    correctOption: 2,
    explanation: "log₁₀(100) = log₁₀(10²) = 2, because 10² = 100."
  },
  {
    id: 9,
    question: "A line has a slope of 2 and passes through the point (1, 3). What is its y-intercept?",
    options: [
      "1",
      "3",
      "0",
      "2"
    ],
    correctOption: 0,
    explanation: "Using point-slope form: y - 3 = 2(x - 1), which simplifies to y = 2x + 1. The y-intercept is 1."
  },
  {
    id: 10,
    question: "What is the sum of the interior angles of a hexagon?",
    options: [
      "540°",
      "720°",
      "900°",
      "1080°"
    ],
    correctOption: 1,
    explanation: "For an n-sided polygon, the sum of interior angles is (n-2)×180°. For a hexagon (n=6), it's (6-2)×180° = 4×180° = 720°."
  },
  
  // Biology questions
  {
    id: 11,
    question: "Which organelle is known as the 'powerhouse of the cell'?",
    options: [
      "Nucleus",
      "Ribosome",
      "Mitochondrion",
      "Golgi apparatus"
    ],
    correctOption: 2,
    explanation: "Mitochondria are often called the 'powerhouse of the cell' because they generate most of the cell's supply of ATP (adenosine triphosphate), used as a source of chemical energy."
  },
  {
    id: 12,
    question: "Which of the following is NOT a nucleotide base found in DNA?",
    options: [
      "Adenine",
      "Uracil",
      "Guanine",
      "Cytosine"
    ],
    correctOption: 1,
    explanation: "Uracil is found in RNA, not DNA. DNA contains adenine, guanine, cytosine, and thymine."
  },
  
  // More questions to make 20 total
  {
    id: 13,
    question: "What is the most abundant gas in Earth's atmosphere?",
    options: [
      "Oxygen",
      "Carbon Dioxide",
      "Nitrogen",
      "Argon"
    ],
    correctOption: 2,
    explanation: "Nitrogen makes up about 78% of Earth's atmosphere, making it the most abundant gas."
  },
  {
    id: 14,
    question: "Which of the following is a vector quantity?",
    options: [
      "Mass",
      "Temperature",
      "Time",
      "Velocity"
    ],
    correctOption: 3,
    explanation: "Velocity is a vector quantity because it has both magnitude (speed) and direction. Mass, temperature, and time are scalar quantities."
  },
  {
    id: 15,
    question: "What is the chemical formula for glucose?",
    options: [
      "C₆H₁₂O₆",
      "C₂H₅OH",
      "CO₂",
      "H₂O"
    ],
    correctOption: 0,
    explanation: "The chemical formula for glucose, a simple sugar, is C₆H₁₂O₆."
  },
  {
    id: 16,
    question: "The quadratic formula for solving ax² + bx + c = 0 is:",
    options: [
      "x = (-b ± √(b² - 4ac))/2a",
      "x = (-b ± √(b² + 4ac))/2a",
      "x = (b ± √(b² - 4ac))/2a",
      "x = (b ± √(b² + 4ac))/2a"
    ],
    correctOption: 0,
    explanation: "The quadratic formula is x = (-b ± √(b² - 4ac))/2a, which gives the solutions to a quadratic equation ax² + bx + c = 0."
  },
  {
    id: 17,
    question: "What cellular process uses oxygen to convert glucose into energy?",
    options: [
      "Photosynthesis",
      "Fermentation",
      "Cellular respiration",
      "Osmosis"
    ],
    correctOption: 2,
    explanation: "Cellular respiration is the process by which cells break down glucose and use oxygen to produce energy (ATP), carbon dioxide, and water."
  },
  {
    id: 18,
    question: "Newton's Second Law of Motion states that:",
    options: [
      "Every action has an equal and opposite reaction",
      "Force equals mass times acceleration",
      "An object in motion stays in motion unless acted upon by an external force",
      "Energy can neither be created nor destroyed"
    ],
    correctOption: 1,
    explanation: "Newton's Second Law of Motion states that force equals mass times acceleration (F = ma)."
  },
  {
    id: 19,
    question: "The definite integral of a constant function f(x) = k over [a, b] is:",
    options: [
      "k(b - a)",
      "k/2(b² - a²)",
      "k(b² - a²)",
      "k"
    ],
    correctOption: 0,
    explanation: "The definite integral of a constant function f(x) = k over the interval [a, b] is k(b - a)."
  },
  {
    id: 20,
    question: "The Krebs cycle (citric acid cycle) takes place in which part of the cell?",
    options: [
      "Nucleus",
      "Endoplasmic reticulum",
      "Mitochondrial matrix",
      "Golgi apparatus"
    ],
    correctOption: 2,
    explanation: "The Krebs cycle (citric acid cycle) takes place in the matrix of the mitochondria, where it is a key part of cellular respiration."
  }
];

const FullLengthTest = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[key: number]: number}>({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timer, setTimer] = useState(30 * 60); // 30 minutes in seconds
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      toast.error('You must be logged in to take a full-length test');
      navigate('/login');
    }
    
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timerInterval, navigate]);
  
  const startTest = () => {
    setTestStarted(true);
    setUserAnswers({});
    setCorrectAnswers(0);
    setCurrentQuestionIndex(0);
    setTestCompleted(false);
    setTimer(30 * 60); // Reset timer to 30 minutes
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          // Time's up
          clearInterval(interval);
          endTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setTimerInterval(interval);
  };
  
  const endTest = () => {
    // Calculate score
    let correct = 0;
    Object.entries(userAnswers).forEach(([questionId, selectedOption]) => {
      const question = fullLengthQuestions.find(q => q.id === parseInt(questionId));
      if (question && selectedOption === question.correctOption) {
        correct++;
      }
    });
    
    setCorrectAnswers(correct);
    setTestCompleted(true);
    if (timerInterval) clearInterval(timerInterval);
    
    // If time ran out, show toast
    if (timer === 0) {
      toast.warning("Time's up! Your test has been submitted automatically.");
    }
  };
  
  const handleAnswer = (questionId: number, selectedOption: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < fullLengthQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      endTest();
    }
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / fullLengthQuestions.length) * 100;
  };
  
  const retakeTest = () => {
    setTestStarted(false);
    setTestCompleted(false);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {!testStarted ? (
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Full Length Exam</h1>
            <p className="text-lg text-muted-foreground mb-8">
              This comprehensive exam contains {fullLengthQuestions.length} questions covering various subjects and topics.
            </p>
            
            <Card className="glass-card p-6 mb-8">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  <span>Exam Information</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Number of questions: {fullLengthQuestions.length}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Time limit: 30 minutes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Mixed subjects: Physics, Chemistry, Math, Biology</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Results provided immediately after completion</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800 dark:text-amber-200">
                    <p className="font-medium">Important</p>
                    <p>Once started, the 30-minute timer cannot be paused. Please ensure you have sufficient time to complete the exam.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button onClick={startTest} size="lg" className="gap-2">
              <PlayCircle size={20} />
              Start Full Length Exam
            </Button>
          </div>
        ) : testCompleted ? (
          <TestResults 
            score={Math.round((correctAnswers / fullLengthQuestions.length) * 100)}
            totalQuestions={fullLengthQuestions.length}
            correctAnswers={correctAnswers}
            timeSpent={`${30 - Math.floor(timer/60)}m ${60 - (timer % 60)}s`}
            onRetake={retakeTest}
            questions={fullLengthQuestions}
            userAnswers={userAnswers}
          />
        ) : (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h1 className="text-2xl font-bold">Full Length Exam</h1>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-full bg-muted text-muted-foreground flex items-center gap-2">
                  <span className="text-sm">Question</span>
                  <span className="font-bold">{currentQuestionIndex + 1}/{fullLengthQuestions.length}</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  timer < 300 ? 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400' : 'bg-muted text-muted-foreground'
                }`}>
                  <Timer size={16} className={timer < 300 ? 'animate-pulse text-red-500' : ''} />
                  <span className="font-mono">{formatTime(timer)}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>
            
            <QuestionCard
              question={fullLengthQuestions[currentQuestionIndex]}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={fullLengthQuestions.length}
              onAnswer={handleAnswer}
              onNext={handleNext}
              selectedOption={userAnswers[fullLengthQuestions[currentQuestionIndex].id]}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FullLengthTest;
