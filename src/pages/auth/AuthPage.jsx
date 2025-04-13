import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, DarkModeToggle, Input, Loader } from '../../components/ui';
import { UserContext } from '../../contexts/UserContext';
import { apiService, notificationService, validationService } from '../../services';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // Clear token on mount if user visits login page
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const toggleAuthPage = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setEmail('');
    setPassword('');
    setUserName('');
  };

  const validateLoginForm = () => {
    const formErrors = {};
    let isValid = true;

    if (!email.trim()) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!validationService.isValidEmail(email)) {
      formErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password.trim()) {
      formErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const validateRegisterForm = () => {
    const formErrors = {};
    let isValid = true;

    if (!username.trim()) {
      formErrors.username = 'Username is required';
      isValid = false;
    } else if (username.length < 3) {
      formErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    if (!email.trim()) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!validationService.isValidEmail(email)) {
      formErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password.trim()) {
      formErrors.password = 'Password is required';
      isValid = false;
    } else if (!validationService.isStrongPassword(password)) {
      formErrors.password =
        'Password must be at least 8 characters with uppercase, lowercase and number';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateLoginForm()) {
      return;
    }

    setLoading(true);
    try {
      const token = await apiService.post('/api/Authentication/Login', { email, password });
      localStorage.setItem('token', token.token);

      // Extract username from email (before the @ symbol) and store it
      const usernameFromEmail = email.split('@')[0];
      localStorage.setItem('username', usernameFromEmail);

      setUser(email);
      notificationService.toast('Login successful!');
      navigate('/contacts');
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Invalid credentials. Please try again.' });
      notificationService.error('Login Failed', 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateRegisterForm()) {
      return;
    }

    setLoading(true);
    try {
      await apiService.post('/api/Authentication/Register?role=Admin', {
        username,
        email,
        password,
      });

      // Store the username for future use after successful registration and verification
      localStorage.setItem('username', username);

      notificationService.success(
        'Registration Successful',
        'A verification link has been sent to your email. Please verify your account and then login.',
      );
      setUserName('');
      setEmail('');
      setPassword('');
      setIsLogin(true);
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Registration failed. Please try again.' });
      notificationService.error('Registration Failed', 'Unable to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
        <div className="mt-3 text-center">
          <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">Raabta</span>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 sm:px-10">
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`pb-2 flex-1 text-center font-medium cursor-pointer ${
                isLogin
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`pb-2 flex-1 text-center font-medium cursor-pointer ${
                !isLogin
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Register
            </button>
          </div>

          {errors.form && (
            <div className="mb-4 p-2 rounded bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm">
              {errors.form}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                error={errors.email}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                error={errors.password}
              />
              <div>
                <Button type="submit" className="w-full" variant="primary" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Loader size="sm" color="white" />
                      <span className="ml-2">Signing in...</span>
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              <Input
                id="username"
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your username"
                required
                error={errors.username}
              />
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                error={errors.email}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                error={errors.password}
              />
              <div className="flex gap-3">
                <Button
                  type="button"
                  className="flex-1"
                  variant="secondary"
                  onClick={() => setIsLogin(true)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" variant="success" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Loader size="sm" color="white" />
                      <span className="ml-2">Registering...</span>
                    </div>
                  ) : (
                    'Register'
                  )}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
