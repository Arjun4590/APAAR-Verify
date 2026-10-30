import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { LandingPage } from './pages/landing/LandingPage';

// Admin Pages
import { OverviewDashboard } from './pages/admin/OverviewDashboard';
import { InstitutionManagement } from './pages/admin/InstitutionManagement';
import { StudentRepository } from './pages/admin/StudentRepository';
import { VerificationCentre } from './pages/admin/VerificationCentre';
import { AnomalyMonitoring } from './pages/admin/AnomalyMonitoring';
import { ExceptionsReview } from './pages/admin/ExceptionsReview';
import { RegulatoryRules } from './pages/admin/RegulatoryRules';
import { Reports } from './pages/admin/Reports';
import { AuditTrail } from './pages/admin/AuditTrail';
import { Settings } from './pages/admin/Settings';

// Institution Pages
import { InstitutionDashboard } from './pages/institution/InstitutionDashboard';
import { InstitutionProfile } from './pages/institution/InstitutionProfile';
import { CoursesIntake } from './pages/institution/CoursesIntake';
import { StudentRecords } from './pages/institution/StudentRecords';
import { BulkUploadCentre } from './pages/institution/BulkUploadCentre';
import { ValidationCentre } from './pages/institution/ValidationCentre';
import { Corrections } from './pages/institution/Corrections';
import { SubmissionHistory } from './pages/institution/SubmissionHistory';
import { ExceptionResponses } from './pages/institution/ExceptionResponses';
import { InstitutionReports } from './pages/institution/InstitutionReports';
import { IntegrationSettings } from './pages/institution/IntegrationSettings';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { AcademicRecords } from './pages/student/AcademicRecords';
import { CorrectionRequest } from './pages/student/CorrectionRequest';
import { ConsentSharing } from './pages/student/ConsentSharing';
import { VerificationHistory } from './pages/student/VerificationHistory';
import { QRVerification } from './pages/student/QRVerification';

// Stakeholder Pages
import { StakeholderDashboard } from './pages/stakeholder/StakeholderDashboard';
import { NewVerificationRequest } from './pages/stakeholder/NewVerificationRequest';
import { VerificationResults } from './pages/stakeholder/VerificationResults';
import { RequestHistory } from './pages/stakeholder/RequestHistory';
import { OrganizationProfile } from './pages/stakeholder/OrganizationProfile';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Landing page with Role and Scenario selectors */}
      <Route path="/" element={<LandingPage />} />

      {/* Portal 1: AICTE Administration */}
      <Route path="/admin" element={<MainLayout />}>
        <Route index element={<OverviewDashboard />} />
        <Route path="institutions" element={<InstitutionManagement />} />
        <Route path="students" element={<StudentRepository />} />
        <Route path="verification-centre" element={<VerificationCentre />} />
        <Route path="anomalies" element={<AnomalyMonitoring />} />
        <Route path="exceptions" element={<ExceptionsReview />} />
        <Route path="rules" element={<RegulatoryRules />} />
        <Route path="reports" element={<Reports />} />
        <Route path="audit" element={<AuditTrail />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Portal 2: Institution Portal */}
      <Route path="/institution" element={<MainLayout />}>
        <Route index element={<InstitutionDashboard />} />
        <Route path="profile" element={<InstitutionProfile />} />
        <Route path="courses" element={<CoursesIntake />} />
        <Route path="students" element={<StudentRecords />} />
        <Route path="upload" element={<BulkUploadCentre />} />
        <Route path="validation" element={<ValidationCentre />} />
        <Route path="corrections" element={<Corrections />} />
        <Route path="submissions" element={<SubmissionHistory />} />
        <Route path="exceptions" element={<ExceptionResponses />} />
        <Route path="reports" element={<InstitutionReports />} />
        <Route path="settings" element={<IntegrationSettings />} />
      </Route>

      {/* Portal 3: Student Portal */}
      <Route path="/student" element={<MainLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="records" element={<AcademicRecords />} />
        <Route path="correction" element={<CorrectionRequest />} />
        <Route path="consent" element={<ConsentSharing />} />
        <Route path="history" element={<VerificationHistory />} />
        <Route path="qr" element={<QRVerification />} />
      </Route>

      {/* Portal 4: Stakeholder Verification */}
      <Route path="/stakeholder" element={<MainLayout />}>
        <Route index element={<StakeholderDashboard />} />
        <Route path="new-request" element={<NewVerificationRequest />} />
        <Route path="results" element={<VerificationResults />} />
        <Route path="history" element={<RequestHistory />} />
        <Route path="profile" element={<OrganizationProfile />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

