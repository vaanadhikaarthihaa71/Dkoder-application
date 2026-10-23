import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  CalendarDays, 
  Trophy, 
  FileCheck2, 
  Code2, 
  Laptop, 
  Layers, 
  TrendingUp, 
  GraduationCap, 
  Video, 
  Sparkles, 
  FolderGit2, 
  Library, 
  Compass, 
  UserCheck, 
  CreditCard, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  X,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

export interface NavGroup {
  groupName?: string;
  items: NavItem[];
}

interface DashboardSidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onNavigateToSubscription: () => void;
  onNavigateHome: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  onNavigateToSubscription,
  onNavigateHome
}) => {
  const navigationGroups: NavGroup[] = [
    {
      groupName: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'activity', label: 'My Activity', icon: Activity },
        { id: 'calendar', label: 'Activity Calendar', icon: CalendarDays },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
      ]
    },
    {
      groupName: 'PRACTICE',
      items: [
        { id: 'mcq', label: 'MCQ Practice', icon: FileCheck2 },
        { id: 'coding', label: 'Coding Challenges', icon: Code2 },
        { id: 'arena', label: 'Platform Arena', icon: Laptop },
        { id: 'bundles', label: 'Preparation Bundles', icon: Layers }
      ]
    },
    {
      groupName: 'MY PROGRESS',
      items: [
        { id: 'progress', label: 'My Progress', icon: TrendingUp }
      ]
    },
    {
      groupName: 'LEARN',
      items: [
        { id: 'courses', label: 'Courses', icon: GraduationCap },
        { id: 'webinars', label: 'Events & Webinars', icon: Video },
        { id: 'hackathons', label: 'Hackathons', icon: Sparkles, badge: 'Live' },
        { id: 'projects', label: 'Final Year Projects', icon: FolderGit2 },
        { id: 'resources', label: 'Resources', icon: Library }
      ]
    },
    {
      groupName: 'MY LEARNING',
      items: [
        { id: 'learning', label: 'My Learning', icon: Compass }
      ]
    },
    {
      groupName: 'ACCOUNT',
      items: [
        { id: 'subscription', label: 'Subscription', icon: CreditCard },
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  const handleItemClick = (id: string) => {
    onSelectTab(id);
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-white select-none">
      
      {/* Top Brand Header */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-[#E8E2EF]">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            title="Return to Main Website"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#FFD84D] flex items-center justify-center shadow-2xs border border-[#E8E2EF] group-hover:scale-105 transition-transform shrink-0">
              <img src="/images/mascot-avatar.jpg" alt="DKODER Mascot" className="w-full h-full object-cover" />
            </div>
            
            {!isCollapsed && (
              <div className="transition-opacity duration-200">
                <div className="flex items-baseline gap-1">
                  <span className="font-extrabold text-lg tracking-tight text-[#211B2B]">
                    DK<span className="text-[#5425A8]">ODER</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#FFD84D] bg-[#211B2B] px-1.5 py-0.2 rounded">
                    LMS
                  </span>
                </div>
                <div className="text-[10px] text-[#706879] font-medium leading-none">
                  Student Dashboard
                </div>
              </div>
            )}
          </button>

          {/* Close button on mobile drawer */}
          {isMobileOpen && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-[#706879] hover:bg-[#FAF8FD] border border-[#E8E2EF]"
              aria-label="Close drawer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Items List */}
        <div className="overflow-y-auto max-h-[calc(100vh-220px)] p-2 space-y-4 custom-scrollbar">
          {navigationGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {group.groupName && !isCollapsed && (
                <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#948B9E]">
                  {group.groupName}
                </div>
              )}

              {group.items.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer interactive-tap ${
                      isActive
                        ? 'bg-[#5425A8] text-white shadow-md'
                        : 'text-[#6F687A] hover:text-[#211B2B] hover:bg-[#FAF8FD]'
                    } ${isCollapsed ? 'justify-center px-2' : 'justify-between'}`}
                  >
                    {/* Animated Purple/Gold Active Selection Indicator Pill */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#FFD84D] rounded-r-full shadow-xs animate-word" />
                    )}

                    <div className="flex items-center gap-2.5 truncate">
                      <div className="shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6 group-active:scale-85">
                        <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#FFD84D]' : 'text-[#706879] group-hover:text-[#5425A8]'}`} />
                      </div>
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#FFD84D] text-[#211B2B] animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sidebar Section: Free Plan, Upgrade CTA, & Collapse */}
      <div className="p-3 border-t border-[#E8E2EF] bg-[#FAF8FD]">
        
        {!isCollapsed ? (
          <div className="space-y-2.5">
            {/* Current Plan Badge Card */}
            <div className="p-2.5 rounded-xl bg-white border border-[#E8E2EF] flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#F1E9FF] text-[#5425A8] flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#211B2B]">Free Plan</div>
                  <div className="text-[9px] text-[#706879]">Base problem set</div>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#FAF8FD] text-[#5425A8] border border-[#E8E2EF]">
                Active
              </span>
            </div>

            {/* Upgrade CTA */}
            <button
              type="button"
              onClick={onNavigateToSubscription}
              className="w-full py-2 px-3 rounded-xl bg-[#5425A8] hover:bg-[#401B85] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span>Upgrade Plan</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FFD84D]" />
            </button>

            {/* Desktop Collapse control */}
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden lg:flex w-full items-center justify-center gap-1 text-[11px] font-semibold text-[#706879] hover:text-[#211B2B] py-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Collapse Sidebar</span>
            </button>
          </div>
        ) : (
          /* Collapsed Icon-Only View for Bottom Section */
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={onNavigateToSubscription}
              title="Upgrade to Pro / Premium Plan"
              className="w-8 h-8 rounded-xl bg-[#5425A8] text-[#FFD84D] flex items-center justify-center shadow-xs hover:scale-105 transition-transform cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-[#FFD84D]" />
            </button>

            <button
              type="button"
              onClick={onToggleCollapse}
              title="Expand Sidebar"
              className="hidden lg:flex w-8 h-8 rounded-xl bg-white border border-[#E8E2EF] text-[#706879] hover:text-[#211B2B] items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Left Sidebar */}
      <aside 
        className={`hidden lg:block shrink-0 bg-white border-r border-[#E8E2EF] transition-all duration-200 z-20 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="sticky top-0 h-screen">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer (Collapsible with backdrop) */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={onCloseMobile} 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-fadeIn"
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl z-10 animate-slideIn">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
