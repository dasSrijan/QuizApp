// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, Form, Container } from "react-bootstrap";

// export default function Contest() {
//   const navigate = useNavigate();
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [btechYear, setBtechYear] = useState("");
//   const [btechStream, setBtechStream] = useState("");
//   const [name, setName] = useState("");

//   const streamsData = ["CSE", "ECE", "Mechanical", "Civil"];
//   const quotes = [
//     "Believe you can and you're halfway there.",
//     "Push yourself, because no one else is going to do it for you.",
//     "The harder you work for something, the greater you'll feel when you achieve it."
//   ];

//   const [quote, setQuote] = useState("");

//   useEffect(() => {
//     // Random quote
//     setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

//     // Fetch user info from localStorage
//     const userData = JSON.parse(localStorage.getItem("user"));
//     if (userData && userData.firstName) {
//       setName(userData.firstName);
//     }
//   }, []);

//   const handleSubmit = () => {
//     let contestState = null;

//     if (selectedStandard === "college") {
//       if (!btechYear || !btechStream) {
//         alert("Please select year and stream");
//         return;
//       }
//       contestState = {
//         type: "college-btech",
//         year: btechYear,
//         stream: btechStream,
//       };
//     } else if (selectedStandard) {
//       contestState = { standard: selectedStandard };
//     } else {
//       alert("Please select your standard");
//       return;
//     }

//     // Save to localStorage so it persists on refresh
//     localStorage.setItem("contestSelection", JSON.stringify(contestState));

//     // Navigate with state for immediate use
//     navigate("/contest/subjects", { state: contestState });
//   };

//   return (
//     <Container className="mt-5 text-center">
//       <h4 className="mb-4 text-primary">{quote}</h4>
//       <p className="lead">
//         Hey <strong>{name || "User"}</strong>, seems like you are interested to give a contest today. That’s good!
//       </p>

//       {/* Standard Selection */}
//       <Form className="d-flex flex-column align-items-center">
//         <Form.Group className="mb-3" style={{ width: "250px" }}>
//           <Form.Label>Select your Standard</Form.Label>
//           <Form.Select
//             value={selectedStandard}
//             onChange={(e) => setSelectedStandard(e.target.value)}
//           >
//             <option value="">-- Select --</option>
//             {[...Array(12)].map((_, i) => (
//               <option key={i + 1} value={`class-${i + 1}`}>
//                 Class {i + 1}
//               </option>
//             ))}
//             <option value="college">College (B.Tech)</option>
//           </Form.Select>
//         </Form.Group>

//         {/* B.Tech Dropdowns */}
//         {selectedStandard === "college" && (
//           <>
//             {/* Year */}
//             <Form.Group className="mb-3" style={{ width: "250px" }}>
//               <Form.Label>Select Year</Form.Label>
//               <Form.Select
//                 value={btechYear}
//                 onChange={(e) => setBtechYear(e.target.value)}
//               >
//                 <option value="">-- Select Year --</option>
//                 <option value="1st">1st Year</option>
//                 <option value="2nd">2nd Year</option>
//                 <option value="3rd">3rd Year</option>
//                 <option value="4th">4th Year</option>
//               </Form.Select>
//             </Form.Group>

//             {/* Stream */}
//             <Form.Group className="mb-3" style={{ width: "250px" }}>
//               <Form.Label>Select Stream</Form.Label>
//               <Form.Select
//                 value={btechStream}
//                 onChange={(e) => setBtechStream(e.target.value)}
//               >
//                 <option value="">-- Select Stream --</option>
//                 {streamsData.map((stream) => (
//                   <option key={stream} value={stream}>
//                     {stream}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </>
//         )}

//         {/* Continue Button */}
//         <Button variant="primary" onClick={handleSubmit}>
//           Continue
//         </Button>
//       </Form>
//     </Container>
//   );
// }


import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";

export default function Contest() {
  const navigate = useNavigate();
  const [selectedStandard, setSelectedStandard] = useState("");
  const [btechYear, setBtechYear] = useState("");
  const [btechStream, setBtechStream] = useState("");
  const [name, setName] = useState("");

  const streamsData = ["CSE", "ECE", "Mechanical", "Civil"];
  const quotes = [
    "Believe you can and you're halfway there.",
    "Push yourself, because no one else is going to do it for you.",
    "The harder you work for something, the greater you'll feel when you achieve it."
  ];

  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Random quote
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Fetch user info from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.firstName) {
      setName(userData.firstName);
    }
  }, []);

  const handleSubmit = () => {
    if (selectedStandard === "college") {
      if (!btechYear || !btechStream) {
        alert("Please select year and stream");
        return;
      }
      navigate("/contest/subjects", {
        state: {
          type: "college-btech",
          year: btechYear,
          stream: btechStream,
        },
      });
    } else if (selectedStandard) {
      navigate("/contest/subjects", {
        state: { standard: selectedStandard },
      });
    } else {
      alert("Please select your standard");
    }
  };

  return (
    <Container className="mt-5 text-center">
      <h4 className="mb-4 text-primary">{quote}</h4>
      <p className="lead">
         Hey <strong>{name || "User"}</strong>, seems like you are interested to give a contest today. That’s good!
      </p>

      {/* Standard Selection */}
      <Form className="d-flex flex-column align-items-center">
        
        <Form.Group className="mb-3" style={{ width: "250px" }}>
          <Form.Label>Select your Standard</Form.Label>
          <Form.Select
            value={selectedStandard}
            onChange={(e) => setSelectedStandard(e.target.value)}
          >
            <option value="">-- Select --</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={`class-${i + 1}`}>
                Class {i + 1}
              </option>
            ))}
            <option value="college">College (B.Tech)</option>
          </Form.Select>
        </Form.Group>

        {/* B.Tech Dropdowns */}
        {selectedStandard === "college" && (
          <>
            {/* Year */}
            <Form.Group className="mb-3" style={{ width: "250px" }}>
              <Form.Label>Select Year</Form.Label>
              <Form.Select
                value={btechYear}
                onChange={(e) => setBtechYear(e.target.value)}
              >
                <option value="">-- Select Year --</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </Form.Select>
            </Form.Group>

            {/* Stream */}
            <Form.Group className="mb-3" style={{ width: "250px" }}>
              <Form.Label>Select Stream</Form.Label>
              <Form.Select
                value={btechStream}
                onChange={(e) => setBtechStream(e.target.value)}
              >
                <option value="">-- Select Stream --</option>
                {streamsData.map((stream) => (
                  <option key={stream} value={stream}>
                    {stream}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </>
        )}

        {/* Continue Button */}
        <Button variant="primary" onClick={handleSubmit}>
          Continue
        </Button>
      </Form>
    </Container>
  );
}





