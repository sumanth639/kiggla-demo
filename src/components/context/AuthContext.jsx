import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient'; // Make sure this path is correct

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle email/password sign-up
  const signUpNewUser = async ({ email, password, name }) => {
    try {
      // Your custom RPC check logic for existing email goes here
      const { data: emailExists, error: rpcError } = await supabase.rpc(
        'get_user_id_by_email',
        { email_to_check: email }
      );

      if (rpcError) {
        return {
          success: false,
          message: `An error occurred: ${rpcError.message}`,
        };
      }

      if (emailExists) {
        return {
          success: false,
          message: 'This email is already registered. Please log in.',
        };
      }

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { full_name: name },
        },
      });

      if (error) {
        return { success: false, message: `Sign up error: ${error.message}` };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, message: `Unexpected error: ${error.message}` };
    }
  };

  // Function to handle email/password login
  const logInUser = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          message: `Error during login: ${error.message}`,
        };
      }
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        message: `Error during login: ${error.message}`,
      };
    }
  };

  // Function to handle Google sign-in
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        return {
          success: false,
          message: `Error during Google sign-in: ${error.message}`,
        };
      }
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        message: `Error during Google sign-in: ${error.message}`,
      };
    }
  };

  const resetPassword = async ({ email }) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return { success: false, message: `Error: ${error.message}` };
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: `Error: ${error.message}` };
    }
  };

  const updatePassword = async ({ password }) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        return { success: false, message: `Error: ${error.message}` };
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: `Error: ${error.message}` };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { success: false, message: `Error: ${error.message}` };
      }
      return { success: true };
    } catch (error) {
      return { success: false, message: `Error: ${error.message}` };
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
