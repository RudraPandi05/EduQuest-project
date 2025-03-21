
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Atom, 
  Calculator, 
  Brain, 
  ArrowRight, 
  Trophy, 
  Clock, 
  Puzzle, 
  Lightbulb,
  PlayCircle,
  Gamepad,
  ChevronRight
} from 'lucide-react';

const GameCard = ({ 
  title, 
  description, 
  icon, 
  difficulty, 
  playTime, 
  topic, 
  onPlay 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  difficulty: 'easy' | 'medium' | 'hard'; 
  playTime: string; 
  topic: string; 
  onPlay: () => void; 
}) => {
  const difficultyColor = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500"
  };
  
  return (
    <Card className="glass-card hover-scale">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            {icon}
          </div>
          <Badge className={difficultyColor[difficulty]}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{playTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Lightbulb size={14} />
            <span>{topic}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onPlay} className="w-full">
          <PlayCircle size={16} className="mr-2" /> Play Game
        </Button>
      </CardFooter>
    </Card>
  );
};

// Simple Periodic Table Game component
const PeriodicTableGame = () => {
  const [score, setScore] = useState(0);
  const [currentElement, setCurrentElement] = useState({ symbol: 'H', name: 'Hydrogen', atomic: 1 });
  const [userAnswer, setUserAnswer] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  const elements = [
    { symbol: 'H', name: 'Hydrogen', atomic: 1 },
    { symbol: 'He', name: 'Helium', atomic: 2 },
    { symbol: 'Li', name: 'Lithium', atomic: 3 },
    { symbol: 'Be', name: 'Beryllium', atomic: 4 },
    { symbol: 'B', name: 'Boron', atomic: 5 },
    { symbol: 'C', name: 'Carbon', atomic: 6 },
    { symbol: 'N', name: 'Nitrogen', atomic: 7 },
    { symbol: 'O', name: 'Oxygen', atomic: 8 },
    { symbol: 'F', name: 'Fluorine', atomic: 9 },
    { symbol: 'Ne', name: 'Neon', atomic: 10 },
  ];
  
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    getRandomElement();
    setFeedback('');
  };
  
  const getRandomElement = () => {
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    setCurrentElement(randomElement);
    setUserAnswer('');
  };
  
  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === currentElement.name.toLowerCase()) {
      setScore(score + 10);
      setFeedback('Correct! +10 points');
      setTimeout(() => {
        getRandomElement();
        setFeedback('');
      }, 1500);
    } else {
      setFeedback(`Incorrect. The answer is ${currentElement.name}`);
      setTimeout(() => {
        getRandomElement();
        setFeedback('');
      }, 2000);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      {!gameStarted ? (
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold">Periodic Table Explorer</h3>
          <p className="text-muted-foreground">
            Test your knowledge of chemical elements! Name the elements from their symbols.
          </p>
          <Button size="lg" onClick={startGame}>Start Game</Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Element Symbol:</h3>
            <div className="text-lg font-bold">Score: {score}</div>
          </div>
          
          <div className="w-32 h-32 mx-auto rounded-lg bg-primary/20 border-2 border-primary flex items-center justify-center">
            <span className="text-5xl font-bold">{currentElement.symbol}</span>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Element Name:</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter element name"
              />
            </div>
            
            {feedback && (
              <div className={`p-2 rounded text-center ${feedback.includes('Correct') ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}`}>
                {feedback}
              </div>
            )}
            
            <div className="flex gap-2">
              <Button onClick={checkAnswer} className="flex-1">Check Answer</Button>
              <Button variant="outline" onClick={() => setGameStarted(false)}>End Game</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Math Puzzle Game component
const MathPuzzleGame = () => {
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState({ question: '5 + 7', answer: 12 });
  const [userAnswer, setUserAnswer] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  const generateProblem = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer;
    
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 50);
        num2 = Math.floor(Math.random() * 50);
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 50) + 10;
        num2 = Math.floor(Math.random() * num1);
        answer = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        break;
      default:
        num1 = 1;
        num2 = 1;
        answer = 2;
    }
    
    const opSymbol = operation === '*' ? '×' : operation;
    return {
      question: `${num1} ${opSymbol} ${num2}`,
      answer
    };
  };
  
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentProblem(generateProblem());
    setFeedback('');
  };
  
  const checkAnswer = () => {
    const userNum = Number(userAnswer);
    if (!isNaN(userNum) && userNum === currentProblem.answer) {
      setScore(score + 5);
      setFeedback('Correct! +5 points');
      setTimeout(() => {
        setCurrentProblem(generateProblem());
        setUserAnswer('');
        setFeedback('');
      }, 1500);
    } else {
      setFeedback(`Incorrect. The answer is ${currentProblem.answer}`);
      setTimeout(() => {
        setCurrentProblem(generateProblem());
        setUserAnswer('');
        setFeedback('');
      }, 2000);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      {!gameStarted ? (
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold">Math Puzzle Challenge</h3>
          <p className="text-muted-foreground">
            Test your math skills with arithmetic problems! Solve them as quickly as you can.
          </p>
          <Button size="lg" onClick={startGame}>Start Game</Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Solve:</h3>
            <div className="text-lg font-bold">Score: {score}</div>
          </div>
          
          <div className="w-full py-8 px-4 rounded-lg bg-primary/20 border-2 border-primary flex items-center justify-center">
            <span className="text-3xl font-bold">{currentProblem.question} = ?</span>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Answer:</label>
              <input
                type="number"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
              />
            </div>
            
            {feedback && (
              <div className={`p-2 rounded text-center ${feedback.includes('Correct') ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}`}>
                {feedback}
              </div>
            )}
            
            <div className="flex gap-2">
              <Button onClick={checkAnswer} className="flex-1">Submit Answer</Button>
              <Button variant="outline" onClick={() => setGameStarted(false)}>End Game</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Logic Puzzle Game component
const LogicPuzzleGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const puzzle = {
    title: "River Crossing Puzzle",
    description: "A farmer needs to cross a river with a wolf, a goat, and a cabbage. The boat is only big enough for the farmer and one item. If left unattended, the wolf will eat the goat, and the goat will eat the cabbage. How can the farmer get everything across safely?",
    steps: [
      "Start with the farmer, wolf, goat, and cabbage on the left bank.",
      "The farmer takes the goat across to the right bank.",
      "The farmer returns alone to the left bank.",
      "The farmer takes the wolf across to the right bank.",
      "The farmer takes the goat back to the left bank.",
      "The farmer takes the cabbage across to the right bank.",
      "The farmer returns alone to the left bank.",
      "The farmer takes the goat across to the right bank.",
      "Success! Everything is now on the right bank safely."
    ]
  };
  
  const startGame = () => {
    setGameStarted(true);
    setCurrentStep(0);
  };
  
  const nextStep = () => {
    if (currentStep < puzzle.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      {!gameStarted ? (
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold">{puzzle.title}</h3>
          <p className="text-muted-foreground">
            {puzzle.description}
          </p>
          <Button size="lg" onClick={startGame}>Solve Puzzle</Button>
        </div>
      ) : (
        <div className="space-y-6">
          <h3 className="text-xl font-medium">Step {currentStep + 1} of {puzzle.steps.length}</h3>
          
          <div className="w-full p-6 rounded-lg bg-primary/20 border-2 border-primary">
            <p className="text-lg font-medium">{puzzle.steps[currentStep]}</p>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={currentStep === 0}
            >
              Previous Step
            </Button>
            
            {currentStep === puzzle.steps.length - 1 ? (
              <Button onClick={() => setGameStarted(false)}>
                Finish Puzzle
              </Button>
            ) : (
              <Button onClick={nextStep}>
                Next Step
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Games = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    toast.error('You must be logged in to play games');
    navigate('/login');
  }
  
  const handlePlayGame = (gameId: string) => {
    setSelectedGame(gameId);
  };
  
  const backToGames = () => {
    setSelectedGame(null);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {selectedGame ? (
          <div>
            <Button 
              variant="outline" 
              className="mb-8 flex items-center gap-1" 
              onClick={backToGames}
            >
              <ArrowRight className="rotate-180 h-4 w-4" /> 
              Back to Games
            </Button>
            
            <Card className="glass-card">
              <CardContent className="pt-8 pb-8">
                {selectedGame === 'periodic-table' && <PeriodicTableGame />}
                {selectedGame === 'math-puzzle' && <MathPuzzleGame />}
                {selectedGame === 'logic-puzzle' && <LogicPuzzleGame />}
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Educational Games</h1>
                <p className="text-muted-foreground">
                  Learn while having fun with interactive educational games.
                </p>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                <TabsTrigger value="all">All Games</TabsTrigger>
                <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
                <TabsTrigger value="math">Mathematics</TabsTrigger>
                <TabsTrigger value="logic">Logic</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <GameCard
                  title="Periodic Table Explorer"
                  description="Test your knowledge of chemical elements by identifying them from their symbols"
                  icon={<Atom className="h-6 w-6 text-primary" />}
                  difficulty="medium"
                  playTime="5-10 min"
                  topic="Chemistry"
                  onPlay={() => handlePlayGame('periodic-table')}
                />
                <GameCard
                  title="Math Puzzle Challenge"
                  description="Solve arithmetic problems and equations with increasing difficulty"
                  icon={<Calculator className="h-6 w-6 text-primary" />}
                  difficulty="easy"
                  playTime="5 min"
                  topic="Mathematics"
                  onPlay={() => handlePlayGame('math-puzzle')}
                />
                <GameCard
                  title="Logic Riddle Solver"
                  description="Work through classic logic problems and brain teasers"
                  icon={<Brain className="h-6 w-6 text-primary" />}
                  difficulty="hard"
                  playTime="10-15 min"
                  topic="Logic"
                  onPlay={() => handlePlayGame('logic-puzzle')}
                />
              </TabsContent>
              
              <TabsContent value="chemistry" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <GameCard
                  title="Periodic Table Explorer"
                  description="Test your knowledge of chemical elements by identifying them from their symbols"
                  icon={<Atom className="h-6 w-6 text-primary" />}
                  difficulty="medium"
                  playTime="5-10 min"
                  topic="Chemistry"
                  onPlay={() => handlePlayGame('periodic-table')}
                />
              </TabsContent>
              
              <TabsContent value="math" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <GameCard
                  title="Math Puzzle Challenge"
                  description="Solve arithmetic problems and equations with increasing difficulty"
                  icon={<Calculator className="h-6 w-6 text-primary" />}
                  difficulty="easy"
                  playTime="5 min"
                  topic="Mathematics"
                  onPlay={() => handlePlayGame('math-puzzle')}
                />
              </TabsContent>
              
              <TabsContent value="logic" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <GameCard
                  title="Logic Riddle Solver"
                  description="Work through classic logic problems and brain teasers"
                  icon={<Brain className="h-6 w-6 text-primary" />}
                  difficulty="hard"
                  playTime="10-15 min"
                  topic="Logic"
                  onPlay={() => handlePlayGame('logic-puzzle')}
                />
              </TabsContent>
            </Tabs>
            
            <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Gamepad size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Benefits of Educational Games</h3>
                  <p className="text-muted-foreground mb-4">
                    Playing educational games can improve memory, problem-solving skills, and make learning more enjoyable.
                    Our games are designed to reinforce concepts you've learned in practice tests.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <ChevronRight size={16} className="text-primary" />
                      <span>Improves retention of information</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronRight size={16} className="text-primary" />
                      <span>Develops critical thinking skills</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronRight size={16} className="text-primary" />
                      <span>Makes learning enjoyable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronRight size={16} className="text-primary" />
                      <span>Provides instant feedback</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Games;
