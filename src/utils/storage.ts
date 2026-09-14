import type {
  UserProfile,
  MaintenanceRequest,
  Block,
  NotificationItem,
  ActivityItem,
  DataSourceItem,
} from '../types';

export const STORAGE_KEYS = {
  USER: 'tracksync_user',
  REQUESTS: 'tracksync_requests',
  BLOCKS: 'tracksync_blocks',
  NOTIFICATIONS: 'tracksync_notifications',
  ACTIVITIES: 'tracksync_activities',
  DATA_SOURCES: 'tracksync_data_sources',
  RECOMMENDATION: 'tracksync_recommendation',
  APP_PHASE: 'tracksync_auth_phase',
} as const;

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    return JSON.parse(data) as T;
  } catch (err) {
    console.warn(`[TrackSync Storage] Error loading key "${key}":`, err);
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[TrackSync Storage] Error saving key "${key}":`, err);
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`[TrackSync Storage] Error removing key "${key}":`, err);
  }
}

export function clearAllTrackSyncStorage(): void {
  if (typeof window === 'undefined') return;
  Object.values(STORAGE_KEYS).forEach((k) => {
    try {
      localStorage.removeItem(k);
    } catch {
      // ignore
    }
  });
}
