// ============================================
// FASE 4: ELEMENTOS DINÁMICOS CON JAVASCRIPT
// VERSIÓN CORREGIDA PARA GITHUB PAGES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript cargado correctamente');
    
    crearMenusDesplegables();
    crearMensajeBienvenida();
    iniciarSlider();
    inicializarIdioma();
});

// ========== 1. MENÚ DESPLEGABLE ==========
function crearMenusDesplegables() {
    const navList = document.querySelector('nav ul');
    if (!navList) return;
    
    const itemsConSubmenu = ['Recetas', 'Reposteras'];
    
    itemsConSubmenu.forEach(nombre => {
        let targetLi = null;
        for (let child of navList.children) {
            const link = child.querySelector('a');
            if (link && link.textContent.trim() === nombre) {
                targetLi = child;
                break;
            }
        }
        
        if (targetLi && !targetLi.querySelector('.submenu')) {
            let submenuItems = [];
            if (nombre === 'Recetas') {
                submenuItems = ['Pestiños', 'Turrón', 'Bienmesabe', 'Mazapán'];
            } else if (nombre === 'Reposteras') {
                submenuItems = ['María Sánchez', 'Carmen Rodríguez', 'Teresa Ricart', 'Josefa Martín'];
            }
            
            const submenu = document.createElement('ul');
            submenu.className = 'submenu';
            submenu.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                background-color: #3D2317;
                min-width: 180px;
                border-radius: 0 0 8px 8px;
                overflow: hidden;
                display: none;
                z-index: 1000;
                list-style: none;
                padding: 0;
                margin: 0;
            `;
            
            submenuItems.forEach(item => {
                const subLi = document.createElement('li');
                const subLink = document.createElement('a');
                subLink.href = '#';
                subLink.textContent = item;
                subLink.style.cssText = `
                    display: block;
                    padding: 10px 15px;
                    color: white;
                    text-decoration: none;
                    transition: all 0.3s;
                `;
                subLink.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = '#E6B422';
                    this.style.color = '#3D2317';
                });
                subLink.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = 'transparent';
                    this.style.color = 'white';
                });
                subLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('clic en: ' + item);
                });
                subLi.appendChild(subLink);
                submenu.appendChild(subLi);
            });
            
            targetLi.style.position = 'relative';
            targetLi.appendChild(submenu);
            
            targetLi.addEventListener('mouseenter', function() {
                submenu.style.display = 'block';
            });
            
            targetLi.addEventListener('mouseleave', function() {
                submenu.style.display = 'none';
            });
        }
    });
}

// ========== 2. MENSAJE PERSONALIZADO POR HORA ==========
function crearMensajeBienvenida() {
    const hora = new Date().getHours();
    let saludo = '';
    let icono = '';
    let texto = '';
    
    if (hora >= 6 && hora < 12) {
        saludo = 'Buenos días';
        icono = '🌞';
        texto = '¿lista para descubrir los dulces más tradicionales de España?';
    } else if (hora >= 12 && hora < 19) {
        saludo = 'Buenas tardes';
        icono = '☀️';
        texto = '¿qué tal una pausa dulce? Descubre nuestras recetas más auténticas';
    } else {
        saludo = 'Buenas noches';
        icono = '🌙';
        texto = 'relájate con un buen dulce mientras descubres la historia de nuestras reposteras';
    }
    
    if (document.querySelector('.mensaje-bienvenida')) return;
    
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'mensaje-bienvenida';
    mensajeDiv.style.cssText = `
        background: linear-gradient(135deg, #E6B422, #C96E3D);
        color: white;
        text-align: center;
        padding: 12px 20px;
        font-weight: bold;
        font-size: 1rem;
    `;
    mensajeDiv.innerHTML = `${icono} ${saludo}! ${texto} ${icono}`;
    
    const header = document.querySelector('header');
    if (header) header.insertAdjacentElement('afterend', mensajeDiv);
}

// ========== 3. SLIDER DE IMÁGENES (CORREGIDO) ==========
let sliderInterval;
let currentSlide = 0;

function iniciarSlider() {
    const banner = document.querySelector('.banner');
    if (!banner || banner.querySelector('.slides-container')) return;
    
    // RUTAS CORREGIDAS: sin ./ al principio
    const slidesData = [
        { imagen: 'images/banner-reposteras.png', titulo: 'Reposteras de España', subtitulo: 'Tradición con Sabor a Historia' },
        { imagen: 'images/foto1.png', titulo: 'El Horno de Siempre', subtitulo: 'Donde nacen los mejores dulces' },
        { imagen: 'images/foto2.png', titulo: 'Manos con Historia', subtitulo: 'El legado de nuestras abuelas' },
        { imagen: 'images/foto3.png', titulo: 'Sabores que Perduran', subtitulo: 'Recetas transmitidas por generaciones' }
    ];
    
    // Guardar el contenido original del banner
    const bannerContent = banner.querySelector('.banner-content');
    
    banner.innerHTML = '';
    banner.style.cssText = `
        position: relative;
        height: 450px;
        overflow: hidden;
        padding: 0;
        background: none;
    `;
    
    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'slides-container';
    slidesContainer.style.cssText = 'position: relative; width: 100%; height: 100%;';
    
    slidesData.forEach((data, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${data.imagen}');
            background-size: cover;
            background-position: center;
            display: ${index === 0 ? 'flex' : 'none'};
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
        `;
        slide.innerHTML = `
            <h1 style="color: white; font-size: 2.5rem; margin-bottom: 1rem; padding: 0 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">${data.titulo}</h1>
            <p style="color: #E6B422; font-size: 1.3rem; margin-bottom: 1.5rem; padding: 0 20px;">${data.subtitulo}</p>
            <a href="#reposteras" class="btn" style="background-color: #E6B422; color: #2D2A26; text-decoration: none; padding: 12px 30px; border-radius: 5px; font-weight: bold;">Conoce a las Reposteras</a>
        `;
        slidesContainer.appendChild(slide);
    });
    
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '❮';
    prevBtn.setAttribute('aria-label', 'Anterior');
    prevBtn.style.cssText = `
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.6);
        color: white;
        border: none;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.8rem;
        z-index: 20;
        transition: all 0.3s;
    `;
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '❯';
    nextBtn.setAttribute('aria-label', 'Siguiente');
    nextBtn.style.cssText = `
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.6);
        color: white;
        border: none;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.8rem;
        z-index: 20;
        transition: all 0.3s;
    `;
    
    const dotsContainer = document.createElement('div');
    dotsContainer.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 12px;
        z-index: 20;
    `;
    
    slidesData.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: ${index === 0 ? '#E6B422' : 'rgba(255,255,255,0.6)'};
            cursor: pointer;
            transition: all 0.3s;
        `;
        dotsContainer.appendChild(dot);
    });
    
    banner.appendChild(slidesContainer);
    banner.appendChild(prevBtn);
    banner.appendChild(nextBtn);
    banner.appendChild(dotsContainer);
    
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'flex' : 'none';
        });
        dots.forEach((dot, i) => {
            dot.style.background = i === index ? '#E6B422' : 'rgba(255,255,255,0.6)';
        });
        currentSlide = index;
        
        if (sliderInterval) clearInterval(sliderInterval);
        sliderInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 4000);
    }
    
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });
    
    prevBtn.addEventListener('mouseenter', () => {
        prevBtn.style.backgroundColor = '#E6B422';
        prevBtn.style.color = '#3D2317';
    });
    prevBtn.addEventListener('mouseleave', () => {
        prevBtn.style.backgroundColor = 'rgba(0,0,0,0.6)';
        prevBtn.style.color = 'white';
    });
    nextBtn.addEventListener('mouseenter', () => {
        nextBtn.style.backgroundColor = '#E6B422';
        nextBtn.style.color = '#3D2317';
    });
    nextBtn.addEventListener('mouseleave', () => {
        nextBtn.style.backgroundColor = 'rgba(0,0,0,0.6)';
        nextBtn.style.color = 'white';
    });
    
    showSlide(0);
}

// ========== 4. SELECTOR DE IDIOMA ==========
function inicializarIdioma() {
    const selector = document.getElementById('selector-idioma');
    if (!selector) return;
    
    selector.addEventListener('change', function() {
        if (this.value === 'en') {
            // Traducción al inglés
            const tituloReposteras = document.querySelector('#reposteras h2');
            if (tituloReposteras) tituloReposteras.textContent = 'Featured Pastry Women';
            
            const tituloRecetas = document.querySelector('#recetas h2');
            if (tituloRecetas) tituloRecetas.textContent = 'Recipes by Region';
            
            const tituloHistoria = document.querySelector('#historia h2');
            if (tituloHistoria) tituloHistoria.textContent = 'The Legacy of Spanish Pastry Women';
            
            const tituloMultimedia = document.querySelector('#multimedia h2');
            if (tituloMultimedia) tituloMultimedia.textContent = 'Multimedia';
            
            const btnConoce = document.querySelector('.banner .btn, .slide .btn');
            if (btnConoce) btnConoce.textContent = 'Meet the Pastry Women';
            
            const tituloSlider = document.querySelector('.slide h1');
            if (tituloSlider) {
                const titulosEn = [
                    'Spanish Pastry Women',
                    'The Traditional Oven',
                    'Hands with History',
                    'Flavors that Last'
                ];
                if (titulosEn[currentSlide]) {
                    tituloSlider.textContent = titulosEn[currentSlide];
                }
            }
            
            const subtituloSlider = document.querySelector('.slide p');
            if (subtituloSlider) {
                const subtitulosEn = [
                    'Tradition with a Taste of History',
                    'Where the best sweets are born',
                    'The legacy of our grandmothers',
                    'Recipes passed down through generations'
                ];
                if (subtitulosEn[currentSlide]) {
                    subtituloSlider.textContent = subtitulosEn[currentSlide];
                }
            }
            
            console.log('Idioma cambiado a inglés');
        } else {
            location.reload();
        }
    });
}
