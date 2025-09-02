// ایجاد پس‌زمینه ستاره‌ای و نورهای شناور
(function() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';

    const ctx = canvas.getContext('2d');
    let stars = [];
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // تعداد ستاره‌ها
    const STAR_COUNT = 150;

    // ایجاد ستاره‌ها
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2,
            alpha: Math.random(),
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, width, height);
        for (let star of stars) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 105, 180, ${star.alpha})`; // رنگ صورتی
            ctx.fill();

            // حرکت ستاره
            star.x += star.dx;
            star.y += star.dy;

            // بازگشت به صفحه
            if (star.x < 0) star.x = width;
            if (star.x > width) star.x = 0;
            if (star.y < 0) star.y = height;
            if (star.y > height) star.y = 0;
        }
        requestAnimationFrame(drawStars);
    }

    drawStars();

    // بروزرسانی اندازه هنگام تغییر اندازه صفحه
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
})();
