import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download, FileSpreadsheet } from 'lucide-react';

export const VoterData = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Voter Data Management</h1>
          <p className="text-muted-foreground">Import and export voter data for all 21 Assembly Constituencies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Import Voter Data</h2>
                  <p className="text-sm text-muted-foreground">Upload CSV or Excel file</p>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm font-medium mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">CSV, XLS, XLSX (Max 50MB)</p>
              </div>

              <Button className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-success/10">
                  <Download className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Export Voter Data</h2>
                  <p className="text-sm text-muted-foreground">Download complete voter database</p>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">All Constituencies</span>
                  <span className="text-sm text-muted-foreground">26,247 voters</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Total Families</span>
                  <span className="text-sm text-muted-foreground">7,182 families</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Total Surveys</span>
                  <span className="text-sm text-muted-foreground">3,289 completed</span>
                </div>
              </div>

              <Button className="w-full" variant="default">
                <Download className="mr-2 h-4 w-4" />
                Export All Data
              </Button>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Import History</h3>
          <div className="space-y-3">
            {[
              { date: '2024-03-15', file: 'ac_118_voters.csv', records: 1247, status: 'Success' },
              { date: '2024-03-14', file: 'ac_119_voters.xlsx', records: 2340, status: 'Success' },
              { date: '2024-03-13', file: 'bulk_import.csv', records: 15000, status: 'Failed' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{item.file}</p>
                    <p className="text-xs text-muted-foreground">{item.date} • {item.records} records</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                  item.status === 'Success' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
