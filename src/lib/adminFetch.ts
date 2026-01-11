export async function adminFetch<T>(
    input: RequestInfo,
    init?: RequestInit
): Promise<T> {
    const res = await fetch(input, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(init?.headers || {}),
        },
        ...init,
    })

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }

    return res.json()
}
