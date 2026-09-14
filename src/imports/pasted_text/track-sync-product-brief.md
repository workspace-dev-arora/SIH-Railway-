Create a high-fidelity, modern enterprise web application called “TrackSync”.

Product:
TrackSync is an AI-powered maintenance block planning and coordination platform designed specifically for Indian Railways.

Problem:
Engineering, Signal & Telecom, and Traction Distribution departments independently request maintenance blocks. TrackSync brings these requests together, analyzes maintenance urgency and asset criticality, checks train traffic and available block windows, detects conflicts, identifies opportunities to coordinate work across departments, and recommends an optimized block plan.

IMPORTANT:
This is a decision-support system. AI recommends and explains the best plan, but an authorized Railway Planner remains the final decision-maker and can Approve, Modify, or Reject recommendations.

==================================================
VISUAL IDENTITY
==================================================

Create a professional, modern LIGHT theme.

The visual direction should feel like:

Modern Indian Railways × Enterprise Operations × Premium Digital India

It must NOT look like:
- a generic AI SaaS dashboard
- a futuristic cyberpunk interface
- a dark developer dashboard
- a purple AI startup
- an overly colorful government portal

Use a clean, spacious, premium enterprise interface with excellent hierarchy and accessibility.

Color palette:

Primary Navy: #123B66
Deep Navy: #0B2545
Primary Blue: #1769AA
Saffron Accent: #F28C28
India Green: #138A4B
Background: #F7F9FC
Cards: #FFFFFF
Primary Text: #17202A
Secondary Text: #64748B
Borders: #E2E8F0

Use Navy and Blue for primary navigation and actions.

Use Saffron and Green sparingly for important highlights and status.

Do NOT overuse the Indian tricolor.

Include a very subtle saffron-white-green visual accent in the TrackSync brand identity, such as a thin tricolor line or small brand detail.

Typography:
Use a clean modern enterprise font such as Inter for English.
Use a clean elegant Devanagari font such as Noto Sans Devanagari / Noto Serif Devanagari where Hindi is displayed.

Use:
- large clear headings
- medium-weight labels
- readable body text
- compact data typography
- strong visual hierarchy

Use moderate corner radius, subtle shadows, thin borders and generous whitespace.

==================================================
INDIAN RAILWAY VISUAL LANGUAGE
==================================================

The product should visually communicate Indian Railways without becoming decorative.

Use subtle railway-inspired elements:
- railway track lines
- station nodes
- corridor diagrams
- block markers
- train movement indicators
- signal-inspired status indicators
- section identifiers
- kilometer/location references
- maintenance possession windows

For network visualizations, use a schematic railway style rather than generic maps.

Example:

STATION A ━━━━━ STATION B ━━━━━ STATION C ━━━━━ STATION D

                    BLOCK B014
                  22:00–00:30

==================================================
WEB USER
==================================================

Primary user:
Authorized Railway Block / Traffic Planner.

Secondary web user:
Senior / Divisional Management for analytics and monitoring.

The Planner needs to:
- see maintenance requests
- understand urgency and criticality
- see conflicts with trains
- identify cross-department coordination opportunities
- review AI recommendations
- inspect alternative block timings
- approve, modify or reject recommendations
- monitor execution
- analyze block utilization and asset availability

==================================================
DESKTOP LAYOUT
==================================================

Create a responsive desktop application.

Left sidebar:

TRACKSYNC
small subtle tricolor accent

Navigation:

Control Center
Maintenance Requests
AI Planning
Block Planner
Calendar
Corridor View
Analytics
Data Sources

Bottom:
Planner Profile
Notifications
Settings

Top bar:
Page title
Division selector
Date
Search
Notifications
Planner profile

==================================================
SCREEN 1 — CONTROL CENTER
==================================================

Create a polished railway operations dashboard.

Header:
“Good Morning, Planner”

Subtitle:
“Here’s the maintenance and block planning overview for today.”

KPI cards:

Pending Requests
Critical Tasks
Blocks Planned
Asset Availability
Block Hours Saved
Train Conflicts

Use realistic prototype values but clearly make them representative/demo data.

Section:
“AI Recommended Plan”

Show a prominent recommendation card:

Block B014
A–B Section
18 Sep
22:00–00:30

Departments:
Engineering
Signal & Telecom
Traction

Show:
3 maintenance activities coordinated into 1 block

Why this block?
- Critical maintenance requirement
- Compatible departmental work
- Low train impact
- Suitable available window
- Reduced total block requirement

Buttons:
Approve
Modify
Reject

Section:
“Critical Maintenance”

Table with:
Request ID
Department
Activity
Section
Asset
Severity
Overdue
AI Priority
Status

Section:
“Today’s Operations”

Show:
Active Blocks
Upcoming Blocks
Delayed Work
Completed Work

Section:
“Corridor Status”

Display a simplified railway corridor:

A ━━━ B ━━━ C ━━━ D ━━━ E

Use different status indicators for:
Available
Maintenance Planned
Active Block
Conflict

Section:
“Before vs AI Planning”

Show a clean comparison:

Conventional Planning
12 Blocks
28 Block Hours
9 Train Conflicts

AI Optimized Planning
7 Blocks
17 Block Hours
3 Train Conflicts

Clearly label this as:
“Illustrative prototype scenario”

Do not claim these are real Indian Railways statistics.

==================================================
SCREEN 2 — MAINTENANCE REQUESTS
==================================================

Create a professional request management table.

Filters:
Department
Priority
Section
Request Type
Status
Date

Columns:
Request ID
Department
Activity
Section
Asset
Severity
Requested Date
Duration
AI Priority
Status

Clicking a request opens a detailed side panel.

Show:
Request details
Department
Activity
Location
Reason
Severity
Safety Critical
Overdue Days
Requested Dates
Preferred Time
Duration
Resources
Coordination Requirements
Description
Evidence

Show an AI analysis section:

AI Priority: HIGH

Reason:
Critical asset
High defect severity
Maintenance overdue
Moderate train impact

==================================================
SCREEN 3 — AI PLANNING
==================================================

Create a visual AI planning workflow.

Pipeline:

Maintenance Requests
↓
Priority Analysis
↓
Conflict Detection
↓
Task Coordination
↓
Train Impact Analysis
↓
Block Optimization
↓
Recommended Plan

Each step should have a status.

Show:
“AI Planning Complete”

Then show:

Top Priority Tasks

Task 1
Engineering — Track Repair
A–B Section
Priority: Critical

Task 2
S&T — Signal Inspection
A–B Section
Priority: High

Task 3
Traction — OHE Inspection
A–B Section
Priority: High

Show:
“Coordination Opportunity Detected”

3 maintenance activities can potentially be performed within one common block.

Show an AI recommendation:

Recommended Block:
B014
A–B Section
22:00–00:30

Train Impact:
Low

Coordination:
3 departments

Then buttons:
Approve Plan
Modify Plan
View Alternatives

==================================================
SCREEN 4 — BLOCK PLANNER
==================================================

This is the most important screen.

Create a sophisticated scheduling workspace.

Top:
Date selector
Division
Section
Department filters

Main area:
Timeline / Gantt-style railway planning interface.

Rows:
Train Movement
Engineering
Signal & Telecom
Traction
Available Block Window

Show train movements across time.

Show maintenance blocks as horizontal blocks.

Use:
Blue = planned
Saffron = AI recommendation
Green = approved
Red = conflict

Show a recommended block spanning:

22:00 ───────────── 00:30

Label:
B014 — AI Recommended

When selected, open an AI recommendation panel on the right.

Panel:
Why recommended?
Train impact
Maintenance priority
Department coordination
Asset criticality
Block utilization
Alternative slots

Buttons:
APPROVE
MODIFY
REJECT

Make it clear that AI is advisory and the planner remains in control.

==================================================
SCREEN 5 — CALENDAR
==================================================

Create:
Weekly view
Monthly view

Show blocks by:
Department
Section
Priority
Status

Use subtle status colors.

Allow selecting a day to see:
Planned blocks
Critical maintenance
Available windows
Conflicts

==================================================
SCREEN 6 — CORRIDOR VIEW
==================================================

Create a railway corridor visualization.

Example:

A ━━━ B ━━━ C ━━━ D ━━━ E

Show:
Train movements
Maintenance blocks
Asset locations
Active work
Conflicts

Clicking a section opens:

Section A–B

Current status:
Maintenance Planned

Upcoming Block:
B014
22:00–00:30

Departments:
Engineering
S&T
Traction

Assets:
Track Section
Signal
OHE

Train Impact:
Low

==================================================
SCREEN 7 — ANALYTICS
==================================================

Create management-level analytics.

Metrics:
Asset Availability
Block Utilization
Total Block Hours
Maintenance Completion
Critical Task Completion
Train Conflicts
Coordinated Tasks

Charts:
Before vs AI Planning
Block Hours
Train Conflicts
Department Workload
Critical Maintenance Completion

Use clean enterprise charts.

==================================================
SCREEN 8 — DATA SOURCES
==================================================

Show conceptual integrations:

TMS
SMMS
TDMS
COA

For each:
Connection Status
Last Sync
Records
Data Health

Important:
Clearly label prototype integrations as:
“Representative / Simulated Data”

Do NOT imply live access to Indian Railways internal systems.

==================================================
INTERACTION
==================================================

Make the prototype feel real.

Buttons should work.

Navigation should connect all screens.

Requests should flow into AI Planning.

AI Planning should flow into Block Planner.

Approved blocks should update Calendar and Corridor View.

Use sample Request ID:
BR-1024

Sample Block:
B014

Create a coherent end-to-end prototype experience.

==================================================
FINAL QUALITY
==================================================

Prioritize:
- premium enterprise UX
- modern light theme
- Indian Railways identity
- accessibility
- clear hierarchy
- realistic operational workflow
- human-in-the-loop AI
- responsive layouts
- professional data visualization

The final result should look credible enough to present as a serious Smart India Hackathon prototype.