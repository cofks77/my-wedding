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
    title: "우리의 2946일의 이야기",
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

  submitAttendance: function(data) {
    const targetUrl = this.attendance.googleSheetUrl;
    const formData = new URLSearchParams();
    formData.append("name", data.name);
    formData.append("status", data.status);
    formData.append("meal", data.meal);
    formData.append("companion", data.companion);
    formData.append("message", data.message);

    return fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString()
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
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
      return false;
    });
  },

  meta: {
    title: "최재성 ♥ 박채란 결혼합니다",
    description: "2026년 8월 1일, 소중한 분들을 초대합니다."
  }
};
