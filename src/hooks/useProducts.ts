import useSWR from "swr"

export function useProducts() {
    return useSWR("/api/products", (url) =>
        fetch(url).then((r) => r.json())
    )
}
