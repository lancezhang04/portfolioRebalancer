import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { DayWorkout, aggregateActivations } from '../../data/workoutData';

type MuscleGroup = 'push' | 'pull' | 'lower';

// Map every possible muscle-head key to its group
const MUSCLE_GROUP: Record<string, MuscleGroup> = {
  // Push
  'Chest — Sternal':     'push',
  'Chest — Clavicular':  'push',
  'Delts — Anterior':    'push',
  'Delts — Lateral':     'push',
  'Triceps — Long':      'push',
  'Triceps — Medial':    'push',
  'Triceps — Lateral':   'push',
  // Pull
  'Back — Lats':         'pull',
  'Back — Upper/Mid':    'pull',
  'Delts — Posterior':   'pull',
  'Biceps — Long':       'pull',
  'Biceps — Short':      'pull',
  'Traps — Upper':       'pull',
  // Lower
  'Quads — VL':              'lower',
  'Quads — VM':              'lower',
  'Quads — VI':              'lower',
  'Quads — RF':              'lower',
  'Glutes — Maximus':        'lower',
  'Glutes — Medius':         'lower',
  'Hamstrings — BF':         'lower',
  'Hamstrings — SM':         'lower',
  'Hamstrings — ST':         'lower',
  'Calves — Gastrocnemius':  'lower',
  'Calves — Soleus':         'lower',
};

// Canonical axis order: push → pull → lower (adjacent grouping around the wheel)
const AXIS_ORDER: string[] = [
  'Chest — Sternal', 'Chest — Clavicular',
  'Delts — Anterior', 'Delts — Lateral',
  'Triceps — Long', 'Triceps — Medial', 'Triceps — Lateral',
  'Back — Lats', 'Back — Upper/Mid',
  'Delts — Posterior',
  'Biceps — Long', 'Biceps — Short',
  'Traps — Upper',
  'Quads — VL', 'Quads — VM', 'Quads — VI', 'Quads — RF',
  'Glutes — Maximus', 'Glutes — Medius',
  'Hamstrings — BF', 'Hamstrings — SM', 'Hamstrings — ST',
  'Calves — Gastrocnemius', 'Calves — Soleus',
];

const GROUP_COLORS: Record<MuscleGroup, string> = {
  push:  '#f87171',  // red-400
  pull:  '#60a5fa',  // blue-400
  lower: '#fb923c',  // orange-400
};

// Extra px to push each label further from the chart's outer edge
const LABEL_OFFSET = 14;

// Custom axis label — each muscle head coloured by its group,
// pushed further from the plot area via a radial offset
const CustomAngleTick = (props: any) => {
  const { cx, cy, x, y, payload, textAnchor } = props;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = cx + dx * (1 + LABEL_OFFSET / dist);
  const ny = cy + dy * (1 + LABEL_OFFSET / dist);
  const group: MuscleGroup = MUSCLE_GROUP[payload.value] ?? 'push';
  return (
    <text
      x={nx}
      y={ny}
      textAnchor={textAnchor}
      dominantBaseline="central"
      fill={GROUP_COLORS[group]}
      fontSize={10}
    >
      {payload.value}
    </text>
  );
};

interface Props {
  dayData: DayWorkout;
}

export const MuscleRadarChart = ({ dayData }: Props) => {
  const raw = aggregateActivations(dayData);
  if (Object.keys(raw).length === 0) return null;

  // Sort present axes into canonical push → pull → lower order
  const sortedKeys = Object.keys(raw).sort((a, b) => {
    const ai = AXIS_ORDER.indexOf(a);
    const bi = AXIS_ORDER.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b);
  });

  // Each axis carries its value in the correct group key; other keys are 0
  // This lets three separate Radar layers each render with their own colour
  const data = sortedKeys.map((name) => {
    const group = MUSCLE_GROUP[name] ?? 'push';
    return {
      name,
      push:  group === 'push'  ? raw[name] : 0,
      pull:  group === 'pull'  ? raw[name] : 0,
      lower: group === 'lower' ? raw[name] : 0,
    };
  });

  return (
    <div className="bg-slate-950 shadow-lg shadow-slate-900/50 rounded-lg p-3 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
          Daily Activation Summary
        </h2>
        <div className="flex gap-4 text-xs text-slate-400">
          {(['push', 'pull', 'lower'] as MuscleGroup[]).map((g) => (
            <span key={g} className="flex items-center gap-1.5 capitalize">
              <span
                className="w-2.5 h-2.5 rounded-sm inline-block"
                style={{ backgroundColor: GROUP_COLORS[g] }}
              />
              {g}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full" style={{ height: 460 }}>
        <ResponsiveContainer>
          <RadarChart
            data={data}
            cx="50%" cy="50%"
            outerRadius="62%"
            margin={{ top: 28, right: 80, bottom: 28, left: 80 }}
          >
            <PolarGrid stroke="#1e293b" />
            <PolarAngleAxis
              dataKey="name"
              tick={(props) => <CustomAngleTick {...props} />}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 12]}
              tickCount={4}
              tick={{ fill: '#334155', fontSize: 9 }}
              axisLine={false}
            />
            <Radar name="Push"  dataKey="push"  stroke={GROUP_COLORS.push}  fill={GROUP_COLORS.push}  fillOpacity={0.22} strokeWidth={1.5} />
            <Radar name="Pull"  dataKey="pull"  stroke={GROUP_COLORS.pull}  fill={GROUP_COLORS.pull}  fillOpacity={0.22} strokeWidth={1.5} />
            <Radar name="Lower" dataKey="lower" stroke={GROUP_COLORS.lower} fill={GROUP_COLORS.lower} fillOpacity={0.22} strokeWidth={1.5} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-xs text-slate-600 text-center">
        Activation points per muscle head · scale 0–12
      </p>
    </div>
  );
};
