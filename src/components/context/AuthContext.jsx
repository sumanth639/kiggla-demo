import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up Function
  const signUpNewUser = async ({ email, password, name }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (error) {
        console.error('Sign-up error:', error);
        return {
          success: false,
          message: `Error during sign up: ${error.message}`,
        };
      }
      return { success: true, data };
    } catch (error) {
      console.error('Sign-up error:', error);
      return {
        success: false,
        message: `Error during sign up: ${error.message}`,
      };
    }
  };

  // Login with email and password
  const logInUser = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Log in error:', error);
        return { 
          success: false, 
          message: `Error during login: ${error.message}` 
        };
      }
      return { success: true, data };
    } catch (error) {
      console.error('Log in error:', error);
      return { 
        success: false, 
        message: `Error during login: ${error.message}` 
      };
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) {
        console.error('Google sign-in error:', error);
        return { 
          success: false, 
          message: `Error during Google sign-in: ${error.message}` 
        };
      }
      return { success: true, data };
    } catch (error) {
      console.error('Google sign-in error:', error);
      return { 
        success: false, 
        message: `Error during Google sign-in: ${error.message}` 
      };
    }
  };

  // Reset password
  const resetPassword = async ({ email }) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Password reset error:', error);
        return { 
          success: false, 
          message: `Error during password reset: ${error.message}` 
        };
      }
      return { success: true, data };
    } catch (error) {
      console.error('Password reset error:', error);
      return { 
        success: false, 
        message: `Error during password reset: ${error.message}` 
      };
    }
  };

  // Update password
  const updatePassword = async ({ password }) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        console.error('Password update error:', error);
        return { 
          success: false, 
          message: `Error during password update: ${error.message}` 
        };
      }
      return { success: true, data };
    } catch (error) {
      console.error('Password update error:', error);
      return { 
        success: false, 
        message: `Error during password update: ${error.message}` 
      };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        return { 
          success: false, 
          message: `Error during sign out: ${error.message}` 
        };
      }
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { 
        success: false, 
        message: `Error during sign out: ${error.message}` 
      };
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        loading,
        signUpNewUser, 
        logInUser, 
        signInWithGoogle,
        resetPassword,
        updatePassword,
        signOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
