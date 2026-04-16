export const MethodologyTab = () => (
  <div className="space-y-6 max-w-3xl mx-auto">
    <div className="bg-slate-800/80 shadow-lg shadow-slate-900/50 rounded-lg p-4 sm:p-8">
      <h2 className="text-2xl font-semibold text-slate-100 mb-6">Training Methodology</h2>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <section>
          <h3 className="text-base font-semibold text-slate-100 mb-2">Limitations</h3>
          <ul className="list-disc list-outside pl-5 space-y-1 text-slate-400">
            <li>I am not a certified trainer or medical professional — this is a personal log, not advice</li>
            <li>Activation ratings are subjective estimates based on available EMG literature and may not reflect your individual mechanics</li>
            <li>This program was designed around my specific equipment, body proportions, and training history</li>
          </ul>
        </section>

        <div className="border-t border-slate-700" />

        <section>
          <h3 className="text-base font-semibold text-slate-100 mb-2">Objectives</h3>
          <ul className="list-disc list-outside pl-5 space-y-1 text-slate-400">
            <li>Optimize for <span className="text-slate-200">longevity</span> and <span className="text-slate-200">muscle growth</span>, in that order</li>
            <li>Leverage the most up-to-date scientific research, grounded in practical constraints</li>
            <li>Maximize gains while minimizing time commitment</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-slate-100 mb-2">General Principles</h3>
          <ul className="list-disc list-outside pl-5 space-y-1 text-slate-400">
            <li><span className="text-amber-400">Form and control</span> above all else</li>
            <li><span className="text-amber-400">Emphasize both concentric and eccentric movements</span></li>
            <li><span className="text-amber-400">8-12 reps per set</span>, each set 1-2 reps from failure, final set to failure</li>
            <li>Listed sets do not include warmup sets</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-slate-100 mb-2">Weekly Structure</h3>
          <p className="text-slate-400 mb-3">
            Six training days per week with Saturday as a full rest day. Each day blends strength and cardio work.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="text-slate-500 uppercase tracking-wider">
                  <th className="text-left py-2 pr-4">Day</th>
                  <th className="text-left py-2 pr-4">Focus</th>
                  <th className="text-left py-2">Cardio</th>
                </tr>
              </thead>
              <tbody className="text-slate-300 divide-y divide-slate-700/50">
                <tr><td className="py-2 pr-4 font-medium">Monday</td><td className="py-2 pr-4">Push (Chest, Shoulders, Triceps)</td><td className="py-2">Zone 2</td></tr>
                <tr><td className="py-2 pr-4 font-medium">Tuesday</td><td className="py-2 pr-4">Pull (Back, Rear Delts, Biceps)</td><td className="py-2">Zone 2</td></tr>
                <tr><td className="py-2 pr-4 font-medium">Wednesday</td><td className="py-2 pr-4">Legs (Quads, Glutes, Hamstrings, Calves)</td><td className="py-2">—</td></tr>
                <tr><td className="py-2 pr-4 font-medium">Thursday</td><td className="py-2 pr-4">Upper (gap-filler: upper chest, back, lateral delts, biceps)</td><td className="py-2">Zone 2</td></tr>
                <tr><td className="py-2 pr-4 font-medium">Friday</td><td className="py-2 pr-4">Lower (posterior chain: glutes, hamstrings, calves)</td><td className="py-2">—</td></tr>
                <tr><td className="py-2 pr-4 font-medium">Saturday</td><td className="py-2 pr-4">Rest</td><td className="py-2">—</td></tr>
                <tr><td className="py-2 pr-4 font-medium">Sunday</td><td className="py-2 pr-4">—</td><td className="py-2">Zone 4/5 HIIT</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-base font-semibold text-slate-100 mb-2">Split Design Philosophy</h3>
          <ul className="list-disc list-outside pl-5 space-y-1 text-slate-400">
            <li>Every <span className="text-slate-200">head</span> of every major muscle group is trained at proportionate volumes across the week</li>
            <li>Each muscle group is hit at least <span className="text-slate-200">twice per week</span> via complementary exercise selection</li>
            <li>Cardio targets ~2 hours of zone 2 and ~30 minutes of zone 4/5 per week</li>
            <li>4 exercises per strength session at 2-3 sets each keeps sessions under ~50 minutes</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-slate-100 mb-2">Activation Rating System</h3>
          <p className="text-slate-400">
            Each exercise is rated 1-5 on activation for each muscle head it targets.
            These ratings are based on EMG studies and expert analysis. The daily radar chart
            sums these ratings to visualize total stimulus distribution, helping identify
            imbalances and guiding exercise selection.
          </p>
        </section>

        <div className="border-t border-slate-700 pt-4 mt-4">
          <p className="text-xs text-slate-500 italic">
            This program is a work in progress and is continually updated as new research emerges.
          </p>
        </div>
      </div>
    </div>
  </div>
);
