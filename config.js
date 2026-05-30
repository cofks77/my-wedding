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
    googleSheetUrl: "https://script.google.com/macros/s/AKfycbwM5TAgO2tB2es6y_yQDVxbnGwh4Z7Ds0z9b1l6OLJv-_QmU6urXx8Cd41fiCwclkng/exec",
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

  // [수정] CORS 에러를 우회하고 데이터 누락을 막기 위해 GET 방식으로 안전하게 전환했습니다.
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
      method: "GET" // 구글 웹앱(Apps Script) 전송 시가장 안전한 방식
    })
    .then(response => {
      if (!response.ok) throw new Error('네트워크 응답 불안정');
      return response.json();
    })
    .then(result => {
      if (result.result === "success") {
        alert("참석 여부와 축하 메시지가 안전하게 기록되었습니다! 🤍");
        return true;
      } else {
        throw new Error(result.error || "알 수 없는 에러");
      }
    })
    .catch((error) => {
      console.error("전송 실패:", error);
      alert("서버 연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요. 🥲");
      return false; // 확실히 실패했음을 리턴하여 폼이 리셋되는 대참사 방지
    });
  },

  loadAttendance: function() {
    const targetUrl = this.attendance.googleSheetUrl;
    return fetch(targetUrl)
      .then(response => response.json())
      .then(result => {
        if (result.result === "success") {
          return result.data;
        } else {
          return [];
        }
      })
      .catch(err => {
        console.error("방명록 로드 실패:", err);
        return [];
      });
  },

  meta: {
    title: "최재성 ♥ 박채란 결혼합니다",
    description: "2026년 8월 1일, 소중한 분들을 초대합니다."
  }
};

// [수정] 단순 텍스트 입력 시 HTML 태그 장난이나 레이아웃 깨짐을 방지하는 안전장치 함수 추가
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function loadAndRenderGuestbook() {
  const listContainer = document.getElementById('guestbook-list');
  if (!listContainer) return;

  CONFIG.loadAttendance().then(data => {
    listContainer.innerHTML = ''; 

    if (!data || data.length === 0) {
      listContainer.innerHTML = '<div style="text-align:center; padding:30px 0; color:#aaa;">첫 번째 축하 메시지를 남겨주세요! 🤍</div>';
      return;
    }

    data.forEach(item => {
      if (item.message && item.message.trim() !== '') {
        // [수정] 렌더링 시 악성 스크립트 실행 방지를 위해 escapeHtml 적용
        const safeName = escapeHtml(item.name);
        const safeStatus = escapeHtml(item.status);
        const safeMessage = escapeHtml(item.message);

        const commentHtml = `
          <div class="guestbook-item" style="border-bottom: 1px solid #f2f2f2; padding: 15px 5px; text-align: left;">
            <strong style="color: #333; font-size: 14px;">${safeName} <span style="font-weight: normal; color: #888; font-size: 12px;">(${safeStatus})</span></strong>
            <p style="margin: 5px 0 0 0; color: #555; font-size: 14px; line-height: 1.5; white-space: pre-line;">${safeMessage}</p>
          </div>
        `;
        listContainer.insertAdjacentHTML('beforeend', commentHtml);
      }
    });
  }).catch(err => {
    console.error(err);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadAndRenderGuestbook();

  const attendanceForm = document.getElementById('attendance-form') || document.querySelector('form');
  if (attendanceForm) {
    attendanceForm.addEventListener('submit', function(e) {
      e.preventDefault(); 

      const submitButton = attendanceForm.querySelector('button[type="submit"]');
      const formData = {
        name: attendanceForm.querySelector('[name="name"]')?.value || attendanceForm.querySelector('#name')?.value || '',
        status: attendanceForm.querySelector('[name="status"]')?.value || attendanceForm.querySelector('#status')?.value || '참석',
        meal: attendanceForm.querySelector('[name="meal"]')?.value || attendanceForm.querySelector('#meal')?.value || '미정',
        companion: attendanceForm.querySelector('[name="companion"]')?.value || attendanceForm.querySelector('#companion')?.value || '1명',
        message: attendanceForm.querySelector('[name="message"]')?.value || attendanceForm.querySelector('#message')?.value || ''
      };

      if (!formData.name.trim() || !formData.message.trim()) {
        alert('성함과 축하 메시지를 입력해 주세요.');
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerText = "전송 중...";
      }

      // [수정] 성공(success가 true)일 때만 폼을 리셋하도록 엄격하게 제어
      CONFIG.submitAttendance(formData).then(success => {
        if (success) {
          attendanceForm.reset();
          loadAndRenderGuestbook();
        }
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerText = "참석 여부 전달하기";
        }
      });
    });
  }
});
