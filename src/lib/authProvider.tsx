import type { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from "./supabase";
import { AuthContext, type UserProfile } from "./authContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async (user: User) => {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error getting profile:", error);
      return null;
    }
    let avurl = null
    if (data && data.avatar_url){
      avurl=data.avatar_url
    }
    else if (data && !data.avatar_url){
      avurl = await uploadProfilePic(user)
    }
    let final = avurl? {...data, avatar_url:(await getAvatarUrl([avurl]))[data.avatar_url]}:{...data, avatar_url:'default.jpg'}

    return final;
  };

  useEffect(() => {
    const initialize = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const profile = await getProfile(session?.user);
        setProfile(profile);
      }

      setLoading(false);
    };

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const profile = await getProfile(session.user);
        setProfile(profile);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/Home`,
        queryParams: {
        prompt: "select_account",
      },
      },
    });

  };
  const getAvatarUrl = async(requests : any[])=>{
    if (requests.length>0){
      const {data,error} = await supabase.storage.from('avatars').createSignedUrls(requests, 3600);
    const avatarUrls: Record<string, string> = {};

    data?.forEach(item => {
      if (item.path && item.signedUrl) {
        avatarUrls[item.path] = item.signedUrl;
      }
    });
    return avatarUrls;
    } else{
      return {}
    }
  }
  const uploadProfilePic = async(user: User)=>{
    if (user.user_metadata.avatar_url){
      const response = await fetch(user.user_metadata.avatar_url, {referrerPolicy:"no-referrer"});

      if (!response.ok) {
  console.error(
    "Avatar download failed:",
    response.status,
    response.statusText
  );
  return null;
}

      const blob = await response.blob();
      const filePath = `${user.id}.jpg`;

      const {data,error} = await supabase.storage
      .from('avatars')
      .upload(filePath, blob, {
        cacheControl: '3600',
        upsert: false
      });
      await supabase.from('profiles').update({avatar_url:filePath}).eq('id', user.id)
      return filePath
    }else{
      await supabase.from('profiles').update({avatar_url:'default.jpg'}).eq('id', user.id)
      return 'default.jpg'
    }
  }
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        setLoading,
        getAvatarUrl,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}