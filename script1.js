// 숨기기
document.querySelector('.popup-overlay').style.display = 'none';


// 이미지와 오버레이 관련 요소 가져오기
const listItems = document.querySelectorAll('.text-list li');
const overlay = document.querySelector('.popup-overlay');

// 각 리스트 항목에 대응하는 팝업 콘텐츠를 추적할 객체
const contentMap = {
  'popup1': 'popup1',
  'popup2': 'popup2'
};

// 오버레이 클릭 시 팝업과 오버레이 숨기기
overlay.addEventListener('click', () => closeAllPopups());

// 리스트 항목 클릭 이벤트 처리
listItems.forEach(item => {
  let clickCount = 0; // 클릭 횟수를 저장하는 변수

  item.addEventListener('click', (event) => {
    event.stopPropagation(); // 이벤트 전파 방지

    clickCount++;

    if (clickCount === 1) {
      // 첫 번째 클릭: 배경색 변경
      listItems.forEach(el => el.classList.remove('active')); // 다른 항목의 active 제거
      item.classList.add('active'); // 클릭한 항목에만 active 추가

      // 1초 후 클릭 횟수를 초기화
      setTimeout(() => {
        clickCount = 0;
      }, 1000);
    }

    if (clickCount === 2) {
      // 두 번째 클릭: 팝업 표시
      const popupId = item.dataset.popup; // data-popup 속성에서 팝업 ID 가져오기
      const popupContentId = contentMap[popupId]; // 팝업 콘텐츠 ID 가져오기

      if (popupContentId) {
        // 팝업 콘텐츠 보이기
        document.querySelectorAll('.popup-content').forEach(content => content.style.display = 'none');
        const contentElement = document.getElementById(popupContentId);
        contentElement.style.display = 'block';

        // 오버레이 보이기
        overlay.classList.add('active');
      }

      clickCount = 0; // 클릭 횟수 초기화
    }
  });
});

// 팝업 닫기 함수
function closePopup(popupId) {
  document.getElementById(popupId).style.display = 'none';
  overlay.classList.remove('active');
}

// 모든 팝업 닫기 함수
function closeAllPopups() {
  document.querySelectorAll('.popup-content').forEach(content => content.style.display = 'none');
  overlay.classList.remove('active');
}

// 팝업 닫기 버튼에 클릭 이벤트 리스너 추가
const closeButtons = document.querySelectorAll('.popup-content .closebutton');
closeButtons.forEach(button => {
  button.addEventListener('click', () => closeAllPopups());
});

// 글씨 크기 조절 슬라이더 요소 가져오기
const fontSizeSlider = document.getElementById('fontSizeSlider');

// 텍스트 리스트 항목에 스타일을 적용하기 위한 요소
const textListItems = document.querySelectorAll('.text-list li');

// 슬라이더 값에 따라 글씨 크기 변경
fontSizeSlider.addEventListener('input', (event) => {
  const fontSize = event.target.value;  // 슬라이더 값 가져오기

  // 텍스트 리스트 항목에 글씨 크기 적용
  textListItems.forEach(item => {
    item.style.fontSize = fontSize + 'px';  // 글씨 크기 적용
  });
});

// 이미지 요소와 body 요소 가져오기
const popupImage = document.querySelector('.popup-image');
const body = document.querySelector('body');

// 클릭 시 커서 변경
popupImage.addEventListener('click', () => {
  body.classList.add('cursor-custom'); // 커서 변경 상태 유지
});

// 알림창을 표시할 버튼 가져오기
const showAlertBtn = document.querySelector('#popup1 .okaybutton');
const alertBox = document.getElementById('alertBox');
const closeBtn = document.getElementById('closeBtn');

// "확인" 버튼 클릭 시 알림창 표시
showAlertBtn.addEventListener('click', () => {
  alertBox.style.display = 'block'; // 알림창 보이기
});

// 알림창 닫기 버튼 클릭 시 알림창 숨기기
closeBtn.addEventListener('click', () => {
  alertBox.style.display = 'none'; // 알림창 숨기기
});

// 10x10 격자를 자동으로 생성
const gridContainer = document.querySelector('.grid-container');
for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    gridContainer.appendChild(cell);
}

// 각 셀을 클릭했을 때 빨간 원을 토글하는 코드
document.querySelectorAll('.grid-container div').forEach(cell => {
  cell.addEventListener('click', function() {
    // 셀 안에 원이 있는지 확인
    const existingCircle = cell.querySelector('.circle');

    if (existingCircle) {
      // 원이 있으면 삭제
      existingCircle.remove();
    } else {
      // 원이 없으면 새로 생성하여 추가
      const circle = document.createElement('div');
      circle.classList.add('circle');
      cell.appendChild(circle);
    }
  });
});
