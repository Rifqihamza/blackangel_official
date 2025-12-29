// This route is deprecated - authentication now handled by NextAuth.js
// Keeping for backward compatibility, but redirecting to NextAuth
export async function POST() {
    return new Response(JSON.stringify({
        error: "Authentication endpoint deprecated. Use NextAuth.",
        redirect: "/api/auth/signin"
    }), {
        status: 410, // Gone
        headers: { 'Content-Type': 'application/json' }
    })
}
