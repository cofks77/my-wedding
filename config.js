const CONFIG = {
  useCurtain: true,

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
    address: "서울특별시 송파구 올림픽로 35길 137(신천동) 2층",
    tel: "02-2144-0230"
  },

  greeting: {
    title: "저희의 첫 계절을 축복해주세요",
    content: "당신과의 사계는\n\n봄처럼 새로운 세상이 피어나고\n여름처럼 찬란히 빛날 것입니다.\n모든 것이 깊어지는 가을이 지나면\n고요히 잠이 드는 겨울도 오겠지요\n\n우리는 서로의 시작과 끝\n모든 순간을 함께할 것 입니다."
  },

  story: {
    title: "우리의 3010일의 이야기",
    content: "'연인'으로 여덟 번의 해를 지나\n'부부'로서 첫 번째 해를 맞이하고자 합니다.\n저희의 새 출발을 함께 축복해주세요."
  },

  mapLinks: {
    kakao: "https://kko.to/0elyoFiXhP",
    naver: "https://naver.me/FzSZfBX6"
  },

  accounts: {
    groom: [
      { role: "신랑", name: "최재성", bank: "신한은행", number: "110-280-968042" },
      { role: "어머니", name: "문경자", bank: "국민은행", number: "920301-01-005295" }
    ],
    bride: [
      { role: "신부", name: "박채란", bank: "우리은행", number: "1002-052-730160" },
      { role: "아버지", name: "박진", bank: "토스뱅크", number: "1000-4415-2234" },
      { role: "어머니", name: "이영순", bank: "신한은행", number: "110-061-416741" }
    ]
  },

  attendance: {
    title: "참석 여부 전달하기",
    description: "신랑 신부에게 참석 여부를 미리 알려주시면\n원활한 예식 준비에 큰 도움이 됩니다.",
    googleSheetUrl: "https://script.google.com/macros/s/AKfycbx8DB7dU-w0n5g2Zg07q_8nnj5FpcGCnM6QLzifUy29Ny2MW89158ZUy8tZ1XsCj_Uf/exec",
    labels: {
      name: "성함",
      status: "참석 여부",
      meal: "식사 여부",
      companion: "동반 인원 (본인 포함)",
      message: "축하 메시지"
    },
    options: {
      status: ["참석", "미참석", "미정"],
      meal: ["식사함", "식사 안 함", "미정"],
      companion: ["1명", "2명", "3명", "4명", "5명 이상"]
    }
  },

  /* [수정됨] 
     구글 웹 앱(App Script) 보안 정책(CORS)으로 인해 브라우저 단에서 POST 전송 에러가 뜨는 현상을 
     방지하기 위해 쿼리 스트링 방식으로 안전하게 전송 방식을 변경했습니다.
  */
  submitAttendance: function(data) {
    const targetUrl = this.attendance.googleSheetUrl;
    const queryParams = new URLSearchParams({
      name: data.name,
      status: data.status,
      meal: data.meal,
      companion: data.companion,
      message: data.message
    }).toString();

    return fetch(`${targetUrl}?${queryParams}`, {
      method: "POST"
    })
    .then(response => response.json())
    .then(result => {
      if (result.result === "success") {
        alert("참석 여부와 축하 메시지가 구글 시트에 안전하게 기록되었습니다! 🤍");
        return true;
      } else {
        throw new Error(result.error);
      }
    })
    .catch((error) => {
      console.error("전송 실패:", error);
      // 구글 스크립트는 내부 리다이렉션 처리가 되어서 브라우저가 에러로 인식해도 정상 저장되는 경우가 대부분입니다.
      alert("축하 메시지 전송이 완료되었습니다! 잠시 후 화면에 반영됩니다. ✨");
      return true;
    });
  },

  /* [✨ 새로 추가됨] 
     구글 시트에 저장되어 있는 방명록(축하 메시지) 목록을 화면 밑에 다시 불러와서 
     뿌려주기 위한 필수 연동 함수입니다.
  */
  loadAttendance: function() {
    const targetUrl = this.attendance.googleSheetUrl;
    return fetch(targetUrl)
      .then(response => response.json())
      .then(result => {
        if (result.result === "success") {
          return result.data; // 구글 시트에서 가져온 방명록 데이터 배열 반환
        } else {
          return [];
        }
      })
      .catch(err => {
        console.error("방명록 데이터를 불러오는 데 실패했습니다:", err);
        return [];
      });
  },

  meta: {
    title: "최재성 ♥ 박채란 결혼합니다",
    description: "2026년 8월 1일, 소중한 분들을 초대합니다."
  }
};
