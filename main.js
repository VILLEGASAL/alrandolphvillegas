document.addEventListener('DOMContentLoaded', () => {
    

    const banner = document.querySelector('.cover-banner');
    
    const images = [
        'batman.jpg', 
        'venom.jpg', 
        'spiderman.jpg',
        'joker.jpg'
    ];
    
    let currentIndex = 0;

    if (banner) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            banner.style.backgroundImage = `url('${images[currentIndex]}')`;
        }, 500); 
    }

    
    const chatWidget = document.getElementById('chat-widget');
    const openChatBtn = document.getElementById('open-chat');
    const closeChatBtn = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    
    if (openChatBtn && closeChatBtn) {
        openChatBtn.addEventListener('click', () => {
            chatWidget.style.display = 'flex';
            openChatBtn.style.display = 'none';
        });

        closeChatBtn.addEventListener('click', () => {
            chatWidget.style.display = 'none';
            openChatBtn.style.display = 'flex';
        });
    }

   
    if (chatForm) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const userText = chatInput.value.trim();
            if (!userText) return;

     
            appendMessage('user-message', userText);
            chatInput.value = '';


            const loadingId = 'loading-' + Date.now();
            appendMessage('bot-message', 'Might take a while to respond due to free tier hosting...', loadingId);

            try {
                
                const response = await fetch('https://chatbot-5n5d.onrender.com/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userText })
                });

                const data = await response.json();
                
                
                document.getElementById(loadingId).remove();
                
                
                let cleanReply = data.reply.replace(/\*\*(.*?)\*\*/g, '$1'); 
                appendMessage('bot-message', cleanReply);

            } catch (error) {
                document.getElementById(loadingId).remove();
                appendMessage('bot-message', 'My server is asleep right now! Please use the contact form to reach out.');
            }
        });
    }

    function appendMessage(className, text, id = null) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.textContent = text;
        if (id) msgDiv.id = id;
        
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
    }

    // --- GALLERY CAROUSEL LOGIC ---
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dots = Array.from(document.querySelectorAll('.dot'));

    if (track && slides.length > 0) {
        let currentSlideIndex = 0;

        // Function to move the slide
        const updateCarousel = (index) => {
            // Slide the track using a negative percentage
            track.style.transform = `translateX(-${index * 100}%)`;
            
            // Update the active dot
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        };

        // Click next
        nextButton.addEventListener('click', () => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateCarousel(currentSlideIndex);
        });

        // Click previous
        prevButton.addEventListener('click', () => {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateCarousel(currentSlideIndex);
        });

        // Click specific dot
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlideIndex = index;
                updateCarousel(currentSlideIndex);
            });
        });
    }
});