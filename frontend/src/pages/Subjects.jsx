import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";

export default function Subjects() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);

  // Try from location.state first, then from localStorage
  const initialState = location.state || JSON.parse(localStorage.getItem("contestSelection"));
//  console.log("Iniitial State:",initialState);
  useEffect(() => {
    if (!initialState) {
      navigate("/contest");
      return;
    }

    if (initialState.standard) {
      // School subjects example
      const schoolSubjects = [
        "Mathematics",
        "Science",
        "English",
        "History",
        "Geography",
        "Computer Science"
      ];
      setSubjects(schoolSubjects);
    } else if (initialState.type === "college-btech") {
      // B.Tech subjects based on stream/year
      const btechSubjects = {
        CSE: {
          "1st": ["Programming in C", "Mathematics I", "Physics", "Basic Electronics"],
          "2nd": ["Data Structures", "Digital Logic", "Discrete Mathematics", "OOP in Java"],
          "3rd": ["Operating Systems", "Database Management", "Computer Networks", "Software Engineering"],
          "4th": ["Machine Learning", "Cloud Computing", "Big Data Analytics", "Cybersecurity"]
        },
        ECE: {
          "1st": ["Mathematics I", "Physics", "Basic Electronics", "Programming in C"],
          "2nd": ["Signals and Systems", "Electronic Devices", "Digital Electronics", "Network Analysis"],
          "3rd": ["Control Systems", "Communication Systems", "Microprocessors", "VLSI Design"],
          "4th": ["Embedded Systems", "Wireless Communication", "IoT", "Antenna Theory"]
        },
        Mechanical: {
          "1st": ["Mathematics I", "Engineering Graphics", "Physics", "Basic Electrical"],
          "2nd": ["Thermodynamics", "Mechanics of Solids", "Fluid Mechanics", "Manufacturing Processes"],
          "3rd": ["Machine Design", "Heat Transfer", "Dynamics of Machinery", "Industrial Engineering"],
          "4th": ["Robotics", "Automobile Engineering", "CAD/CAM", "Mechatronics"]
        },
        Civil: {
          "1st": ["Mathematics I", "Engineering Graphics", "Physics", "Basic Electrical"],
          "2nd": ["Strength of Materials", "Surveying", "Fluid Mechanics", "Construction Materials"],
          "3rd": ["Structural Analysis", "Geotechnical Engineering", "Transportation Engineering", "Hydrology"],
          "4th": ["Environmental Engineering", "Advanced Surveying", "Irrigation Engineering", "Construction Management"]
        }
      };

      if (initialState.stream && initialState.year) {
        setSubjects(btechSubjects[initialState.stream][initialState.year]);
      }
    }
  }, [initialState, navigate]);

  const handleContinue = () => {
    if (!selectedSubject) {
      alert("Please select a subject");
      return;
    }

    navigate("/contest/type", {
      state: {
        ...initialState,
        subjectName: selectedSubject
      }
    });
  };

  return (
    <Container className="mt-5 text-center">
      <h4 className="mb-4 text-primary">Select Your Subject</h4>

      <Form.Group className="mb-3" style={{ width: "300px", margin: "0 auto" }}>
        <Form.Label>Subject</Form.Label>
        <Form.Select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">-- Select Subject --</option>
          {subjects.map((sub, index) => (
            <option key={index} value={sub}>
              {sub}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" onClick={handleContinue}>
        Continue
      </Button>
    </Container>
  );
}


// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Button, Form, Container } from "react-bootstrap";

// export default function Subjects() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [subjects, setSubjects] = useState([]);

//   const { state } = location;
//   // Example: state could be { standard: "class-10" }
//   // or { type: "college-btech", year: "3rd", stream: "CSE" }

//   useEffect(() => {
//     if (!state) {
//       navigate("/contest");
//       return;
//     }

//     if (state.standard) {
//       // School subjects example
//       const schoolSubjects = [
//         "Mathematics",
//         "Science",
//         "English",
//         "History",
//         "Geography",
//         "Computer Science"
//       ];
//       setSubjects(schoolSubjects);
//     } else if (state.type === "college-btech") {
//       // B.Tech subjects based on stream/year
//       const btechSubjects = {
//         CSE: {
//           "1st": ["Programming in C", "Mathematics I", "Physics", "Basic Electronics"],
//           "2nd": ["Data Structures", "Digital Logic", "Discrete Mathematics", "OOP in Java"],
//           "3rd": ["Operating Systems", "Database Management", "Computer Networks", "Software Engineering"],
//           "4th": ["Machine Learning", "Cloud Computing", "Big Data Analytics", "Cybersecurity"]
//         },
//         ECE: {
//           "1st": ["Mathematics I", "Physics", "Basic Electronics", "Programming in C"],
//           "2nd": ["Signals and Systems", "Electronic Devices", "Digital Electronics", "Network Analysis"],
//           "3rd": ["Control Systems", "Communication Systems", "Microprocessors", "VLSI Design"],
//           "4th": ["Embedded Systems", "Wireless Communication", "IoT", "Antenna Theory"]
//         },
//         Mechanical: {
//           "1st": ["Mathematics I", "Engineering Graphics", "Physics", "Basic Electrical"],
//           "2nd": ["Thermodynamics", "Mechanics of Solids", "Fluid Mechanics", "Manufacturing Processes"],
//           "3rd": ["Machine Design", "Heat Transfer", "Dynamics of Machinery", "Industrial Engineering"],
//           "4th": ["Robotics", "Automobile Engineering", "CAD/CAM", "Mechatronics"]
//         },
//         Civil: {
//           "1st": ["Mathematics I", "Engineering Graphics", "Physics", "Basic Electrical"],
//           "2nd": ["Strength of Materials", "Surveying", "Fluid Mechanics", "Construction Materials"],
//           "3rd": ["Structural Analysis", "Geotechnical Engineering", "Transportation Engineering", "Hydrology"],
//           "4th": ["Environmental Engineering", "Advanced Surveying", "Irrigation Engineering", "Construction Management"]
//         }
//       };

//       if (state.stream && state.year) {
//         setSubjects(btechSubjects[state.stream][state.year]);
//       }
//     }
//   }, [state, navigate]);

//   const handleContinue = () => {
//     if (!selectedSubject) {
//       alert("Please select a subject");
//       return;
//     }

//     navigate("/contest/type", {
//       state: {
//         ...state,
//         subjectName: selectedSubject
//       }
//     });
//   };

//   return (
//     <Container className="mt-5 text-center">
//       <h4 className="mb-4 text-primary">Select Your Subject</h4>

//       <Form.Group className="mb-3" style={{ width: "300px", margin: "0 auto" }}>
//         <Form.Label>Subject</Form.Label>
//         <Form.Select
//           value={selectedSubject}
//           onChange={(e) => setSelectedSubject(e.target.value)}
//         >
//           <option value="">-- Select Subject --</option>
//           {subjects.map((sub, index) => (
//             <option key={index} value={sub}>
//               {sub}
//             </option>
//           ))}
//         </Form.Select>
//       </Form.Group>

//       <Button variant="primary" onClick={handleContinue}>
//         Continue
//       </Button>
//     </Container>
//   );
// }





