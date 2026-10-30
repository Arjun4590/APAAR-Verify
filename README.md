# APAAR-Verify — Frontend Demonstration (SIH 2026 PS SIH26263)

**Smart India Hackathon 2026** · **Problem Statement SIH26263**  
**Centralized Student Identity, Enrolment Validation & Regulatory Verification Platform for AICTE-Approved Institutions**

---

## 🌟 Executive Summary

**APAAR proves a student's unique identity. It does not, by itself, prove current institutional enrolment, approved intake compliance, or multi-programme timing validity.**

APAAR-Verify is an intelligent verification and validation layer built **around** existing institutional reporting channels. It normalizes data formats, validates records in an isolated staging area before commitment, detects cross-institution duplicates, identifies peer anomalies, and resolves discrepancies through explainable human review.

This repository contains a **complete, polished, interactive frontend demonstration** built strictly with synthetic data and browser-side state management.

---

## 🚀 Quick Start (Local Run Instructions)

### Prerequisites
- Node.js (v18+ or v20+ / v22 recommended)
- npm or pnpm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser at: **`http://localhost:5173`**

### 3. Build for Production / Preview
```bash
npm run build
npm run preview
```

---

## 🏛️ The Four Independent Portals

1. **AICTE Administration Portal (`/admin`)**
   - National Enrolment Dashboard & Recharts analytics
   - Institution Management (filters by state, reporting group, validation status)
   - Central Student Repository (masked APAAR, separated identity from enrolment history)
   - Verification Centre (A1–A6 engine diagnostics, side-by-side comparison)
   - Anomaly Monitoring (A7 statistical signals, multi-year fill-rate cliffs, peer benchmarking)
   - Exceptions & Reviews (human-in-the-loop decisions, reversible identity merges)
   - Regulatory Rules Configuration (versioned handbook clauses: TFW 5%, FN 15%/25%, Lateral Entry 10%, Dual Enrolment matrix)
   - Reports with live CSV export
   - Tamper-Evident Audit Trail (simulated SHA-256 hash chain)
   - Platform Settings & Simulation Controls

2. **Institution Portal (`/institution`)**
   - Scoped to **Western Institute of Technology (Demo)** (`inst-wit-01`)
   - Institution Profile (read-only approved profile fields)
   - Courses & Intake Capacity (supernumerary category caps breakdown)
   - Institutional Student Records (with Legitimate Lateral Entry validation)
   - Bulk Upload Centre (guided 3-step wizard with Scenario A/B/C loaders)
   - Staging Validation Centre (blocking errors vs review findings)
   - **Fix-Before-Submit Staging (`/institution/corrections`)** — Inline editable table with atomic commit gate
   - Submission History with lifecycle statuses (`Draft → Uploaded → Failed/Passed → Committed → Under Review → Accepted`)
   - Exception Responses (clarification responses with evidentiary file attachments)
   - Institutional Reports & CSV exports
   - Integration Settings (simulated APAAR, NAD, ERP connectors with live handshake test)

3. **Student Portal (`/student`)**
   - Scoped to **Aarav Sharma (Student)**
   - Student Dashboard with active enrolment and verification badges
   - My Academic Records (strict personal data isolation & multiple enrolment view)
   - Data Correction Request ticketing (routes to institution; students cannot alter regulatory records)
   - Consent & Third-Party Sharing (approve or deny employer background check inquiries)
   - Verification Access History
   - Digital QR Verification Route (with public-sector routing disclaimer)

4. **Stakeholder Verification Portal (`/stakeholder`)**
   - Primary user: **Tata Consultancy Services (Talent Acquisition & BGV)**
   - Dashboard with consent-governed inquiry metrics
   - New Verification Request with token validation (`VRF-2026-8821`)
   - Consent-Aware Verification Results Dossier (only approved inquiries reveal academic records)
   - Request History with CSV export
   - Organization Profile & DPDP compliance accreditation

---

## 🎬 Interactive Demonstration Scenarios

Use the **Scenario Bar** in the Topbar or the Landing Page to instantly trigger any of the 6 end-to-end workflows:

- **Scenario A — Fix-Before-Submit (Core Workflow):**
  - Staging batch has an 11-digit APAAR (`98451029381`), an in-file duplicate (Row 4 & 5), and 7 TFW admissions (cap is 6 seats on 120 intake).
  - The Commit button is locked while blocking errors exist.
  - Edit inline or use the quick helper buttons to fix Row 2 and Row 5.
  - Revalidate: blocking errors drop to 0; Commit unlocks.
  - Click Commit: atomic promotion promotes records into the central repository and generates a cryptographically linked audit event!
- **Scenario B — Exact APAAR Match (Dual Mode):**
  - Aarav Sharma enrolled at WIT (Physical CSE) and NOOLA (Online BCA).
  - Evaluated under UGC 2022 guidelines as Informational (No Violation).
- **Scenario C — Fuzzy Identity Candidate & Physical Shift Overlap:**
  - Rohit S. Verma (WIT, CSE, no APAAR, morning shift) vs Rohit Verma (DMEC, ECE, APAAR 994812345678, morning shift).
  - Identical DOB and 92.5% phonetic token similarity.
  - Requires human confirmation before merge; supports reversible identity linking in the Exceptions queue!
- **Scenario D — Institutional Anomaly Signal:**
  - Apex Institute passes individual A1-A6 checks, but exhibits a 45.5% fill-rate cliff (87.7% → 42.2% vs 76.5% peer median).
  - Clearly evaluated as an administrative risk signal, not automated fraud.
- **Scenario E — Legitimate Lateral Entry:**
  - Priya Patel entering 2nd Year Electrical Engineering with prior Polytechnic Diploma (86.4%).
  - Evaluated within the configured 10% lateral entry cap; absence of 1st-year record is legitimate and verified.
- **Scenario F — Student Consent & Stakeholder Verification:**
  - Student Aarav Sharma approves TCS inquiry in Student Portal (`/student/consent`).
  - Swaps to Stakeholder Portal (`/stakeholder/results`) to view the verified academic credential dossier and QR token.

---

## 🔒 Strict Technical & Data Constraints

- **Frontend-Only:** Pure client-side state with `localStorage` persistence and a **Reset Demo Data** action.
- **No External Network Calls:** No real APAAR, ABC, DigiLocker, NAD, or AICTE integrations. All connectors operate in clearly labelled **Simulated** mock adapter mode.
- **No Aadhaar Collection:** Aadhaar numbers are never collected, stored, or requested.
- **Synthetic Demo Data:** All students, institutions, permanent codes, and metrics are synthetic.

