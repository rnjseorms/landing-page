export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">정책자금 상담센터</h3>
            <ul className="space-y-2 text-sm">
              <li>대표: 홍길동</li>
              <li>사업자등록번호: 123-45-67890</li>
              <li>주소: 서울특별시 강남구 테헤란로 123, 4층</li>
              <li>대표전화: 02-1234-5678</li>
              <li>이메일: contact@example.com</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">바로가기</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  정책자금 안내
                </a>
              </li>
              <li>
                <a href="#lead-form" className="hover:text-white transition-colors">
                  무료 상담 신청
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  자주 묻는 질문
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  고객 후기
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">법적 고지</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  이용약관
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  이메일무단수집거부
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-center md:text-left">
              © 2025 정책자금 상담센터. All rights reserved.
            </p>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 text-center md:text-right max-w-md">
              본 서비스는 정보 제공 목적이며, 대출 승인을 보장하지 않습니다.
              실제 대출 조건은 금융기관 심사에 따라 달라질 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
