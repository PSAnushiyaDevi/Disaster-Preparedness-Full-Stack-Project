import { useEffect, useState } from "react";
import { getAlerts } from "../services/api";

export default function Alerts(){
  const [alerts,setAlerts]=useState([]);

  useEffect(()=>{
    getAlerts().then(res=>setAlerts(res.data));
  },[]);

  return(
    <div>
      <h2>📢 Live Disaster Alerts</h2>

      {alerts.slice(0,10).map((a,i)=>(
        <div key={i} className="card">
          <h4>{a.title}</h4>
          <p>{a.description}</p>
          <a href={a.url} target="_blank">Read More</a>
        </div>
      ))}
    </div>
  );
}