import { CommunityQuestionCard } from "./CommunityQuestionCard";



const questions = [
  {
    productImage: "https://i.ibb.co.com/FqqLN1H0/Image-With-Fallback-2.png",
    brandName: "Maison Soleil",
    productName: "The Nyomi Maxi",
    lookingForSize: "6",
    responseCount: 2,
    questionUser: {
      name: "Kikilolaa",
      avatar: "https://i.ibb.co.com/KjDJzzTD/Container.png",
      height: "5'6\"",
      date: "2/2/2026",
    },
    question: "How much coverage does the dress offer?",
    responses: [
      {
        id: "1",
        userName: "Kikilolaa",
        userAvatar: "https://i.ibb.co.com/xS7wb96j/Container-1.png",
        height: "5'6\"",
        date: "2/2/2026",
        answer: "Goof coverage - test",
      },
      {
        id: "2",
        userName: "CEO",
        userAvatar: "https://i.ibb.co.com/KjDJzzTD/Container.png",
        height: "5'6\"",
        date: "2/2/2026",
        answer: "Pretty good coverage",
      },
    ],
  },
  {
    productImage: "https://i.ibb.co.com/tPcqZCHK/Image-With-Fallback-1.png",
    brandName: "Maison Soleil",
    productName: "The Nyomi Maxi",
    lookingForSize: "6",
    responseCount: 2,
    questionUser: {
      name: "Kikilolaa",
      avatar: "https://i.ibb.co.com/xS7wb96j/Container-1.png",
      height: "5'6\"",
      date: "2/2/2026",
    },
    question: "How much coverage does the dress offer?",
    responses: [
      {
        id: "1",
        userName: "Kikilolaa",
        userAvatar: "https://i.ibb.co.com/KjDJzzTD/Container.png",
        height: "5'6\"",
        date: "2/2/2026",
        answer: "Goof coverage - test",
      },
      {
        id: "2",
        userName: "CEO",
        userAvatar: "https://i.ibb.co.com/xS7wb96j/Container-1.png",
        height: "5'6\"",
        date: "2/2/2026",
        answer: "Pretty good coverage",
      },
    ],
  },
  {
    productImage: "https://i.ibb.co.com/LddnM1Lr/Image-With-Fallback.png",
    brandName: "Maison Soleil",
    productName: "The Nyomi Maxi",
    lookingForSize: "6",
    responseCount: 2,
    questionUser: {
      name: "Kikilolaa",
      avatar: "https://i.ibb.co.com/xS7wb96j/Container-1.png",
      height: "5'6\"",
      date: "2/2/2026",
    },
    question: "How much coverage does the dress offer?",
    responses: [
      {
        id: "1",
        userName: "Kikilolaa",
        userAvatar: "https://i.ibb.co.com/xS7wb96j/Container-1.png",
        height: "5'6\"",
        date: "2/2/2026",
        answer: "Goof coverage - test",
      },
      {
        id: "2",
        userName: "CEO",
        userAvatar: "https://i.ibb.co.com/KjDJzzTD/Container.png",
        height: "5'6\"",
        date: "2/2/2026",
        answer: "Pretty good coverage",
      },
    ],
  },
];

export function CommunityQuestionGrid() {
  return (
    <section className="pt-5 pb-10 bg-[#f5f5f0]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((question, index) => (
            <CommunityQuestionCard key={index} {...question} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}