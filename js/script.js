 const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        function updateTime() {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            const timeString = now.toLocaleString('id-ID', options).replace(/\//g, '/');
            document.getElementById('current-time').textContent = timeString + ' GMT+0700';
        }
        
        updateTime();
        setInterval(updateTime, 1000);

        const form = document.getElementById('contact-form');
        const namaInput = document.getElementById('nama');
        const tempatLahirInput = document.getElementById('tempat-lahir');
        const genderInputs = document.querySelectorAll('input[name="gender"]');
        const pesanInput = document.getElementById('pesan');

        namaInput.addEventListener('input', (e) => {
            document.getElementById('preview-nama').textContent = e.target.value || 'Harfi Nurroi';
        });

        tempatLahirInput.addEventListener('input', (e) => {
            document.getElementById('preview-tempat').textContent = e.target.value || '29/02/2003';
        });

        genderInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                document.getElementById('preview-gender').textContent = e.target.value;
            });
        });

        pesanInput.addEventListener('input', (e) => {
            document.getElementById('preview-pesan').textContent = e.target.value || 'I.uy Rinciat bauh Website';
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nama = namaInput.value;
            const tempatLahir = tempatLahirInput.value;
            const gender = document.querySelector('input[name="gender"]:checked').value;
            const pesan = pesanInput.value;
            
            const whatsappMessage = `*Pesan Baru dari Website*%0A%0A` +
                `*Nama:* ${nama}%0A` +
                `*Tempat Lahir:* ${tempatLahir}%0A` +
                `*Jenis Kelamin:* ${gender}%0A` +
                `*Pesan:* ${pesan}`;
            
            const phoneNumber = '6283890103616'; 
      
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');
            
            form.reset();
            document.getElementById('preview-nama').textContent = 'Nama Anda';
            document.getElementById('preview-tempat').textContent = 'Tanggal Lahir Anda';
            document.getElementById('preview-gender').textContent = 'Silahkan pilih Jenis Kelamin';
            document.getElementById('preview-pesan').textContent = 'pesan anda akan muncul disini';
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-yellow-500');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('text-yellow-500');
                }
            });
        });
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
     
    function setName() {
        const input = document.getElementById("name-input").value;
        const nameSpan = document.getElementById("user-name");

        if (input.trim() !== "") {
            nameSpan.textContent = input;

            localStorage.setItem("visitorName", input);
        }
    }

    window.onload = function () {
        const savedName = localStorage.getItem("visitorName");

        if (savedName) {
            document.getElementById("user-name").textContent = savedName;
        }
    };
