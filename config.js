// [참고용] 웹페이지가 로드되면 구글 시트에서 방명록을 가져와 화면에 그려주는 코드 예시
window.addEventListener('DOMContentLoaded', () => {
  if (typeof CONFIG !== 'undefined' && typeof CONFIG.loadAttendance === 'function') {
    CONFIG.loadAttendance().then(data => {
      // HTML에서 방명록 목록이 들어갈 요소 (ID는 본인 HTML 구조에 맞게 변경)
      const listContainer = document.getElementById('guestbook-list'); 
      if (!listContainer) return;

      listContainer.innerHTML = ''; // 기존 내용 초기화

      data.forEach(item => {
        // 축하 메시지가 있는 경우만 화면에 표시
        if (item.message && item.message.trim() !== '') {
          const itemHtml = `
            <div class="guestbook-item" style="border-bottom: 1px solid #eee; padding: 12px 0;">
              <strong>${item.name} (${item.status})</strong>
              <p style="margin: 5px 0; color: #555;">${item.message.replace(/\n/g, '<br>')}</p>
            </div>
          `;
          listContainer.insertAdjacentHTML('beforeend', itemHtml);
        }
      });
    });
  }
});
