document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links, .mobile-nav-links').forEach(navList => {
        const addNavItem = (href, label, afterHref) => {
            if (navList.querySelector('a[href="' + href + '"]')) return;
            const item = document.createElement('li');
            item.innerHTML = '<a href="' + href + '" class="' +
                (navList.classList.contains('mobile-nav-links') ? 'mobile-nav-link' : 'nav-link') +
                '">' + label + '</a>';
            const afterItem = Array.from(navList.children).find(navItem => navItem.querySelector('a[href="' + afterHref + '"]'));
            if (afterItem) afterItem.insertAdjacentElement('afterend', item);
            else navList.appendChild(item);
        };

        addNavItem('teaching.html', 'Teaching', 'experience.html');
        addNavItem('gallery.html', 'Gallery', 'teaching.html');
        addNavItem('useful-links.html', 'Useful Links', 'gallery.html');
        navList.querySelectorAll('a[href="skills.html"]').forEach(link => link.closest('li').remove());

        navList.querySelectorAll('a[href]').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === currentPage);
        });
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const closeBtn = document.querySelector('.close-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .mobile-nav-link');

    if (menuToggle && mobileNavMenu) {
        menuToggle.addEventListener('click', () => mobileNavMenu.classList.add('active'));
    }
    if (closeBtn && mobileNavMenu) {
        closeBtn.addEventListener('click', () => mobileNavMenu.classList.remove('active'));
    }
    mobileNavLinks.forEach(link => link.addEventListener('click', () => {
        if (mobileNavMenu) mobileNavMenu.classList.remove('active');
    }));

    const emailContact = document.querySelector('.email-contact');
    const emailModal = document.querySelector('.email-modal');
    const closeEmailModal = document.querySelector('.email-modal-close');
    const copyEmailButton = document.querySelector('.copy-email-button');

    const hideEmailModal = () => {
        if (!emailModal) return;
        emailModal.classList.remove('active');
        emailModal.setAttribute('aria-hidden', 'true');
    };

    if (emailContact && emailModal) {
        emailContact.addEventListener('click', () => {
            emailModal.classList.add('active');
            emailModal.setAttribute('aria-hidden', 'false');
        });
    }
    if (closeEmailModal) closeEmailModal.addEventListener('click', hideEmailModal);
    if (emailModal) emailModal.addEventListener('click', event => {
        if (event.target === emailModal) hideEmailModal();
    });
    if (copyEmailButton && emailContact) {
        copyEmailButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(emailContact.dataset.email);
                copyEmailButton.textContent = 'Copied!';
                setTimeout(() => { copyEmailButton.textContent = 'Copy email address'; }, 1800);
            } catch (error) {
                copyEmailButton.textContent = emailContact.dataset.email;
            }
        });
    }

    const roleTypingTextElement = document.getElementById('role-typing-text');
    if (!roleTypingTextElement) return;

    const roles = [
        'Expertise in MEMS-based sensor design,',
        'Experimental Mechanics,',
        'Finite element modeling (FEM),',
        'Mechanical Engineer',
        'MEMS Researcher'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeRoles() {
        const role = roles[roleIndex];
        roleTypingTextElement.textContent = isDeleting
            ? role.substring(0, charIndex--)
            : role.substring(0, charIndex++);

        let delay = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex > role.length) {
            isDeleting = true;
            delay = 1500;
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            charIndex = 0;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 500;
        }
        setTimeout(typeRoles, delay);
    }
    typeRoles();
});
