let currentMangaId = null;
let currentChapterIndex = 0;

let currentLang = 'ar';
let currentTheme = 'dark';

const mangaData = {
    'attack-titan': {
        title: 'هجوم العمالقة',
        titleEn: 'Attack on Titan',
        author: 'هاجيمي إيساياما',
        status: 'مكتمل',
        genres: ['أكشن', 'دراما', 'خيال'],
        rating: '9.0/10',
        description: 'في عالم حيث تهدد العمالقة الإنسانية، ينضم إيرين ييغر إلى فيلق الاستطلاع للقتال ضد هذه الوحوش الغامضة واكتشاف الحقيقة وراء وجودها.',
        cover: 'https://via.placeholder.com/300x400/FF6B35/FFFFFF?text=هجوم+العمالقة',
        chapters: [
            { number: 139, title: 'نحو الشجرة على ذلك التل', pages: 45 },
            { number: 138, title: 'زمن طويل', pages: 43 },
            { number: 137, title: 'العمالقة', pages: 41 },
            { number: 136, title: 'عبر السماء', pages: 39 }
        ]
    },
    'one-piece': {
        title: 'ون بيس',
        titleEn: 'One Piece',
        author: 'إييتشيرو أودا',
        status: 'مستمر',
        genres: ['مغامرة', 'كوميدي', 'أكشن'],
        rating: '9.2/10',
        description: 'مونكي دي لوفي، شاب ذو قوى مطاطية، يسافر مع طاقمه من القراصنة بحثاً عن الكنز الأسطوري المعروف باسم "ون بيس".',
        cover: 'https://via.placeholder.com/300x400/E74C3C/FFFFFF?text=ون+بيس',
        chapters: [
            { number: 1098, title: 'ولد في هذا العالم', pages: 17 },
            { number: 1097, title: 'جيني', pages: 19 },
            { number: 1096, title: 'كوماتشي', pages: 18 },
            { number: 1095, title: 'عالم صالح للعيش', pages: 16 }
        ]
    },
    'solo-leveling': {
        title: 'سولو ليفلنج',
        titleEn: 'Solo Leveling',
        author: 'تشوغونغ',
        status: 'مكتمل',
        genres: ['أكشن', 'خيال', 'مغامرة'],
        rating: '8.9/10',
        description: 'في عالم حيث ظهرت بوابات تحتوي على وحوش، يصبح سونغ جين وو، أضعف الصيادين، أقوى محارب بمفرده.',
        cover: 'https://via.placeholder.com/300x400/9B59B6/FFFFFF?text=سولو+ليفلنج',
        chapters: [
            { number: 179, title: 'النهاية', pages: 23 },
            { number: 178, title: 'المعركة الأخيرة', pages: 21 },
            { number: 177, title: 'الملك الظل', pages: 19 },
            { number: 176, title: 'القوة الحقيقية', pages: 20 }
        ]
    }
};

// Language translations
const translations = {
    ar: {
        siteName: 'مانجا سبارك',
        home: 'الرئيسية',
        browse: 'تصفح',
        popular: 'الأكثر شعبية',
        latest: 'آخر التحديثات',
        welcome: 'مرحباً بك في مانجا سبارك',
        discover: 'اكتشف أفضل المانجا والمانهوا مع ترجمة عربية عالية الجودة',
        searchPlaceholder: 'ابحث عن مانجا أو مانهوا...',
        searchBtn: 'بحث',
    },
    fr: {
        siteName: 'Manga Spark',
        home: 'Accueil',
        browse: 'Explorer',
        popular: 'Populaire',
        latest: 'Dernières mises à jour',
        welcome: 'Bienvenue sur Manga Spark',
        discover: 'Découvrez les meilleurs mangas et manhwas avec une traduction de haute qualité en arabe',
        searchPlaceholder: 'Recherchez un manga ou manhwa...',
        searchBtn: 'Chercher',
    }
};

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', currentTheme);

    const icon = document.getElementById('theme-icon');
    if (currentTheme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}


function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'fr' : 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    const t = translations[currentLang];
    document.querySelector('.logo').textContent = t.siteName;
    document.querySelectorAll('.nav-menu li a')[0].textContent = t.home;
    document.querySelectorAll('.nav-menu li a')[1].textContent = t.browse;
    document.querySelectorAll('.nav-menu li a')[2].textContent = t.popular;
    document.querySelectorAll('.nav-menu li a')[3].textContent = t.latest;
    document.querySelector('h1').textContent = t.welcome;
    document.querySelector('.hero p').textContent = t.discover;
    document.querySelector('.search-bar input').placeholder = t.searchPlaceholder;
    document.querySelector('.search-btn').textContent = t.searchBtn;
    document.getElementById('lang-text').textContent = currentLang === 'ar' ? 'FR' : 'AR';
}

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function showMangaDetails(id) {
    const data = mangaData[id];
    if (!data) return;

    showPage('manga-details');
    document.getElementById('manga-cover').src = data.cover;
    document.getElementById('manga-title').textContent = data.title;
    document.getElementById('manga-author').textContent = data.author;
    document.getElementById('manga-status').textContent = data.status;
    document.getElementById('manga-rating').textContent = data.rating;
    document.getElementById('manga-desc').textContent = data.description;

    const genreContainer = document.getElementById('manga-genres');
    genreContainer.innerHTML = '';
    data.genres.forEach(g => {
        const tag = document.createElement('span');
        tag.className = 'genre-tag';
        tag.textContent = g;
        genreContainer.appendChild(tag);
    });

    const chapterList = document.getElementById('chapter-list');
    chapterList.innerHTML = '';
    data.chapters.forEach((ch, i) => {
        const div = document.createElement('div');
        div.className = 'chapter-item';
        div.textContent = `الفصل ${ch.number}: ${ch.title}`;
        div.onclick = () => openReader(id, ch.number);
        chapterList.appendChild(div);
    });

    currentMangaId = id;
    currentChapterIndex = 0;
}

function openReader(id, chapterNumber) {
    const manga = mangaData[id];
    const chapterIndex = manga.chapters.findIndex(c => c.number === chapterNumber);
    if (chapterIndex === -1) return;
    currentMangaId = id;
    currentChapterIndex = chapterIndex;
    showPage('reader');
    renderChapter();
}

function renderChapter() {
    const manga = mangaData[currentMangaId];
    const chapter = manga.chapters[currentChapterIndex];
    document.getElementById('reader-title').textContent = manga.title;
    document.getElementById('reader-chapter').textContent = `الفصل ${chapter.number}: ${chapter.title}`;
    const pages = document.getElementById('chapter-pages');
    pages.innerHTML = '';
    for (let i = 1; i <= chapter.pages; i++) {
        const img = document.createElement('img');
        img.src = `https://via.placeholder.com/800x1200?text=${encodeURIComponent(manga.title)}+-+صفحة+${i}`;
        img.className = 'chapter-page';
        pages.appendChild(img);
    }

    document.getElementById('prev-chapter').disabled = currentChapterIndex === 0;
    document.getElementById('next-chapter').disabled = currentChapterIndex >= manga.chapters.length - 1;
}

function nextChapter() {
    const manga = mangaData[currentMangaId];
    if (currentChapterIndex < manga.chapters.length - 1) {
        currentChapterIndex++;
        renderChapter();
    }
}

function previousChapter() {
    if (currentChapterIndex > 0) {
        currentChapterIndex--;
        renderChapter();
    }
}

let isLoggedIn = false;
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const errorElem = document.getElementById('login-error');

    if (!validateEmail(email)) {
        errorElem.textContent = 'المرجو إدخال بريد إلكتروني صحيح.';
        errorElem.style.display = 'block';
        return;
    }

    if (password.length < 6) {
        errorElem.textContent = 'كلمة السر يجب أن تكون 6 أحرف على الأقل.';
        errorElem.style.display = 'block';
        return;
    }

    isLoggedIn = true;
    errorElem.style.display = 'none';

    alert('تم تسجيل الدخول بنجاح!');

    showPage('home');

    updateLoginStatusUI();
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function updateLoginStatusUI() {
    const browseLink = document.querySelector('.nav-menu li a:nth-child(2)');
    if (isLoggedIn) {
        browseLink.textContent = 'تسجيل خروج';
        browseLink.onclick = () => {
            isLoggedIn = false;
            alert('تم تسجيل الخروج.');
            updateLoginStatusUI();
            showPage('login');
        };
    } else {
        browseLink.textContent = currentLang === 'ar' ? 'تصفح' : 'Explorer';
        browseLink.onclick = () => showPage('browse');
    }
}

function toggleMobileMenu() {
    const nav = document.getElementById('mobileNav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}