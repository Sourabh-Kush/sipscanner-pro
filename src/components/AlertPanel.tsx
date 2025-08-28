import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Clock, Target } from 'lucide-react';

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  source: string;
  severity: number;
}

interface AlertPanelProps {
  alerts: Alert[];
}

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <Shield className="h-4 w-4 text-warning" />;
      default:
        return <Target className="h-4 w-4 text-primary" />;
    }
  };

  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="metric-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <span>Security Alerts</span>
          <Badge variant="secondary">{alerts.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start space-x-3 p-3 bg-secondary/20 rounded-lg border border-border hover:bg-secondary/30 transition-smooth"
            >
              <div className="mt-1">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm truncate">{alert.title}</h4>
                  <Badge variant={getAlertBadgeVariant(alert.type)}>
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{alert.timestamp}</span>
                    <span>•</span>
                    <span>{alert.source}</span>
                  </div>
                  <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                    Investigate
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertPanel;