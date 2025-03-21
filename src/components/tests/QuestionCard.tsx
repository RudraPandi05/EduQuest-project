
import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, X, CornerDownRight, AlertCircle } from "lucide-react";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
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
    onNext();
  };
  
  const isCorrect = selectedOption === question.correctOption;
  
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
        
        {isAnswered && question.explanation && (
          <div className="mt-6">
            <Button 
              variant="outline" 
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center gap-2 text-muted-foreground"
            >
              {showExplanation ? "Hide Explanation" : "Show Explanation"}
              <AlertCircle size={16} />
            </Button>
            
            {showExplanation && (
              <div className="mt-3 p-4 bg-muted/30 rounded-lg animate-fade-in">
                <div className="flex items-start gap-2">
                  <CornerDownRight size={16} className="text-muted-foreground mt-1" />
                  <p className="text-muted-foreground">{question.explanation}</p>
                </div>
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
