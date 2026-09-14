export type Screen =
  | 'control'
  | 'requests'
  | 'planning'
  | 'planner'
  | 'calendar'
  | 'corridor'
  | 'analytics'
  | 'datasources';

export type Department = 'Engineering' | 'Signal & Telecom' | 'Traction';
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type ReqStatus = 'Pending' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected';
export type AIPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type BlockStatus = 'ai-recommended' | 'planned' | 'approved' | 'active' | 'completed' | 'conflict';

export interface MaintenanceRequest {
  id: string;
  department: Department;
  activity: string;
  section: string;
  asset: string;
  severity: Severity;
  requestedDate: string;
  duration: string;
  durationMins: number;
  aiPriority: AIPriority;
  status: ReqStatus;
  overdueDays?: number;
  safetyCritical: boolean;
  reason: string;
  preferredTime: string;
  location: string;
  resources: string[];
  description: string;
}

export interface Block {
  id: string;
  section: string;
  date: string;
  startHour: number;
  startMin: number;
  durationMins: number;
  departments: Department[];
  activities: number;
  status: BlockStatus;
}

export interface AppState {
  approvedBlocks: Set<string>;
  rejectedBlocks: Set<string>;
}
