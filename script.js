// --- CẤU HÌNH ---
// Bạn có thể thay đổi tên của người nhận ở đây
const NAME = "Duc Tin";

document.addEventListener("DOMContentLoaded", () => {
  // Lấy các phần tử DOM
  const startScreen = document.getElementById("start-screen");
  const giftScreen = document.getElementById("gift-screen");
  const surpriseScreen = document.getElementById("surprise-screen");

  const startBtn = document.getElementById("start-btn");
  const giftBox = document.getElementById("gift-box");

  const bgMusic = document.getElementById("bg-music");
  const muteBtn = document.getElementById("mute-btn");
  const unmuteIcon = document.getElementById("unmute-icon");
  const muteIcon = document.getElementById("mute-icon");

  const nameSpan = document.getElementById("name");

  // Gán tên vào thẻ HTML
  if (nameSpan) {
    nameSpan.textContent = NAME;
  }

  // Xử lý bật/tắt âm thanh
  let isMuted = false;
  muteBtn.addEventListener("click", () => {
    if (isMuted) {
      bgMusic.muted = false;
      unmuteIcon.classList.remove("hidden");
      muteIcon.classList.add("hidden");
    } else {
      bgMusic.muted = true;
      unmuteIcon.classList.add("hidden");
      muteIcon.classList.remove("hidden");
    }
    isMuted = !isMuted;
  });

  // Hàm tiện ích: Trì hoãn một chút để CSS transition hoạt động tốt
  const transitionScreen = (hideScreen, showScreen) => {
    hideScreen.classList.remove("active");
    setTimeout(() => {
      hideScreen.classList.add("hidden");
      showScreen.classList.remove("hidden");
      // Cho trình duyệt chút thời gian để render display: block rồi mới add class active để chạy opacity
      setTimeout(() => {
        showScreen.classList.add("active");
      }, 50);
    }, 1000); // Khớp với transition duration trong CSS
  };

  // Sự kiện BƯỚC 1 -> BƯỚC 2: Nhấn nút bắt đầu
  startBtn.addEventListener("click", () => {
    // Phát nhạc
    bgMusic.play().catch((e) => {
      console.log(
        "Trình duyệt chặn autoplay audio, cần tương tác người dùng:",
        e,
      );
    });

    // Hiệu ứng pháo hoa nhẹ nhàng
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ffb6c1", "#ff69b4", "#ffd166", "#ffffff"],
    });

    // Chuyển màn hình
    transitionScreen(startScreen, giftScreen);
  });

  // Sự kiện BƯỚC 2 -> BƯỚC 3: Nhấn vào hộp quà
  giftBox.addEventListener("click", () => {
    // Dừng animation rung của hộp quà khi đã bấm
    document.querySelector(".gift").style.animation = "none";

    // Hiệu ứng pháo hoa hoành tráng (Confetti burst liên tục trong 3 giây)
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Pháo hoa từ bên trái
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#ffb6c1", "#ff69b4", "#ffd166", "#ffffff", "#ff4d6d"],
        }),
      );

      // Pháo hoa từ bên phải
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#ffb6c1", "#ff69b4", "#ffd166", "#ffffff", "#ff4d6d"],
        }),
      );
    }, 250);

    // Chuyển sang màn hình bật mở bất ngờ
    transitionScreen(giftScreen, surpriseScreen);
  });
});
