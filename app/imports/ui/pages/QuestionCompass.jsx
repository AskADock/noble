import React, { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import { Container, Row, Col, Button, InputGroup, FormControl, Image } from 'react-bootstrap';


const QuestionCompass = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);


  const handleSendMessage = async () => {
    if (input.trim() === '') return;


    setMessages([...messages, { role: 'user', text: input }]);


    try {
      const response = await axios.post('http://localhost:5000/api/get-answer', { question: input });
      const botResponse = response.data.answer;
      setMessages((prevMessages) => [...prevMessages, { role: 'bot', text: botResponse }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  return (
    <Container fluid className="d-flex flex-column vh-100">
      <Row className="text-black">
        <Col className="text-center" style={{ padding: '20px' }}>
          <h1>Question Compass</h1>
        </Col>
      </Row>
      <Row className="noble-image justify-content-center">
        <Image src="/images/154_Logo.png" alt="Home Image" to="/" style={{ maxWidth: '30vh' }} />
      </Row>
      <Row className="QQ align-items-center text-center mt-5 mb-3">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <h4 className="QQ message">
            I am Noble, a virtual assistant here to answer any medical questions you may have.
            Please remember that I am not a real doctor, and important questions should be taken to your medical provider.
          </h4>
        </Col>
      </Row>
      <Row className="flex-grow-1 overflow-auto" style={{ padding: '20px' }}>
        <Col xs={12} md={8} lg={6} className="d-flex flex-column mx-auto">
          <div className="flex-grow-1 p-3 chat-box">
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 p-2 rounded ${msg.role === 'user' ? 'bg-light align-self-end' : 'bg-secondary text-white align-self-start'}`}>
                <strong>{msg.role === 'user' ? 'User' : 'AI'}:</strong>{' '}
                {msg.role === 'bot' ? (
                  <div dangerouslySetInnerHTML={{ __html: marked(msg.text) }} />
                ) : (
                  msg.text
                )}
              </div>
            ))}
          </div>
          <InputGroup className="p-3 border-top">
            <FormControl
              placeholder="Type your question here..."
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
  );
};


export default QuestionCompass;


