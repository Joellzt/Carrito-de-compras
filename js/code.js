var carrito =[];
var productosCargados = [];

async function cargarGorras() {
    const response = await fetch('gorras.json');
    productosCargados = await response.json();
    mostrarProductos(productosCargados);
};
 function mostrarProductos(productos){
    const container = document.getElementById('contenedor-gorras');
    container.innerHTML = '';
    productos.forEach(
        producto => {
        const producHTML = `
        <figure class="products-glass"> 
                <img src="${producto.img}" alt="">
                <figcaption>${producto.nombre}
                </figcaption>
                <p> $${producto.precio}</p>
                <button class="btn" onClick"agregarAlCarrito"(${producto.id})></button>
        </figure>`;
        container.innerHTML += producHTML;
    }
);}
 function mostrarCarrito(){
    const carritoItems = document.getElementById ('contenedor-gorras');
    carritoItems.innerHTML = '';

    if (carrito.length ===0){
        carritoItems.innerHTML= '<p>Tu carrito esta vacio</p>';
    }else{
        carrito.forEach ((producto,index) => {
            carritoItems.innerHTML += `
            <div class="producto-carrito">
                <img src="${producto.img}"></img>
                <p>${producto.nombre}</p>
                <p>$${producto.precio}</p>
                <button onClick="cambiarCantidad(${index} - 1)"> - </button>
                <input type="number" value="${producto.cantidad}" min="1">
                <button onClick="cambiarCantidad(${index},1)"> + </button>
                <p> Total : ${producto.precio * producto.cantidad}</p>
                <button onClick="eliminarDelCarrito(${index})"> Eliminar </button>
            </div>
            `
        })
    }
    document.getElementById('carrito-modal').style.display='block';
 }

async function agregarAlCarrito(idProducto) {
    const response = await fetch('gorras.json');
    const productos = await response.json();
    const productoSeleccionado = productos.find( p => p.id === idProducto);
    const cantidad = parseInt(document.getElementById(`cantidad-${idProducto}`).value);
    const productoExistente = carrito.find(p => p.id === idProducto);
    if(productoExistente){
        productoExistente.cantidad += cantidad;
    }else{
        const productoEnCarrito= {
            ...productoSeleccionado, cantidad
        };
        carrito.push(productoEnCarrito);
    }
    mostrarCarrito();
}


 // cargar productos al iniciar la web

 window.onload = cargarGorras;

 async function cagarJamon(pa) {
    
 }