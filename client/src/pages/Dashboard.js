import "../styles/Dashboard.css";
import { getSession } from "../actions/session";
import { useState, useEffect } from "react";

export default function Dashboard() {

  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")).token;
    // console.log(token);
    (async () => {
      const res = await getSession(token);
      setSessions(res.data.sessions);
    })();
  }, []);

  const tableRows = sessions.map((element,index) => {
    return (
      <tr key={index}>
        <th scope="row">{index+1}</th>
        <td>{element.gross}</td>
        <td>{element.net}</td>
        <td>{element.accuracy}%</td>
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
              <th scope="col"></th>
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
