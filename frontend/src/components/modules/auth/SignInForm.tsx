import { useState } from 'react';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import { Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from 'api/auth'; // Use centralized login function

const SignInForm = ({ layout }: { layout: 'simple' | 'card' | 'split' }) => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState<string | null>(null); // State for errors
  const navigate = useNavigate(); // For redirection

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    console.log(
      'SignIn form submitted with email:',
      email,
      'and password:',
      password
    );

    try {
      console.log('Calling login API...');
      const response = await login(email.trim(), password.trim());
      console.log('Login successful:', response);

      // Redirect to a protected route
      navigate('/dashboard'); // Adjust based on your routing
    } catch (err: any) {
      console.error('Error during login:', err);
      setError(err?.message || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      <div className="text-center mb-7">
        <h3 className="text-body-highlight">Sign In</h3>
        <p className="text-body-tertiary">Get access to your account</p>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <Form onSubmit={handleSignIn}>
        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="email">Email address</Form.Label>
          <div className="form-icon-container">
            <Form.Control
              id="email"
              type="email"
              className="form-icon-input"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faUser}
              className="text-body fs-9 form-icon"
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="password">Password</Form.Label>
          <div className="form-icon-container">
            <Form.Control
              id="password"
              type="password"
              className="form-icon-input"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faKey}
              className="text-body fs-9 form-icon"
            />
          </div>
        </Form.Group>
        <Row className="flex-between-center mb-7">
          <Col xs="auto">
            <Form.Check type="checkbox" className="mb-0">
              <Form.Check.Input
                type="checkbox"
                name="remember-me"
                id="remember-me"
                defaultChecked
              />
              <Form.Check.Label htmlFor="remember-me" className="mb-0">
                Remember me
              </Form.Check.Label>
            </Form.Check>
          </Col>
          <Col xs="auto">
            <Link to="/auth/forgot-password" className="fs-9 fw-semibold">
              Forgot Password?
            </Link>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="w-100 mb-3">
          Sign In
        </Button>
      </Form>
    </>
  );
};

export default SignInForm;
