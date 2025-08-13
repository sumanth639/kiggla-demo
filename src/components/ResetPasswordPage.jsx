import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { UserAuth } from './context/AuthContext';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { updatePassword } = UserAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check if we have the necessary tokens for password reset
  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    
    if (!accessToken || !refreshToken) {
      setError('Invalid or expired reset link. Please request a new password reset.');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const result = await updatePassword({ password });
      
      if (result.success) {
        setSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
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

  if (success) {
    return (
      <motion.div
        className="tw-min-h-screen tw-bg-background tw-text-text tw-flex tw-items-center tw-justify-center tw-p-4"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        <div className="tw-bg-card tw-rounded-lg tw-shadow-2xl tw-max-w-2xl tw-w-full tw-p-8 md:tw-p-12 tw-text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="tw-space-y-6"
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
                Password Updated Successfully!
              </h3>
              <p className="tw-text-green-700 tw-mb-6">
                Your password has been reset. You will be redirected to the login page in a few seconds.
              </p>
            </div>
            <div className="tw-space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="tw-inline-block tw-bg-primary tw-text-white tw-py-3 tw-px-6 tw-rounded-md tw-font-semibold tw-transition-colors hover:tw-bg-secondary"
              >
                Go to Login
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

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
            Reset Your Password
          </motion.h2>
          <motion.p
            className="tw-text-muted tw-text-lg"
            variants={itemVariants}
          >
            Enter your new password below.
          </motion.p>
        </motion.div>

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
              New Password
            </label>
            <div className="tw-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="tw-block tw-w-full tw-rounded-md tw-border-border tw-bg-background tw-shadow-sm tw-py-3 tw-px-4 focus:tw-border-primary focus:tw-ring focus:tw-ring-primary focus:tw-ring-opacity-50"
                placeholder="Enter your new password"
                required
                disabled={loading}
                minLength={6}
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
            <p className="tw-mt-1 tw-text-xs tw-text-muted">
              Password must be at least 6 characters long.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-muted tw-mb-2">
              Confirm New Password
            </label>
            <div className="tw-relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="tw-block tw-w-full tw-rounded-md tw-border-border tw-bg-background tw-shadow-sm tw-py-3 tw-px-4 focus:tw-border-primary focus:tw-ring focus:tw-ring-primary focus:tw-ring-opacity-50"
                placeholder="Confirm your new password"
                required
                disabled={loading}
                minLength={6}
              />
              <button
                type="button"
                className="tw-absolute tw-right-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-muted hover:tw-text-text"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              type="submit"
              className="tw-w-full tw-bg-primary tw-text-white tw-py-3 tw-px-4 tw-rounded-md tw-font-semibold tw-transition-colors hover:tw-bg-secondary disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              disabled={loading}
            >
              {loading ? 'Updating Password...' : 'Update Password'}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
