'use client'

import { Product } from '@/types/product'

export default function DeleteProductModal({
    isOpen,
    product,
    onClose,
    onConfirm
}: {
    isOpen: boolean
    product: Product | null
    onClose: () => void
    onConfirm: () => Promise<void>
}) {
    if (!isOpen || !product) return null

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Delete Product</h3>
                <p className="py-4">
                    Delete <b>{product.name}</b>? This action cannot be undone.
                </p>

                <div className="modal-action">
                    <button onClick={onClose} className="btn">Cancel</button>
                    <button
                        onClick={onConfirm}
                        className="btn bg-red-500 text-white hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
