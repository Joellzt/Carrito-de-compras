let carrito =[];
const container = document.getElementById("contenedor-gorras");

async function traerProductos (){
        const response = await fetch("../gorras.json");
        const productos = await response.json();
        productos.forEach( p => {
            /*Codigo para crear las cajas de producto*/
            const card = document.createElement("figure")
            card.className = "products-glass"
            const img = document.createElement("img")
            img.src = p.img;
            const title = document.createElement("figcaption");
            title.textContent = p.nombre;
            const price = document.createElement("p");
            price.textContent = p.precio;
            const button = document.createElement("button");
            button.className = "btn";
            button.addEventListener("click", () => agregarAlCarrito(p.id));
            button.textContent = "Agregar al carrito +";
            
            card.append(img, title, price, button);
            container.append(card);
        });
}       
async function agregarAlCarrito(productId){
    try{
        const response = await fetch("../gorras.json");
        const productos = await response.json();
        const productoAgregado = productos.find(p => p.id === productId);
            if (productos){
                carrito.push(productoAgregado);
                console.log("producto agregado");
            } else{
                console.log("producto no encontrado");
            }
    } catch (error){
    console.error("Error mega faltal" ,error);
    }
}
console.log(carrito);
traerProductos();