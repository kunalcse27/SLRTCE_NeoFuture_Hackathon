import AlertPanel from "./dashboard/AlertPanel";
import BehaviorTrendChart from "./dashboard/BehaviorTrendChart";
import MoodTracker from "./dashboard/MoodTracker";
import MentalJournal from "./dashboard/MentalJournal";
import Resources from "./dashboard/Resources";

export default function Dashboard() {
  return (
    <div className="pt-28 p-10 max-w-7xl mx-auto space-y-10">
      {/* Page Header Asymmetry */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-5xl font-extrabold tracking-tighter text-on-surface font-headline leading-tight">
            Morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-tertiary">Aarav.</span>
          </h2>
          <p className="text-on-surface-variant max-w-md font-label">Your cognitive performance is stable, but we've noted a slight shift in your focus baseline. Let's explore the data.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 rounded-full bg-surface-container-highest border border-outline-variant/15 text-sm font-semibold hover:bg-surface-bright transition-all">Download Report</button>
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-secondary to-tertiary text-on-secondary-fixed text-sm font-bold shadow-lg shadow-secondary/10">Action Required</button>
        </div>
      </div>
      
      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Column 1: Wide (8 Columns) */}
        <div className="col-span-12 lg:col-span-8 space-y-8">  
          <AlertPanel />
          <BehaviorTrendChart />
        </div>
        
        {/* Column 2: Narrower (4 Columns) */}
        <div className="col-span-12 lg:col-span-4 space-y-8 relative">
          <MoodTracker />
          <MentalJournal />
          
          <button className="mx-auto mt-4 w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-tertiary text-on-secondary-fixed shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform active:scale-95 z-10 block">
            <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform duration-300" data-icon="add">add</span>
          </button>
        </div>
      </div>
      
      {/* Bottom Section: Quick Access Cards */}
      <Resources />
    </div>
  );
}
