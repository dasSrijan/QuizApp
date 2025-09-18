import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button, Spinner, Row, Col, Badge } from "react-bootstrap";

export default function HistoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/contest/history/${id}`, {
          headers: token ? {  "x-auth-token": token  } : {}
        });
        setHistory(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load contest details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

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
        <p className="text-danger">{error}</p>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Container>
    );
  }

  if (!history) {
    return (
      <Container className="mt-4">
        <p>No data found.</p>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Container>
    );
  }

  const questions = history.questions || [];
  const total = history.totalMarks ?? questions.length;
  const score = history.score ?? 0;

  // ✅ Prevent accessing undefined
  if (!questions.length) {
    return (
      <Container className="mt-4">
        <p>No questions found in this history record.</p>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Container>
    );
  }

  const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));

  const q = questions[currentIndex];

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h4>
            Contest Review — {history.subject}{" "}
            <small className="text-muted">({history.contestLength ?? questions.length} Qs)</small>
          </h4>
          <div>
            <strong>Date:</strong> {new Date(history.date || history.startedAt || history.createdAt).toLocaleString()}
            {" "} • <strong>Score:</strong> {score}/{total} • <strong>Percent:</strong>{" "}
            {total ? ((score / total) * 100).toFixed(2) : "0.00"}%
          </div>
        </Col>
        <Col className="text-end">
          <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
        </Col>
      </Row>

      {/* Question navigation dots */}
      <div className="mb-3">
        {questions.map((qq, idx) => {
          const correct = !!qq.isCorrect;
          return (
            <Button
              key={idx}
              size="sm"
              variant={correct ? "success" : "danger"}
              className="me-1 mb-1"
              onClick={() => setCurrentIndex(idx)}
            >
              {idx + 1}
            </Button>
          );
        })}
      </div>

      {/* Question Card */}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>
            Question {currentIndex + 1} of {questions.length}
          </Card.Title>
          <Card.Text style={{ whiteSpace: "pre-wrap" }}>{q.questionText}</Card.Text>

          <div>
            {(q.options || []).map((opt, idx) => {
              const isCorrectAnswer = idx === (q.correctAnswer ?? q.correctAnswerIndex ?? null);
              const userAnsweredIdx = q.userAnswer ?? q.selectedAnswerIndex ?? q.selectedAnswer;
              const isUserChoice = idx === userAnsweredIdx;

              let className = "mb-2 p-2";
              if (isCorrectAnswer) className += " border border-success rounded";
              if (isUserChoice && !isCorrectAnswer) className += " bg-danger text-white rounded";
              if (isUserChoice && isCorrectAnswer) className += " bg-success text-white rounded";

              return (
                <div key={idx} className={className}>
                  <strong>{String.fromCharCode(65 + idx)}.</strong> {opt}
                  {isCorrectAnswer && <Badge bg="success" className="ms-2">Correct</Badge>}
                  {isUserChoice && !isCorrectAnswer && <Badge bg="danger" className="ms-2">Your answer</Badge>}
                  {isUserChoice && isCorrectAnswer && <Badge bg="info" className="ms-2">Your answer</Badge>}
                </div>
              );
            })}
          </div>
        </Card.Body>
      </Card>

      {/* Prev / Next */}
      <div className="d-flex justify-content-between mb-4">
        <Button variant="outline-primary" onClick={goPrev} disabled={currentIndex === 0}>
          Prev
        </Button>
        <div>
          <Button variant="outline-secondary" className="me-2" onClick={() => setCurrentIndex(0)}>First</Button>
          <Button variant="outline-secondary" onClick={() => setCurrentIndex(questions.length - 1)}>Last</Button>
        </div>
        <Button variant="outline-primary" onClick={goNext} disabled={currentIndex === questions.length - 1}>
          Next
        </Button>
      </div>
    </Container>
  );
}
