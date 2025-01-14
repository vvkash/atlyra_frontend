"use client";

import React from "react";
import PlusIcon from "../assets/icons/plus.svg"
import clsx from "clsx";
import MinusIcon from "../assets/icons/minus.svg";

const items = [
  {
    question: "give me the rundown, quickly",
    answer:
      "Sure, Atlyra allows you to check price changes, avaliability and data from over 20 of the most indemand retailers online, also allowing you to get notified via SMS, discord and email with a in house dashboard and logic.",
  },
  {
    question: "How safe is my info?",
    answer:
      "We makes sure customer safety and privacy is in the best hands, we use end-to-end ecyrption and do not share user data with anyone. ",
  },
  {
    question: "How do you guys proft?",
    answer:
      "As of now, we make money but the affilate links that get sent. if a user purchases with the link we get a peice of the commision. allowing Atlyra and all of its features to be used for free.",
  },
  {
    question: "I have questions.",
    answer:
      "send them to atlyralabs@gmail.com and we will get back to you as quickly as possible.",
  },
];

const AccordianItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="py-7 border-b border-white/30" 
    onClick={() => setIsOpen(!isOpen)}>
      <div className="flex items-center">
        <span className="flex-1 text-lg font-bold">{question}</span>
        {isOpen ? <MinusIcon /> : <PlusIcon/>}
      </div>
      <div className={clsx("mt-4",{hidden: !isOpen, "": isOpen===true, })}>{answer}</div>
    </div>
  );
};

export const FAQs = () => {
  return (
    <div className="bg-black text-white bg-gradient-to-b from-[#ADD8E6] to-black py-[72px]">
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tighter">
          Questions?
        </h2>
        <div className="mt-12">
          {items.map(({ question, answer }) => (
            <AccordianItem key={question} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </div>
  );
};


