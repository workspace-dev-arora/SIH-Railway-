# TrackSync Prototype - Project Structure & Tech Stack Documentation

## 📌 Project Overview
**TrackSync** ek AI-powered **Railway Corridor Maintenance Block Planning & Optimization System** ka prototype hai. Ye Indian Railways ke section controllers aur divisional engineers ko maintenance requisitions plan karne, track blocks allocate karne, train traffic impact minimize karne, aur AI-driven conflict resolution me help karta hai.

---

## 🛠️ Technology Stack (Humne Kya-Kya Use Kiya Hai)

### 1. **Core Frontend Framework & Language**
- **React 19 (`react`, `react-dom`)**: Modern component-based UI layer.
- **TypeScript 5.7 (`typescript`)**: End-to-end type safety, interfaces, aur types for data models (`MaintenanceRequest`, `Block`, `UserProfile`, etc.).

### 2. **Build System & Dev Server**
- **Vite 8 (`vite`, `@vitejs/plugin-react`)**: Ultra-fast development server, hot module replacement (HMR), and production bundler.

### 3. **Styling & UI Theme**
- **Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`)**: Utility-first CSS framework configured via `@import 'tailwindcss';` in `index.css`.
- **Custom Color Palette (Indian Railways Theme)**:
  - **Navy Blue**: `#123B66` (Primary Headers & Brand)
  - **Deep Blue**: `#0B2545` (Sidebar & Navigation Backgrounds)
  - **Saffron**: `#F28C28` (Highlights, Badges & AI Callouts)
  - **Railway Green**: `#138A4B` (Success Statuses & Active Blocks)

### 4. **Iconography & Visual Elements**
- **Lucide React (`lucide-react`)**: Clean icons for dashboard controls, notifications, navigation tabs, status indicators, and actions.

### 5. **Data Visualization & Analytics**
- **Recharts (`recharts`)**: Dynamic interactive charts (Bar Chart, Line Chart, Pie Chart) for operational metrics, block utilization, delayed hours, and departmental statistics.

### 6. **Code Formatter & Tooling**
- **oxfmt (`oxfmt`)**: Ultra-fast code formatting tool.

### 7. **State Management & Persistence**
- **React Context API (`src/context/AppContext.tsx`)**: Global application state containing user sessions, screen navigation, maintenance requests, blocks, activity logs, toasts, and notifications.
- **LocalStorage Persistence (`src/utils/storage.ts`)**: Automatic state saving/loading in browser local storage so edits, new requests, and block modifications persist across page refreshes.

---

## 📁 Repository Directory Structure

```text
TrackSync Prototype/
├── .figma/                     # Figma Make integration metadata
├── .mise.toml                  # Toolchain configuration (Node & pnpm versions)
├── index.html                  # Main HTML shell loading src/main.tsx
├── package.json                # Project dependencies and script runner commands
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration with React & Tailwind plugins
├── AGENTS.md                   # AI Assistant workspace guidelines & rules
└── src/                        # Main Application Source Code
    ├── main.tsx                # React root rendering entrypoint
    ├── App.tsx                 # Root application container & page shell switcher
    ├── index.css               # Global CSS & Tailwind CSS v4 setup
    ├── types.ts                # TypeScript interfaces and global data types
    │
    ├── context/                # Global State Management
    │   └── AppContext.tsx      # AppProvider context hook for requests, blocks, toasts, etc.
    │
    ├── data/                   # Initial Mock Data & Seed Files
    │   └── mockData.ts         # Pre-populated Indian Railways sections, blocks, & requisitions
    │
    ├── utils/                  # Utility Functions
    │   └── storage.ts          # LocalStorage save/load/reset handlers
    │
    ├── components/             # Reusable UI Components & Modals
    │   ├── ActivityLogModal.tsx   # System audit log & history viewer
    │   ├── BlockModifyModal.tsx   # Modal for editing scheduled track blocks
    │   ├── ConflictModal.tsx      # Warning modal for train vs maintenance conflicts
    │   ├── EditRequestModal.tsx   # Modal to edit an existing maintenance request
    │   ├── NewRequestModal.tsx    # Modal form to create a new maintenance requisition
    │   ├── NotificationsDrawer.tsx# Right drawer for system alerts & notifications
    │   ├── RequestDetailsModal.tsx# Comprehensive view of a requisition's metadata
    │   ├── ResetDemoDialog.tsx   # Confirmation dialog to reset data back to factory state
    │   └── ToastContainer.tsx    # Global floating notification toasts (success/warning/error)
    │
    └── screens/                # Core Application Screens & Views
        ├── WelcomeAnimation.tsx   # Splash animation on system start
        ├── LandingPage.tsx        # TrackSync promotional & overview landing page
        ├── LoginPage.tsx          # Dual-role selection & authentication screen
        ├── PostLoginTransition.tsx# Interstitial loading state post-login
        ├── ControlCenter.tsx      # Executive dashboard with KPIs & section telemetry
        ├── MaintenanceRequests.tsx# Full table list & management of requisitions
        ├── AIPlanning.tsx         # AI-powered block recommendation & conflict solver console
        ├── BlockPlanner.tsx       # Interactive Timeline / Gantt Chart block scheduler
        ├── CorridorView.tsx       # Schematic track diagram & live train/block positions
        ├── Analytics.tsx          # Operational efficiency & performance charts
        └── DataSources.tsx        # Railway subsystem connectivity (TMS, FOIS, COA, IoT)
```

---

## 🔍 Detailed Component & Screen Explanations

### 🖥️ App Flow Phases (`App.tsx`)
Application ka main entrypoint 5 steps ka state machine run karta hai:
1. **`welcome`**: High-tech Indian Railways logo animation (`WelcomeAnimation.tsx`).
2. **`landing`**: Overview & features presentation page (`LandingPage.tsx`).
3. **`login`**: Role login (Section Controller / Maintenance Manager) (`LoginPage.tsx`).
4. **`post-login`**: System setup & AI engine initialization animation (`PostLoginTransition.tsx`).
5. **`app`**: Main Dashboard Shell with Sidebar, Top Bar, Toast Alerts, and sub-screens.

---

### 📺 Sub-Screens Overview (`src/screens/`)

| Screen File | Feature / Description |
| :--- | :--- |
| **`ControlCenter.tsx`** | Executive dashboard displaying active corridor blocks, safety alerts, operational KPI metrics, quick actions, and section health overview. |
| **`MaintenanceRequests.tsx`** | Requisition management console. Displays pending, approved, in-progress, and rejected requests with filtering by department (Engineering, S&T, Traction), severity, and safety criticality. |
| **`AIPlanning.tsx`** | AI Maintenance Planning Console. Automatically analyzes track requests, predicts train traffic impact, generates optimized corridor blocks, and offers one-click approval. |
| **`BlockPlanner.tsx`** | Gantt-style timeline view showing scheduled blocks across different railway sections, time slots (00:00 - 24:00), department color codes, and overlap detectors. |
| **`CorridorView.tsx`** | Visual schematic track layout representing stations, track lines, active maintenance blocks, signals, and simulated live train movements. |
| **`Analytics.tsx`** | Visualized reporting console with Recharts. Shows block duration accuracy, delay reduction percentages, departmental breakdown, and month-over-month safety trends. |
| **`DataSources.tsx`** | Integrations dashboard monitoring connected railway subsystems like TMS (Train Management System), FOIS (Freight Operations Information System), COA (Control Office Application), and IoT track sensors. |

---

### 🧩 UI Components & Modals (`src/components/`)

| Component | Usage |
| :--- | :--- |
| **`NewRequestModal.tsx`** | Multi-field form for creating new track maintenance requests (department, section, asset, duration, severity, reason, safety flag). |
| **`EditRequestModal.tsx`** | Allows modification of pending or scheduled requests. |
| **`RequestDetailsModal.tsx`** | Shows detailed requisition info, approval history, assigned resources, and AI score breakdown. |
| **`BlockModifyModal.tsx`** | Modifies existing track block start times, section assignment, or department involvement. |
| **`ConflictModal.tsx`** | Displays detected timetable conflicts between maintenance blocks and high-priority train schedules, recommending non-interfering slot alternatives. |
| **`NotificationsDrawer.tsx`** | Slide-out panel for system alerts, warnings, and quick jump links to corresponding screens. |
| **`ActivityLogModal.tsx`** | Real-time audit trail recording every action taken by users or AI algorithms. |
| **`ToastContainer.tsx`** | Render layer for dynamic pop-up notification messages across the app. |
| **`ResetDemoDialog.tsx`** | Resets all modified data in `localStorage` back to original mock data defaults. |

---

## 🔄 State Management Architecture (`src/context/AppContext.tsx`)

`AppContext` is the central brain of the application. It manages:
- **Active User Profile**: `employeeId`, `name`, `role`, `initial`.
- **Navigation State**: Active screen selection (`control`, `requests`, `planning`, `planner`, `corridor`, `analytics`, `datasources`).
- **Requisitions (`requests`)**: CRUD operations for adding, editing, approving, rejecting, and updating maintenance requests.
- **Track Blocks (`blocks`)**: CRUD operations for AI recommendations, block planning, modifying, and approving track blocks.
- **Notifications & Toasts**: Real-time push notifications and auto-dismissing toast alerts.
- **Activity Log**: Event logger recording actions like `"Block Approved by Controller"`, `"New Request Created"`, etc.

---

## ⚡ How to Run & Develop

1. **Install Dependencies**:
   ```bash
   pnpm install  # or npm install
   ```
2. **Start Development Server**:
   ```bash
   npm run dev
   ```
3. **Build for Production**:
   ```bash
   npm run build
   ```
4. **Format Codebase**:
   ```bash
   npm run format
   ```

---

## 🌟 Summary
Ye project modern web development best practices (React 19 + TypeScript + Vite + Tailwind CSS v4 + Recharts) ka standard example hai, specifically designed for **Indian Railways Operational Excellence**.
