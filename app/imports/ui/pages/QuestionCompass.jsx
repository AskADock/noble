import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import { Container, Row, Col, Button, InputGroup, FormControl, Image } from 'react-bootstrap';

const QuestionCompass = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isTyping) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:5000/api/get-answer', { question: input });
      const botResponse = response.data.answer;
      typeMessage(botResponse);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'bot', text: 'Sorry, something went wrong. Please try again later.' },
      ]);
      setIsTyping(false);
    }
  };

  const typeMessage = (text) => {
    let index = 0;
    let currentText = '';

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          if (updatedMessages[updatedMessages.length - 1]?.role === 'bot') {
            updatedMessages[updatedMessages.length - 1].text = currentText;
          } else {
            updatedMessages.push({ role: 'bot', text: currentText });
          }
          return updatedMessages;
        });
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        scrollToBottom();
      }
    }, 5); // Adjust the speed by changing the interval (5ms for faster typing)
  };

  return (
    <Container fluid className="d-flex flex-column min-vh-100 bg-light">
      <Row className="text-black">
        <Col className="text-center" style={{ padding: '20px' }}>
          <h1>Question Compass</h1>
        </Col>
      </Row>
      <Row className="noble-image justify-content-center">
        <Image src="/images/154_Logo.png" alt="Home Image" style={{ maxWidth: '30vh' }} />
      </Row>
      <Row className="QQ align-items-center text-center mt-5 mb-3">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <h5 className="QQ message">
            Welcome to Noble, your confidential virtual assistant for medical questions. Your privacy is our top priority—your
            questions remain anonymous and are not linked to your identity or shared with medical staff. Remember, Noble is
            here to provide guidance based on our available resources, but for any serious concerns, please reach out to a
            healthcare professional.
          </h5>
        </Col>
      </Row>
      <Row className="flex-grow-1" style={{ padding: '20px' }}>
        <Col xs={12} md={10} lg={9} className="d-flex flex-column mx-auto">
          <div
            className="p-3 chat-box"
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded ${
                  msg.role === 'user' ? 'bg-primary text-white align-self-end' : 'bg-secondary text-white align-self-start'
                }`}
              >
                <strong>{msg.role === 'user' ? 'User' : 'AI'}:</strong>{' '}
                {msg.role === 'bot' ? (
                  <div dangerouslySetInnerHTML={{ __html: marked(msg.text) }} />
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {isTyping && <div className="text-muted">Noble is typing...</div>}
            <div ref={chatEndRef} />
          </div>
          <InputGroup
            className="border-top mt-3"
            style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
          >
            <FormControl
              placeholder="Type your question here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              style={{ borderRadius: '10px 0 0 10px' }}
            />
            <Button variant="primary" onClick={handleSendMessage} style={{ borderRadius: '0 10px 10px 0' }}>
              Send
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionCompass;
