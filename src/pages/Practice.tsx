
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import QuestionCard, { Question } from '@/components/tests/QuestionCard';
import TestResults from '@/components/tests/TestResults';
import { Button } from '@/components/ui/button';
import { PlayCircle, Timer } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Sample questions for different subjects
const physicsQuestions: Question[] = [
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

const chemistryQuestions: Question[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    question: "What is the main component of natural gas?",
    options: [
      "Ethane",
      "Propane",
      "Methane",
      "Butane"
    ],
    correctOption: 2,
    explanation: "Methane (CH₄) is the main component of natural gas, typically making up 70-90% of natural gas."
  },
  {
    id: 4,
    question: "Which of the following is an example of a chemical change?",
    options: [
      "Melting of ice",
      "Dissolution of salt in water",
      "Rusting of iron",
      "Evaporation of water"
    ],
    correctOption: 2,
    explanation: "Rusting of iron (formation of iron oxide) is a chemical change because a new substance is formed. The other options involve physical changes where no new substances are created."
  },
  {
    id: 5,
    question: "Which element has the highest electronegativity?",
    options: [
      "Oxygen",
      "Nitrogen",
      "Fluorine",
      "Chlorine"
    ],
    correctOption: 2,
    explanation: "Fluorine has the highest electronegativity (3.98 on the Pauling scale) of all elements, making it the most electronegative element in the periodic table."
  }
];

const mathQuestions: Question[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
  {
    id: 5,
    question: "If P(A) = 0.3 and P(B) = 0.4, and A and B are independent events, what is P(A and B)?",
    options: [
      "0.7",
      "0.12",
      "0.1",
      "0.3"
    ],
    correctOption: 1,
    explanation: "For independent events, P(A and B) = P(A) × P(B) = 0.3 × 0.4 = 0.12."
  }
];

const biologyQuestions: Question[] = [
  {
    id: 1,
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
    id: 2,
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
  {
    id: 3,
    question: "What is the primary function of hemoglobin in the human body?",
    options: [
      "Digestion of fats",
      "Blood clotting",
      "Oxygen transport",
      "Nerve signal transmission"
    ],
    correctOption: 2,
    explanation: "Hemoglobin is the protein in red blood cells that carries oxygen from the lungs to the body's tissues and returns carbon dioxide from the tissues back to the lungs."
  },
  {
    id: 4,
    question: "Which of the following is an example of a vestigial structure in humans?",
    options: [
      "Appendix",
      "Heart",
      "Brain",
      "Lungs"
    ],
    correctOption: 0,
    explanation: "The appendix is considered a vestigial structure in humans, meaning it has lost most of its original function through evolution. It was once used for digesting cellulose in our herbivorous ancestors."
  },
  {
    id: 5,
    question: "Which of the following is the correct order of taxonomic classification from most inclusive to least inclusive?",
    options: [
      "Kingdom, Phylum, Class, Order, Family, Genus, Species",
      "Species, Genus, Family, Order, Class, Phylum, Kingdom",
      "Kingdom, Class, Phylum, Family, Order, Genus, Species",
      "Species, Family, Genus, Order, Phylum, Class, Kingdom"
    ],
    correctOption: 0,
    explanation: "The correct taxonomic hierarchy from most inclusive (largest) to least inclusive (smallest) is: Kingdom, Phylum, Class, Order, Family, Genus, Species."
  }
];

const subjects = [
  { id: "physics", name: "Physics", questions: physicsQuestions },
  { id: "chemistry", name: "Chemistry", questions: chemistryQuestions },
  { id: "math", name: "Mathematics", questions: mathQuestions },
  { id: "biology", name: "Biology", questions: biologyQuestions }
];

const Practice = () => {
  const [selectedSubject, setSelectedSubject] = useState("physics");
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[key: number]: number}>({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      toast.error('You must be logged in to take a practice test');
      navigate('/login');
    }
    
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timerInterval, navigate]);
  
  const currentSubject = subjects.find(s => s.id === selectedSubject) || subjects[0];
  const currentQuestions = currentSubject.questions;
  
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
    
    if (selectedOption === currentQuestions[currentQuestionIndex].correctOption) {
      setCorrectAnswers(prev => prev + 1);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
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
  
  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubject(subjectId);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {!testStarted ? (
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{currentSubject.name} Practice Test</h1>
            <p className="text-lg text-muted-foreground mb-8">
              This practice test contains {currentQuestions.length} {currentSubject.name.toLowerCase()} questions to test your knowledge.
            </p>
            
            <div className="glass-card p-6 mb-8">
              <div className="flex items-center gap-2 text-lg font-medium mb-4">
                <Timer className="h-5 w-5 text-primary" />
                <span>Test Information</span>
              </div>
              
              <div className="mb-6">
                <div className="text-sm font-medium mb-2">Select Subject:</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {subjects.map(subject => (
                    <Button
                      key={subject.id}
                      variant={subject.id === selectedSubject ? "default" : "outline"}
                      onClick={() => handleSubjectChange(subject.id)}
                      className="min-w-24"
                    >
                      {subject.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Number of questions: {currentQuestions.length}</span>
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
            score={Math.round((correctAnswers / currentQuestions.length) * 100)}
            totalQuestions={currentQuestions.length}
            correctAnswers={correctAnswers}
            timeSpent={formatTime(timer)}
            onRetake={retakeTest}
            questions={currentQuestions}
            userAnswers={userAnswers}
          />
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">{currentSubject.name} Practice Test</h1>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground">
                <Timer size={16} />
                <span>{formatTime(timer)}</span>
              </div>
            </div>
            
            <QuestionCard
              question={currentQuestions[currentQuestionIndex]}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={currentQuestions.length}
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
