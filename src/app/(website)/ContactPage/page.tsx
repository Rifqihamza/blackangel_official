import { Send, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <section id="contactPage">
            <div className="container mx-auto px-6 py-25 w-full">
                <h1 className="text-center tracking-wide text-7xl font-semibold Tangerine">
                    Concierge</h1>
                <div className="flex flex-col md:flex-row md:gap-8 gap-2 p-6 mt-3 w-full overflow-hidden">
                    {/* Left: Form */}
                    <div className="flex-1 py-8">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Name *</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full border-b border-gray-300 outline-none py-2 text-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Email *</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full border-b border-gray-300 outline-none py-2 text-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Phone *</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Phone #"
                                    className="w-full border-b border-gray-300 outline-none py-2 text-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Company *</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Company name"
                                    className="w-full border-b border-gray-300 outline-none py-2 text-gray-700"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-600">Message *</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Write your message"
                                    className="w-full border-b border-gray-300 outline-none py-2 text-gray-700 resize-none"
                                ></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    className="w-full md:w-fit flex flex-row items-center gap-2 border border-secondary px-4 py-2 font-medium text-sm rounded-lg shadow transition"
                                >
                                    SEND MESSAGE
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right: Contact Info */}
                    <div className="flex flex-col gap-5 items-staret">
                        <h1 className="text-xl font-semibold">Contact</h1>
                        <ul className="text-sm space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} />
                                <span>9757 Aspen Lane South Richmond Hill, NY 11419</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={20} />
                                <span>+1 (291) 939 9321</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={20} />
                                <span>info@mywebsite.com</span>
                            </li>
                        </ul>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3805829358403!2d106.84080997480962!3d-6.213434760859732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d99fe71b5b%3A0x4613509b4a40b539!2sUniversitas%20Telkom%20Jakarta%20-%20Kampus%20Minangkabau!5e0!3m2!1sid!2sid!4v1762449031551!5m2!1sid!2sid"
                            width="250"
                            height="150"
                            loading="lazy"
                            className="rounded-xl"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}
