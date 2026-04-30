import  { useState } from "react";

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

    return (
        <div className="max-w-[1400px] mx-auto px-4 pt-4 pb-10 mt-24">

            {/* Heading */}
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent text-center">
                    Have a Question Can We Help!
                </h1>

              
            </div>

            {/* FAQ */}
            <div className="mt-14">

                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 rounded-2xl px-8 py-6 mb-5 hover:bg-gray-100"
                    >

                        {/* Question */}
                        <div
                            onClick={() =>
                                setOpen(open === index ? null : index)
                            }
                            className="flex justify-between items-center cursor-pointer "
                        >
                            <h2 className="text-[19px] font-medium text-black">
                                {item.question}
                            </h2>

                            <span className="text-3xl text-gray-400">
                                {open === index ? "-" : "+"}
                            </span>
                        </div>

                        {/* Answer */}
                        {open === index && (
                            <p className="mt-5 text-[22px] text-slate-500 leading-relaxed">
                                {item.answer}
                            </p>
                        )}

                    </div>
                ))}

            </div>

        </div>
    );
};

export default Faq;