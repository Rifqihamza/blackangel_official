import { Send, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
    return (
        <section id="conciergePage" className="">
            <div className="container mx-auto px-6 py-25 w-full">

                {/* TITLE */}
                <h1 className="text-3xl md:text-6xl font-medium font-[Tangerine] text-center mb-12 tracking-wider text-(--primary)">
                    Reach Us
                </h1>

                <div className="card bg-white shadow-inner shadow-black/10 p-6 rounded-xl">
                    <div className="card-body">
                        <div className="flex flex-col lg:flex-row gap-8">

                            {/* ===== LEFT : FORM ===== */}
                            <div className="flex-3 border-r border-gray-200 pr-5">
                                <form className="grid grid-cols-1 gap-6">
                                    <div className="flex flex-col gap-6 w-full">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                            {/* Name */}
                                            <div className="flex flex-col items-start justify-center gap-1 w-full">
                                                <label className="label">
                                                    <span className="label-text font-medium text-(--secondary)">Name *</span>
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Your name"
                                                    className="w-full h-full px-4 py-2 outline-none rounded-lg shadow-inner shadow-black/20 focus:shadow-black/50 transition"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div className="flex flex-col items-start justify-center gap-1 w-full">
                                                <label className="label">
                                                    <span className="label-text font-medium text-(--secondary)">Email *</span>
                                                </label>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="Your email"
                                                    className="w-full h-full px-4 py-2 outline-none rounded-lg shadow-inner shadow-black/20 focus:shadow-black/50 transition"
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div className="flex flex-col items-start justify-center gap-1 w-full">
                                                <label className="label">
                                                    <span className="label-text font-medium text-(--secondary)">Phone *</span>
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Phone #"
                                                    className="w-full h-full px-4 py-2 outline-none rounded-lg shadow-inner shadow-black/20 focus:shadow-black/50 transition"
                                                />
                                            </div>

                                            {/* Company */}
                                            <div className="flex flex-col items-start justify-center gap-1 w-full">
                                                <label className="label">
                                                    <span className="label-text font-medium text-(--secondary)">Company *</span>
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Company name"
                                                    className="w-full h-full px-4 py-2 outline-none rounded-lg shadow-inner shadow-black/20 focus:shadow-black/50 transition"
                                                />
                                            </div>
                                        </div>
                                        {/* Message */}
                                        <div className="flex flex-col items-start justify-center gap-1 w-full">
                                            <label className="label">
                                                <span className="label-text font-medium text-(--secondary)">Message *</span>
                                            </label>
                                            <textarea
                                                required
                                                rows={4}
                                                placeholder="Write your message"
                                                className="resize-none w-full h-full px-4 py-2 outline-none rounded-lg shadow-inner shadow-black/20 focus:shadow-black/50 transition"
                                            />
                                        </div>
                                    </div>
                                    {/* Button */}
                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="btn border-2 border-(--primary) rounded-lg text-(--primary) hover:text-white hover:bg-(--primary) w-full sm:w-auto"
                                        >
                                            <Send size={16} />
                                            SEND MESSAGE
                                        </button>
                                    </div>

                                </form>
                            </div>

                            {/* ===== RIGHT : CONTACT INFO ===== */}
                            <div className="flex-1 space-y-6">
                                <h2 className="text-2xl font-semibold text-(--primary)">
                                    Contact Information
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-(--primary)/10 rounded-lg">
                                            <MapPin size={20} className="text-(--primary)" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-(--secondary)">Address</p>
                                            <p className="text-sm text-neutral-600">
                                                9757 Aspen Lane South Richmond Hill, NY 11419
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-(--primary)/10 rounded-lg">
                                            <Phone size={20} className="text-(--primary)" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-(--secondary)">Phone</p>
                                            <p className="text-sm text-neutral-600">+1 (291) 939 9321</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-(--primary)/10 rounded-lg">
                                            <Mail size={20} className="text-(--primary)" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-(--secondary)">Email</p>
                                            <p className="text-sm text-neutral-600">info@mywebsite.com</p>
                                        </div>
                                    </div>
                                </div>

                                {/* MAP */}
                                <div className="mt-6">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3805829358403!2d106.84080997480962!3d-6.213434760859732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d99fe71b5b%3A0x4613509b4a40b539!2sUniversitas%20Telkom%20Jakarta%20-%20Kampus%20Minangkabau!5e0!3m2!1sid!2sid!4v1762449031551!5m2!1sid!2sid"
                                        loading="lazy"
                                        className="w-full h-48 rounded-2xl border border-base-300"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
