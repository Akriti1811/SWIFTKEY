import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard">
        <p className="dash-header text-center">Dashboard</p>
        
        <div>
          <table className="table dashtable table-striped ">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Date</th>
                <th scope="col">Gross Words Per Minute</th>
                <th scope="col">Net Words Per Minute</th>
                <th scope="col">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>7/11/2022</td>
                <td>35</td>
                <td>32</td>
                <td>90%</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>7/11/2022</td>
                <td>35</td>
                <td>32</td>
                <td>90%</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>7/11/2022</td>
                <td>35</td>
                <td>32</td>
                <td>90%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
