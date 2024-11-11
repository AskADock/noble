import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

const QuestionCompass = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    setMessages([...messages, { role: 'user', text: input }]);

    try {
      // Make a request to your Flask backend
      const response = await axios.post('http://localhost:5000/api/get-answer', { question: input });
      const botResponse = response.data.answer; // The answer from your backend

      setMessages((prevMessages) => [...prevMessages, { role: 'bot', text: botResponse }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
      <Container fluid className="question-compass-background p-0">
        <Container fluid className="color1">
          <Row className="py-4 text-center">
            <Col>
              <h1 className="text-white">Question Compass</h1>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="my-5">
            <Col className="text-center">
              <h2>Disclaimer</h2>
              <h5>A ChatGPT account is required.</h5>
              <p>
                The Question Compass is still in development. To access a demo of the Question Compass, click the button below.
              </p>
              <p>
                The Question Compass is an AI chatbot knowledgeable about Air Force medical standards and procedures.
                It can answer questions about medical standards, waivers, and other medical-related topics.
              </p>
              <hr className="my-5" />
              <Button href="https://chatgpt.com/g/g-1mXpsuNWq-noble" variant="primary">
                Question Compass
              </Button>
            </Col>
          </Row>
          <Row className="chat-container">
            <Col>
              <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.role === 'user' ? 'user-message' : 'bot-message'}>
                      <strong>{msg.role === 'user' ? 'User' : 'AI'}:</strong> {msg.text}
                    </div>
                ))}
              </div>
              <InputGroup className="my-3">
                <FormControl
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button variant="primary" onClick={handleSendMessage}>
                  Send
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </Container>
  );
};

export default QuestionCompass;
