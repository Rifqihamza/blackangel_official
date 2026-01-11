import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function uploadImage(file: File) {
    const buffer = Buffer.from(await file.arrayBuffer())

    return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: "products",
                resource_type: "image",
                transformation: [
                    { quality: "auto", fetch_format: "auto" },
                ],
            },
            (error, result) => {
                if (error || !result) return reject(error)

                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                })
            }
        ).end(buffer)
    })
}

export async function uploadImages(files: File[]): Promise<string[]> {
    const uploads = files.map(file => uploadImage(file))
    const results = await Promise.all(uploads)
    return results.map(result => result.url)
}

export function assertImages(images: unknown): string[] {
    if (!Array.isArray(images)) return []
    return images.filter((i): i is string => typeof i === "string")
}

export async function deleteImage(url: string) {
    const publicId = url.split("/").slice(-2).join("/").split(".")[0]
    await cloudinary.uploader.destroy(publicId)
}
