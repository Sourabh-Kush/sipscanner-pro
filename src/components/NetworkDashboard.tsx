import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  Phone, 
  Users, 
  Globe, 
  Target,
  Zap,
  Eye,
  Database,
  TrendingUp,
  Server,
  Wifi,
  BarChart3
} from 'lucide-react';
import AlertPanel from './AlertPanel';
import NetworkMap from './NetworkMap';
import CallAnalytics from './CallAnalytics';
import cyberBg from '@/assets/cyber-bg.jpg';

// Mock data for demonstration
const generateMockData = () => ({
  overview: {
    activeCalls: Math.floor(Math.random() * 150) + 50,
    totalEndpoints: Math.floor(Math.random() * 500) + 1200,
    threatScore: Math.floor(Math.random() * 40) + 10,
    packetsProcessed: Math.floor(Math.random() * 1000000) + 5000000,
  },
  alerts: [
    { id: 1, type: 'critical', message: 'Suspicious call pattern detected from 192.168.1.100', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'High frequency short calls detected', time: '5 min ago' },
    { id: 3, type: 'info', message: 'New SIP endpoint registered', time: '8 min ago' },
  ],
  recentCalls: [
    { id: 1, from: '+1-555-0123', to: '+1-555-0456', status: 'active', duration: '02:34', threat: 'low' },
    { id: 2, from: '+1-555-0789', to: '+1-555-0012', status: 'completed', duration: '00:45', threat: 'medium' },
    { id: 3, from: '+1-555-0345', to: '+1-555-0678', status: 'active', duration: '01:12', threat: 'low' },
  ],
  networkStats: {
    bandwidth: 85,
    latency: 12,
    packetLoss: 0.2,
    jitter: 3.5
  }
});

const NetworkDashboard: React.FC = () => {
  const [data, setData] = useState(generateMockData());
  const [selectedTab, setSelectedTab] = useState('overview');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateMockData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getThreatBadgeVariant = (threat: string) => {
    switch (threat) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div 
      className="min-h-screen cyber-grid p-6 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 41, 47, 0.95), rgba(34, 41, 47, 0.98)), url(${cyberBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
              Network Security Operations Center
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time SIP/VoIP monitoring and threat detection
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="status-indicator status-online bg-success"></div>
              <span className="text-sm font-medium">System Online</span>
            </div>
            <Button variant="outline" className="border-glow">
              <Eye className="mr-2 h-4 w-4" />
              Live View
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="metric-card border-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Calls</CardTitle>
            <Phone className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{data.overview.activeCalls}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last hour
            </p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Endpoints</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{data.overview.totalEndpoints}</div>
            <p className="text-xs text-muted-foreground">
              +3 new today
            </p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threat Score</CardTitle>
            <Shield className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{data.overview.threatScore}</div>
            <p className="text-xs text-muted-foreground">
              Medium risk level
            </p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Packets Processed</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {(data.overview.packetsProcessed / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-card border border-border">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="calls" className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>Live Calls</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="network" className="flex items-center space-x-2">
            <Wifi className="h-4 w-4" />
            <span>Network</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AlertPanel alerts={[
              { id: 1, type: 'critical', title: 'Suspicious Call Pattern', message: 'High-frequency short calls detected from 192.168.1.100', timestamp: '2 min ago', source: 'SIP Monitor', severity: 8 },
              { id: 2, type: 'warning', title: 'Connection Quality Alert', message: 'Increased latency detected on subnet 10.0.1.0/24', timestamp: '5 min ago', source: 'Network Monitor', severity: 5 },
              { id: 3, type: 'info', title: 'New Endpoint Registered', message: 'SIP endpoint registered from 172.16.0.45', timestamp: '8 min ago', source: 'Registration Server', severity: 2 },
            ]} />
            <NetworkMap />
          </div>
        </TabsContent>

        <TabsContent value="calls" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="metric-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>Active Call Sessions</span>
                  <Badge variant="secondary">{data.recentCalls.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recentCalls.map((call) => (
                    <div key={call.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/40 transition-smooth">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                          <span className="font-mono text-sm font-medium">{call.from}</span>
                          <span className="text-xs text-muted-foreground">→ {call.to}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{call.duration}</span>
                          <Badge variant={getStatusBadgeVariant(call.status)} className="text-xs">
                            {call.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getThreatBadgeVariant(call.threat)}>
                          {call.threat} risk
                        </Badge>
                        <Button variant="outline" size="sm" className="border-glow">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <CallAnalytics />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <AlertPanel alerts={[
            { id: 1, type: 'critical', title: 'Threat Detected', message: 'Suspicious call pattern detected from 192.168.1.100 - potential fraud attempt', timestamp: '2 min ago', source: 'ML Detector', severity: 9 },
            { id: 2, type: 'warning', title: 'High Call Frequency', message: 'Unusual call frequency detected from endpoint 172.16.0.25', timestamp: '5 min ago', source: 'Pattern Analysis', severity: 6 },
            { id: 3, type: 'critical', title: 'Protocol Anomaly', message: 'Malformed SIP headers detected from 10.0.0.45', timestamp: '7 min ago', source: 'Protocol Monitor', severity: 8 },
            { id: 4, type: 'info', title: 'New Registration', message: 'SIP endpoint registered from 192.168.50.100', timestamp: '8 min ago', source: 'Registration Server', severity: 2 },
            { id: 5, type: 'warning', title: 'Quality Alert', message: 'Packet loss threshold exceeded on call session 0xA4F2', timestamp: '12 min ago', source: 'Quality Monitor', severity: 5 },
          ]} />
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="metric-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-accent" />
                  <span>Network Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Real-time Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Bandwidth</span>
                        <span className="font-mono text-sm">{data.networkStats.bandwidth}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Latency</span>
                        <span className="font-mono text-sm">{data.networkStats.latency}ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Packet Loss</span>
                        <span className="font-mono text-sm">{data.networkStats.packetLoss}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Jitter</span>
                        <span className="font-mono text-sm">{data.networkStats.jitter}ms</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Protocol Distribution</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>SIP/UDP</span>
                          <span>65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>SIP/TLS</span>
                          <span>25%</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>RTP/SRTP</span>
                          <span>10%</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <NetworkMap />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NetworkDashboard;