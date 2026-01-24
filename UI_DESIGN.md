✅ FINAL UI PLAN — PRODUCTION BLOG WEBSITE

Stack: React + Vite + Tailwind CSS
Backend: Your existing serverless MERN backend
Goal: Placement-ready, real-world product UI

1. CORE UI PRINCIPLES (LOCKED)

These are non-negotiable.

Content-first (reading > visuals)

Minimal, professional look

Predictable navigation

Role-based layouts (Public / User / Admin)

Clear UI states (loading, error, empty)

Mobile responsive by rule, not accident

If any UI decision violates these → it’s wrong.

2. GLOBAL DESIGN SYSTEM (FINAL)
Layout Width Rules
Context	Tailwind	Purpose
App shell	max-w-7xl	Navbar, home feed
Reading page	max-w-3xl	Blog content
Dashboard	max-w-5xl	Tools + content
Admin tables	w-full	Dense data
Modals	max-w-lg	Focused actions
Colors (Final)

Background: gray-50

Text primary: gray-800

Text muted: gray-500

Primary action: indigo-600

Success: green-600

Danger: red-500

No gradients. No fancy themes.

Typography

Font: Inter

Blog content: text-base leading-relaxed

Headings: clear hierarchy only (no decoration)

3. ROUTING ARCHITECTURE (FINAL)
Public Routes
/
 /blog/:slug
 /profile/:username
 /login
 /register
 /verify-otp
 /forgot-password
 /reset-password

Authenticated User Routes
/dashboard
/dashboard/write
/dashboard/blogs
/dashboard/bookmarks
/settings

Admin Routes
/admin
/admin/users
/admin/blogs


Routing is enforced using:

ProtectedRoute

AdminRoute

4. GLOBAL LAYOUT STRUCTURE
<App>
 ├── Navbar (sticky)
 ├── <Outlet /> (page content)
 └── Footer (minimal)
</App>


Dashboard and Admin replace Navbar with Sidebar.

5. PAGE-BY-PAGE FINAL UI DESIGN
🏠 HOME PAGE (Public)

Purpose: Content discovery (cached)

Layout

Desktop: Feed + Sidebar (75/25)

Mobile: Feed only

Components

BlogFeed

BlogCard

TrendingBlogs

PopularTags

States

Loading skeleton

Empty blogs

Error banner

📄 BLOG DETAIL PAGE (CRITICAL)

Purpose: Reading + engagement

Layout

Single column

max-w-3xl

No sidebar

Structure

Title

Author info + Follow

Date + read time

Cover image (optional)

Blog content (Markdown)

Like / Bookmark

CommentTree

States

Not found

Unpublished

Auth required (disable actions)

👤 PROFILE PAGE

Purpose: Social identity

Header

Avatar

Bio

Follow button

Tabs

Blogs

Bookmarks

Followers / Following

States

No blogs

Follow loading

6. AUTHENTICATION FLOWS (FINAL)
Login

Email + password

Rate-limit message

Error feedback

Register

Email + password

Redirect to OTP

OTP Verification

6 input boxes

Timer + resend

Expired / invalid state

Forgot / Reset Password

Email input

Reset form

Token expired handling

Auth pages use:

Centered max-w-md

No navbar distractions

7. USER DASHBOARD (FINAL)
Layout
| Sidebar | Content |


Sidebar Items

Write Blog

My Blogs

Bookmarks

Profile

Settings

✍️ WRITE BLOG PAGE (SIMPLIFIED, FINAL)

Title input (large)

Markdown textarea

Toolbar (basic: bold, heading, link, image)

Preview toggle (NOT side-by-side initially)

Category + tags

Cover image upload

Publish / Save draft

⚠️ No overengineering here.

📚 MY BLOGS PAGE

List / table

Status badge

Edit / delete

Pagination

⚙️ SETTINGS

Bio

Avatar

Social links

Change password

8. ADMIN UI (FINAL, MINIMAL)
Admin Dashboard

Total users

Total blogs

Active blogs

Admin Users

Table

Ban / unban

Admin Blogs

Unpublish / delete

No charts required for MVP.

9. COMMENT SYSTEM (FINAL)

Tree-based

Indentation capped

“View replies” for depth

Like / dislike

Auth-gated actions

10. GLOBAL UI STATES (MANDATORY)

Every page must handle:

Loading → skeletons

Empty → illustration + CTA

Error → banner + retry

Unauthorized → redirect / modal

Forbidden → 403 page

Rate-limited → timer warning

Session expired → login redirect

This is non-negotiable for production.

11. COMPONENT LIST (FINAL)

Reusable components only:

Navbar

Footer

Sidebar

BlogCard

BlogContent

UserAvatar

LikeButton

FollowButton

BookmarkButton

CommentTree

Loader

Skeleton

ErrorBanner

Modal

ProtectedRoute

AdminRoute

12. STATE MANAGEMENT (FINAL DECISION)

React Query → server state (blogs, profiles, comments)

Zustand → UI state (auth user, theme, modals)

No Redux needed.

13. FOLDER STRUCTURE (FINAL)
src/
 ├── components/ui
 ├── features/auth
 ├── features/blogs
 ├── features/profile
 ├── features/dashboard
 ├── features/admin
 ├── layouts
 ├── services
 ├── store
 ├── utils


Feature-based only.

14. BUILD ORDER (DO NOT CHANGE)

Layout + Navbar

Home Page (static)

Blog Detail Page

Auth pages

Profile page

Dashboard

Admin UI

UI states

Backend integration