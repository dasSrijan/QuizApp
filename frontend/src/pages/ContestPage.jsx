// frontend/src/pages/ContestPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Button, Spinner, Badge } from "react-bootstrap";

export default function ContestPage() {
  const navigate = useNavigate();
  const { state } = useLocation(); 
  // state will have { standard, subjectName, length, year?, stream? }

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: optionIndex }
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0); // seconds
  const timerRef = useRef(null);

  // Fetch questions on mount
  useEffect(() => {
    if (!state) {
      navigate("/contest"); 
      return;
    }

    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Payload being sent to backend:", state);
        const res = await axios.post(
          "http://localhost:5000/api/contest/start",
          { ...state },
          { headers: token ? { "x-auth-token": token } : {} }
        );

        const qList = res.data.questions || [];
        setQuestions(qList);
        setTimeLeft((res.data.total || state.length) * 60); // 1 min per question
        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate("/contest");
      }
    };

    fetchQuestions();
  }, [state, navigate]);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && questions.length > 0) {
      handleSubmit();
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft]);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleAnswer = (questionId, idx) => {
    setAnswers((prev) => ({ ...prev, [questionId]: idx }));
  };

  const handlePrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));

  const handleSubmit = async () => {
    clearTimeout(timerRef.current);
    try {
      const token = localStorage.getItem("token");
      console.log("Token before submit:", token);
      console.log("Submit payload:", {
        ...state,
        questions: questions.map((q) => ({
          questionId: q._id,
          userAnswer: answers[q._id] ?? null,
        })),
      });
      console.log("Submitting contest with:", {
        standard: state.standard,
        subject: state.subjectName,
        contestLength: state.length,
        year: state.year,
        stream: state.stream,
        questions: questions.map(q => ({
          questionId: q._id,
          userAnswer: answers[q._id] ?? null
        }))
      });
      const res = await axios.post(
        "http://localhost:5000/api/contest/submit",
        {
          standard: state.standard,
          subject: state.subjectName,        // ✅ rename for backend
          contestLength: state.length,       // ✅ rename for backend
          year: state.year || null,
          stream: state.stream || null,
          questions: questions.map((q) => ({
            questionId: q._id,
            userAnswer: answers[q._id] ?? null,
          })),
        },
        { headers: token ? { "x-auth-token": token } : {} }
      );

      // Redirect to history details page immediately
      if (res.data.historyId) {
        navigate(`/history/${res.data.historyId}`);
      } else {
        navigate("/history");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting contest");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  const q = questions[currentIndex];
  const selectedAnswer = answers[q._id];

  return (
    <Container className="mt-3">
      {/* Question buttons + Timer */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div className="mb-2">
          {questions.map((qq, idx) => (
            <Button
              key={qq._id}
              size="sm"
              className="me-1 mb-1"
              variant={answers[qq._id] !== undefined ? "success" : "secondary"}
              onClick={() => setCurrentIndex(idx)}
            >
              {idx + 1}
            </Button>
          ))}
        </div>
        <Badge bg={timeLeft < 60 ? "danger" : "primary"} className="fs-6">
          ⏳ {formatTime(timeLeft)}
        </Badge>
      </div>

      {/* Question */}
      <h5>
        Q{currentIndex + 1}. {q.questionText}
      </h5>

      {/* Options */}
      <div className="mt-3">
        {q.options.map((opt, idx) => {
          const optionLabel = typeof opt === "string" ? opt : opt.optionText;
          return (
            <Button
              key={idx}
              variant={selectedAnswer === idx ? "primary" : "outline-primary"}
              className="d-block w-100 text-start mb-2"
              onClick={() => handleAnswer(q._id, idx)}
            >
              {String.fromCharCode(65 + idx)}. {optionLabel}
            </Button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="d-flex justify-content-between mt-3">
        <Button onClick={handlePrev} disabled={currentIndex === 0}>
          Prev
        </Button>
        {currentIndex === questions.length - 1 ? (
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </div>
    </Container>
  );
}


// // frontend/src/pages/ContestPage.jsx
// import React, { useEffect, useState, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Container, Button, Spinner, Badge } from "react-bootstrap";

// export default function ContestPage() {
//   const navigate = useNavigate();
//   const { state } = useLocation(); 
//   // state will have { standard, subjectName, length, year, stream }

//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState({}); // { questionId: optionIndex }
//   const [loading, setLoading] = useState(true);
//   const [timeLeft, setTimeLeft] = useState(0); // in seconds

//   const timerRef = useRef(null);

//   useEffect(() => {
//     if (!state) {
//       navigate("/contest-select"); // if page refreshed without data
//       return;
//     }

//     const fetchQuestions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.post(
//           "/api/contest/start",
//           { ...state },
//           { headers: token ? { "x-auth-token": token } : {} }
//         );

//         setQuestions(res.data.questions || []);
//         setTimeLeft((res.data.total || state.length) * 60); // 1 min per Q
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         navigate("/contest-select");
//       }
//     };

//     fetchQuestions();
//   }, [state, navigate]);

//   // Timer countdown
//   useEffect(() => {
//     if (timeLeft > 0) {
//       timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
//     } else if (timeLeft === 0 && questions.length > 0) {
//       handleSubmit();
//     }
//     return () => clearTimeout(timerRef.current);
//   }, [timeLeft]);

//   const handleAnswer = (questionId, idx) => {
//     setAnswers(prev => ({ ...prev, [questionId]: idx }));
//   };

//   const handlePrev = () => setCurrentIndex(i => Math.max(0, i - 1));
//   const handleNext = () => setCurrentIndex(i => Math.min(questions.length - 1, i + 1));

//   const formatTime = secs => {
//     const m = String(Math.floor(secs / 60)).padStart(2, "0");
//     const s = String(secs % 60).padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   const handleSubmit = async () => {
//     clearTimeout(timerRef.current);
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "/api/contest/submit",
//         {
//           ...state,
//           questions: questions.map(q => ({
//             questionId: q._id,
//             selectedAnswer: answers[q._id] ?? null
//           }))
//         },
//         { headers: token ? { "x-auth-token": token } : {} }
//       );
//       navigate("/history");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   const q = questions[currentIndex];
//   const selectedAnswer = answers[q._id];

//   return (
//     <Container className="mt-3">
//       {/* Top bar */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div>
//           {questions.map((qq, idx) => (
//             <Button
//               key={qq._id}
//               size="sm"
//               className="me-1"
//               variant={
//                 answers[qq._id] !== undefined ? "success" : "secondary"
//               }
//               onClick={() => setCurrentIndex(idx)}
//             >
//               {idx + 1}
//             </Button>
//           ))}
//         </div>
//         <div>
//           <Badge bg={timeLeft < 60 ? "danger" : "primary"}>
//             ⏳ {formatTime(timeLeft)}
//           </Badge>
//         </div>
//       </div>

//       {/* Question */}
//       <h5>Q{currentIndex + 1}. {q.questionText}</h5>

//       {/* Options */}
//       <div className="mt-3">
//         {q.options.map((opt, idx) => (
//           <Button
//             key={idx}
//             variant={selectedAnswer === idx ? "primary" : "outline-primary"}
//             className="d-block w-100 text-start mb-2"
//             onClick={() => handleAnswer(q._id, idx)}
//           >
//             {String.fromCharCode(65 + idx)}. {opt.optionText ?? opt}
//           </Button>
//         ))}
//       </div>

//       {/* Navigation */}
//       <div className="d-flex justify-content-between mt-3">
//         <Button onClick={handlePrev} disabled={currentIndex === 0}>
//           Prev
//         </Button>
//         {currentIndex === questions.length - 1 ? (
//           <Button variant="success" onClick={handleSubmit}>
//             Submit
//           </Button>
//         ) : (
//           <Button onClick={handleNext}>Next</Button>
//         )}
//       </div>
//     </Container>
//   );
// }
