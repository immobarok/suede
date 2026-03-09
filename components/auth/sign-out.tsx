"use client";

import { createClient } from "@/lib/supabase/client";

export default function SignOut() {
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    };

    return <button onClick={handleSignOut}>Sign Out</button>;
}