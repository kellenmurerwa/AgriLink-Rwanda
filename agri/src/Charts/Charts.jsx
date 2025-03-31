export const BarChart = ({ children, data, margin }) => <div className="recharts-wrapper">{children}</div>

export const Bar = ({ dataKey, fill }) => null
export const XAxis = ({ dataKey }) => null
export const YAxis = () => null
export const CartesianGrid = ({ strokeDasharray }) => null
export const Tooltip = () => null
export const ResponsiveContainer = ({ children, width, height }) => (
  <div style={{ width: width || "100%", height: height || "100%" }}>{children}</div>
)
export const Legend = () => null

export const LineChart = ({ children, data, margin }) => <div className="recharts-wrapper">{children}</div>

export const Line = ({ type, dataKey, stroke }) => null

export const RadarChart = ({ children, outerRadius, data }) => <div className="recharts-wrapper">{children}</div>

export const PolarGrid = () => null
export const PolarAngleAxis = ({ dataKey }) => null
export const PolarRadiusAxis = ({ angle, domain }) => null
export const Radar = ({ name, dataKey, stroke, fill, fillOpacity }) => null

export const AreaChart = ({ children, data, margin }) => <div className="recharts-wrapper">{children}</div>

export const Area = ({ type, dataKey, stroke, fill }) => null

export const PieChart = ({ children }) => <div className="recharts-wrapper">{children}</div>

export const Pie = ({ data, cx, cy, innerRadius, outerRadius, fill, paddingAngle, dataKey }) => null
export const Cell = ({ fill }) => null

