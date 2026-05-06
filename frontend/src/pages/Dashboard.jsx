import { useEffect, useState } from "react";
import { getReports, getStats } from "../services/api";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const COLORS = ["#007bff", "#ff4444", "#28a745"];

export default function Dashboard(){
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ totalUsers:0, totalLogins:0, todayLogins:0 });

  useEffect(()=>{
    getReports().then(res=>setData(res.data));
    getStats().then(res=>setStats(res.data));
  },[]);

  const totalReports = data.length;
  const disasterCount = {
    Flood: data.filter(d=>d.type==="Flood").length,
    Fire: data.filter(d=>d.type==="Fire").length,
    Earthquake: data.filter(d=>d.type==="Earthquake").length
  };

  const chartData = [
    { name:"Flood", value:disasterCount.Flood },
    { name:"Fire", value:disasterCount.Fire },
    { name:"Earthquake", value:disasterCount.Earthquake }
  ];

  return(
    <div>
      <h2>📊 Disaster Dashboard</h2>

      <div className="grid">
        <div className="card">📄 Reports: {totalReports}</div>
        <div className="card">🌊 Flood: {disasterCount.Flood}</div>
        <div className="card">🔥 Fire: {disasterCount.Fire}</div>
        <div className="card">🌍 Earthquake: {disasterCount.Earthquake}</div>
        <div className="card">👥 Users: {stats.totalUsers}</div>
        <div className="card">🔐 Total Logins: {stats.totalLogins}</div>
        <div className="card">📅 Today Logins: {stats.todayLogins}</div>
      </div>

      <div className="card">
        <h3>Disaster Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3>Disaster Share</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={chartData} dataKey="value" outerRadius={100}>
              {chartData.map((_,i)=>(
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3>🚨 Recent Reports</h3>
        {data.length === 0 ? (
          <p>No reports yet</p>
        ) : (
          data.slice(0,5).map((d,i)=>(
            <p key={i}>📍 {d.location} - {d.type}</p>
          ))
        )}
      </div>
    </div>
  );
}