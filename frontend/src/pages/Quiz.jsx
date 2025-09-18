import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Quiz() {
  const { state } = useLocation();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/contest/questions/${state.subject._id}?count=${state.count}`)
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, [state]);

  return (
    <div className="container mt-5">
      <h3>Quiz - {state.subject.name}</h3>
      {questions.map((q, index) => (
        <div key={q._id} className="mb-4">
          <h5>{index + 1}. {q.question}</h5>
          {q.options.map((opt, i) => (
            <div key={i}>
              <input type="radio" name={`q-${index}`} /> {opt}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
