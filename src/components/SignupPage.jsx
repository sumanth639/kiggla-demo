import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { UserAuth } from './context/AuthContext';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { user, signUpNewUser, signInWithGoogle } = UserAuth();

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signUpNewUser({ email, password, name });

      if (result.success) {
        setError('Account created successfully! Please check your email for verification.');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        // Google OAuth handles redirection, so no manual navigation here.
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -50, transition: { ease: 'easeInOut' } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const isDarkMode = document.documentElement.classList.contains('dark');
  const googleLogoColor = isDarkMode ? '#FFFFFF' : '#000000';

  return (
    <motion.div
      className="tw-min-h-screen tw-bg-background tw-text-text tw-flex tw-items-center tw-justify-center tw-p-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="tw-bg-card tw-rounded-lg tw-shadow-2xl tw-max-w-4xl tw-w-full tw-flex tw-flex-col md:tw-flex-row tw-overflow-hidden">
        {/* Form Section */}
        <motion.div
          className="tw-flex-1 tw-p-8 md:tw-p-12 tw-flex tw-flex-col tw-justify-center"
          variants={itemVariants}
        >
          <motion.h2
            className="tw-text-2xl tw-font-bold tw-text-center tw-mb-6"
            variants={itemVariants}
          >
            Create an Account
          </motion.h2>
          
          {error && (
            <motion.div 
              className={`tw-px-4 tw-py-3 tw-rounded tw-mb-4 ${
                error.includes('successfully') 
                  ? 'tw-bg-green-100 tw-border tw-border-green-400 tw-text-green-700'
                  : 'tw-bg-red-100 tw-border tw-border-red-400 tw-text-red-700'
              }`}
              variants={itemVariants}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSignUp} className="tw-space-y-4">
            <motion.div variants={itemVariants}>
              <label className="tw-block tw-text-sm tw-font-medium tw-text-muted">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border-border tw-bg-background tw-shadow-sm tw-py-2 tw-px-3 focus:tw-border-primary focus:tw-ring focus:tw-ring-primary focus:tw-ring-opacity-50"
                required
                disabled={loading}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="tw-block tw-text-sm tw-font-medium tw-text-muted">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border-border tw-bg-background tw-shadow-sm tw-py-2 tw-px-3 focus:tw-border-primary focus:tw-ring focus:tw-ring-primary focus:tw-ring-opacity-50"
                required
                disabled={loading}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="tw-block tw-text-sm tw-font-medium tw-text-muted">
                Password
              </label>
              <div className="tw-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border-border tw-bg-background tw-shadow-sm tw-py-2 tw-px-3 focus:tw-border-primary focus:tw-ring focus:tw-ring-primary focus:tw-ring-opacity-50"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="tw-absolute tw-right-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-muted hover:tw-text-text"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <button
                type="submit"
                className="tw-w-full tw-bg-primary tw-text-white tw-py-2 tw-px-4 tw-rounded-md tw-font-semibold tw-transition-colors hover:tw-bg-secondary disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </motion.div>
          </form>
          
          <motion.p
            className="tw-mt-4 tw-text-center tw-text-sm tw-text-muted"
            variants={itemVariants}
          >
            Already have an account?{' '}
            <Link
              to="/login"
              className="tw-text-primary tw-font-medium hover:tw-underline"
            >
              Log In
            </Link>
          </motion.p>
          
          <motion.div variants={itemVariants} className="tw-mt-6">
            <div className="tw-flex tw-items-center tw-justify-center tw-space-x-2">
              <div className="tw-border-b tw-border-border tw-w-full" />
              <span className="tw-text-sm tw-text-muted">or</span>
              <div className="tw-border-b tw-border-border tw-w-full" />
            </div>
            <button
              className="tw-w-full tw-mt-4 tw-flex tw-items-center tw-justify-center tw-space-x-2 tw-bg-background tw-border tw-border-border tw-text-text tw-py-2 tw-px-4 tw-rounded-md tw-font-semibold tw-transition-colors hover:tw-bg-card disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
              onClick={handleGoogleSignUp}
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              <FcGoogle color={googleLogoColor} />
              <span>{loading ? 'Signing up...' : 'Sign up with Google'}</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="tw-hidden md:tw-block tw-flex-1"
          variants={itemVariants}
        >
          <img
            src="/assets/img/kiggla/signup.webp"
            alt="Sign Up Illustration"
            className="tw-w-full tw-h-full tw-object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignupPage;