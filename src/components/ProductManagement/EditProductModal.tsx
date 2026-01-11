'use client'

import { useState, useRef } from 'react'
import { Product, Category } from '@/types/product'
import { generateSlug } from '@/lib/generateSlug'
import Image from 'next/image'

interface Props {
    isOpen: boolean
    product: Product | null
    categories: Category[]
    onClose: () => void
    onSubmit: (formData: FormData) => Promise<void>
}

export default function EditProductModal({
    isOpen,
    product,
    categories,
    onClose,
    onSubmit,
}: Props) {

    /* ============================
       SAFE DEFAULT (ANTI CONDITIONAL HOOK)
    ============================ */
    const safeProduct = product ?? {
        id: 0,
        name: '',
        slug: '',
        description: '',
        price: 0,
        images: [],
        categoryId: 0,
        isActive: true,
        createdAt: '',
        updatedAt: '',
    }

    /* ============================
       HOOKS (SELALU DIEKSEKUSI)
    ============================ */
    const [form, setForm] = useState({
        name: safeProduct.name,
        slug: safeProduct.slug,
        description: safeProduct.description ?? '',
        price: safeProduct.price.toString(),
        categoryId: safeProduct.categoryId.toString(),
        isActive: safeProduct.isActive,
        images: null as FileList | null,
    })

    const [previews, setPreviews] = useState<string[]>(
        safeProduct.images ?? []
    )

    const urlsRef = useRef<string[]>([])

    /* ============================
       JIKA MODAL TIDAK OPEN
    ============================ */
    if (!isOpen) return null

    /* ============================
       SUBMIT
    ============================ */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const fd = new FormData()
        fd.append('name', form.name)
        fd.append('slug', form.slug)
        fd.append('description', form.description)
        fd.append('price', form.price)
        fd.append('categoryId', form.categoryId)
        fd.append('isActive', String(form.isActive))

        if (form.images) {
            Array.from(form.images).forEach(file =>
                fd.append('images', file)
            )
        }

        await onSubmit(fd)
        onClose()
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-4xl bg-white">
                <h3 className="font-semibold mb-4">Edit Product</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* MAIN GRID */}
                    <div className="w-full flex flex-col md:flex-row gap-4">
                        {/* LEFT — FORM */}
                        <div className="space-y-4 w-full">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    className="px-4 py-2 w-full bg-white shadow-inner shadow-black/30 outline-none rounded-lg"
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={e =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                            slug: generateSlug(e.target.value),
                                        })
                                    }
                                    required
                                />

                                <input
                                    placeholder="Slug"
                                    value={form.slug}
                                    onChange={e =>
                                        setForm({
                                            ...form,
                                            slug: generateSlug(e.target.value),
                                        })
                                    }
                                    className="px-4 py-2 text-sm w-full rounded-lg bg-white shadow-inner shadow-black/30 outline-none"
                                    required
                                />

                                <input
                                    type="number"
                                    className="px-4 py-2 w-full bg-white shadow-inner shadow-black/30 outline-none rounded-lg"
                                    placeholder="Price"
                                    value={form.price}
                                    onChange={e =>
                                        setForm({
                                            ...form,
                                            price: e.target.value,
                                        })
                                    }
                                    required
                                />

                                <select
                                    className="px-4 py-2 w-full bg-white shadow-inner shadow-black/30 outline-none rounded-lg"
                                    value={form.categoryId}
                                    onChange={e =>
                                        setForm({
                                            ...form,
                                            categoryId: e.target.value,
                                        })
                                    }
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <textarea
                                className="resize-none px-4 py-2 w-full bg-white shadow-inner shadow-black/30 outline-none rounded-lg"
                                placeholder="Description"
                                value={form.description}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="px-4 py-2 w-full bg-white rounded-lg shadow-inner shadow-black/30 outline-none"
                                onChange={e => {
                                    const files = e.target.files

                                    urlsRef.current.forEach(URL.revokeObjectURL)

                                    const urls = files
                                        ? Array.from(files).map(
                                            URL.createObjectURL
                                        )
                                        : []

                                    urlsRef.current = urls
                                    setPreviews(urls)
                                    setForm({
                                        ...form,
                                        images: files,
                                    })
                                }}
                            />
                        </div>

                        {/* RIGHT — IMAGE PREVIEW */}
                        <div className="w-full md:w-100 bg-white shadow-inner shadow-black/30 rounded-lg p-3 flex flex-col items-center justify-center">
                            <p className="text-sm font-medium mb-2 text-gray-600">
                                Image Preview
                            </p>

                            {previews.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                                    No images
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    {previews.map((src, i) => (
                                        <Image
                                            key={i}
                                            src={src}
                                            alt=""
                                            width={150}
                                            height={150}
                                            className="rounded-lg object-cover w-full h-32"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn bg-(--primary) text-white"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
