import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Phone, Clock, Users, Signal } from 'lucide-react';

interface CallMetrics {
  totalCalls: number;
  activeCalls: number;
  averageDuration: string;
  callQuality: number;
  successRate: number;
  peakHours: { hour: number; calls: number }[];
}

const CallAnalytics: React.FC = () => {
  const metrics: CallMetrics = {
    totalCalls: 1247,
    activeCalls: 38,
    averageDuration: '02:34',
    callQuality: 92,
    successRate: 98.5,
    peakHours: [
      { hour: 9, calls: 45 },
      { hour: 14, calls: 67 },
      { hour: 16, calls: 82 },
      { hour: 20, calls: 34 }
    ]
  };

  const qualityMetrics = [
    { name: 'Audio Quality', value: 94, color: 'success' },
    { name: 'Connection Stability', value: 89, color: 'success' },
    { name: 'Latency Score', value: 76, color: 'warning' },
    { name: 'Packet Loss', value: 91, color: 'success' }
  ];

  const getQualityColor = (value: number) => {
    if (value >= 90) return 'text-success';
    if (value >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressColor = (color: string) => {
    switch (color) {
      case 'success': return 'bg-success';
      case 'warning': return 'bg-warning';
      default: return 'bg-destructive';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Call Statistics */}
      <Card className="metric-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Call Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Total Calls</span>
                </div>
                <p className="text-2xl font-bold text-primary">{metrics.totalCalls}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">Active Now</span>
                </div>
                <p className="text-2xl font-bold text-accent">{metrics.activeCalls}</p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Success Rate</span>
                  <span className="text-sm font-bold text-success">{metrics.successRate}%</span>
                </div>
                <Progress value={metrics.successRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Call Quality Score</span>
                  <span className="text-sm font-bold text-success">{metrics.callQuality}%</span>
                </div>
                <Progress value={metrics.callQuality} className="h-2" />
              </div>
            </div>

            {/* Average Duration */}
            <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Average Duration</span>
              </div>
              <span className="font-mono text-sm font-medium">{metrics.averageDuration}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quality Metrics */}
      <Card className="metric-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Signal className="h-5 w-5 text-accent" />
            <span>Quality Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {qualityMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${getQualityColor(metric.value)}`}>
                      {metric.value}%
                    </span>
                    <Badge variant={metric.color === 'success' ? 'default' : 'secondary'}>
                      {metric.value >= 90 ? 'Excellent' : metric.value >= 70 ? 'Good' : 'Poor'}
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={metric.value} className="h-2" />
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full ${getProgressColor(metric.color)} transition-all`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Peak Hours Chart */}
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3">Peak Hours Today</h4>
            <div className="grid grid-cols-4 gap-2">
              {metrics.peakHours.map((hour) => (
                <div key={hour.hour} className="text-center">
                  <div className="bg-primary/20 rounded-lg p-2 mb-1">
                    <div 
                      className="bg-primary rounded-sm mx-auto transition-all"
                      style={{ 
                        height: `${(hour.calls / 100) * 40}px`,
                        minHeight: '4px',
                        width: '8px'
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {hour.hour}:00
                  </span>
                  <div className="text-xs font-medium">
                    {hour.calls}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallAnalytics;