import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Table, Button, Spinner, Alert } from "react-bootstrap";

export default function HistoryList() {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/contest/history", {
          headers: token ? { "x-auth-token": token } : {},
        });
        setHistoryList(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3 className="mb-4">My Contest History</h3>
      {historyList.length === 0 ? (
        <p>No history records found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Subject / Stream</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {historyList.map((h) => {
              const percent = h.totalMarks
                ? ((h.score / h.totalMarks) * 100).toFixed(2)
                : "0.00";
              return (
                <tr key={h._id}>
                  <td>{new Date(h.date).toLocaleString()}</td>
                  <td>
                    {h.subject}
                    {h.stream ? ` (${h.stream})` : ""}
                  </td>
                  <td>
                    {h.score}/{h.totalMarks}
                  </td>
                  <td>{percent}%</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/history/${h._id}`)}
                    >
                      See Details
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
}


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Button, Container, Spinner, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// export default function History() {
//   const navigate = useNavigate();
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchHistory = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("ttp://localhost:5000/api/history", {
//           headers: token ? { "x-auth-token": token } : {}
//         });
//         setHistory(res.data || []);
//       } catch (err) {
//         console.error(err);
//         setError(err.response?.data?.message || "Failed to load history");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   return (
//     <Container className="mt-4">
//       <h3 className="mb-4 text-center">Your Contest History</h3>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {history.length === 0 ? (
//         <div className="text-center">No contests taken yet.</div>
//       ) : (
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Subject</th>
//               <th>Standard / Year / Stream</th>
//               <th>Score</th>
//               <th>Percentage</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {history.map((row) => {
//               const date = new Date(row.date || row.createdAt || row.startedAt);
//               const total = row.totalMarks ?? row.total ?? (row.questions?.length ?? 0);
//               const score = row.score ?? 0;
//               const percent = total ? ((score / total) * 100).toFixed(2) : "0.00";

//               // Build label for Standard / Year / Stream
//               let stdLabel = row.standard || "";
//               if (row.year || row.stream) {
//                 stdLabel = `${row.year ? row.year : ""}${row.stream ? ` / ${row.stream}` : ""}`;
//               }

//               return (
//                 <tr key={row._id}>
//                   <td>{date.toLocaleString()}</td>
//                   <td>{row.subject || "N/A"}</td>
//                   <td>{stdLabel || "N/A"}</td>
//                   <td>{score}/{total}</td>
//                   <td>{percent}%</td>
//                   <td>
//                     <Button
//                       size="sm"
//                       variant="info"
//                       onClick={() => navigate(`/history/${row._id}`)}
//                     >
//                       See details
//                     </Button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Button, Container, Spinner, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// export default function History() {
//   const navigate = useNavigate();
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchHistory = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("/api/history", {
//           headers: token ? {  "x-auth-token": token  } : {}
//         });
//         setHistory(res.data || []);
//       } catch (err) {
//         console.error(err);
//         setError(err.response?.data?.message || "Failed to load history");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   return (
//     <Container className="mt-4">
//       <h3 className="mb-4 text-center">Your Contest History</h3>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {history.length === 0 ? (
//         <div className="text-center">No contests taken yet.</div>
//       ) : (
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Subject</th>
//               <th>Standard / Stream</th>
//               <th>Score</th>
//               <th>%</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {history.map((row) => {
//               const date = new Date(row.date || row.createdAt || row.startedAt);
//               const total = row.totalMarks ?? row.total ?? (row.questions?.length ?? 0);
//               const score = row.score ?? 0;
//               const percent = total ? ((score / total) * 100).toFixed(2) : "0.00";

//               // Build label for standard/stream
//               let stdLabel = row.standard || "";
//               if (row.year || row.stream) {
//                 stdLabel = `${row.year ? row.year : ""}${row.stream ? ` / ${row.stream}` : ""}`;
//               }

//               return (
//                 <tr key={row._id}>
//                   <td>{date.toLocaleString()}</td>
//                   <td>{row.subject}</td>
//                   <td>{stdLabel}</td>
//                   <td>{score}/{total}</td>
//                   <td>{percent}%</td>
//                   <td>
//                     <Button
//                       size="sm"
//                       onClick={() => navigate(`/history/${row._id}`)}
//                     >
//                       See details
//                     </Button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//   );
// }
