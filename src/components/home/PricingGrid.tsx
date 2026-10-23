import React, { useState } from 'react';
import { PRICING_PLANS } from '../../data/mockData';
import { PricingPlan } from '../../types';
import { 
  Check, 
  Sparkles, 
  GraduationCap,
  ChevronDown,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { useToast } from '../../context/ToastContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface PricingGridProps {
  onNavigate: (path: string) => void;
}

export const PricingGrid: React.FC<PricingGridProps> = ({ onNavigate }) => {
  const { addToast } = useToast();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>();

  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan | null>(null);
  const [couponCode, setCouponCode] = useState('CAMPUS2026');
  const [couponApplied, setCouponApplied] = useState(false);
  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>({});

  const togglePlanFeatures = (planId: string) => {
    setExpandedPlans((prev) => ({ ...prev, [planId]: !prev[planId] }));
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'CAMPUS2026') {
      setCouponApplied(true);
      addToast({
        type: 'success',
        title: 'Coupon Applied',
        description: '15% student discount applied to subscription.'
      });
    } else {
      addToast({
        type: 'error',
        title: 'Invalid Coupon',
        description: 'Try coupon code CAMPUS2026 for a student discount.'
      });
    }
  };

  const handleSimulateSubscription = () => {
    if (!selectedPlanForCheckout) return;
    addToast({
      type: 'success',
      title: `${selectedPlanForCheckout.name} Plan Activated (Demo)`,
      description: 'Your account is upgraded with all included curriculum tracks.'
    });
    setSelectedPlanForCheckout(null);
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-16 sm:py-24 bg-[#FAF8FD] border-b border-[#E8E2EF] transition-all duration-700 ${
        isVisible ? 'reveal-visible' : 'reveal-init'
      }`} 
      id="pricing"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3EDFF] text-[#5425A8] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Zap className="w-3.5 h-3.5 text-[#FFD84D] fill-[#FFD84D]" />
            <span>Student Subscriptions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#211B2B] tracking-tight">
            Transparent, student-friendly <span className="text-[#5425A8]">annual pricing</span>
          </h2>
          <p className="mt-2 text-sm text-[#6F687A]">
            Priced from ₹2 to ₹9 per day. Full access to real questions, salary filters, and AI report cards.
          </p>
        </div>

        {/* 5-Plan Directly Comparable Cards with Progressive Disclosure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
          {PRICING_PLANS.map((plan, idx) => {
            const isRecommended = plan.name === 'Platinum';
            const isExpanded = !!expandedPlans[plan.id];
            const initialFeatures = plan.features.slice(0, 3);
            const remainingFeatures = plan.features.slice(3);

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-5 flex flex-col justify-between transition-all duration-200 relative card-hover-shadow ${
                  isRecommended
                    ? 'border-2 border-[#5425A8] shadow-xl ring-4 ring-[#5425A8]/10'
                    : 'border border-[#E8E2EF] hover:border-[#5425A8]/50 shadow-xs'
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#5425A8] text-[#FFD84D] px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md border border-[#FFD84D]/40">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD84D] fill-[#FFD84D]" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-base font-extrabold text-[#211B2B]">
                      {plan.name}
                    </h3>
                    <span className="text-base">
                      {plan.name === 'Bronze' ? '🥉' : plan.name === 'Silver' ? '🥈' : plan.name === 'Gold' ? '🥇' : plan.name === 'Platinum' ? '💎' : '🚀'}
                    </span>
                  </div>
                  <p className="text-xs text-[#6F687A] mt-0.5 line-clamp-2 leading-relaxed">
                    {plan.tagline}
                  </p>

                  {/* Price & Billing */}
                  <div className="my-3.5 pb-3.5 border-b border-[#E8E2EF]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-[#211B2B]">₹{plan.annualPrice}</span>
                      <span className="text-xs text-[#6F687A]">/ yr</span>
                    </div>
                    <div className="text-[11px] font-bold text-[#5425A8] mt-0.5">
                      ~₹{plan.dailyCost} per day • 365d access
                    </div>
                  </div>

                  {/* Initial Key Features (3 items) */}
                  <div className="space-y-2 mb-3 text-xs">
                    {initialFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#5425A8] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="text-[#211B2B] leading-tight font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Features & Target Audience */}
                  {isExpanded && (
                    <div className="pt-2 pb-1 border-t border-dashed border-[#E8E2EF] space-y-2 animate-word">
                      {remainingFeatures.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                          <span className="text-[#211B2B] leading-tight">{feat}</span>
                        </div>
                      ))}

                      {/* Target level detail */}
                      <div className="text-[11px] text-[#6F687A] bg-[#FAF8FD] p-2.5 rounded-xl border border-[#E8E2EF] mt-2">
                        <strong className="text-[#211B2B] block mb-0.5 font-bold">Recommended for:</strong>
                        {plan.targetAudience}
                      </div>
                    </div>
                  )}

                  {/* Show All Features Control */}
                  {remainingFeatures.length > 0 && (
                    <button
                      type="button"
                      onClick={() => togglePlanFeatures(plan.id)}
                      className="w-full py-1 text-center text-[11px] font-bold text-[#5425A8] hover:underline flex items-center justify-center gap-1 mb-3 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Show Key Features Only' : `Show All ${plan.features.length} Features`}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-3 space-y-2 border-t border-[#E8E2EF]">
                  <Button
                    variant={isRecommended ? 'primary' : 'outline'}
                    size="sm"
                    fullWidth
                    onClick={() => setSelectedPlanForCheckout(plan)}
                    className="font-bold interactive-tap"
                  >
                    Select Plan
                  </Button>

                  <button
                    onClick={() => onNavigate('/partner-mou')}
                    className="w-full text-center text-[11px] text-[#6F687A] hover:text-[#5425A8] py-0.5 cursor-pointer font-medium"
                  >
                    Campus MOU / Scholarship →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Institutional MOU Link Card */}
        <div className="mt-8 p-4 rounded-2xl bg-white border border-[#E8E2EF] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-[#5425A8] shrink-0" />
            <span className="text-[#211B2B]">
              <strong>Enrolled at a Partner College?</strong> Subsidized institutional access is managed through your college TnP cell.
            </span>
          </div>
          <button
            onClick={() => onNavigate('/partner-mou')}
            className="text-[#5425A8] font-bold hover:underline shrink-0 cursor-pointer"
          >
            Check MOU Status →
          </button>
        </div>

      </div>

      {/* Checkout Preview Modal */}
      {selectedPlanForCheckout && (
        <Modal
          isOpen={!!selectedPlanForCheckout}
          onClose={() => setSelectedPlanForCheckout(null)}
          title={`Activate ${selectedPlanForCheckout.name} Plan`}
          subtitle="Illustrative Student Subscription Demonstration"
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#FAF8FD] border border-[#E8E2EF] text-xs">
              <div className="flex justify-between font-bold text-[#211B2B] mb-1">
                <span>Annual Subscription</span>
                <span className="text-[#5425A8] text-base">₹{selectedPlanForCheckout.annualPrice}</span>
              </div>
              <div className="text-[#6F687A]">
                Full 365-day placement preparation validity with verified recruitments.
              </div>
            </div>

            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code (CAMPUS2026)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs font-mono uppercase text-[#211B2B] focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
              />
              <Button type="submit" variant="secondary" size="sm" className="interactive-tap">
                Apply
              </Button>
            </form>

            {couponApplied && (
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-bold flex justify-between border border-emerald-200 animate-word">
                <span>15% Student Discount Applied</span>
                <span>- ₹{Math.round(selectedPlanForCheckout.annualPrice * 0.15)}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E8E2EF]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPlanForCheckout(null)}
                className="interactive-tap"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSimulateSubscription}
                className="font-bold interactive-tap"
              >
                Confirm Subscription
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </section>
  );
};
