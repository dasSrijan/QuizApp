// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Container, Card, Button, Row, Col } from "react-bootstrap";

// export default function ContestType() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { state } = location; // will have { standard, subjectName, year?, stream? }
//   const [name, setName] = useState("");
//   const [selectedType, setSelectedType] = useState("");

//   useEffect(() => {
//     if (!state || !state.subjectName) {
//       navigate("/contest"); // redirect if no data
//       return;
//     }

//     // Fetch name from localStorage
//     const userData = JSON.parse(localStorage.getItem("user"));
//     if (userData && userData.firstName) {
//       setName(userData.firstName);
//     }
//   }, [state, navigate]);

//   const contestTypes = [
//     { id: "quick", title: "Quick Test", description: "15 minutes, 5 questions", length: 5 },
//     { id: "standard", title: "Standard Test", description: "30 minutes, 10 questions", length: 10 },
//     { id: "marathon", title: "Marathon Test", description: "60 minutes, 20 questions", length: 20 }
//   ];

//   const handleStart = () => {
//     if (!selectedType) {
//       alert("Please select a contest type");
//       return;
//     }

//     const selectedContest = contestTypes.find(c => c.id === selectedType);

//     navigate("/contest", {
//       state: {
//         ...state,
//         length: selectedContest.length
//       }
//     });
//   };

//   return (
//     <Container className="mt-5 text-center">
//       <h4 className="mb-4 text-primary">
//         Hey <strong>{name || "User"}</strong>, choose the contest you want to give
//       </h4>

//       <Row className="justify-content-center">
//         {contestTypes.map((type) => (
//           <Col md={4} key={type.id} className="mb-4">
//             <Card
//               className={`h-100 ${selectedType === type.id ? "border-primary" : ""}`}
//               onClick={() => setSelectedType(type.id)}
//               style={{ cursor: "pointer" }}
//             >
//               <Card.Body>
//                 <Card.Title>{type.title}</Card.Title>
//                 <Card.Text>{type.description}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <Button variant="success" onClick={handleStart}>
//         Start Contest
//       </Button>
//     </Container>
//   );
// }


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

export default function ContestType() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [name, setName] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    if (!state || !state.subjectName) {
      navigate("/contest");
      return;
    }

    // Fetch name from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.firstName) {
      setName(userData.firstName);
    }
  }, [state, navigate]);

  const contestTypes = [
    { id: "quick", title: "Quick Test", description: "15 minutes, 5 questions" },
    { id: "standard", title: "Standard Test", description: "30 minutes, 10 questions" },
    { id: "marathon", title: "Marathon Test", description: "60 minutes, 20 questions" }
  ];

  const handleStart = () => {
    if (!selectedType) {
      alert("Please select a contest type");
      return;
    }
    let length = 0;
    if (selectedType === "quick") length = 5;
    else if (selectedType === "standard") length = 10;
    else if (selectedType === "marathon") length = 20;
    navigate("/contest/contest-page", {
      state: {
        ...state,
        contestType: selectedType,
        length
      }
    });
  };

  return (
    <Container className="mt-5 text-center">
      <h4 className="mb-4 text-primary">
        Hey <strong>{name || "User"}</strong>, choose the contest you want to give
      </h4>

      <Row className="justify-content-center">
        {contestTypes.map((type) => (
          <Col md={4} key={type.id} className="mb-4">
            <Card
              className={`h-100 ${selectedType === type.id ? "border-primary" : ""}`}
              onClick={() => setSelectedType(type.id)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <Card.Title>{type.title}</Card.Title>
                <Card.Text>{type.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Button variant="success" onClick={handleStart}>
        Start Contest
      </Button>
    </Container>
  );
}