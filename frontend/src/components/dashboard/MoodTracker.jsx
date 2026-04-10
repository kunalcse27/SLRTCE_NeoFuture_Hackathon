export default function MoodTracker() {
  return (
    <section className="bg-surface-container-high rounded-lg p-8 border border-outline-variant/10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold font-headline">Mood Tracker</h3>
        <span className="material-symbols-outlined text-tertiary" data-icon="mood">mood</span>
      </div>
      <div className="space-y-10">
        <div className="flex justify-between px-2">
          <span className="text-3xl filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 cursor-pointer transition-all">😔</span>
          <span className="text-3xl filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 cursor-pointer transition-all">😐</span>
          <span className="text-3xl scale-125 filter grayscale-0 opacity-100 cursor-pointer transition-all">😊</span>
          <span className="text-3xl filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 cursor-pointer transition-all">🤩</span>
        </div>
        {/* Custom Slider Mockup */}
        <div className="relative pt-1">
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-secondary to-tertiary" style={{width: '72%'}}></div>
          </div>
          <div className="absolute top-0 left-[72%] -ml-3 -mt-1 h-5 w-5 bg-on-surface rounded-full shadow-lg border-2 border-secondary"></div>
        </div>
        <p className="text-center text-sm font-label text-on-surface-variant italic">"I'm feeling focused and steady today."</p>
      </div>
    </section>
  );
}
