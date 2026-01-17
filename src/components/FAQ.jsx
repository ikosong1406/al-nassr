import React from "react";
import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

const faqItems = [
  {
    question: "Is this free to enter?",
    answer:
      "Yes! Creating an account and entering basic giveaways is completely free. Some premium giveaways may require minimal support contributions.",
  },
  {
    question: "How do I convert prizes to cash?",
    answer:
      "Once you win a prize, you'll see a 'Convert to Cash' button. Click it, and the cash equivalent will be added to your wallet instantly.",
  },
  {
    question: "How long do withdrawals take?",
    answer:
      "Most withdrawals are processed within 24 hours and reflect in your account within 1-3 business days.",
  },
  {
    question: "Is this officially linked to Al-Nassr?",
    answer:
      "Yes, this is the official fan giveaway platform of Al-Nassr Football Club. All activities are endorsed by the club.",
  },
  {
    question: "What if I don't want the physical prize?",
    answer:
      "You can instantly convert any physical prize to its cash equivalent and withdraw the money directly.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-blue-800">Questions</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-blue-900/60 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/50 transition-all"
            >
              <div className="flex items-start">
                <FaQuestionCircle className="text-yellow-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-3">{item.question}</h3>
                  <p className="text-gray-200">{item.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
