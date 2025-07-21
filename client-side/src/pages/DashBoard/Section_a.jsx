import React, { useEffect, useState, useMemo } from "react";
import { Users, Briefcase, CheckCircle, Clock } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
// Colors and math constants
const colors = ["#4285F4", "#34A853", "#FBBC05", "#EA4335", "#9C27B0"];
const RADIAN = Math.PI / 180;
// Pie chart data
const projectStatusData = [
  { name: "Active", value: 30 },
  { name: "Completed", value: 25 },
  { name: "On Hold", value: 15 },
  { name: "Cancelled", value: 25 },
];
const teamPerformanceData = [
  { name: "Frontend", value: 35 },
  { name: "Backend", value: 30 },
  { name: "Shopify", value: 10 },
  { name: "WordPress", value: 15 },
  { name: "BD", value: 10 }
];
// :brain: Local quote generator
const generateQuote = () => {
  const subjects = [
    "Success", "Effort", "Discipline", "Passion", "Teamwork", "Courage", "Consistency", "Hard work", "Focus", "Learning"
  ];
  const actions = [
    "drives", "builds", "unlocks", "fuels", "multiplies", "creates", "defines", "empowers", "transforms", "shapes"
  ];
  const endings = [
    "great results.", "remarkable outcomes.", "lasting change.", "new opportunities.", "strong foundations.", "breakthroughs.", "your future.", "unstoppable momentum."
  ];
  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
  return `${random(subjects)} ${random(actions)} ${random(endings)}`;
};
// :brain: Memoized chart block
const ChartBlock = React.memo(({ title, data }) => {
  const renderLabel = useMemo(() => {
    return ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      return (
        <text
          x={x}
          y={y}
          fill={colors[index % colors.length]}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${data[index].name}: ${data[index].value}%`}
        </text>
      );
    };
  }, [data]);
  return (
    <div className="w-[100%] md:w-[48%] border border-gray-300 rounded bg-white px-3">
      <div className="font-bold py-3">
        <h2>{title}</h2>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine
              label={renderLabel}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value, entry, index) => (
                <span style={{ color: colors[index % colors.length] }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});
function Section_a() {
  const [quote, setQuote] = useState(generateQuote());
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setQuote(generateQuote());
        setFade(true);
      }, 300);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="max-w-[1440px] bg-gray-100 m-auto p-6 min-h-screen">
     <div className="font-bold py-3">
        <h2 className="text-2xl">Dashboard</h2>
        <p
          className={`text-sm text-gray-600 py-5 font-medium italic mt-1 max-w-xl transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {quote}
        </p>
      </div>
      <div className="flex flex-wrap xl:gap-6 gap-6 2xl:justify-between justify-start">
        <div className="flex border border-gray-300 rounded bg-white py-3 px-3 w-full sm:w-[48%] md:w-[31%] xl:w-[18%]">
          <div className="w-full">
            <p className="font-semibold">Total Team</p>
            <p className="font-bold">4</p>
            <p className="text-gray-500">0 active members</p>
          </div>
          <Users className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex border border-gray-300 rounded bg-white py-3 px-3 w-full sm:w-[48%] md:w-[31%] xl:w-[18%]">
          <div className="w-full">
            <p className="font-semibold">Total Projects</p>
            <p className="font-bold">8</p>
            <p className="text-gray-500">All Projects (including completed, on-hold, and cancelled)</p>
          </div>
          <Briefcase className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex border border-gray-300 rounded bg-white py-3 px-3 w-full sm:w-[48%] md:w-[31%] xl:w-[18%]">
          <div className="w-full">
            <p className="font-semibold">Active Projects</p>
            <p className="font-bold">4</p>
            <p className="text-gray-500">Currently being worked on</p>
          </div>
          <Clock className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex border border-gray-300 rounded bg-white py-3 px-3 w-full sm:w-[48%] md:w-[31%] xl:w-[18%]">
          <div className="w-full">
            <p className="font-semibold">Completed Projects</p>
            <p className="font-bold">3</p>
            <p className="text-gray-500">Finished Projects</p>
          </div>
          <CheckCircle className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex border border-gray-300 rounded bg-white py-3 px-3 w-full sm:w-[48%] md:w-[31%] xl:w-[18%]">
          <div className="w-full">
            <p className="font-semibold">On Hold Projects</p>
            <p className="font-bold">1</p>
            <p className="text-gray-500">Projects currently on hold</p>
          </div>
          <Clock className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      <div className="flex justify-between my-4 flex-wrap gap-4">
        <ChartBlock title="Project Status Distribution" data={projectStatusData} />
        <ChartBlock title="Team Performance" data={teamPerformanceData} />
      </div>
    </div>
  );
}
export default Section_a;