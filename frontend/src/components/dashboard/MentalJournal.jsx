export default function MentalJournal() {
  return (
    <section className="bg-surface-container-low rounded-lg p-8 border border-outline-variant/10 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-headline">Mental Journal</h3>
        <div className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-wider">
          Positivity: 82%
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-surface-container-highest/40 border-l-2 border-tertiary">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-label text-slate-500">MAY 24, 09:15 AM</span>
            <span className="material-symbols-outlined text-tertiary text-xs" data-icon="auto_awesome">auto_awesome</span>
          </div>
          <p className="text-xs text-on-surface leading-relaxed line-clamp-3">Reflecting on the study session today. I felt a bit overwhelmed initially but managed to find flow during the statistics module...</p>
        </div>
      </div>
      <button className="w-full mt-4 py-4 rounded-xl border border-outline-variant/20 text-sm font-semibold hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-lg" data-icon="edit_note">edit_note</span>
        Write New Entry
      </button>
    </section>
  );
}
