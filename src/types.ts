export type Screen =
  | 'control'
  | 'requests'
  | 'planning'
  | 'planner'
  | 'corridor'
  | 'analytics'
  | 'datasources';

export type Department = 'Engineering' | 'Signal & Telecom' | 'Traction';
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type ReqStatus = 'Pending' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected';
export type AIPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type BlockStatus = 'ai-recommended' | 'planned' | 'approved' | 'active' | 'completed' | 'conflict' | 'rejected';

export interface UserProfile {
  employeeId: string;
  name: string;
  role: string;
  initial: string;
}

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
  createdBy?: string;
  createdAt?: string;
  history?: string[];
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
  trainImpact?: 'Low' | 'Medium' | 'High';
  aiScore?: number;
  reasoning?: string[];
  rejectionReason?: string;
  activitiesList?: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  linkScreen?: Screen;
}

export interface ActivityItem {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  relatedItem: string;
  details?: string;
}

export interface DataSourceItem {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'syncing' | 'error' | 'disconnected';
  lastSync: string;
  records: string;
  health: number;
}

export interface ConflictItem {
  id: string;
  section: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  title: string;
  description: string;
  trainAffected?: string;
  resolution?: string;
}

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
}
