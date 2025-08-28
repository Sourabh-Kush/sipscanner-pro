import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Wifi, Server, AlertTriangle } from 'lucide-react';

interface NetworkNode {
  id: string;
  ip: string;
  type: 'endpoint' | 'server' | 'gateway';
  status: 'online' | 'offline' | 'suspicious';
  location: { x: number; y: number };
  threatLevel: 'low' | 'medium' | 'high';
}

const NetworkMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  const nodes: NetworkNode[] = [
    { id: '1', ip: '192.168.1.100', type: 'server', status: 'online', location: { x: 20, y: 30 }, threatLevel: 'low' },
    { id: '2', ip: '192.168.1.150', type: 'endpoint', status: 'suspicious', location: { x: 60, y: 20 }, threatLevel: 'high' },
    { id: '3', ip: '192.168.1.200', type: 'gateway', status: 'online', location: { x: 40, y: 60 }, threatLevel: 'medium' },
    { id: '4', ip: '10.0.0.50', type: 'endpoint', status: 'online', location: { x: 80, y: 50 }, threatLevel: 'low' },
    { id: '5', ip: '172.16.0.10', type: 'server', status: 'offline', location: { x: 30, y: 80 }, threatLevel: 'medium' },
  ];

  const getNodeColor = (node: NetworkNode) => {
    if (node.status === 'suspicious') return 'rgb(239, 68, 68)'; // red
    if (node.threatLevel === 'high') return 'rgb(245, 158, 11)'; // amber
    if (node.status === 'offline') return 'rgb(107, 114, 128)'; // gray
    return 'rgb(34, 197, 94)'; // green
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'server': return <Server className="h-3 w-3" />;
      case 'gateway': return <Wifi className="h-3 w-3" />;
      default: return <Globe className="h-3 w-3" />;
    }
  };

  return (
    <Card className="metric-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-primary" />
          <span>Network Topology</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Network Map SVG */}
          <div className="bg-secondary/20 rounded-lg p-4 mb-4" style={{ height: '300px' }}>
            <svg width="100%" height="100%" className="overflow-visible">
              {/* Connection Lines */}
              {nodes.map((node, index) => 
                nodes.slice(index + 1).map(otherNode => (
                  <line
                    key={`${node.id}-${otherNode.id}`}
                    x1={`${node.location.x}%`}
                    y1={`${node.location.y}%`}
                    x2={`${otherNode.location.x}%`}
                    y2={`${otherNode.location.y}%`}
                    stroke="rgba(59, 130, 246, 0.2)"
                    strokeWidth="1"
                    className="transition-smooth"
                  />
                ))
              )}
              
              {/* Network Nodes */}
              {nodes.map((node) => (
                <g key={node.id}>
                  <circle
                    cx={`${node.location.x}%`}
                    cy={`${node.location.y}%`}
                    r="8"
                    fill={getNodeColor(node)}
                    className="cursor-pointer transition-smooth hover:r-10"
                    onClick={() => setSelectedNode(node)}
                  />
                  {node.status === 'suspicious' && (
                    <circle
                      cx={`${node.location.x}%`}
                      cy={`${node.location.y}%`}
                      r="12"
                      fill="none"
                      stroke="rgb(239, 68, 68)"
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Node Details */}
          {selectedNode && (
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getNodeIcon(selectedNode.type)}
                  <span className="font-medium font-mono">{selectedNode.ip}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedNode(null)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Type</span>
                  <p className="font-medium capitalize">{selectedNode.type}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Status</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={selectedNode.status === 'suspicious' ? 'destructive' : 'outline'}>
                      {selectedNode.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Threat Level</span>
                  <Badge variant={selectedNode.threatLevel === 'high' ? 'destructive' : 'secondary'}>
                    {selectedNode.threatLevel}
                  </Badge>
                </div>
                <div>
                  <Button variant="outline" size="sm" className="w-full">
                    Investigate
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center space-x-4 mt-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span>Normal</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span>Warning</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <span>Threat</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-muted rounded-full"></div>
              <span>Offline</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkMap;