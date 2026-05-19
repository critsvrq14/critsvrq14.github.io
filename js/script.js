// ============================================
// FASE 4: ELEMENTOS DINÁMICOS CON JAVASCRIPT
// Menú desplegable, Slider de imágenes, Mensajes personalizados, Idiomas
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript de Fase 4 cargado correctamente');
    
    // ========== 1. MENÚ DESPLEGABLE ==========
    crearMenusDesplegables();
    
    // ========== 2. MENSAJE PERSONALIZADO POR HORA ==========
    crearMensajeBienvenida();
    
    // ========== 3. SLIDER DE IMÁGENES ==========
    iniciarSlider();
    
    // ========== 4. IDIOMA ==========
    inicializarIdioma();
});

// ========== 1. FUNCIÓN PARA CREAR MENÚS DESPLEGABLES ==========
function crearMenusDesplegables() {
    const navList = document.querySelector('nav ul');
    if (!navList) {
        console.log('No se encontró la navegación');
        return;
    }
    
    console.log('Creando menús desplegables...');
    
    // Elementos que tendrán submenús
    const itemsConSubmenu = ['Recetas', 'Reposteras'];
    
    itemsConSubmenu.forEach(nombre => {
        // Buscar el li que contiene el enlace con ese texto
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
            
            // Crear submenú
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
                // Prevenir el comportamiento por defecto
                subLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Has hecho clic en: ' + item);
                });
                subLi.appendChild(subLink);
                submenu.appendChild(subLi);
            });
            
            targetLi.style.position = 'relative';
            targetLi.appendChild(submenu);
            
            // Eventos mouseover y mouseout
            targetLi.addEventListener('mouseenter', function() {
                submenu.style.display = 'block';
            });
            
            targetLi.addEventListener('mouseleave', function() {
                submenu.style.display = 'none';
            });
            
            console.log(`Submenú creado para: ${nombre}`);
        }
    });
}

// ========== 2. FUNCIÓN PARA MENSAJE PERSONALIZADO POR HORA ==========
function crearMensajeBienvenida() {
    console.log('Creando mensaje de bienvenida...');
    
    const hora = new Date().getHours();
    let saludo = '';
    let icono = '';
    let textoPersonalizado = '';
    
    if (hora >= 6 && hora < 12) {
        saludo = 'Buenos días';
        icono = '🌞';
        textoPersonalizado = '¿lista para descubrir los dulces más tradicionales de España? ¡Comenzamos!';
    } else if (hora >= 12 && hora < 19) {
        saludo = 'Buenas tardes';
        icono = '☀️';
        textoPersonalizado = '¿qué tal una pausa dulce? Descubre nuestras recetas más auténticas';
    } else {
        saludo = 'Buenas noches';
        icono = '🌙';
        textoPersonalizado = 'relájate con un buen dulce mientras descubres la historia de nuestras reposteras';
    }
    
    // Verificar si ya existe el mensaje para no duplicarlo
    if (document.querySelector('.mensaje-bienvenida')) {
        return;
    }
    
    // Crear contenedor de mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'mensaje-bienvenida';
    mensajeDiv.style.cssText = `
        background: linear-gradient(135deg, #E6B422, #C96E3D);
        color: white;
        text-align: center;
        padding: 12px 20px;
        font-weight: bold;
        font-size: 1rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    `;
    
    mensajeDiv.innerHTML = `${icono} ${saludo}! ${textoPersonalizado} ${icono}`;
    
    // Insertar después del header
    const header = document.querySelector('header');
    if (header) {
        header.insertAdjacentElement('afterend', mensajeDiv);
        console.log('Mensaje de bienvenida insertado');
    }
}

// ========== 3. SLIDER DE IMÁGENES ==========
let sliderInterval;
let currentSlide = 0;

function iniciarSlider() {
    const banner = document.querySelector('.banner');
    if (!banner) {
        console.log('No se encontró el banner');
        return;
    }
    
    console.log('Iniciando slider...');
    
    // Verificar si el slider ya está creado para no duplicarlo
    if (banner.querySelector('.slider-container')) {
        console.log('El slider ya existe');
        return;
    }
    
    // Imágenes para el slider (usando tus imágenes existentes)
    const slidesData = [
        {
            imagen: 'images/banner-reposteras.png',
            titulo: 'Reposteras de España',
            subtitulo: 'Tradición con Sabor a Historia'
        },
        {
            imagen: 'images/foto1.png',
            titulo: 'El Horno de Siempre',
            subtitulo: 'Donde nacen los mejores dulces'
        },
        {
            imagen: 'images/foto2.png',
            titulo: 'Manos con Historia',
            subtitulo: 'El legado de nuestras abuelas'
        },
        {
            imagen: 'images/foto3.png',
            titulo: 'Sabores que Perduran',
            subtitulo: 'Recetas transmitidas por generaciones'
        }
    ];
    
    // Guardar el contenido original por si se necesita
    banner.innerHTML = '';
    banner.style.cssText = `
        position: relative;
        height: 450px;
        overflow: hidden;
        padding: 0;
        background: none;
    `;
    
    // Crear contenedor de slides
    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'slides-container';
    slidesContainer.style.cssText = `
        position: relative;
        width: 100%;
        height: 100%;
    `;
    
    // Crear cada slide
    slidesData.forEach((data, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.setAttribute('data-index', index);
        slide.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${data.imagen}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            display: ${index === 0 ? 'flex' : 'none'};
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            transition: opacity 0.5s ease;
        `;
        
        slide.innerHTML = `
            <h1 style="color: white; font-size: 2.5rem; margin-bottom: 1rem; padding: 0 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">${data.titulo}</h1>
            <p style="color: #E6B422; font-size: 1.3rem; margin-bottom: 1.5rem; padding: 0 20px;">${data.subtitulo}</p>
            <a href="#reposteras" class="btn" style="background-color: #E6B422; color: #2D2A26; text-decoration: none; padding: 12px 30px; border-radius: 5px; font-weight: bold; transition: all 0.3s;">Conoce a las Reposteras</a>
        `;
        
        slidesContainer.appendChild(slide);
    });
    
    // Botón anterior
    const prevBtn = document.createElement('button');
    prevBtn.className = 'slider-btn prev-btn';
    prevBtn.innerHTML = '❮';
    prevBtn.setAttribute('aria-label', 'Imagen anterior');
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
    
    // Botón siguiente
    const nextBtn = document.createElement('button');
    nextBtn.className = 'slider-btn next-btn';
    nextBtn.innerHTML = '❯';
    nextBtn.setAttribute('aria-label', 'Imagen siguiente');
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
    
    // Contenedor de dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    dotsContainer.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 12px;
        z-index: 20;
    `;
    
    // Crear dots
    slidesData.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.setAttribute('data-index', index);
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
    
    // Agregar todo al banner
    banner.appendChild(slidesContainer);
    banner.appendChild(prevBtn);
    banner.appendChild(nextBtn);
    banner.appendChild(dotsContainer);
    
    // Eventos de los botones
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
        
        // Reiniciar intervalo automático
        if (sliderInterval) {
            clearInterval(sliderInterval);
        }
        sliderInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 4000);
    }
    
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showSlide(index);
        });
    });
    
    // Hover effects para botones
    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.backgroundColor = '#E6B422';
            btn.style.color = '#3D2317';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.backgroundColor = 'rgba(0,0,0,0.6)';
            btn.style.color = 'white';
        });
    });
    
    console.log('Slider iniciado correctamente');
}

// ========== 4. FUNCIÓN SELECTOR DE IDIOMA ==========
function inicializarIdioma() {
    const selector = document.getElementById('selector-idioma');
    if (!selector) {
        console.log('No se encontró el selector de idioma');
        return;
    }
    
    selector.addEventListener('change', function() {
        const idioma = this.value;
        if (idioma === 'en') {
            // Traducción al inglés - selectores CORRECTOS
            const tituloReposteras = document.querySelector('#reposteras h2');
            if (tituloReposteras) tituloReposteras.textContent = 'Featured Pastry Women';
            
            const tituloRecetas = document.querySelector('#recetas h2');
            if (tituloRecetas) tituloRecetas.textContent = 'Recipes by Region';
            
            const tituloHistoria = document.querySelector('#historia h2');
            if (tituloHistoria) tituloHistoria.textContent = 'The Legacy of Spanish Pastry Women';
            
            const tituloMultimedia = document.querySelector('#multimedia h2');
            if (tituloMultimedia) tituloMultimedia.textContent = 'Multimedia';
            
            // Botón del banner (puede estar en el slider o banner original)
            const btnConoce = document.querySelector('.banner .btn, .slide .btn');
            if (btnConoce) btnConoce.textContent = 'Meet the Pastry Women';
            
            // Cambiar también el título principal del slider
            const tituloSlider = document.querySelector('.slide h1');
            if (tituloSlider) {
                const titulosEn = [
                    'Spanish Pastry Women',
                    'The Traditional Oven',
                    'Hands with History',
                    'Flavors that Last'
                ];
                const currentIndex = currentSlide;
                if (titulosEn[currentIndex]) {
                    tituloSlider.textContent = titulosEn[currentIndex];
                }
            }
            
            // Cambiar subtítulo del slider
            const subtituloSlider = document.querySelector('.slide p');
            if (subtituloSlider) {
                const subtitulosEn = [
                    'Tradition with a Taste of History',
                    'Where the best sweets are born',
                    'The legacy of our grandmothers',
                    'Recipes passed down through generations'
                ];
                const currentIndex = currentSlide;
                if (subtitulosEn[currentIndex]) {
                    subtituloSlider.textContent = subtitulosEn[currentIndex];
                }
            }
            
            console.log('Idioma cambiado a inglés');
        } else {
            // Recargar para restaurar español completo
            location.reload();
        }
    });
    
    console.log('Selector de idioma inicializado correctamente');
}