// Wait for DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Course filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter type
            const filterType = btn.getAttribute('data-filter');
            
            // Show/hide cards based on filter
            courseCards.forEach(card => {
                if (filterType === 'all') {
                    card.style.display = 'block';
                } else if (card.classList.contains(filterType)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
                
                // Reset animation
                card.classList.remove('animate-fade');
                void card.offsetWidth; // Trigger reflow
                card.classList.add('animate-fade');
            });
        });
    });
    
    // Testimonial slider
    const reviewsContainer = document.querySelector('.reviews-container');
    const reviewCards = document.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (reviewsContainer && reviewCards.length > 0) {
        let currentIndex = 0;
        let width = reviewCards[0].clientWidth + 30; // Card width + margin
        
        // Set initial position
        function updateReviewsPosition() {
            width = reviewCards[0].clientWidth + 30; // Recalculate width
            reviewsContainer.style.transform = `translateX(${-currentIndex * width}px)`;
        }
        
        // Initial setup
        updateReviewsPosition();
        
        // Update on window resize
        window.addEventListener('resize', updateReviewsPosition);
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : reviewCards.length - 1;
                updateReviewsPosition();
            });
        }
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex < reviewCards.length - 1) ? currentIndex + 1 : 0;
                updateReviewsPosition();
            });
        }
        
        // Auto slide every 5 seconds
        let autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex < reviewCards.length - 1) ? currentIndex + 1 : 0;
            updateReviewsPosition();
        }, 5000);
        
        // Pause auto slide on hover
        reviewsContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        // Resume auto slide on mouse leave
        reviewsContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex < reviewCards.length - 1) ? currentIndex + 1 : 0;
                updateReviewsPosition();
            }, 5000);
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Hide mobile menu if open
                if (mainNav && window.innerWidth < 768) {
                    mainNav.style.display = 'none';
                }
            }
        });
    });
    
    // Form handling
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const course = document.getElementById('course').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !phone || !course) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
                alert('Please enter a valid 10-digit phone number.');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message
            alert(`Thank you for your enquiry, ${name}! We'll contact you soon about the ${document.getElementById('course').options[document.getElementById('course').selectedIndex].text} course.`);
            
            // Reset form
            enquiryForm.reset();
        });
    }
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.background = 'var(--white)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Animation for sections
    const animateSections = () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animate-fade');
            }
        });
    };
    
    // Run animation on page load
    animateSections();
    
    // Run animation on scroll
    window.addEventListener('scroll', animateSections);
});
