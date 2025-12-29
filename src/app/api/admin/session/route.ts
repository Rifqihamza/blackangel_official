// This route is deprecated - session management now handled by NextAuth.js
// Keeping for backward compatibility
export async function GET() {
    return new Response(JSON.stringify({
        error: "Session endpoint deprecated. Use NextAuth session.",
        redirect: "/api/auth/session"
    }), {
        status: 410, // Gone
        headers: { 'Content-Type': 'application/json' }
    })
}
