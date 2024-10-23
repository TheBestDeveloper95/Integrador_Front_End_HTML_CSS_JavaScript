let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec =>{

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){
      navLinks.forEach(links =>{
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
      });
    };

  });

}

document.querySelector('#search-icon').onclick = () =>{
  document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
  document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop:true,
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop:true,
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);
}

window.onload = fadeOut;




// Array para guardar los productos del carrito
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = '';

    let totalPrecio = 0; // Inicializar el total

    carrito.forEach((producto, index) => {
        const item = document.createElement('div');
        item.textContent = `${producto.nombre} - ${producto.precio} `;
        
        // Sumar el precio del producto al total
        totalPrecio += parseFloat(producto.precio); // Asegúrate de que el precio sea un número

        // Botón para eliminar un producto del carrito
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => {
            eliminarDelCarrito(index);
        });

        item.appendChild(botonEliminar);
        carritoContainer.appendChild(item);
    });

    // Mostrar el total en el carrito
    const totalElement = document.createElement('div');
    totalElement.textContent = `Total: $${totalPrecio.toFixed(2)}`; // Formatear el total a dos decimales
    carritoContainer.appendChild(totalElement);
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

// Asignar el evento de clic a todos los botones de agregar al carrito
document.querySelectorAll('.btn-agregar').forEach(boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();  // Evitar que se recargue la página
        const producto = {
            nombre: e.target.dataset.nombre,
            precio: e.target.dataset.precio
        };
        agregarAlCarrito(producto);
    });
});







// Seleccionamos el botón que abrirá el modal
const btnAbrirModal = document.getElementById('btn-abrir-modal');

// Seleccionamos el modal
const modal = document.getElementById('modal-agregar-producto');

// Seleccionamos el botón que cerrará el modal
const btnCerrarModal = document.getElementById('btn-cerrar-modal');

// Cuando se hace clic en el botón fa-plus, se muestra el modal
btnAbrirModal.addEventListener('click', function(e) {
    e.preventDefault(); // Evitamos que el enlace recargue la página
    modal.style.display = 'block'; // Mostramos el modal
});

// Cuando se hace clic en el botón de cerrar, ocultamos el modal
btnCerrarModal.addEventListener('click', function() {
    modal.style.display = 'none'; // Ocultamos el modal
});

// Cuando se hace clic fuera del contenido del modal, también se oculta
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none'; // Ocultamos el modal si se hace clic fuera
    }
});

// Resto de tu código para agregar productos
formAgregarProducto.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombreProducto = document.getElementById('nombre').value;
    const precioProducto = document.getElementById('precio').value;
    const imagenProducto = document.getElementById('imagen').value;

    agregarProducto(nombreProducto, precioProducto, imagenProducto);

    // Cerrar el modal después de agregar el producto
    modal.style.display = 'none';
});