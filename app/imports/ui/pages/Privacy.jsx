import React from 'react';
import { Container } from 'react-bootstrap';

const Privacy = () => {
  const textStyle = {
    textAlign: 'center',
    marginTop: '50px',
    lineHeight: '1.6',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px',
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <h1 style={headerStyle}>Privacy Policy</h1>
      <p style={textStyle}>
        At Noble, your privacy is our top priority. We ensure that any information you provide remains anonymous
        and will never be used against you. No personally identifiable information is collected unless you choose
        to share it for communication purposes. Your inquiries are not linked to your identity, and your data will
        not be shared with any military or government entities without your consent. We use secure encryption to
        protect your information, which is only accessible to authorized personnel. You have full control over your
        data and can delete it at any time. We will never share your data with third parties without your explicit
        permission.
      </p>
    </Container>
  );
};

export default Privacy;
