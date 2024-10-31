import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useUnsafeChatAdapter } from '@nlux/openai-react';
import { AiChat } from '@nlux/react';

const QuestionCompass = () => {
  const chatAdapter = useUnsafeChatAdapter({
    apiKey: 'sk-XXXXXXXX',
    dataTransferMode: 'stream',
    model: 'gpt-3.5-turbo',
  });

  return (
    <>
      <Container fluid className="color1">
        <Row className="py-4 text-center">
          <Col>
            <h1 className="text-white">Question Compass</h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <AiChat adapter={chatAdapter} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default QuestionCompass;
