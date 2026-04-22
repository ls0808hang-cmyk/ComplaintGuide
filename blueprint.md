# 민원 안내 도우미 (Complaint Guidance Assistant) 프로젝트 블루프린트

## 1. 서비스 철학 (Core Value)
본 서비스는 AI가 민원을 직접 판정하거나 접수하는 곳이 아닙니다. 
**"생활 속 문제를 입력하면, 가장 적합한 공식 문의처와 공식 경로를 정확하게 찾아주는 민원 길찾기 서비스"**를 지향합니다. 사용자가 국가 기관의 복잡한 구조를 몰라도 자연어 검색만으로 올바른 창구에 도달하도록 돕습니다.

## 2. 기술 스택 (Tech Stack)
- **Frontend:** Vanilla HTML5, CSS3 (Baseline), Modern JavaScript (ES6+)
- **Data Management:** 
    - 내부 지식 베이스: `data/complaints.json`
    - 보조 데이터: 공공데이터포털(data.go.kr) 검색 API 연동 예정
- **AI Chatbot:** OpenAI Responses API (자연어 의도 파악 및 요약 안내)
- **Map Service:** Kakao Maps API (관할 기관 위치 안내)
- **Deployment:** GitHub → Cloudflare Pages (빠른 로딩 및 글로벌 CDN)

## 3. 핵심 기능 및 특징
- **네비게이션 로직:** 단순 키워드 매칭을 넘어 사용자의 상황을 분석해 '국민신문고', '정부24', '지자체별 특화 사이트' 중 최적의 경로를 추천.
- **공식성 강조:** 모든 안내 결과에 공식 사이트 이동 버튼과 공식 상담 전화번호를 최우선 배치.
- **애드센스 최적화:** '문제 해결형' 고품질 콘텐츠 구조를 통해 광고 승인 및 유입 극대화.
- **지도 연동:** 사용자의 현재 위치 또는 검색된 지역의 관할 주민센터/기관 위치를 시각적으로 제공.

## 4. 구현 현황 및 향후 계획
- [x] 기본 구조 및 자연어 매칭 로직 (JS)
- [x] 모바일 우선 반응형 UI 디자인
- [ ] Kakao Maps API 연동 (`assets/js/map.js`)
- [ ] OpenAI API를 이용한 지능형 요약 가이드 추가
- [ ] Cloudflare Pages 자동 배포 파이프라인 구축
