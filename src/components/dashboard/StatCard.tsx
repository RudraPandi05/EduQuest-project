
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  change?: {
    value: number;
    positive: boolean;
  };
}

const StatCard = ({ title, value, description, icon, change }: StatCardProps) => {
  return (
    <Card className="glass-card hover-scale">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || change) && (
          <CardDescription className="flex items-center mt-1">
            {description}
            {change && (
              <span className={`ml-2 flex items-center text-xs ${
                change.positive ? 'text-green-500' : 'text-red-500'
              }`}>
                {change.positive ? '↑' : '↓'} {Math.abs(change.value)}%
              </span>
            )}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
