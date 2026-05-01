
document.addEventListener('DOMContentLoaded', () => {
    const sectionIds = ['section4', 'section5'];

    sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (!section) return;

        // Check if canvas already exists to avoid duplicates
        if (section.querySelector('canvas[id^="starfield-"]')) return;

        // Create Canvas
        const canvas = document.createElement('canvas');
        canvas.id = `starfield-${id}`;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        section.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];

        const init = () => {
            width = canvas.width = section.offsetWidth;
            height = canvas.height = section.offsetHeight;
            stars = [];
            const numStars = Math.floor((width * height) / 1000); // Adjust density

            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    z: Math.random() * 2, // Depth for parallax/size
                    alpha: Math.random(),
                    speed: Math.random() * 0.5 + 0.1
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#000000'; // Background color
            ctx.fillRect(0, 0, width, height);

            stars.forEach(star => {
                // Update position - Falling effect (increase Y)
                star.y += star.speed * 2; // Move down

                // Reset if passes bottom
                if (star.y > height) {
                    star.y = 0;
                    star.x = Math.random() * width;
                    star.speed = Math.random() * 0.5 + 0.1;
                }

                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.arc(star.x, star.y, star.z, 0, Math.PI * 2);
                ctx.fill();

                // Twinkle
                star.alpha += (Math.random() - 0.5) * 0.05;
                if (star.alpha < 0) star.alpha = 0;
                if (star.alpha > 1) star.alpha = 1;
            });

            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', init);
        init();
        animate();
    });
});
