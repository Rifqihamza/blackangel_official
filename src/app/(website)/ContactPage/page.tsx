import { Send, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
    return (
        <section id="conciergePage">
            <div className="container mx-auto px-6 py-25 w-full">

                {/* TITLE */}
                <h1 className="text-3xl md:text-6xl font-medium font-[Tangerine] text-center mb-12 tracking-wider text-(--primary)">
                    Reach Us
                </h1>

                <div className="flex flex-col md:flex-row gap-10 bg-white rounded-3xl shadow-xl p-6 md:p-12">

                    {/* ===== LEFT : FORM ===== */}
                    <div className="flex-3">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-(--secondary)">
                                    Name *
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full border-b border-(--accent) bg-transparent outline-none py-2 text-(--primary) focus:border-(--primary)"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-(--secondary)">
                                    Email *
                                </label>
                                <input
                                    required
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full border-b border-(--accent) bg-transparent outline-none py-2 text-(--primary) focus:border-(--primary)"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-(--secondary)">
                                    Phone *
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Phone #"
                                    className="w-full border-b border-(--accent) bg-transparent outline-none py-2 text-(--primary) focus:border-(--primary)"
                                />
                            </div>

                            {/* Company */}
                            <div>
                                <label className="block text-sm font-medium text-(--secondary)">
                                    Company *
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Company name"
                                    className="w-full border-b border-(--accent) bg-transparent outline-none py-2 text-(--primary) focus:border-(--primary)"
                                />
                            </div>

                            {/* Message */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-(--secondary)">
                                    Message *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Write your message"
                                    className="w-full border-b border-(--accent) bg-transparent outline-none py-2 text-(--primary) resize-none focus:border-(--primary)"
                                />
                            </div>

                            {/* Button */}
                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-6 py-3 rounded-full
                                    bg-(--primary) text-white text-sm font-medium
                                    hover:bg-(--secondary) transition"
                                >
                                    SEND MESSAGE
                                    <Send size={16} />
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* ===== RIGHT : CONTACT INFO ===== */}
                    <div className="flex-1 space-y-6">

                        <h2 className="text-xl font-semibold text-(--primary)">
                            Contact
                        </h2>

                        <ul className="text-sm space-y-4 text-(--secondary)">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-(--primary)" />
                                <span>
                                    9757 Aspen Lane South Richmond Hill, NY 11419
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={18} className="text-(--primary)" />
                                <span>+1 (291) 939 9321</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={18} className="text-(--primary)" />
                                <span>info@mywebsite.com</span>
                            </li>
                        </ul>

                        {/* MAP */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3805829358403!2d106.84080997480962!3d-6.213434760859732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d99fe71b5b%3A0x4613509b4a40b539!2sUniversitas%20Telkom%20Jakarta%20-%20Kampus%20Minangkabau!5e0!3m2!1sid!2sid!4v1762449031551!5m2!1sid!2sid"
                            loading="lazy"
                            className="w-full h-48 rounded-2xl border border-(--accent)"
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                    </div>
                </div>
            </div>
        </section>
    )
}
