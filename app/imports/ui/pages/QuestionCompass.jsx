import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const QuestionCompass = () => {
  useEffect(() => {
    const loadVoiceflowChat = () => {
      window.voiceflow.chat.load({
        verify: {
          projectID: '6705cc2687b28b9bff879819', // Replace with your Voiceflow project ID
        },
        versionID: 'production', // Optional, set to 'production' or 'development'
        userID: 'unique-user-id', // Optional, add to track sessions
        user: {
          name: 'User Name', // Optional, user metadata for transcripts
          image: 'https://example.com/user-avatar.jpg', // Optional, user avatar
        },
        assistant: {
          title: 'Noble', // Optional, customize the assistant
          description: 'Welcome to the assistant', // Optional
          image: 'https://example.com/assistant-image.jpg', // Optional
        },
        url: 'https://general-runtime.voiceflow.com', // Optional, defaults to Voiceflow runtime endpoint
      });
    };

    // Create the script element to load the Voiceflow widget
    const script = document.createElement('script');
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = loadVoiceflowChat; // Call loadVoiceflowChat when script is loaded

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} className="text-center">
          <h2>Question Compass</h2>
          <p>Ask your questions and get instant answers!</p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <div id="voiceflow-chat" style={{ height: '600px' }} />
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionCompass;
