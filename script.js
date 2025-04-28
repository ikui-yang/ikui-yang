document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    let startX = 0;
    let isPlaying = false;
    let slideInterval;
    const slideContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slides img');
    const totalSlides = slides.length;

    // 统一的切换幻灯片函数
    function switchSlide(direction) {
        stopAutoPlay();
        
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % totalSlides;
        } else {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        }
        
        updateSlides();
    }

    // 更新幻灯片显示
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        // 更新页码显示
        document.getElementById('current').textContent = (currentIndex + 1).toString();
        document.getElementById('total').textContent = totalSlides.toString();
    }

    // 事件监听器
    document.getElementById('prev').addEventListener('click', () => switchSlide('prev'));
    document.getElementById('next').addEventListener('click', () => switchSlide('next'));

    // 触摸事件处理
    slideContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slideContainer.addEventListener('touchend', (e) => {
        const diffX = e.changedTouches[0].clientX - startX;
        if (Math.abs(diffX) > 50) { // 滑动距离大于50px时触发
            switchSlide(diffX > 0 ? 'prev' : 'next');
        }
    });

    // 自动播放相关函数
    function startAutoPlay() {
        stopAutoPlay(); // 清除可能存在的旧定时器
        isPlaying = true;
        document.querySelector('.play-control').classList.add('playing');
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides; // 循环播放
            updateSlides();
        }, 3000); // 从1500ms增加到3000ms，使自动播放间隔更长
    }

    function stopAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
        isPlaying = false;
        document.querySelector('.play-control').classList.remove('playing');
    }

    // 播放按钮点击事件
    document.querySelector('.play-control').addEventListener('click', () => {
        if (isPlaying) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });

    // 初始化
    startAutoPlay();
    document.querySelector('.play-control').classList.add('playing');
});
