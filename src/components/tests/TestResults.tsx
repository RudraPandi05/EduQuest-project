
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Award, BookOpen, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { generateTestResultPDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";
import { Question } from "./QuestionCard";

interface TestResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: string;
  onRetake: () => void;
  questions?: Question[];
  userAnswers?: {[key: number]: number};
}

const TestResults = ({
  score,
  totalQuestions,
  correctAnswers,
  timeSpent,
  onRetake,
  questions = [],
  userAnswers = {},
}: TestResultsProps) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Determine result message based on score
  const getMessage = () => {
    if (percentage >= 90) return "Outstanding! You've mastered this topic.";
    if (percentage >= 70) return "Great job! You have a solid understanding.";
    if (percentage >= 50) return "Good effort! Keep practicing to improve further.";
    return "Keep going! With more practice, you'll improve your score.";
  };
  
  // Determine badges earned
  const getBadges = () => {
    const badges = [];
    
    if (percentage >= 80) badges.push({
      name: "Top Performer",
      icon: <Trophy className="h-6 w-6 text-yellow-500" />,
    });
    
    if (correctAnswers === totalQuestions) badges.push({
      name: "Perfect Score",
      icon: <Award className="h-6 w-6 text-indigo-500" />,
    });
    
    return badges;
  };
  
  const badges = getBadges();

  const handleDownloadPDF = () => {
    try {
      if (questions.length === 0) {
        toast.error("No question data available for PDF generation");
        return;
      }
      
      const summary = {
        score: percentage,
        totalQuestions,
        correctAnswers,
        timeSpent
      };
      
      generateTestResultPDF(questions, userAnswers, summary);
      toast.success("PDF successfully generated and downloaded");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };
  
  return (
    <Card className="glass-card w-full max-w-3xl mx-auto animate-scale-in">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl md:text-3xl font-bold">Test Results</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Score circle */}
        <div className="flex justify-center">
          <div className="relative w-40 h-40 flex items-center justify-center rounded-full bg-muted">
            <svg className="absolute w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={`${percentage * 2.83}, 283`}
                strokeLinecap="round"
                className="text-primary transform -rotate-90 origin-center transition-all duration-1000"
              />
            </svg>
            <div className="text-center">
              <div className="text-4xl font-bold">{percentage}%</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
          </div>
        </div>
        
        {/* Result message */}
        <div className="text-center">
          <p className="text-xl">{getMessage()}</p>
        </div>
        
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div className="bg-muted/30 p-4 rounded-lg text-center">
            <div className="text-xl font-bold">{correctAnswers}</div>
            <div className="text-sm text-muted-foreground">Correct</div>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg text-center">
            <div className="text-xl font-bold">{totalQuestions - correctAnswers}</div>
            <div className="text-sm text-muted-foreground">Incorrect</div>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg text-center">
            <div className="text-xl font-bold">{totalQuestions}</div>
            <div className="text-sm text-muted-foreground">Questions</div>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg text-center">
            <div className="text-xl font-bold">{timeSpent}</div>
            <div className="text-sm text-muted-foreground">Time</div>
          </div>
        </div>
        
        {/* Badges */}
        {badges.length > 0 && (
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-medium mb-4">Badges Earned</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {badges.map((badge, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 animate-pulse-subtle">
                    {badge.icon}
                  </div>
                  <span className="text-sm">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2 pb-6">
        <Button 
          variant="outline" 
          onClick={onRetake} 
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <BookOpen size={16} />
          Take Another Test
        </Button>
        <Button 
          variant="outline" 
          onClick={handleDownloadPDF}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <Download size={16} />
          Download PDF
        </Button>
        <Link to="/dashboard" className="w-full sm:w-auto">
          <Button className="w-full">
            Back to Dashboard
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TestResults;
