'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const testimonials = [
  {
    name: '김OO 대표',
    company: '제조업 / 경기도',
    content: '은행에서 금리가 너무 높다고 포기했었는데, 정책자금으로 2억 원을 연 1.9%에 받았습니다. 상담부터 서류 준비까지 꼼꼼하게 도와주셔서 정말 감사합니다.',
    amount: '2억 승인',
    rate: '연 1.9%',
    avatar: 'K',
  },
  {
    name: '이OO 대표',
    company: '요식업 / 서울',
    content: '소상공인 자금 신청이 처음이라 막막했는데, 전문가분이 처음부터 끝까지 안내해 주셔서 어렵지 않게 진행했습니다. 3주 만에 승인받았어요!',
    amount: '5천만원 승인',
    rate: '연 2.5%',
    avatar: 'L',
  },
  {
    name: '박OO 대표',
    company: 'IT 서비스 / 판교',
    content: '창업 초기 자금이 부족했는데 청년창업사관학교 자금을 연결해 주셔서 사업 확장에 큰 도움이 됐습니다. 무이자라 부담이 없어요.',
    amount: '1억 승인',
    rate: '무이자',
    avatar: 'P',
  },
  {
    name: '최OO 대표',
    company: '도소매업 / 부산',
    content: '신용등급이 낮아서 걱정했는데, 신용보증기금 보증부 대출로 운영자금을 마련할 수 있었습니다. 포기하지 않길 잘했어요.',
    amount: '8천만원 승인',
    rate: '연 2.8%',
    avatar: 'C',
  },
  {
    name: '정OO 대표',
    company: '서비스업 / 대전',
    content: '복잡한 서류 때문에 몇 번이나 포기했었는데, 여기서 서류 대행까지 해주셔서 정말 편하게 진행했습니다. 추천드려요!',
    amount: '1.5억 승인',
    rate: '연 2.2%',
    avatar: 'J',
  },
]

export default function TestimonialSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-h2-mobile md:text-h2-desktop text-center text-gray-800 mb-4">
            실제 고객 후기
          </h2>
          <p className="text-center text-gray-500 mb-12">
            정책자금을 성공적으로 받으신 분들의 생생한 후기입니다
          </p>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-0"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-xl shadow-md p-6 h-full min-h-[320px] flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 mb-6 line-clamp-4 flex-grow">
                    "{testimonial.content}"
                  </p>

                  {/* Amount & Rate */}
                  <div className="flex gap-3 mb-6">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-600 text-sm font-medium rounded-full">
                      {testimonial.amount}
                    </span>
                    <span className="px-3 py-1 bg-teal-500/10 text-teal-600 text-sm font-medium rounded-full">
                      {testimonial.rate}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
