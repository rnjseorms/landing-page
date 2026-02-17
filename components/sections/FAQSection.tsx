'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Accordion, { AccordionItem } from '@/components/ui/Accordion'

const faqs = [
  {
    question: '상담 비용이 있나요?',
    answer: '아니요, 무료입니다. 자격 진단부터 상담까지 모든 과정에서 비용이 발생하지 않습니다. 정책자금 승인 후에도 별도의 수수료 없이 자금을 받으실 수 있습니다.',
  },
  {
    question: '신용등급이 낮아도 가능한가요?',
    answer: '네, 가능합니다. 신용등급이 낮더라도 신용보증기금이나 기술보증기금을 통한 보증부 대출 등 대안이 있습니다. 상담을 통해 최적의 방안을 찾아드립니다.',
  },
  {
    question: '신청에서 승인까지 얼마나 걸리나요?',
    answer: '자금 종류와 개인 상황에 따라 다르지만, 평균적으로 2~4주 정도 소요됩니다. 서류 준비 상태에 따라 더 빨리 진행될 수도 있습니다.',
  },
  {
    question: '예비창업자도 신청 가능한가요?',
    answer: '네, 가능합니다. 사업자등록 전이라도 신청 가능한 정책자금이 있습니다. 청년창업사관학교, 예비창업패키지 등 다양한 프로그램을 활용할 수 있습니다.',
  },
  {
    question: '어떤 서류가 필요한가요?',
    answer: '기본적으로 사업자등록증, 재무제표, 신분증 등이 필요합니다. 자금 종류와 업종에 따라 추가 서류가 필요할 수 있으며, 상담 시 맞춤형으로 안내해 드립니다.',
  },
  {
    question: '기존 대출이 있어도 가능한가요?',
    answer: '네, 가능합니다. 기존 대출이 있더라도 정책자금을 받으실 수 있습니다. 기존 대출 현황을 파악하여 상환 능력에 맞는 맞춤 설계를 도와드립니다.',
  },
]

export default function FAQSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-h2-mobile md:text-h2-desktop text-center text-gray-800 mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-center text-gray-500 mb-12">
            정책자금에 대해 궁금하신 점을 확인해보세요
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} title={faq.question}>
                  {faq.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
