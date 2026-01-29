import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#6366f1", // Instagram - Indigo
  "#f97316", // Facebook - Orange
  "#22c55e", // LinkedIn - Green
  "#0ea5e9", // YouTube - Sky Blue
];
export default function Dashboard({ campaigns }) {
  const platformCounts = campaigns.reduce((acc, c) => {
    acc[c.platform] = (acc[c.platform] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(platformCounts).map((platform) => ({
    name: platform,
    value: platformCounts[platform],
  }));

  return (
    <div className="dashboard">
      <h2>📊 Campaign Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Campaigns</h3>
          <div className="big-number">{campaigns.length}</div>
        </div>

        <div className="card">
          <h3>Campaigns by Platform</h3>
          <PieChart width={280} height={280}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

