const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});


const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
// _.throttle(함수, 시간)
window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // 배지 숨기기
    // badgeEl.style.display = 'none';  // 기본스타일
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, 0.6, {
      opacity: 0, // 점차적 투명
      display: 'none'
    });

    // 버튼 보이기
    gsap.to(toTopEl, 0.2, {
      x: 0,
    });

  } else {
    // 배지 보이기
    // badgeEl.style.display = 'block';  // 기본스타일
    gsap.to(badgeEl, 0.6, {
      opacity: 1, // 점차적 밝게
      display: 'block'
    });

    // 버튼 숨기기
    gsap.to(toTopEl, 0.2, {
      x: 100,
    });
  }
}, 300));

// To-Top
toTopEl.addEventListener('click', function () {
  gsap.to(window, 0.7, {
    scrollTo: 0 //<< ScrollToPlugin << 추가해서 사용한
  });
});



// 첫 메인 VISUAL 애니메이션 순차 동작
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7, // 첫 이미지 0.7->1.4->2.1->2.7 동작 시간
    opacity: 1
  });
});


// 슬라이드 -> new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});

new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true, // 반복설정
  autoplay: {
    delay: 3000 // 기본 3초(3000)
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지  번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper-container', {
  // autoplay: true,
  autoplay: {
    delay: 3000 // 기본 3초(3000)
  },
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


// 토글 버튼으로 숨김처리 보임처리
const promotionEl = document.querySelector('.promotion'); // 변할 수 없는 변수
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHiddePromotion = false; // 변할 수 있는 값
promotionToggleBtn.addEventListener('click', function () {
  isHiddePromotion = !isHiddePromotion;
  if (isHiddePromotion) {
    promotionEl.classList.add('hide');
  } else {
    promotionEl.classList.remove('hide');
  }
});


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}


// 유튜브 위 애니메이션
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector,
    random(1.5, 2.5), {
      y: size,
      repeat: -1,
      yoyo: true,
      ease: Power1.easeInOut,
      delay: random(0, delay)
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);


// 애니메이션
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: 0.8  // 어디에서 시작해서 어디에서 끝나는지 확인
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});


// 올해 년도 확인
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 2021