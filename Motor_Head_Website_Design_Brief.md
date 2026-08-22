# Motor Head Website Design Brief

## 1. Website Objective

The Motor Head website should act as the official digital platform for the club. It must present the club professionally, preserve technical knowledge, support student recruitment, attract sponsors, and provide a maintainable system for future teams.

The website should be:

- Fast and mobile-first
- Professional and automotive-focused
- Easy to update through an admin dashboard
- Search-engine friendly
- Accessible and readable
- Useful for students, sponsors, faculty, alumni, and visitors

## 2. Target Audience

The website should be designed for these groups:

- BMSIT students who want to learn, join, or understand the club
- Sponsors and industry partners who want proof of work and impact
- Faculty and college leadership who need a professional representation of the club
- Alumni who want to stay connected or contribute
- Competition organizers who need clear vehicle and team information
- Automotive enthusiasts and the wider technical community

## 3. Design Direction

The visual style should feel like a serious automotive engineering club, not a generic college website.

The design should use:

- Matte black and white as the main base
- Racing red as the main accent color
- Strong vehicle photography
- Clean technical layouts
- Sharp typography
- Subtle scroll animations
- Structured cards and tables only where useful
- Clear spacing and readable content

Avoid:

- Overdecorated effects
- Too many animations
- Generic stock-style visuals
- Heavy gradients
- Overcrowded navigation
- Weak contrast
- Large blocks of unreadable text

## 4. Color Palette

### Primary Colors

| Purpose | Color | Hex |
|---|---:|---:|
| Primary black | Matte Black | `#121212` |
| Deep black | Section Dark | `#161616` |
| Racing red | Primary Accent | `#D71920` |
| Dark red | Secondary Accent | `#A90F15` |
| White | Main Background | `#FFFFFF` |

### Supporting Colors

| Purpose | Color | Hex |
|---|---:|---:|
| Body text | Near Black | `#121212` |
| Muted text | Grey | `#626262` |
| Borders | Light Grey | `#DEDEDE` |
| Soft section background | Soft Grey | `#F3F3F3` |
| Light row background | Pale Grey | `#F6F6F6` |

### Usage Rules

- Use black and white for the main structure.
- Use red only for important accents, buttons, active states, links, highlights, and section markers.
- Keep text contrast strong on both light and dark backgrounds.
- Avoid using red for large background areas; it should remain an accent.
- Use grey for supporting text, metadata, borders, and secondary information.

## 5. Typography

### Recommended Fonts

Use a strong, modern sans-serif font for the public website.

Recommended options:

- `Inter`
- `Manrope`
- `Satoshi`
- `Space Grotesk`
- `Arial` or `Helvetica` as fallback

### Suggested Font Stack

```css
font-family: Inter, Manrope, Arial, Helvetica, sans-serif;
```

### Typography Style

- Headings should be bold, confident, and slightly condensed if possible.
- Body text should be simple, readable, and not too small.
- Navigation text should be clear and medium-weight.
- Technical specs can use tables or compact structured layouts.
- Avoid decorative fonts.

### Suggested Sizes

| Element | Desktop | Mobile |
|---|---:|---:|
| Hero heading | 56-72px | 36-44px |
| Page heading | 40-52px | 30-36px |
| Section heading | 28-36px | 24-30px |
| Card heading | 18-22px | 17-20px |
| Body text | 16-18px | 15-17px |
| Metadata | 13-14px | 12-13px |

## 6. Main Navigation

The main navigation should stay focused and easy to scan.

Primary navigation:

- Home
- About
- Vehicles
- Team
- Events
- Resources
- Support Us
- Contact

Recommended navbar actions:

- Primary action: `Support Us` or `Contact`
- Secondary action: `Join Motor Head`

The navbar should be sticky on desktop and mobile. On mobile, use a clean menu with the same navigation order.

## 7. Full Website Structure

```text
Motor Head Website
|
|-- Home
|-- About
|-- Vehicles
|-- Team
|-- Events
|-- Resources
|-- Reports
|-- Media
|-- Support Us
|-- Contact
|-- Legal and SEO Pages
|-- Admin Dashboard
```

## 8. User Workflow

### General Visitor Flow

```text
Visitor lands on Home
-> Understands what Motor Head is
-> Sees vehicles, achievements, reports, and events
-> Chooses one action:
   - Explore vehicles
   - Read resources
   - View team
   - Join the club
   - Contact the club
   - Support as sponsor
```

### Sponsor Flow

```text
Sponsor lands on Home or Support Us
-> Reviews club achievements and vehicle work
-> Views sponsor benefits and current sponsors
-> Downloads sponsorship brochure
-> Submits sponsorship form
-> Admin team reviews request in dashboard
-> Club follows up through official email
```

### Student Flow

```text
Student lands on Home
-> Explores About, Team, Vehicles, and Resources
-> Reads subsystem resources
-> Checks upcoming events
-> Opens Join Motor Head section
-> Submits interest or contacts the team
```

### Content Admin Flow

```text
Authorized member logs in
-> Opens Admin Dashboard
-> Creates or edits content
-> Adds images, reports, metadata, and alt text
-> Saves as draft
-> Previews page
-> Publishes or schedules update
-> Content appears on public website
```

## 9. Home Page Sections

The Home page should give a strong first impression and guide visitors to deeper pages.

Recommended sections:

1. Sticky Navigation
2. Animated Hero Section
3. About Motor Head Preview
4. Club Statistics
5. Featured Vehicles
6. Major Achievements
7. Latest Reports
8. Upcoming Event
9. Latest Announcements
10. Media Highlights
11. Sponsors
12. Join / Support Call To Action
13. Footer

### Hero Section

The hero should include:

- High-quality vehicle image or short optimized video
- Clear headline about Motor Head
- Short supporting line
- Primary button: `Explore Vehicles`
- Secondary button: `Support Us` or `Join Motor Head`

### Statistics Section

Possible counters:

- Vehicles built
- Active members
- Departments
- Events conducted
- Awards or achievements
- Years active

## 10. About Page

The About page should explain the club identity and purpose.

Sections:

- Our Story
- Mission and Vision
- What We Do
- Club Departments
- Achievements
- Event Timeline
- Current and Future Goals
- Download Club Profile

## 11. Vehicles Page

The Vehicles page should present the club's engineering work.

Sections:

- All Vehicles overview
- Filter or category view if needed
- Vehicle cards with image, name, year, and short specs
- Individual vehicle pages

Each individual vehicle page should include:

- Vehicle Overview
- Technical Specifications
- Build Process
- Subsystems
- Build Timeline
- Team Involved
- Competition Results
- Gallery and Videos
- Technical Report

## 12. Team Page

The Team page should show people and responsibility clearly.

Sections:

- Faculty Coordinators
- Club Leadership
- Department Leads
- Current Members
- Alumni
- Join Motor Head

Team member cards should include:

- Name
- Role
- Department
- Photo if available
- LinkedIn or portfolio link if appropriate

## 13. Events Page

The Events page should handle upcoming and past activity.

Sections:

- Upcoming Events
- Event Calendar
- Announcements
- Past Event Pages

Each past event page should include:

- Event Details
- Results
- Event Report
- Photos and Videos

## 14. Resources Page

Resources should be organized around the main subsystems in the car.

Resource categories:

- Powertrain
- Drivetrain
- Vehicle Dynamics
- Brakes
- Basics Automotive
- Manufacturing

Notes:

- IC Engine content should come under Powertrain.
- Electrical content should come under Powertrain or Drivetrain depending on the topic.
- Do not add extra main resource pages beyond the six subsystem pages.
- Design, modelling, and simulation topics should be included under the relevant subsystem or Manufacturing when needed.

Resource features:

- Search
- Filters by subsystem
- Individual resource pages
- Author name
- Last updated date
- Related resources
- View or download option

Each resource page should include:

- Title
- Subsystem category
- Short description
- Main content
- Diagrams, images, or references if available
- Related vehicle or report links
- Downloadable file if required

## 15. Reports Page

Reports should be separate from Resources so formal documents remain easy to find.

Report categories:

- Annual Reports
- Vehicle Reports
- Competition Reports
- Event Reports

Features:

- Search
- Download
- Report summary
- Date
- Author or team
- Related vehicle or event

## 16. Media Page

The Media page should preserve club visuals and public coverage.

Sections:

- Photo Gallery
- Videos
- Press Coverage
- Social Media Links

Media items should include:

- Image or video thumbnail
- Title
- Date
- Event or vehicle relation
- Alt text for accessibility

## 17. Support Us Page

This page should be built for sponsors, donors, collaborators, mentors, and industry partners.

Sections:

- Why Support Motor Head
- Sponsorship Opportunities
- Sponsorship Packages
- Current Sponsors
- Equipment and Manufacturing Support
- Mentorship and Collaboration
- Download Sponsorship Brochure
- Sponsorship Form

Sponsorship form fields:

- Name
- Organization
- Email
- Phone
- Type of support
- Message
- Consent checkbox

## 18. Contact Page

The Contact page should provide official ways to reach the club.

Sections:

- Contact Form
- Official Email
- Campus Location and Map
- Social Media Links
- Frequently Asked Questions

Contact form fields:

- Name
- Email
- Phone
- Purpose
- Message

## 19. Legal and SEO Pages

Required supporting pages:

- Privacy Policy
- Terms of Use
- Accessibility Statement
- Sitemap
- Robots.txt

SEO requirements:

- Unique title and description for every page
- Clean URLs
- Sitemap generation
- Robots.txt
- Structured data for organization, events, articles, people, and breadcrumbs
- Social preview images
- Canonical URLs

## 20. Admin Dashboard

The admin dashboard should allow authorized members to update the website without editing code.

Dashboard sections:

- Dashboard Overview
- Manage Vehicles
- Manage Team Members
- Manage Events and Announcements
- Manage Achievements
- Manage Resources and Reports
- Manage Media
- Manage Sponsors
- Review Contact Submissions
- Review Sponsorship Requests
- SEO Settings
- Admin and Editor Accounts
- Publish, Schedule, and Preview Content

Recommended roles:

| Role | Responsibility | Access |
|---|---|---|
| Faculty / Club Lead | Final ownership and oversight | Administrator |
| Website Lead | Website management and publishing | Administrator |
| Content / Media Lead | Events, reports, gallery, updates | Editor |
| Department Leads | Submit technical content | Contributor |

## 21. Content Governance

Every main page should have:

- Page owner
- Review date
- Last updated date
- SEO title
- SEO description
- Featured image if needed

Operating rules:

- Outdated content should be reviewed or unpublished.
- Vehicle and report information must be verified before publishing.
- Sponsor logos should be approved before upload.
- Images must include alt text.
- Admin access should be reviewed during leadership changes.

## 22. Performance Requirements

The website should be optimized for real mobile networks.

Requirements:

- Responsive images using WebP or AVIF
- Lazy loading for images and videos
- Correct image dimensions
- Optimized fonts
- Minimal JavaScript
- Reduced animation payload
- Good Core Web Vitals
- Fast first load

## 23. Accessibility Requirements

The website should follow WCAG 2.2 AA-oriented practices.

Requirements:

- Keyboard navigation
- Visible focus states
- Strong text contrast
- Semantic HTML
- Alt text for images
- Captions or descriptions for important media
- Accessible forms
- Reduced-motion support
- Clear error messages

## 24. Recommended Technology

Suggested platform:

- Frontend: Next.js
- CMS: Sanity or Strapi
- Media: Cloudinary or equivalent
- Hosting: Vercel or equivalent
- Forms: Spam-protected form handling with email notification
- Analytics: Google Analytics or privacy-friendly alternative
- Search tools: Google Search Console and Bing Webmaster Tools

Important ownership rule:

The website, domain, hosting, CMS, email, and storage accounts should not depend on one student's personal account. Ownership and handover must be documented.

## 25. Launch Phases

### Phase 1: Discovery and Content Audit

- Confirm goals
- Confirm audiences
- Collect available photos
- Collect vehicle details
- Collect achievements
- Collect reports
- Confirm content owners

### Phase 2: Information Architecture and Design

- Finalize sitemap
- Finalize user journeys
- Create wireframes
- Define design system
- Finalize homepage concept
- Confirm mobile behavior

### Phase 3: Core Platform

- Build public pages
- Build content models
- Build admin dashboard
- Build forms
- Set up media handling
- Set up SEO foundation
- Set up analytics

### Phase 4: Content Population

- Add vehicle information
- Add team profiles
- Add events
- Add resources
- Add reports
- Add sponsor details
- Add gallery images

### Phase 5: Quality Assurance and Launch

- Test mobile layouts
- Test forms
- Test accessibility
- Test performance
- Test SEO metadata
- Test redirects
- Review content accuracy
- Launch website

### Phase 6: Operations and Growth

- Train editors
- Document handover
- Review backups
- Publish regular updates
- Review SEO monthly
- Add new features based on usage

## 26. Launch Readiness Checklist

- Approved sitemap
- Approved design direction
- Finalized color palette
- Finalized font system
- Verified content
- Official domain
- Official email
- Admin owners selected
- Privacy policy added
- Accessibility statement added
- Analytics connected
- Search Console connected
- Backups planned
- Handover guide created
