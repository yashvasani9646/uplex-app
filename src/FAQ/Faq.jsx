import { useState } from "react";

const faqData = [
    {
        question: "What can I list on Upleex?",
        answer:
            "You can list home items, electronics, furniture, property, services, and more. If it is useful, you can rent or sell it here.",
    },
    {
        question: "How long does a listing stay active?",
        answer:
            "Your listing stays active until you remove it or it expires based on your selected plan.",
    },
    {
        question: "How does renting work?",
        answer:
            "Choose your product, select rental duration, confirm booking, and enjoy the service.",
    },
    {
        question: "Is KYC required for sellers?",
        answer:
            "Yes, KYC may be required for sellers to maintain trust and platform safety.",
    },
    {
        question: "Who can join as a vendor?",
        answer:
            "Any individual or business with valid details can join as a vendor.",
    },
];

const Faq = () => {
    const [open, setOpen] = useState(0);

    const toggleFaq = (index) => {
        setOpen(open === index ? null : index);
    };

    return (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 mt-12 sm:mt-16 lg:mt-24">
            {/* Heading */}
            <div className="text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent leading-tight">
                    Have a Question Can We Help!
                </h1>
            </div>

            <div className="mt-8 sm:mt-10 lg:mt-14 space-y-4 sm:space-y-5">
                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 rounded-2xl px-5 sm:px-6 lg:px-8 py-5 sm:py-6 hover:bg-gray-100 transition-colors duration-300"
                    >
                        {/* Question */}
                        <button
                            type="button"
                            onClick={() => toggleFaq(index)}
                            className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                        >
                            <h2 className="text-base sm:text-lg lg:text-[19px] font-medium text-black leading-snug">
                                {item.question}
                            </h2>

                            <span className="text-2xl sm:text-3xl text-gray-400 leading-none shrink-0">
                                {open === index ? "−" : "+"}
                            </span>
                        </button>

                        {open === index && (
                            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-xl text-slate-500 leading-relaxed pr-2">
                                {item.answer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Faq;