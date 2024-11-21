import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import { Container, Row, Col, Button, InputGroup, FormControl, Card } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import DisclaimerModal from '../components/DisclaimerModal';

const QuestionCompass = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null); // Use this ref to target the scrollable chat container

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom(); // Scroll to the bottom when messages change
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://noble.wiki/api', { question: input });
      const botResponse = response.data.answer;
      // eslint-disable-next-line no-use-before-define
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
    <Container fluid id={PAGE_IDS.QUESTION_COMPASS} className="question-compass-background p-0">
      <DisclaimerModal />
      <Container fluid className="color1">
        <Row className="py-4 text-center text-white text-shadow">
          <h1>
            <strong>Question Compass</strong>
          </h1>
          <h4>
            Chat with our AI assistant and find relevant medical information
          </h4>
        </Row>
      </Container>
      <Container>
        <Row className="py-3 px-1 justify-content-center">
          <Col sm={12} md={9} className="question-compass-section">
            <div
              ref={chatContainerRef} // Attach ref to the chat container
              className="p-3"
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                minHeight: '65vh',
                maxHeight: '65vh',
                overflowY: 'auto', // Ensure only this section scrolls
              }}
            >
              {messages.length === 0 && (
                <div className="text-center pt-3">
                  <h3>Welcome to Noble!</h3>
                  <p>
                    <strong>Your confidential virtual assistant for medical questions.</strong>
                  </p>
                  <h5>Ask Health-related Question</h5>
                  <p>
                    Noble is here to provide guidance based on our available resources.
                  </p>
                  <h5>For any serious concerns, please reach out to a healthcare professional.</h5>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`my-2 p-2 rounded ${
                    msg.role === 'user'
                      ? 'bg-primary text-white align-self-end'
                      : 'bg-secondary text-white align-self-start'
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
            </div>
            <InputGroup
              className="border-top mt-3"
              style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
            >
              <FormControl
                as="textarea"
                placeholder="Type your question here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                style={{ borderRadius: '10px 0 0 10px', resize: 'vertical' }}
              />
              <Button variant="primary" onClick={handleSendMessage} style={{ borderRadius: '0 10px 10px 0' }}>
                Send
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center text-center py-2">
          <Col sm={12} md={4}>
            <Card className="rounded-4 p-1">
              <Card.Title className="pt-3">
                <h4>AI Not Responding?</h4>
              </Card.Title>
              <Card.Body>
                <Button href="https://chatgpt.com/g/g-1mXpsuNWq-noble" variant="primary">
                  <h6>Question Compass</h6>
                </Button>
                <h4 className="pt-3">
                  <strong>Disclaimer</strong>
                </h4>
                <p>
                  A ChatGPT account is required to chat with the AI assistant
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default QuestionCompass;
