import "../styles/Dashboard.css";
import { createSession } from "../actions/session";

export default function Dashboard() {
    const sessions = [
      {
        sno: "1",
        gross: "40",
        net: "30",
        accuracy: "80%",
      },
      {
        sno: "2",
        gross: "45",
        net: "36",
        accuracy: "86%",
      },
      {
        sno: "3",
        gross: "20",
        net: "10",
        accuracy: "50%",
      },
    ];

//   const sessionadd = async (e) => {
//     const res = await createSession;
//     const data = await response.json();
//     this.setState({ totalReactPackages: data.total });
//   };

  const tableRows = sessions.map((element) => {
    return (
      <tr>
        <th scope="row">{element.sno}</th>
        <td>{element.gross}</td>
        <td>{element.net}</td>
        <td>{element.accuracy}</td>
      </tr>
    );
  });
  return (
    <div className="dashboard">
      <p className="dash-header text-center">Dashboard</p>
      <div>
        <table className="table dashtable table-striped ">
          <thead>
            <tr>
              <th scope="col">Tests</th>
              <th scope="col">Gross Words Per Minute</th>
              <th scope="col">Net Words Per Minute</th>
              <th scope="col">Accuracy</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
}
