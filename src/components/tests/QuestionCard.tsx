
import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, X, CornerDownRight, AlertCircle, Video } from "lucide-react";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
  videoUrl?: string;
}

interface QuestionCardProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (questionId: number, selectedOption: number) => void;
  onNext: () => void;
}

const QuestionCard = ({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  onAnswer, 
  onNext 
}: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  
  const handleOptionSelect = (value: string) => {
    if (!isAnswered) {
      const optionIndex = parseInt(value);
      setSelectedOption(optionIndex);
    }
  };
  
  const handleSubmit = () => {
    if (selectedOption !== null && !isAnswered) {
      setIsAnswered(true);
      onAnswer(question.id, selectedOption);
    }
  };
  
  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);
    setShowVideo(false);
    onNext();
  };
  
  const isCorrect = selectedOption === question.correctOption;
  
  // Sample video URLs for demonstration
  const getVideoUrl = () => {
    // In a real app, these would come from the database or API
    const videoUrls = {
      'physics': 'https://www.youtube.com/embed/A0V_Z1ePog0',
      'chemistry': 'https://www.youtube.com/embed/tJBHMNRGkzw',
      'math': 'https://www.youtube.com/embed/0uQNGJqb7fE',
      'biology': 'https://www.youtube.com/embed/VzKMf9qtcV0'
    };
    
    // Return a video based on question content or use a default
    if (question.videoUrl) {
      return question.videoUrl;
    }
    
    if (question.question.toLowerCase().includes('physics')) {
      return videoUrls.physics;
    } else if (question.question.toLowerCase().includes('chem')) {
      return videoUrls.chemistry;
    } else if (question.question.toLowerCase().includes('math')) {
      return videoUrls.math;
    } else if (question.question.toLowerCase().includes('bio')) {
      return videoUrls.biology;
    }
    
    // Default video
    return videoUrls.physics;
  };
  
  return (
    <Card className="glass-card w-full max-w-3xl mx-auto animate-scale-in">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
          <span>Question {currentQuestion} of {totalQuestions}</span>
        </div>
        
        <h3 className="text-xl font-medium mb-6">{question.question}</h3>
        
        <RadioGroup 
          value={selectedOption !== null ? selectedOption.toString() : undefined}
          onValueChange={handleOptionSelect}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                isAnswered
                  ? index === question.correctOption
                    ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20'
                    : index === selectedOption
                      ? 'border-red-500 bg-red-50/50 dark:bg-red-950/20'
                      : 'border-border'
                  : 'hover:border-primary hover:bg-primary/5 border-border'
              }`}
            >
              <RadioGroupItem 
                value={index.toString()} 
                id={`option-${question.id}-${index}`}
                disabled={isAnswered}
                className="data-[state=checked]:border-primary data-[state=checked]:text-primary"
              />
              <Label 
                htmlFor={`option-${question.id}-${index}`}
                className="flex-1 cursor-pointer"
              >
                {option}
              </Label>
              {isAnswered && (
                index === question.correctOption ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : index === selectedOption && index !== question.correctOption ? (
                  <X className="h-5 w-5 text-red-500" />
                ) : null
              )}
            </div>
          ))}
        </RadioGroup>
        
        {isAnswered && (
          <div className="mt-6 space-y-4">
            {question.explanation && (
              <Button 
                variant="outline" 
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex items-center gap-2 text-muted-foreground mr-2"
              >
                {showExplanation ? "Hide Explanation" : "Show Explanation"}
                <AlertCircle size={16} />
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => setShowVideo(!showVideo)}
              className="flex items-center gap-2 text-muted-foreground"
            >
              {showVideo ? "Hide Video" : "Watch Video Explanation"}
              <Video size={16} />
            </Button>
            
            {showExplanation && question.explanation && (
              <div className="p-4 bg-muted/30 rounded-lg animate-fade-in">
                <div className="flex items-start gap-2">
                  <CornerDownRight size={16} className="text-muted-foreground mt-1" />
                  <p className="text-muted-foreground">{question.explanation}</p>
                </div>
              </div>
            )}
            
            {showVideo && (
              <div className="mt-4 rounded-lg overflow-hidden animate-fade-in">
                <iframe
                  width="100%"
                  height="315"
                  src={getVideoUrl()}
                  title="Video explanation"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-4 pb-6">
        {!isAnswered ? (
          <Button 
            onClick={handleSubmit} 
            disabled={selectedOption === null}
            className="w-full"
          >
            Submit Answer
          </Button>
        ) : (
          <Button 
            onClick={handleNext}
            className="w-full"
          >
            Next Question
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
