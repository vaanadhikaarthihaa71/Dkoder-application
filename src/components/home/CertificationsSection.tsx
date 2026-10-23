import React, { useState } from 'react';
import { CERTIFICATION_TRACKS } from '../../data/mockData';
import { CertificationTrack } from '../../types';
import { 
  Award, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ArrowRight,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Check
} from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { useToast } from '../../context/ToastContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface CertificationsSectionProps {
  onNavigate: (path: string) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ onNavigate }) => {
  const { addToast } = useToast();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>();
  const [selectedTrack, setSelectedTrack] = useState<CertificationTrack>(CERTIFICATION_TRACKS[0]);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [activeCertForVerify, setActiveCertForVerify] = useState<CertificationTrack | null>(null);

  const handleVerifyCredential = (track: CertificationTrack) => {
    setActiveCertForVerify(track);
    setIsVerifyModalOpen(true);
    addToast({
      type: 'info',
      title: 'Credential Verified',
      description: `Cryptographic record active for ${track.sampleCredentialId}`
    });
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-16 sm:py-24 bg-white border-b border-[#E8E2EF] transition-all duration-700 ${
        isVisible ? 'reveal-visible' : 'reveal-init'
      }`}
      id="certifications"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3EDFF] text-[#5425A8] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Award className="w-3.5 h-3.5 text-[#FFD84D]" />
            <span>Domain Training & Credentials</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#211B2B] tracking-tight">
            Industry domain certifications with <span className="text-[#5425A8]">QR-verifiable credentials</span>
          </h2>
          <p className="mt-2.5 text-sm text-[#6F687A] leading-relaxed">
            Gain verified competency in high-demand tech specializations. Every certificate features a tamper-proof QR verification code recognized by hiring partners.
          </p>
        </div>

        {/* Domain Selection Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {CERTIFICATION_TRACKS.map((track) => {
            const isSelected = selectedTrack.id === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer interactive-tap ${
                  isSelected
                    ? 'bg-[#5425A8] text-white shadow-md'
                    : 'bg-[#FAF8FD] text-[#6F687A] hover:text-[#211B2B] hover:bg-[#F3EDFF] border border-[#E8E2EF]'
                }`}
              >
                {track.domain}
              </button>
            );
          })}
        </div>

        {/* Selected Track Deep-Dive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Track Details & Curriculum (Span 7) */}
          <div className="lg:col-span-7 bg-[#FAF8FD] rounded-3xl border border-[#E8E2EF] p-6 sm:p-8 flex flex-col justify-between card-subtle-shadow">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-[#5425A8] bg-[#F3EDFF] px-3 py-1 rounded-full">
                  {selectedTrack.level} Track
                </span>
                <div className="flex items-center gap-3 text-xs text-[#6F687A] font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#5425A8]" />
                    {selectedTrack.durationWeeks} Weeks
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#5425A8]" />
                    {selectedTrack.handsOnLabs} Practical Labs
                  </span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#211B2B] mb-2">
                {selectedTrack.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6F687A] leading-relaxed mb-6">
                {selectedTrack.description}
              </p>

              {/* Skills Acquired */}
              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-[#211B2B] mb-2.5">
                  Core Skills Acquired:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTrack.skillsAcquired.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E8E2EF] text-xs font-semibold text-[#211B2B]"
                    >
                      <Check className="w-3 h-3 text-[#5425A8] stroke-[3]" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Syllabus Breakdown */}
              <div className="space-y-2.5 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-[#211B2B] mb-1">
                  Curriculum Modules:
                </div>
                {selectedTrack.syllabus.map((mod, mIdx) => (
                  <div key={mIdx} className="bg-white rounded-xl border border-[#E8E2EF] p-3">
                    <div className="text-xs font-bold text-[#5425A8]">{mod.title}</div>
                    <div className="text-[11px] text-[#6F687A] mt-1 flex flex-wrap gap-x-3 gap-y-1">
                      {mod.topics.map((t, tIdx) => (
                        <span key={tIdx} className="inline-flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-[#FFD84D]" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E8E2EF]">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('/student/subscription')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-bold interactive-tap"
              >
                Access Full Certification
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => handleVerifyCredential(selectedTrack)}
                leftIcon={<QrCode className="w-4 h-4 text-[#5425A8]" />}
                className="font-semibold bg-white interactive-tap"
              >
                Inspect Sample QR Credential
              </Button>
            </div>
          </div>

          {/* Right Column: Simulated Tamper-Proof Certificate Card (Span 5) */}
          <div className="lg:col-span-5 bg-gradient-to-tr from-[#FAF8FD] to-white rounded-3xl border-2 border-[#E8E2EF] p-6 sm:p-7 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            
            {/* Top Certificate Watermark */}
            <div className="flex items-center justify-between border-b border-[#E8E2EF] pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#5425A8] text-[#FFD84D] flex items-center justify-center font-black text-xs">
                  DK
                </div>
                <div>
                  <div className="text-xs font-black tracking-tight text-[#211B2B]">DKODER VERIFIED</div>
                  <div className="text-[9px] text-[#6F687A]">Operated by Xyzon Innovations</div>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Issuer</span>
              </div>
            </div>

            {/* Simulated Certificate Certificate Body */}
            <div className="space-y-4 my-auto py-2">
              <div className="text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#6F687A]">
                  Certificate of Professional Achievement
                </div>
                <div className="text-lg font-black text-[#211B2B] mt-1">
                  Arjun S. Krishnan
                </div>
                <div className="text-[11px] text-[#6F687A]">
                  Anna University, College of Engineering Guindy
                </div>
              </div>

              <div className="text-center bg-white p-3.5 rounded-2xl border border-[#E8E2EF]">
                <div className="text-[10px] text-[#6F687A] font-medium">Successfully completed the specialized curriculum in:</div>
                <div className="text-sm font-extrabold text-[#5425A8] mt-0.5">
                  {selectedTrack.title}
                </div>
                <div className="text-[10px] text-[#211B2B] font-semibold mt-1">
                  Grade: Distinction (94.8% Assessment Score)
                </div>
              </div>

              {/* QR Verification Strip */}
              <div className="flex items-center justify-between bg-[#F3EDFF] p-3 rounded-2xl border border-purple-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white p-1 border border-purple-200 flex items-center justify-center shadow-2xs">
                    <QrCode className="w-8 h-8 text-[#5425A8]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold text-[#211B2B]">
                      {selectedTrack.sampleCredentialId}
                    </div>
                    <div className="text-[9px] text-[#5425A8] font-semibold flex items-center gap-1">
                      <span>Live Cryptographic Ledger</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleVerifyCredential(selectedTrack)}
                  className="text-[10px] font-bold text-[#5425A8] hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            {/* Bottom Footer Details */}
            <div className="pt-4 border-t border-[#E8E2EF] flex items-center justify-between text-[10px] text-[#6F687A]">
              <span>Campus Accreditation Code: <strong>NBA-DK-2026</strong></span>
              <span className="font-mono">SHA-256 Validated</span>
            </div>

          </div>

        </div>

        {/* Institutional Note */}
        <div className="mt-8 text-center bg-[#FAF8FD] p-3.5 rounded-2xl border border-[#E8E2EF] max-w-2xl mx-auto flex items-center justify-between flex-col sm:flex-row gap-2">
          <div className="text-xs text-[#6F687A]">
            <strong className="text-[#211B2B]">Are you a College Placement Dean?</strong> Access bulk student certification bundles via our campus MOU.
          </div>
          <button 
            onClick={() => onNavigate('/partner-mou')}
            className="text-xs font-bold text-[#5425A8] hover:underline shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>Institutional MOU Enquiry</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Verification Modal */}
      {activeCertForVerify && (
        <Modal
          isOpen={isVerifyModalOpen}
          onClose={() => setIsVerifyModalOpen(false)}
          title="Tamper-Proof Credential Verification"
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-emerald-900">Certificate Status: Authenticated & Active</div>
                <div className="text-xs text-emerald-700 mt-0.5">
                  Issued under DKODER Placement Learning Management System (Xyzon Innovations).
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8FD] rounded-xl p-4 border border-[#E8E2EF] space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-[#E8E2EF] pb-2">
                <span className="text-[#6F687A]">Credential ID:</span>
                <span className="font-mono font-bold text-[#211B2B]">{activeCertForVerify.sampleCredentialId}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8E2EF] pb-2">
                <span className="text-[#6F687A]">Track Specialization:</span>
                <span className="font-bold text-[#211B2B]">{activeCertForVerify.title}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8E2EF] pb-2">
                <span className="text-[#6F687A]">Issuing Entity:</span>
                <span className="font-bold text-[#5425A8]">DKODER • Xyzon Innovations (Chennai)</span>
              </div>
              <div className="flex justify-between border-b border-[#E8E2EF] pb-2">
                <span className="text-[#6F687A]">Verification Ledger:</span>
                <span className="font-mono text-[11px] text-[#211B2B]">0x4f8a...c93e (Verified)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6F687A]">Institutional Validity:</span>
                <span className="font-bold text-emerald-700">Campus Placement & Industry Recognized</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsVerifyModalOpen(false)}
                className="font-bold"
              >
                Close Record
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </section>
  );
};
