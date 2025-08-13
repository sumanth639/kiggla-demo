import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserAuth } from './context/AuthContext';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { resetPassword } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const result = await resetPassword({ email });
      
      if (result.success) {
        setSuccess(true);
        setEmail('');
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

  return (
    <motion.div
      className="tw-min-h-screen tw-bg-background tw-text-text tw-flex tw-items-center tw-justify-center tw-p-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="tw-bg-card tw-rounded-lg tw-shadow-2xl tw-max-w-2xl tw-w-full tw-p-8 md:tw-p-12">
        <motion.div
          className="tw-text-center tw-mb-8"
          variants={itemVariants}
        >
          <motion.h2
            className="tw-text-3xl tw-font-bold tw-mb-4"
            variants={itemVariants}
          >
            Forgot Password?
          </motion.h2>
          <motion.p
            className="tw-text-muted tw-text-lg"
            variants={itemVariants}
          >
            No worries! Enter your email address and we'll send you a reset link.
          </motion.p>
        </motion.div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="tw-text-center tw-space-y-6"
          >
            <div className="tw-w-16 tw-h-16 tw-mx-auto tw-bg-green-100 tw-rounded-full tw-flex tw-items-center tw-justify-center">
              <svg
                className="tw-w-8 tw-h-8 tw-text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="tw-text-xl tw-font-semibold tw-text-green-800 tw-mb-2">
                Check Your Email
              </h3>
              <p className="tw-text-green-700 tw-mb-6">
                We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
              </p>
            </div>
            <div className="tw-space-y-3">
              <Link
                to="/login"
                className="tw-inline-block tw-bg-primary tw-text-white tw-py-3 tw-px-6 tw-rounded-md tw-font-semibold tw-transition-colors hover:tw-bg-secondary"
              >
                Back to Login
              </Link>
              <div>
                <button
                  onClick={() => setSuccess(false)}
                  className="tw-text-primary tw-font-medium hover:tw-underline"
                >
                  Send another email
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form onSubmit={handleSubmit} className="tw-space-y-6" variants={itemVariants}>
            {error && (
              <motion.div 
                className="tw-bg-red-100 tw-border tw-border-red-400 tw-text-red-700 tw-px-4 tw-py-3 tw-rounded"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <label className="tw-block tw-text-sm tw-font-medium tw-text-muted tw-mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="tw-block tw-w-full tw-rounded-md tw-border-border tw-bg-background tw-shadow-sm tw-py-3 tw-px-4 focus:tw-border-primary focus:tw-ring focus:tw-ring-primary focus:tw-ring-opacity-50"
                placeholder="Enter your email address"
                required
                disabled={loading}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                className="tw-w-full tw-bg-primary tw-text-white tw-py-3 tw-px-4 tw-rounded-md tw-font-semibold tw-transition-colors hover:tw-bg-secondary disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                disabled={loading}
              >
                {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
              </button>
            </motion.div>

            <motion.div
              className="tw-text-center tw-space-y-4"
              variants={itemVariants}
            >
              <p className="tw-text-sm tw-text-muted">
                Remember your password?{' '}
                <Link
                  to="/login"
                  className="tw-text-primary tw-font-medium hover:tw-underline"
                >
                  Back to Login
                </Link>
              </p>
              <p className="tw-text-sm tw-text-muted">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="tw-text-primary tw-font-medium hover:tw-underline"
                >
                  Sign Up
                </Link>
              </p>
            </motion.div>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
