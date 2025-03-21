
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BadgeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  unlocked: boolean;
}

const BadgeCard = ({ title, description, icon, progress, unlocked }: BadgeCardProps) => {
  return (
    <Card className={`hover-scale ${unlocked ? 'glass-card' : 'bg-muted/50'}`}>
      <CardHeader className="relative pb-0">
        <div className="absolute top-2 right-2">
          {unlocked ? (
            <Badge variant="default" className="bg-green-500 hover:bg-green-600">Unlocked</Badge>
          ) : (
            <Badge variant="outline">Locked</Badge>
          )}
        </div>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${
          unlocked 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted-foreground/20 text-muted-foreground'
        }`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="text-center pt-4">
        <CardTitle className={`text-xl mb-1 ${!unlocked && 'text-muted-foreground/70'}`}>
          {title}
        </CardTitle>
        <CardDescription className={`${!unlocked && 'text-muted-foreground/50'}`}>
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="w-full bg-secondary rounded-full h-2 mb-1">
          <div 
            className={`h-2 rounded-full ${unlocked ? 'bg-primary' : 'bg-muted-foreground/30'}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-muted-foreground w-full text-right">
          {progress}% complete
        </div>
      </CardFooter>
    </Card>
  );
};

export default BadgeCard;
