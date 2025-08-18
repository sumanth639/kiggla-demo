import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient'; // Make sure this path is correct

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to send the admin notification
  const notifyAdmin = async (currentUser) => {
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORM_ACCESS_KEY,
          subject: 'New Member to Kiggla!',
          message: `A new user has just registered and confirmed their email.\n\nEmail: ${
            currentUser.email
          }\nName: ${currentUser.user_metadata?.full_name || currentUser.full_name || 'N/A'}`,
        }),
      });
      console.log('Admin notified successfully.');
    } catch (error) {
      console.error('Failed to notify admin:', error);
    }
  };

  // Function to handle email/password sign-up
  const signUpNewUser = async ({ email, password, name }) => {
    try {
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

  // This hook listens for auth state changes
  useEffect(() => {
  let isNotified = false; // safeguard to prevent duplicate notifyAdmin calls

  // Get the initial session and set the user
  supabase.auth.getSession().then(({ data: { session } }) => {
    setUser(session?.user ?? null);
    setLoading(false);
  });

  // Subscribe to auth state changes
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    setUser(session?.user ?? null);
    setLoading(false);

    if (
      event === "SIGNED_IN" &&
      session?.user?.email_confirmed_at &&
      !isNotified // ✅ only notify once
    ) {
      notifyAdmin(session.user);
      isNotified = true;
    }
  });

  // Cleanup on unmount
  return () => {
    subscription.unsubscribe();
  };
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
