
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import QuestionCard, { Question } from '@/components/tests/QuestionCard';
import TestResults from '@/components/tests/TestResults';
import { Button } from '@/components/ui/button';
import { PlayCircle, Timer } from 'lucide-react';

// Sample questions for demo
const sampleQuestions: Question[] = [
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
  {
    id: 4,
    question: "Which of the following is a correct statement of Newton's First Law of Motion?",
    options: [
      "Force equals mass times acceleration",
      "For every action, there is an equal and opposite reaction",
      "A body continues in its state of rest or uniform motion unless acted upon by an external force",
      "The rate of change of momentum is proportional to the applied force"
    ],
    correctOption: 2,
    explanation: "Newton's First Law (Law of Inertia) states that an object remains at rest or in uniform motion unless acted upon by an external force."
  },
  {
    id: 5,
    question: "The SI unit of electric potential is:",
    options: [
      "Watt",
      "Volt",
      "Joule",
      "Coulomb"
    ],
    correctOption: 1,
    explanation: "The SI unit of electric potential is the volt (V). It is defined as the potential difference between two points where 1 joule of work is done to move 1 coulomb of charge."
  }
];

const Practice = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[key: number]: number}>({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timerInterval]);
  
  const startTest = () => {
    setTestStarted(true);
    setUserAnswers({});
    setCorrectAnswers(0);
    setCurrentQuestionIndex(0);
    setTestCompleted(false);
    setTimer(0);
    
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    
    setTimerInterval(interval);
  };
  
  const handleAnswer = (questionId: number, selectedOption: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
    
    if (selectedOption === sampleQuestions[currentQuestionIndex].correctOption) {
      setCorrectAnswers(prev => prev + 1);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setTestCompleted(true);
      if (timerInterval) clearInterval(timerInterval);
    }
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
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
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Physics Practice Test</h1>
            <p className="text-lg text-muted-foreground mb-8">
              This practice test contains 5 physics questions to test your knowledge on mechanics and electromagnetism.
            </p>
            
            <div className="glass-card p-6 mb-8">
              <div className="flex items-center gap-2 text-lg font-medium mb-4">
                <Timer className="h-5 w-5 text-primary" />
                <span>Test Information</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Number of questions: 5</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Estimated time: 5-10 minutes</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>No time limit</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Immediate feedback on answers</span>
                </li>
              </ul>
            </div>
            
            <Button onClick={startTest} size="lg" className="gap-2">
              <PlayCircle size={20} />
              Start Practice Test
            </Button>
          </div>
        ) : testCompleted ? (
          <TestResults 
            score={Math.round((correctAnswers / sampleQuestions.length) * 100)}
            totalQuestions={sampleQuestions.length}
            correctAnswers={correctAnswers}
            timeSpent={formatTime(timer)}
            onRetake={retakeTest}
          />
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Physics Practice Test</h1>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground">
                <Timer size={16} />
                <span>{formatTime(timer)}</span>
              </div>
            </div>
            
            <QuestionCard
              question={sampleQuestions[currentQuestionIndex]}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={sampleQuestions.length}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Practice;
