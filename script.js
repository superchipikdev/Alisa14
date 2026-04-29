document.addEventListener('DOMContentLoaded', function() {
    const heartBtn = document.getElementById('heart-btn');
    const music = document.getElementById('bg-music');

    // Функція створення сердечка
    function spawnHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '&#10084;';
        const xPos = Math.random() * 100 + 'vw';
        const fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.left = xPos;
        heart.style.bottom = '-10vh';
        heart.style.fontSize = fontSize;
        heart.style.position = 'fixed';
        document.body.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 3000);
    }

    // ГОЛОВНА МАГІЯ ТУТ (ОДИН ОБРОБНИК)
    if (heartBtn) {
        heartBtn.addEventListener('click', function() {
            console.log("Кнопка натиснута!");

            // 1. Знаходимо і показуємо блоки
            const catContainer = document.getElementById('cat-container');
            const playlistSection = document.getElementById('playlist-section');
            const video = document.getElementById('cat-video');

            if (catContainer) catContainer.style.display = 'block';
            if (playlistSection) playlistSection.style.display = 'block';
            
            // 2. Спробуємо запустити відео
            if (video) {
                video.play().catch(error => {
                    console.log("Відео не запустилося:", error);
                });
            }

            // 3. Запускаємо музику
            if (music) {
                music.volume = 0.4;
                music.play().catch(e => console.log("Помилка аудіо:", e));
            }

            // 4. Змінюємо текст кнопки
            heartBtn.textContent = "мімі ♡";
            heartBtn.style.borderColor = "#00fff2"; 

            // 5. Вибух сердечок
            for (let i = 0; i < 25; i++) {
                setTimeout(spawnHeart, i * 40);
            }
        });
    }

    // Фоновий дощ із сердечок
    setInterval(spawnHeart, 2000);
});
function togglePlay(id, btn) {
    const allAudios = document.querySelectorAll('audio');
    const targetAudio = document.getElementById(id);

    // Зупиняємо всі інші треки
    allAudios.forEach(audio => {
        if (audio !== targetAudio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    // Міняємо текст на всіх інших кнопках
    document.querySelectorAll('.play-btn').forEach(b => {
        if (b !== btn) b.textContent = 'PLAY';
    });

    // Логіка Start/Stop для обраної пісні
    if (targetAudio.paused) {
        targetAudio.play();
        btn.textContent = 'STOP';
        btn.style.color = '#990033'; // Робимо акцент, коли грає
    } else {
        targetAudio.pause();
        btn.textContent = 'PLAY';
        btn.style.color = '#252525';
    }
}