import { DashboardLayout } from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PredictiveInsights } from '@/components/analytics/PredictiveInsights';
import { ComparativeAnalysis } from '@/components/analytics/ComparativeAnalysis';
import { HeatmapAnalysis } from '@/components/analytics/HeatmapAnalysis';
import { AdvancedMetrics } from '@/components/analytics/AdvancedMetrics';
import { TrendForecasting } from '@/components/analytics/TrendForecasting';

export default function AdvancedAnalytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Advanced Analytics</h1>
          <p className="text-muted-foreground mt-2">
            AI-powered insights and predictive analytics for all ACs
          </p>
        </div>

        <Tabs defaultValue="predictive" className="space-y-6">
          <TabsList>
            <TabsTrigger value="predictive">Predictive</TabsTrigger>
            <TabsTrigger value="comparative">Comparative</TabsTrigger>
            <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="predictive">
            <PredictiveInsights />
          </TabsContent>

          <TabsContent value="comparative">
            <ComparativeAnalysis />
          </TabsContent>

          <TabsContent value="heatmap">
            <HeatmapAnalysis />
          </TabsContent>

          <TabsContent value="metrics">
            <AdvancedMetrics />
          </TabsContent>

          <TabsContent value="trends">
            <TrendForecasting />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
