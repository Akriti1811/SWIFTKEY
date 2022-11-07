import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard">
        <p className="dash-header text-center">Dashboard</p>
        <div class="card dashboard-card">
          <div class="card-header dash-card-header">Test 1</div>
          <div class="card-body">
            <p class="card-text">Words per Minute: 30</p>
            <p class="card-text">Accuracy: 90%</p>
            <p class="card-text">Date: 6/11/2022</p>
          </div>
        </div>
      </div>
    </>
  );
}
