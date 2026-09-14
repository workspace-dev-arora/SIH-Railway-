REDESIGN ONLY THE AUTHENTICATED INTERNAL WEB APPLICATION EXPERIENCE OF TRACKSYNC.

IMPORTANT:
The existing TrackSync landing page, welcome animation, “नमस्ते”, “वन्दे मातरम्”, TrackSync startup transition, and login experience are already finalized and should NOT be changed.

DO NOT redesign the landing page.
DO NOT redesign the login page.
DO NOT remove or recreate the existing internal functionality.

The current internal planner application already contains the required functionality, but its visual design feels disconnected from the premium landing/login experience.

Your task is to visually and interaction-wise transform the existing authenticated web application so that it feels like a seamless continuation of the same TrackSync product.

==================================================
CORE OBJECTIVE
==================================================

When the user does:

Landing
→ welcome animation
→ login
→ enters Employee ID + Password
→ Sign In

the transition into the internal planner application should feel completely seamless.

The user should feel:

“This is the same product.”

NOT:

“I just opened a different dashboard.”

Preserve all existing internal features and pages.

Only improve:
- visual system
- layout hierarchy
- navigation
- spacing
- typography
- cards
- buttons
- tables
- filters
- charts
- AI recommendation panels
- transitions
- micro-interactions
- overall polish

==================================================
VISUAL IDENTITY
==================================================

Maintain the finalized TrackSync identity:

Modern Indian Railways
×
Premium Enterprise Software
×
Digital India
×
AI-assisted Operations

Use a LIGHT premium interface.

Primary Navy:
#123B66

Deep Navy:
#0B2545

Primary Blue:
#1769AA

Saffron:
#F28C28

India Green:
#138A4B

Background:
#F7F9FC

White:
#FFFFFF

Primary Text:
#17202A

Secondary Text:
#64748B

Border:
#E2E8F0

Use Saffron and Green sparingly.

Use premium blue gradients only for important primary actions, selected states and key AI actions.

Do NOT make the whole interface colorful.

Do NOT use dark mode.

Do NOT use purple AI gradients.

Do NOT use neon colors.

Do NOT use heavy glassmorphism.

Do NOT make everything extremely rounded.

==================================================
DESIGN LANGUAGE
==================================================

The internal application should feel:

clean
calm
professional
premium
high-trust
modern
operational
Indian Railway specific

Use:

- generous whitespace
- subtle shadows
- thin borders
- moderate corner radius
- crisp typography
- strong hierarchy
- compact but readable operational data
- consistent spacing
- restrained color

The design should feel inspired by premium enterprise software, not a generic admin panel.

==================================================
POST-LOGIN TRANSITION
==================================================

When the user clicks Sign In successfully, do NOT instantly jump to the dashboard.

Create a very short premium transition.

Sequence:

1.
Login screen smoothly fades/slides away.

2.
Centered on an off-white background:

“Welcome back, Planner.”

3.
Below it:

“Today’s railway operations overview is ready.”

4.
A very subtle TrackSync railway-line animation appears underneath.

5.
Then transition smoothly into the Control Center.

Duration:
approximately 1–2 seconds.

Keep it subtle and premium.

No loading spinner unless required.

No excessive animation.

==================================================
AUTHENTICATED APP SHELL
==================================================

Redesign the internal application shell.

LEFT SIDEBAR:

Use a clean white sidebar with subtle separation from the main workspace.

Top:

TrackSync wordmark

Small subtle saffron-white-green tricolor line beneath the logo.

Navigation:

Control Center
Maintenance Requests
AI Planning
Block Planner
Calendar
Corridor View
Analytics
Data Sources

Use simple consistent outline icons.

The active page should use:

very light blue background
primary navy text
small blue accent indicator

Do not use huge filled navigation buttons.

Bottom:

Notifications
Settings
Planner profile

==================================================
TOP HEADER
==================================================

Create a minimal top header.

Left:
Current page title

Right:
Division selector
Date
Search
Notifications
Profile

Keep the header clean.

Avoid oversized controls.

==================================================
CONTROL CENTER
==================================================

Preserve all existing dashboard information.

But redesign the layout to reduce visual clutter.

Do NOT display too many large KPI cards.

Use fewer, stronger KPI cards.

Recommended KPI hierarchy:

Pending Requests
Critical Tasks
Blocks Planned
Asset Availability

Secondary metrics can appear lower on the page:

Block Hours Saved
Train Conflicts

Use consistent card heights.

Use subtle icon containers.

Use clear typography.

==================================================
AI RECOMMENDATION
==================================================

Make the AI recommendation visually important but elegant.

Use a clean white panel with a subtle saffron accent line or header.

Example:

AI RECOMMENDATION

B014
A–B Section

18 Sep
22:00–00:30

3 coordinated maintenance activities

Engineering
Track Repair

S&T
Signal Inspection

Traction
OHE Inspection

AI reasoning:

Critical maintenance
Compatible location
Low train impact
Suitable available window

Primary CTA:

Approve Block

Secondary:
Modify
Reject

Use a premium blue gradient only for the primary CTA.

==================================================
MAINTENANCE REQUESTS
==================================================

Preserve the existing table and request functionality.

Improve:

- row spacing
- typography
- filtering
- badges
- hover states
- request detail side panel

Priority:

Critical
High
Medium
Low

Use subtle status badges rather than large colored blocks.

Tables should feel premium and readable.

==================================================
AI PLANNING
==================================================

Redesign the AI planning workspace as a polished decision-support interface.

Show:

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
Recommendation

Use elegant connected steps.

Avoid flashy AI visuals.

Use subtle motion when analysis is running.

When completed:

“AI Recommendation Ready”

==================================================
BLOCK PLANNER
==================================================

Keep the existing functionality.

Improve the visual presentation of:

- railway sections
- timeline
- train movements
- available windows
- maintenance blocks
- conflicts
- recommended block

Create a clean enterprise Gantt/timeline experience.

Use:

Blue:
planned maintenance

Saffron:
AI recommendation

Green:
approved/completed

Red:
critical conflict

Keep the railway corridor visually recognizable.

Example:

A ━━━ B ━━━ C ━━━ D

Show section labels clearly.

==================================================
CALENDAR
==================================================

Keep weekly and monthly planning.

Redesign the calendar to be:

clean
spacious
modern
easy to scan

Use subtle block indicators.

Clicking a block opens a clean detail panel.

==================================================
CORRIDOR VIEW
==================================================

Preserve the railway corridor visualization.

Make it feel like a modern schematic railway planning interface.

Show:

stations
sections
maintenance
trains
blocks
conflicts

Avoid a generic SaaS map.

==================================================
ANALYTICS
==================================================

Keep existing analytics.

Redesign the charts to use a restrained palette.

Primary:
Navy / Blue

Positive:
Green

Warning:
Saffron

Critical:
Red

Avoid rainbow charts.

The Before vs AI comparison should be especially clear.

Example:

CONVENTIONAL
12 Blocks
28 Block Hours
9 Conflicts

TRACKSYNC AI
7 Blocks
17 Block Hours
3 Conflicts

Clearly label:

Illustrative prototype scenario

==================================================
DATA SOURCES
==================================================

Preserve TMS
SMMS
TDMS
COA

Display them as clean integration cards.

Each:

System name
Connection status
Last sync
Records
Data health

Use:

Connected
Syncing
Attention Required

Do not imply live access to internal railway systems.

==================================================
BUTTON SYSTEM
==================================================

Create a consistent button hierarchy.

PRIMARY:

Premium blue gradient
Deep Navy → Primary Blue

Examples:

Sign In
Generate Optimized Plan
Approve Block
Submit
Save

SECONDARY:

White background
Navy border/text

Examples:

Modify
View Details
Cancel

TERTIARY:

Text-only actions.

Do not make every action a filled button.

==================================================
CARDS
==================================================

Cards should be:

white
subtle shadow
thin border
moderate radius

Avoid dozens of floating cards.

Group related content into larger meaningful sections.

==================================================
TYPOGRAPHY
==================================================

Use Inter throughout the web application.

Headings:
strong but not oversized

Body:
comfortable reading size

Data:
compact and highly legible

Do not use monospace fonts unless displaying technical IDs where appropriate.

==================================================
MICRO-INTERACTIONS
==================================================

Add subtle premium interactions:

- smooth page transitions
- button hover
- card hover
- drawer slide
- modal fade
- timeline selection
- status changes
- AI analysis progress
- approval confirmation

Animation should be:

fast
smooth
subtle
professional

No bouncing.
No excessive scaling.
No flashy effects.

==================================================
INDIAN RAILWAY TOUCH
==================================================

Keep the Indian identity subtle.

Use:

TrackSync tricolor brand accent
railway corridor lines
station nodes
section identifiers
train movement patterns
railway-inspired status indicators

Do NOT add:
large Indian flags
decorative patriotic graphics
excessive saffron/green
festival-like visuals

==================================================
ROLE
==================================================

This authenticated web application is for the:

BLOCK / TRAFFIC PLANNER

Therefore prioritize:

decision-making
planning
coordination
AI recommendations
approval
monitoring

Do not clutter the planner interface with field-level execution controls that belong in the mobile app.

==================================================
MOST IMPORTANT REQUIREMENT
==================================================

The landing page, onboarding animation, login page and authenticated application must feel like ONE CONTINUOUS EXPERIENCE.

VISUAL JOURNEY:

नमस्ते
↓
वन्दे मातरम्
↓
TRACKSYNC
↓
Login
↓
Welcome back, Planner
↓
Control Center

The transition should preserve:

same background language
same typography
same colors
same spacing
same animation style
same premium feel
same visual identity

The user should never feel a visual break between login and the internal planner application.

==================================================
FINAL RESULT
==================================================

Do not change the functionality.

Do not remove existing screens.

Do not create unrelated features.

Do not redesign the product into a generic SaaS dashboard.

Instead:

REFINE THE EXISTING INTERNAL APPLICATION INTO A CLEAN, PREMIUM, MODERN, LIGHT-THEME TRACKSYNC PLANNER EXPERIENCE.

The final internal application should feel like the natural second chapter of the TrackSync onboarding experience.