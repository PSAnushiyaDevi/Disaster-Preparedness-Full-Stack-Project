import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin(){
  const [logs,setLogs]=useState([]);
  const [users,setUsers]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/auth/logs")
      .then(res=>setLogs(res.data));

    axios.get("http://localhost:5000/api/auth/users")
      .then(res=>setUsers(res.data));
  },[]);

  return(
    <div>
      <h2>👑 Admin Dashboard</h2>

      <h3>Total Users: {users.length}</h3>

      <h3>🕒 Login Activity</h3>
      {logs.map((l,i)=>(
        <div key={i} className="card">
          {l.email} - {new Date(l.login_time).toLocaleString()}
        </div>
      ))}

      <h3>👥 Registered Users</h3>
      {users.map((u,i)=>(
        <div key={i} className="card">
          {u.name} ({u.role}) - {u.email}
        </div>
      ))}
    </div>
  );
}