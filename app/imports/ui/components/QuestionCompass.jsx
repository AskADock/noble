import React, { useEffect } from 'react';

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

      window.voiceflow.chat.open(); // Open the chat widget
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
    <div id="voiceflow-chat" />
  );
};

export default QuestionCompass;
