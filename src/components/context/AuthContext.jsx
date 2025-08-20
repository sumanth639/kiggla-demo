import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const WEB3FORM_ACCESS_KEY = import.meta.env.VITE_WEB3FORM_ACCESS_KEY;

  const notifyAdmin = async (currentUser) => {
    try {
      const { data: userData, error: fetchError } = await supabase
        .from('users')
        .select('notified')
        .eq('id', currentUser.id)
        .single();

      if (fetchError || userData?.notified) {
        console.log('User has already been notified, skipping.');
        return;
      }

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORM_ACCESS_KEY,
          subject: '🎉 New Member on Kiggla!',
          message: `A new user has just registered and confirmed their email.
                    \n\nEmail: ${currentUser.email}
                    \nName: ${currentUser.user_metadata?.full_name || 'N/A'}`,
        }),
      });
      console.log('Admin notified successfully.');

      const { error: updateError } = await supabase
        .from('users')
        .update({ notified: true })
        .eq('id', currentUser.id);

      if (updateError) {
        console.error(
          'Failed to update user notification status:',
          updateError
        );
      }
    } catch (error) {
      console.error('Failed to notify admin:', error);
    }
  };

  const signUpNewUser = async ({ email, password, name }) => {
    try {
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
      setUser(null); // Explicitly clear the user state
      return { success: true };
    } catch (error) {
      return { success: false, message: `Error: ${error.message}` };
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      if (
        event === 'SIGNED_IN' &&
        session?.user &&
        session.user.email_confirmed_at
      ) {
        const isNewUser =
          new Date(session.user.created_at) -
            new Date(session.user.last_sign_in_at) <
          5000;

        if (isNewUser) {
          const { data, error } = await supabase
            .from('users')
            .select('id, notified')
            .eq('id', session.user.id)
            .single();

          if (error && error.code === 'PGRST116') {
            const { error: insertError } = await supabase.from('users').insert({
              id: session.user.id,
              email: session.user.email,
              full_name: session.user.user_metadata?.full_name || '',
            });

            if (insertError) {
              console.error('Error creating user profile:', insertError);
            }
          }

          const { data: userData, error: fetchError } = await supabase
            .from('users')
            .select('notified')
            .eq('id', session.user.id)
            .single();

          if (!fetchError && !userData?.notified) {
            notifyAdmin(session.user);
          }
        }
      }
    });

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
