import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Faq = () => {
    const { t } = useTranslation();

    const API_URL = import.meta.env.VITE_API_URL;

    const [faqData, setFaqData] = useState([]);
    const [open, setOpen] = useState(0);

    useEffect(() => {
        axios
            .get(`${API_URL}/public/faqs`)
            .then((res) => {
                setFaqData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [API_URL]);

    const toggleFaq = (index) => {
        setOpen(open === index ? null : index);
    };

    return (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 mt-12 sm:mt-16 lg:mt-24">

            {/* Heading */}
            <div className="text-center">

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent leading-tight">
                    {t("faq_heading")}
                </h1>

            </div>

            <div className="mt-8 sm:mt-10 lg:mt-14 space-y-4 sm:space-y-5">

                {faqData.map((item, index) => (
                    <div
                        key={item.id}
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