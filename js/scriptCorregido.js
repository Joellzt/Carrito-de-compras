let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productosCargados = [];

// Traer productos desde JSON
async function traerProductos() {
    const response = await fetch('gorras.json');
    productosCargados = await response.json();
    mostrarProductos(productosCargados);
}

// Filtrar productos
function filtrarProductos() {
    const filtro = document.getElementById('filtro-precio').value;
    let productosFiltrados = [...productosCargados];

    if (filtro === 'mayor-menor') {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    } else if (filtro === 'menor-mayor') {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (filtro === 'destacado') {
        productosFiltrados = productosFiltrados.filter(p => p.destacado);
    }

    mostrarProductos(productosFiltrados);
}

// Mostrar productos en la página
function mostrarProductos(productos) {
    const container = document.getElementById("contenedor-gorras");
    container.innerHTML = '';
    productos.forEach(producto => {
        const productHTML = `     
            <figure class="products-glass"> 
                <img src="${producto.img}" alt="")">
                <figcaption>${producto.nombre}</figcaption>
                <p>$${producto.precio}</p>
                  <button class="btn" onclick="agregarAlCarrito(${producto.id}); event.stopPropagation();">Agregar al carrito +</button>
            </figure>`;
        container.innerHTML += productHTML;
    });
}

// Función para ir al detalle del producto
function irADetalle(productId) {
    window.location.href = `../pages/carrito.html?id=${productId}`;
}

// Agregar producto al carrito
function agregarAlCarrito(productId) {
    const producto = productosCargados.find(p => p.id === productId);
    if (producto) {
        const itemEnCarrito = carrito.find(item => item.id === productId);
        
        if (itemEnCarrito) {
            itemEnCarrito.cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        guardarCarritoEnStorage();
        actualizarContador();
        mostrarCarrito();
    }
}

// Guardar carrito en localStorage
function guardarCarritoEnStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Actualizar contador de productos en el carrito
function actualizarContador() {
    const contadorProductos = document.getElementById('contador-productos');
    const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
    contadorProductos.innerText = totalProductos;
}

// Mostrar el carrito y calcular total
function mostrarCarrito() {
    const carritoItems = document.querySelector('.container-cart-products');

    if (carrito.length === 0) {
        carritoItems.classList.remove('hidden-cart'); 
        carritoItems.innerHTML = '<p class="cart-vacio">No hay productos en tu carrito.</p>'; 
        return;
    }

    carritoItems.classList.remove('hidden-cart'); 
    carritoItems.innerHTML = '';

    let total = 0;
    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        
        // Crear elemento HTML para cada producto en el carrito
        const productoHTML = document.createElement('div');
        productoHTML.classList.add('cart-product');
        productoHTML.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${producto.cantidad}</span>
                <p class="titulo-producto-carrito">${producto.nombre}</p>
                <span class="precio-producto-carrito">$${subtotal}</span>
                <div class="iconos-modificar">
                <svg onclick="disminuirCantidad(${index})" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-dash icon-button" viewBox="0 0 16 16">
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                    </svg>
                    <svg onclick="aumentarCantidad(${index})" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus icon-button" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg icon-close" viewBox="0 0 16 16" onclick="eliminarDelCarrito(${index})">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
        `;
        carritoItems.appendChild(productoHTML);
    });
    
    // Muestra el total a pagar y el botón de pago
    const totalHTML = document.createElement('div');
    totalHTML.classList.add('cart-total');
    totalHTML.innerHTML = `
        <h3>Total: $${total}</h3>
        <button class="btn" id="pagar-button" onclick="procederAlPago()">Pagar</button>
    `;
    carritoItems.appendChild(totalHTML);
}

// Función para aumentar la cantidad del producto en el carrito
function aumentarCantidad(index) {
    carrito[index].cantidad += 1;
    guardarCarritoEnStorage();
    mostrarCarrito();
}

// Función para disminuir la cantidad del producto en el carrito
function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
    } else {
        eliminarDelCarrito(index);
    }
    guardarCarritoEnStorage();
    mostrarCarrito();
}

// Función para proceder al pago
function procederAlPago() {
    alert('Procediendo al pago.'); 
}

// Función para cerrar o abrir el carrito
function toggleCarrito() {
    const carritoItems = document.querySelector('.container-cart-products');
    carritoItems.classList.toggle('hidden-cart');
    
    if (carritoItems.classList.contains('hidden-cart')) {
        carritoItems.innerHTML = '';
    } else {
        mostrarCarrito();
    }
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); 
    guardarCarritoEnStorage();
    actualizarContador();
    mostrarCarrito(); 
}

// Eventos de carga y filtro
document.getElementById('filtro-precio').addEventListener('change', filtrarProductos);
window.onload = () => {
    traerProductos();
    actualizarContador();
    mostrarCarrito();
};
