export default function Navbar(){
  const user = JSON.parse(localStorage.getItem("user"));

  return(
    <div className="navbar">
      <h3>🌍 Disaster Preparedness System</h3>

      <div>
        👤 {user?.name} ({user?.role})
      </div>
    </div>
  );
}