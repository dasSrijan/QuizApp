import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spinner, Alert, Container, Row, Col } from "react-bootstrap";

export default function ContestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/contest/history/${id}`, {
          headers: token ? { "x-auth-token": token } : {}
        });
        setContest(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load contest details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!contest) return null;

  const { questions, score, totalMarks, subject, date } = contest;
  const currentQuestion = questions[currentIndex];

  return (
    <Container className="mt-4">
      <h3>{subject} — Contest on {new Date(date).toLocaleString()}</h3>
      <p>
        Score: <strong>{score}/{totalMarks}</strong>
      </p>

      {/* Question Number Indicators */}
      <div className="mb-3">
        {questions.map((q, idx) => (
          <Button
            key={idx}
            size="sm"
            className="me-1"
            variant={q.isCorrect ? "success" : "danger"}
            onClick={() => setCurrentIndex(idx)}
          >
            {idx + 1}
          </Button>
        ))}
      </div>

      {/* Current Question Display */}
      <div className="p-3 border rounded">
        <h5>Q{currentIndex + 1}: {currentQuestion.questionText}</h5>
        <ul>
          {currentQuestion.options.map((opt, i) => (
            <li
              key={i}
              style={{
                fontWeight: i === currentQuestion.correctAnswer ? "bold" : "normal",
                color: i === currentQuestion.correctAnswer
                  ? "green"
                  : i === currentQuestion.userAnswer
                    ? "red"
                    : "black"
              }}
            >
              {opt}
              {i === currentQuestion.correctAnswer && " ✅"}
              {i === currentQuestion.userAnswer && i !== currentQuestion.correctAnswer && " ❌"}
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Buttons */}
      <Row className="mt-3">
        <Col>
          <Button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            Previous
          </Button>
        </Col>
        <Col className="text-end">
          <Button
            disabled={currentIndex === questions.length - 1}
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            Next
          </Button>
        </Col>
      </Row>

      {/* Back to History */}
      <div className="mt-4">
        <Button variant="secondary" onClick={() => navigate("/history")}>
          Back to History
        </Button>
      </div>
    </Container>
  );
}
