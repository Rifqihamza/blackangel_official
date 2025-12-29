// This route is deprecated - logout now handled by NextAuth.js
// Keeping for backward compatibility
export async function POST() {
    return new Response(JSON.stringify({
        message: "Logout endpoint deprecated. Use NextAuth signOut.",
        redirect: "/api/auth/signout"
    }), {
        status: 410, // Gone
        headers: { 'Content-Type': 'application/json' }
    })
}
