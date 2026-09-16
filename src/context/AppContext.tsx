import React, { createContext, useContext, useReducer, useEffect, useState, useMemo } from 'react';
import type {
  UserProfile,
  MaintenanceRequest,
  Block,
  NotificationItem,
  ActivityItem,
  DataSourceItem,
  ConflictItem,
  ToastItem,
  Screen,
  Severity,
  Department,
  AIPriority,
  RailwayDivision,
} from '../types';
import {
  initialRequests,
  initialBlocks,
  initialNotifications,
  initialActivities,
  initialDataSources,
  initialConflicts,
} from '../data/mockData';
import {
  STORAGE_KEYS,
  loadFromStorage,
  saveToStorage,
  clearAllTrackSyncStorage,
} from '../utils/storage';

export type RecommendationState = 'idle' | 'analyzing' | 'recommended' | 'approved' | 'rejected';

export interface AppMetrics {
  pendingRequests: number;
  criticalRequests: number;
  plannedBlocks: number;
  activeBlocks: number;
  completedBlocks: number;
  trainConflicts: number;
  blockHoursSaved: number;
  assetAvailability: number;
  maintenanceCompletion: number;
}

interface AppContextValue {
  // Auth
  user: UserProfile | null;
  login: (employeeId: string, password?: string, roleName?: string) => void;
  logout: () => void;

  // Requests
  requests: MaintenanceRequest[];
  addRequest: (req: Omit<MaintenanceRequest, 'id' | 'aiPriority' | 'status' | 'createdAt' | 'history'>) => void;
  updateRequest: (id: string, patch: Partial<MaintenanceRequest>) => void;
  deleteRequest: (id: string) => void;
  selectedRequest: MaintenanceRequest | null;
  setSelectedRequest: (req: MaintenanceRequest | null) => void;

  // Blocks
  blocks: Block[];
  approvedBlocks: Set<string>;
  rejectedBlocks: Set<string>;
  approveBlock: (blockId: string) => void;
  rejectBlock: (blockId: string, reason?: string) => void;
  updateBlock: (blockId: string, patch: Partial<Block>) => void;
  selectedBlockId: string | null;
  setSelectedBlockId: (id: string | null) => void;

  // AI Planning
  recommendationState: RecommendationState;
  analysisStep: number;
  isAnalyzing: boolean;
  generateOptimizedPlan: () => void;

  // Conflicts
  conflicts: ConflictItem[];
  selectedConflict: ConflictItem | null;
  setSelectedConflict: (c: ConflictItem | null) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;

  // Activities / Audit
  activities: ActivityItem[];
  addActivity: (action: string, relatedItem: string, details?: string) => void;

  // Data Sources
  dataSources: DataSourceItem[];
  syncDataSource: (id: string) => void;
  syncingSourceId: string | null;

  // Toasts
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;

  // Active Division
  division: RailwayDivision;
  setDivision: (d: RailwayDivision) => void;

  // Navigation & Modals UI state
  screen: Screen;
  setScreen: (s: Screen) => void;
  isNewRequestOpen: boolean;
  setIsNewRequestOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isActivityLogOpen: boolean;
  setIsActivityLogOpen: (open: boolean) => void;
  isResetDialogOpen: boolean;
  setIsResetDialogOpen: (open: boolean) => void;
  isBlockModifyOpen: boolean;
  setIsBlockModifyOpen: (open: boolean) => void;
  isEditRequestOpen: boolean;
  setIsEditRequestOpen: (open: boolean) => void;

  // Metrics
  metrics: AppMetrics;

  // Reset
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // ── Active Division State ───────────────────────────────────────
  const [division, setDivisionState] = useState<RailwayDivision>(() =>
    loadFromStorage<RailwayDivision>(STORAGE_KEYS.DIVISION, 'Central Division')
  );

  const setDivision = (d: RailwayDivision) => {
    setDivisionState(d);
    saveToStorage(STORAGE_KEYS.DIVISION, d);
  };

  // ── Auth State ──────────────────────────────────────────────────
  const [user, setUser] = useState<UserProfile | null>(() =>
    loadFromStorage<UserProfile | null>(STORAGE_KEYS.USER, null)
  );

  // ── Requests State ──────────────────────────────────────────────
  const [requests, setRequests] = useState<MaintenanceRequest[]>(() =>
    loadFromStorage<MaintenanceRequest[]>(STORAGE_KEYS.REQUESTS, initialRequests)
  );

  // ── Blocks State ────────────────────────────────────────────────
  const [blocks, setBlocks] = useState<Block[]>(() =>
    loadFromStorage<Block[]>(STORAGE_KEYS.BLOCKS, initialBlocks)
  );

  // ── AI Recommendation State ────────────────────────────────────
  const [recommendationState, setRecommendationState] = useState<RecommendationState>(() => {
    const savedRec = loadFromStorage<RecommendationState>(STORAGE_KEYS.RECOMMENDATION, 'recommended');
    return savedRec;
  });
  const [analysisStep, setAnalysisStep] = useState(7);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ── Notifications ───────────────────────────────────────────────
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    loadFromStorage<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, initialNotifications)
  );

  // ── Activities ──────────────────────────────────────────────────
  const [activities, setActivities] = useState<ActivityItem[]>(() =>
    loadFromStorage<ActivityItem[]>(STORAGE_KEYS.ACTIVITIES, initialActivities)
  );

  // ── Data Sources ────────────────────────────────────────────────
  const [dataSources, setDataSources] = useState<DataSourceItem[]>(() =>
    loadFromStorage<DataSourceItem[]>(STORAGE_KEYS.DATA_SOURCES, initialDataSources)
  );
  const [syncingSourceId, setSyncingSourceId] = useState<string | null>(null);

  // ── Conflicts ───────────────────────────────────────────────────
  const [conflicts] = useState<ConflictItem[]>(initialConflicts);

  // ── Toasts ──────────────────────────────────────────────────────
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // ── Modals & Selection UI ───────────────────────────────────────
  const [screen, setScreen] = useState<Screen>('control');
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>('B014');
  const [selectedConflict, setSelectedConflict] = useState<ConflictItem | null>(null);

  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isBlockModifyOpen, setIsBlockModifyOpen] = useState(false);
  const [isEditRequestOpen, setIsEditRequestOpen] = useState(false);

  // Sync back to storage on changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.USER, user);
  }, [user]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.REQUESTS, requests);
  }, [requests]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BLOCKS, blocks);
  }, [blocks]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }, [notifications]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ACTIVITIES, activities);
  }, [activities]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.DATA_SOURCES, dataSources);
  }, [dataSources]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.RECOMMENDATION, recommendationState);
  }, [recommendationState]);

  // Toast Helpers
  const showToast = (message: string, type: 'success' | 'warning' | 'info' | 'error' = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Activity Helper
  const addActivity = (action: string, relatedItem: string, details?: string) => {
    const now = new Date();
    const timeStr = `${now.getDate()} ${now.toLocaleString('en-US', { month: 'short' })} ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newAct: ActivityItem = {
      id: 'ACT-' + Date.now(),
      action,
      user: user?.name || user?.employeeId || 'Block Planner',
      timestamp: timeStr,
      relatedItem,
      details,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Auth Handlers
  const login = (employeeId: string, _password?: string, roleName?: string) => {
    const trimmedId = employeeId.trim();
    const initials = trimmedId.length >= 2 ? trimmedId.substring(0, 2).toUpperCase() : trimmedId.toUpperCase();
    const newUser: UserProfile = {
      employeeId: trimmedId,
      name: trimmedId.startsWith('IR') || trimmedId.startsWith('PLN') ? `Officer ${trimmedId}` : trimmedId,
      role: roleName || 'Block Planner',
      initial: initials,
    };
    setUser(newUser);
    showToast(`Welcome, ${newUser.name}. Railway session initialized.`, 'info');
  };

  const logout = () => {
    setUser(null);
    saveToStorage(STORAGE_KEYS.USER, null);
    showToast('Logged out successfully.', 'info');
  };

  // Derived sets
  const approvedBlocks = useMemo(() => {
    return new Set(blocks.filter((b) => b.status === 'approved').map((b) => b.id));
  }, [blocks]);

  const rejectedBlocks = useMemo(() => {
    return new Set(blocks.filter((b) => b.status === 'rejected').map((b) => b.id));
  }, [blocks]);

  // Request Handlers
  const addRequest = (data: Omit<MaintenanceRequest, 'id' | 'aiPriority' | 'status' | 'createdAt' | 'history'>) => {
    const newNum = 1024 + requests.length;
    const newId = `BR-${newNum}`;

    let aiPriority: AIPriority = 'MEDIUM';
    if (data.severity === 'Critical' || data.safetyCritical || (data.overdueDays && data.overdueDays > 2)) {
      aiPriority = 'CRITICAL';
    } else if (data.severity === 'High') {
      aiPriority = 'HIGH';
    } else if (data.severity === 'Low') {
      aiPriority = 'LOW';
    }

    const now = new Date();
    const timeStr = `${now.getDate()} ${now.toLocaleString('en-US', { month: 'short' })} ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newRequest: MaintenanceRequest = {
      ...data,
      id: newId,
      aiPriority,
      status: 'Pending',
      createdAt: timeStr,
      createdBy: `${user?.name || 'Planner'} (${user?.role || 'Field In-Charge'})`,
      history: [
        `Created by ${user?.name || user?.employeeId || 'Planner'}`,
        `Assigned AI Priority: ${aiPriority}`,
      ],
    };

    setRequests((prev) => [newRequest, ...prev]);
    addActivity('Request Created', newId, `${data.activity} on ${data.section}`);

    // Notification
    const notif: NotificationItem = {
      id: 'NOTIF-' + Date.now(),
      title: 'New Maintenance Request',
      message: `${newId} (${data.department}) submitted for ${data.section} section.`,
      timestamp: 'Just now',
      type: 'info',
      read: false,
      linkScreen: 'requests',
    };
    setNotifications((prev) => [notif, ...prev]);
    showToast(`✓ Maintenance request ${newId} created successfully.`, 'success');
  };

  const updateRequest = (id: string, patch: Partial<MaintenanceRequest>) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updatedHistory = r.history ? [...r.history] : [];
          if (patch.status && patch.status !== r.status) {
            updatedHistory.push(`Status changed to ${patch.status} by ${user?.name || 'Planner'}`);
          }
          return { ...r, ...patch, history: updatedHistory };
        }
        return r;
      })
    );
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest((prev) => (prev ? { ...prev, ...patch } : null));
    }
    addActivity('Request Updated', id, `Updated details / status`);
    showToast(`Request ${id} updated.`, 'success');
  };

  const deleteRequest = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    if (selectedRequest?.id === id) {
      setSelectedRequest(null);
    }
    addActivity('Request Deleted', id, 'Removed from planning queue');
    showToast(`Request ${id} removed.`, 'warning');
  };

  // AI Planning Flow
  const generateOptimizedPlan = () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev >= 6) {
          clearInterval(stepInterval);
          setIsAnalyzing(false);
          setRecommendationState('recommended');
          addActivity('AI Plan Generated', 'Block B014', 'Multi-department corridor optimization complete');
          showToast('✓ AI Optimized Plan generated (Score: 94/100).', 'success');
          return 7;
        }
        return prev + 1;
      });
    }, 220);
  };

  // Block Approval Flow
  const approveBlock = (blockId: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, status: 'approved' } : b))
    );

    // If B014, update associated requests to Approved
    if (blockId === 'B014') {
      setRecommendationState('approved');
      const associatedIds = ['BR-1024', 'BR-1025', 'BR-1026'];
      setRequests((prev) =>
        prev.map((r) =>
          associatedIds.includes(r.id)
            ? {
                ...r,
                status: 'Approved',
                history: [...(r.history || []), `Coordinated into approved Block B014`],
              }
            : r
        )
      );
    }

    addActivity('Block Approved', blockId, `Approved by ${user?.name || 'Planner'} for execution`);

    const notif: NotificationItem = {
      id: 'NOTIF-' + Date.now(),
      title: `Block ${blockId} Approved`,
      message: `Block ${blockId} scheduled for 18 Sep 2026. Corridor View updated.`,
      timestamp: 'Just now',
      type: 'success',
      read: false,
      linkScreen: 'corridor',
    };
    setNotifications((prev) => [notif, ...prev]);
    showToast(`✓ Block ${blockId} approved successfully.`, 'success');
  };

  // Block Rejection Flow
  const rejectBlock = (blockId: string, reason = 'Alternative operational window preferred') => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, status: 'rejected', rejectionReason: reason } : b))
    );

    if (blockId === 'B014') {
      setRecommendationState('rejected');
    }

    addActivity('Block Rejected', blockId, `Reason: ${reason}`);

    const notif: NotificationItem = {
      id: 'NOTIF-' + Date.now(),
      title: `Block ${blockId} Rejected`,
      message: `Block ${blockId} declined by planner. Returning requests to queue.`,
      timestamp: 'Just now',
      type: 'warning',
      read: false,
      linkScreen: 'planning',
    };
    setNotifications((prev) => [notif, ...prev]);
    showToast(`Block ${blockId} rejected.`, 'info');
  };

  // Block Modification Flow
  const updateBlock = (blockId: string, patch: Partial<Block>) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, ...patch } : b))
    );
    addActivity('Block Modified', blockId, `Adjusted schedule / duration`);
    showToast(`✓ Block ${blockId} updated successfully.`, 'success');
  };

  // Data Source Sync Simulation
  const syncDataSource = (id: string) => {
    setSyncingSourceId(id);
    setDataSources((prev) =>
      prev.map((ds) => (ds.id === id ? { ...ds, status: 'syncing' } : ds))
    );

    // Multi-stage realistic simulated delay
    setTimeout(() => {
      const now = new Date();
      const timeStr = 'Just now';
      setDataSources((prev) =>
        prev.map((ds) => {
          if (ds.id === id) {
            const num = parseInt(ds.records.replace(/,/g, '')) + 12;
            return {
              ...ds,
              status: 'connected',
              lastSync: timeStr,
              records: num.toLocaleString(),
              health: Math.min(100, ds.health + 1),
            };
          }
          return ds;
        })
      );
      setSyncingSourceId(null);
      addActivity('Data Source Synced', id, `Updated records and telemetry`);

      const notif: NotificationItem = {
        id: 'NOTIF-' + Date.now(),
        title: `${id} Sync Complete`,
        message: `${id} data source successfully synchronized with central engine.`,
        timestamp: 'Just now',
        type: 'success',
        read: false,
        linkScreen: 'datasources',
      };
      setNotifications((prev) => [notif, ...prev]);
      showToast(`✓ Data source ${id} synchronized successfully.`, 'success');
    }, 1600);
  };

  // Notification actions
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'info');
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared.', 'info');
  };

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  // Dynamic Metrics derived from State
  const metrics: AppMetrics = useMemo(() => {
    const pendingRequests = requests.filter((r) => r.status === 'Pending').length;
    const criticalRequests = requests.filter(
      (r) => (r.severity === 'Critical' || r.aiPriority === 'CRITICAL') && r.status === 'Pending'
    ).length;
    const plannedBlocks = blocks.filter(
      (b) => b.status === 'planned' || b.status === 'approved' || b.status === 'ai-recommended'
    ).length;
    const activeBlocks = blocks.filter((b) => b.status === 'active').length;
    const completedBlocks = blocks.filter((b) => b.status === 'completed').length;

    // Approving B014 saves extra hours
    const isB014Approved = blocks.find((b) => b.id === 'B014')?.status === 'approved';
    const blockHoursSaved = isB014Approved ? 11 : 6;
    const trainConflicts = isB014Approved ? 3 : 5;
    const assetAvailability = isB014Approved ? 94.2 : 92.4;
    const maintenanceCompletion = Math.round(
      (requests.filter((r) => r.status === 'Approved' || r.status === 'Completed').length /
        Math.max(1, requests.length)) *
        100
    );

    return {
      pendingRequests,
      criticalRequests,
      plannedBlocks,
      activeBlocks,
      completedBlocks,
      trainConflicts,
      blockHoursSaved,
      assetAvailability,
      maintenanceCompletion,
    };
  }, [requests, blocks]);

  // Reset Demo Data
  const resetDemoData = () => {
    clearAllTrackSyncStorage();
    setRequests(initialRequests);
    setBlocks(initialBlocks);
    setNotifications(initialNotifications);
    setActivities(initialActivities);
    setDataSources(initialDataSources);
    setRecommendationState('recommended');
    setAnalysisStep(7);
    setSelectedRequest(null);
    setSelectedBlockId('B014');
    setSelectedConflict(null);
    setIsResetDialogOpen(false);
    showToast('✓ Demo data restored to initial SIH state.', 'success');
  };

  const value: AppContextValue = {
    user,
    login,
    logout,
    requests,
    addRequest,
    updateRequest,
    deleteRequest,
    selectedRequest,
    setSelectedRequest,
    blocks,
    approvedBlocks,
    rejectedBlocks,
    approveBlock,
    rejectBlock,
    updateBlock,
    selectedBlockId,
    setSelectedBlockId,
    recommendationState,
    analysisStep,
    isAnalyzing,
    generateOptimizedPlan,
    conflicts,
    selectedConflict,
    setSelectedConflict,
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    activities,
    addActivity,
    dataSources,
    syncDataSource,
    syncingSourceId,
    toasts,
    showToast,
    dismissToast,
    screen,
    setScreen,
    isNewRequestOpen,
    setIsNewRequestOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    isActivityLogOpen,
    setIsActivityLogOpen,
    isResetDialogOpen,
    setIsResetDialogOpen,
    isBlockModifyOpen,
    setIsBlockModifyOpen,
    isEditRequestOpen,
    setIsEditRequestOpen,
    division,
    setDivision,
    metrics,
    resetDemoData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
