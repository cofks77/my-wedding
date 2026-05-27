/**
 * Watercolor Soft Wedding Invitation Configuration
 *
 * 이 파일에서 청첩장의 모든 정보를 수정할 수 있습니다.
 * 이미지는 설정이 필요 없습니다. 아래 폴더에 순번 파일명으로 넣으면 자동 감지됩니다.
 *
 * 이미지 폴더 구조 (파일명 규칙):
 *   images/hero/1.jpg      - 메인 사진 (1장, 필수)
 *   images/story/1.jpg, 2.jpg, ...  - 스토리 사진들 (순번, 자동 감지)
 *   images/gallery/1.jpg, 2.jpg, ... - 갤러리 사진들 (순번, 자동 감지)
 *   images/location/1.jpg  - 약도/지도 이미지 (1장)
 *   images/og/1.jpg        - 카카오톡 공유 썸네일 (1장)
 */

const CONFIG = {
  // ── 1. 초대장 열기 ──
  useCurtain: true,  // 초대장 열기 화면 사용 여부 (true: 사용, false: 바로 본문 표시)

  // ── 2. 메인 (히어로) ──
  groom: {
    name: "최재성",
    nameEn: "Groom",
    father: "철수",
    mother: "경자",
    fatherDeceased: false,
    motherDeceased: false
  },

  bride: {
    name: "박채란",
    nameEn: "Bride",
    father: "진",
    mother: "영순",
    fatherDeceased: false,
    motherDeceased: false
  },

  wedding: {
    date: "2026-08-01",
    time: "15:30",
    venue: "아펠가모 잠실",
    hall: "웨딩홀 2층",
    address: "서울특별시 송파구 올림픽로 35길 137(신천동)\n한국광고문화회관 2층",
    tel: "02-2144-0230"
  },

  // ── 3. 인사말 ──
  greeting: {
    title: "저희 두 사람의 첫 계절을\n축복해주세요",
    content: "당신과의 사계는\n\n봄처럼 새로운 세상이 피어나고\n\여름처럼 찬란히 빛날 것입니다.\n모든 것이 깊어지는 가을이 지나면\n고요히 잠이 드는 겨울도 오겠지요\n\n우리는 서로의 시작과 끝\n모든 순간을 함께할 것 입니다."
  },

  // ── 4. 우리의 이야기 ──
  story: {
    title: "우리의 이야기",
    content: "'연인'으로 여덟 번의 해를 지나\n'부부'로서 첫 번째 해를 맞이하고자 합니다.\n저희의 새 출발을 함께 축복해주세요."
  },

  // ── 5. 오시는 길 ──
  mapLinks: {
    kakao: "https://kko.to/0elyoFiXhP",
    naver: "https://naver.me/FzSZfBX6"
  },

  // ── 6. 마음 전하실 곳 ──
  accounts: {
    groom: [
      { role: "신랑", name: "최재성", bank: "국민은행", number: "000-000-000000" },
      { role: "아버지", name: "김철수", bank: "신한은행", number: "000-000-000000" },
      { role: "어머니", name: "문경자", bank: "우리은행", number: "000-000-000000" }
    ],
    bride: [
      { role: "신부", name: "박채란", bank: "우리은행", number: "1002-052-730160" },
      { role: "아버지", name: "박진", bank: "토스뱅크", number: "1000-4415-2234" },
      { role: "어머니", name: "이영순", bank: "신한은행", number: "110-061-416741" }
    ]
  },

  // ── 링크 공유 시 나타나는 문구 ──
  meta: {
    title: "최재성 ♥ 박채란 결혼합니다",
    description: "2026년 8월 1일, 소중한 분들을 초대합니다."
  }
};
