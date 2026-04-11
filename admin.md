SUEDE Admin Dashboard
Feature Spec  |  v1.3  |  April 2026

Internal admin dashboard for founder use. Scope: visibility into platform activity, brand directory management, brand contact requests, and data export. No moderation workflows, no multi-user roles.

1. Overview Page
The default landing page. Shows key platform numbers at a glance.

1a. Member Metrics
Metric	Source
Total members	profiles table — count
New members this week	profiles table — created_at filter
New members this month	profiles table — created_at filter
Members with complete profiles	profiles — bust, waist, hips all filled
Members who used measurement consultation	consultation_sessions table — count
Avg. time to complete profile (signup → profile complete)	profiles — diff between created_at and measurements_completed_at

1b. Content Metrics
Metric	Source
Total reviews	reviews table — count
Total inquiries	review_requests table — count
Avg. time to submit first review (signup → first review)	reviews — diff between profile created_at and first review created_at per member
Avg. time to submit first inquiry (signup → first inquiry)	review_requests — same pattern per member
Avg. time to complete a review (start → submit, ongoing)	reviews — diff between review_started_at and created_at; all submissions
Avg. time to complete an inquiry (start → submit, ongoing)	review_requests — same pattern; all submissions

Note: review_started_at and inquiry_started_at should be logged when a member opens the review or inquiry form. If not currently tracked, dev should add these fields. "First" metrics measure onboarding friction; "ongoing" metrics measure form complexity over time.

1c. Directory & Inbound Metrics
Metric	Source
Brand suggestions pending	brand_suggestions table — status = pending
Platform improvement suggestions (unread)	feedback_suggestions table — read = false
Brand contact requests (unread)	brand_contact_requests table — read = false

Note: measurements_completed_at should be logged the first time all three measurement fields (bust, waist, hips) are present on a profile. If not currently tracked, dev should add this field.

2. Growth Panel
A chart showing member signups over time. Toggle between weekly and monthly view.

•	X axis: date (week or month)
•	Y axis: new signups
•	Data source: profiles table, grouped by created_at

Below the chart, show three numbers in a row:
•	Members with complete profiles
•	Members with incomplete profiles (missing any measurement)
•	Members who used measurement consultation

3. Review Activity
A table of all reviews, newest first. Read-only — for awareness, not moderation.

Reviewer	Brand	Date	Rating
Display name / handle	Brand name	created_at	1–5 stars

Link each row to the full review. No delete or edit controls in this view.

4. Inquiry Activity
A table of all inquiries, newest first. Read-only.

Member	Brand	Date	Responses
Display name / handle	Brand name	created_at	Response count

5. Brand Management
The brand directory is split into three tabs: Capsule Brands, Non-Capsule Brands, and Capsule Requests. No tiering is applied at this stage.

5a. Capsule Brands
Brands that have been approved and added to The Capsule. These are the only brands that carry a Drop assignment.

Brand Name	Drop	Date Added	Actions
Brand name	Drop 00, 01…	created_at	Edit | Remove

Edit panel fields (Capsule brands):
•	Brand name
•	Slug (auto-generated, editable)
•	Drop assignment (Drop 00, 01, etc.)
•	Website URL
•	Instagram handle

5b. Non-Capsule Brands
Brands that appear in The Lookbook through review activity but are not in The Capsule. Read-only view — these enter automatically when a review is submitted for a brand not yet in the directory.

Brand Name	Reviews	Actions
Brand name (from review)	Review count	Promote to Capsule | Flag for Review

Note: "Promote to Capsule" moves the brand into the Capsule Brands tab and prompts for Drop assignment. "Flag for Review" marks the brand name as potentially inaccurate and adds it to a flagged queue for admin resolution.

5c. Flag for Review — Logic
A non-capsule brand can be flagged manually by admin, or surfaced automatically by the system. Automated flags are advisory — no name is changed without admin action.

Automated flag triggers:
•	Duplicate suspicion — the brand name appears in multiple variations across reviews (e.g. "Réalisation Par", "Realisation Par", "Realisation") suggesting inconsistent entry for the same brand. Detected via fuzzy string matching against other non-capsule brand names and all Capsule brand names.
•	Misspelling signal — the name is within a close edit distance of a known Capsule brand name, suggesting a reviewer may have mistyped a brand they meant to review.
•	Junk entry — the name is very short (under 3 characters), all symbols, or matches a known placeholder pattern (e.g. "n/a", "the brand", "???").

Admin actions on a flagged brand:
•	Merge into existing brand — reassigns all reviews under this entry to a selected canonical brand name. The duplicate entry is removed.
•	Correct name — admin edits the brand name directly. All associated reviews update to reflect the corrected name.
•	Dismiss flag — the name is accurate as submitted. Removes the flag and prevents the same entry from being auto-flagged again.

Note: Fuzzy matching threshold and edit distance tolerance should be tuned post-launch once real submission patterns are visible. Start conservative (only flag obvious cases) and tighten over time.

5c. Capsule Requests (Brand Suggestions Queue)
All rows from brand_suggestions where status = pending. Members submit these to request a brand be added to The Capsule.

Suggested Brand	Submitted By	Date	Actions
Brand name	Member handle	created_at	Approve | Reject

Approve adds the brand to The Capsule and prompts for Drop assignment. Reject removes it from the queue.

6. Brand Contact Requests
Brands can reach out to SUEDE via a contact form available on their brand page (for capsule brands) and via a general inbound form sitewide. Both channels surface here.

6a. Capsule Brand Owner Requests
Submitted by someone claiming to be the owner or representative of an existing Capsule brand. Intent: claim their brand page, update brand info, or connect about the brand portal.

Brand	Name	Email	Date	Status
Brand name selected	Submitter name	Email address	created_at	New / Reviewed

Admin actions: Mark as Reviewed. No automated response — follow-up happens offline.

6b. General Brand Inquiries
General inbound from any brand (not tied to an existing Capsule listing). May be emerging brands interested in SUEDE, partnership interest, or general questions.

Brand / Name	Email	Date	Status
Brand name or submitter name	Email address	created_at	New / Reviewed

Admin actions: Mark as Reviewed. Message field is readable inline.
Note: Both contact forms should capture: brand name, contact name, email address, and a short message field. The capsule form additionally includes a brand selector (dropdown of current Capsule brands).

7. Platform Feedback
A suggestion box available sitewide for members to submit platform improvement ideas. All submissions appear here.

Submitted By	Suggestion	Date	Status
Member handle (or Anonymous)	Suggestion text (truncated, expand inline)	created_at	New / Reviewed

Admin actions: Mark as Reviewed. No response mechanism in v1.
Note: The suggestion box on the platform should be low-friction — a single text field with a submit button. Members should not be required to be logged in to submit, but logged-in submissions should capture the member handle automatically.

8. Member Directory
Read-only list of all registered members.

Handle	Email	Joined	Profile Complete	Reviews	Inquiries
Display name	Email address	created_at	Yes / No	Count	Count

Profile Complete = bust, waist, and hips are all filled in. No edit or delete controls. This view is for awareness only.

9. Data Export
Simple export controls. Each button triggers a CSV download.

•	Export all members (handle, email, joined date, profile complete Y/N, used consultation Y/N)
•	Export all reviews (reviewer handle, brand, date, rating)
•	Export all inquiries (member handle, brand, date, response count)
•	Export brand suggestions (brand name, submitted by, date, status)
•	Export platform feedback (submitted by, suggestion, date, status)
•	Export brand contact requests (type, brand, name, email, date, status)

Exports are unfiltered full-table downloads. No date range filtering in v1.

10. Out of Scope (v1)
The following are intentionally excluded from this version of the admin dashboard:

•	Moderation queue or content flagging controls
•	Multi-user admin roles or permissions
•	Brand portal subscription management (handled via Stripe dashboard)
•	Affiliate link reporting
•	The Consign / resale marketplace management
•	Email or notification sending from admin
•	Date-range filtering on exports
•	Automated brand owner verification or claim approval flow

SUEDE  ·  Internal Use Only  ·  suedecapsule.com
