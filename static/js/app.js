var carritoVisible = false;

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    var botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        botonesEliminarItem[i].addEventListener("click", eliminarItemCarrito);
    }

    var botonesSumarCantidad = document.getElementsByClassName("sumar-cantidad");
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        botonesSumarCantidad[i].addEventListener("click", sumarCantidad);
    }

    var botonesRestarCantidad = document.getElementsByClassName("restar-cantidad");
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        botonesRestarCantidad[i].addEventListener("click", restarCantidad);
    }

    var botonesAgregarAlCarrito = document.getElementsByClassName("boton-item");
    console.log(botonesAgregarAlCarrito);
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        botonesAgregarAlCarrito[i].addEventListener("click", agregarAlCarritoClicked);
    }

    document.getElementsByClassName("btn-pagar")[0].addEventListener("click", pagarClicked);
    restaurarCarritoDesdeLocalStorage();
}

function restaurarCarritoDesdeLocalStorage() {
    var items = JSON.parse(localStorage.getItem("carrito"));
    if (!items) return; // Si no hay nada guardado, salimos

    for (var i = 0; i < items.length; i++) {
        agregarItemAlCarrito(items[i].titulo, items[i].precio, items[i].imagenSrc, items[i].cantidad);
    }
}


function eliminarItemCarrito(event) {
    // Nos aseguramos de llegar al div.carrito-item, sin importar si se clickea el <i> o el <span>
    var button = event.target.closest(".btn-eliminar");
    var item = button.closest(".carrito-item");

    if (item) {
        item.remove();
        actualizarTotalCarrito();
        ocultarCarrito();
        guardarCarritoEnLocalStorage();
    }
}



function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName("carrito-items")[0];
    if (carritoItems.childElementCount === 0) {
        var carrito = document.getElementsByClassName("carrito")[0];
        carrito.style.marginRight = "-100%";
        carrito.style.opacity = "0";
        carritoVisible = false;

        document.getElementsByClassName("contenedor-items")[0].style.width = "100%";
    }
}

function sumarCantidad(event) {
    var cantidadInput = event.target.parentElement.getElementsByClassName("carrito-item-cantidad")[0];
    cantidadInput.value = parseInt(cantidadInput.value) + 1;
    actualizarTotalCarrito();
     guardarCarritoEnLocalStorage();
}

function actualizarTotalCarrito() {
    var carritoItems = document.getElementsByClassName("carrito-item");
    var total = 0;

    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];

        var precioElemento = item.getElementsByClassName("carrito-item-precio")[0];
        var precio = parseFloat(precioElemento.innerText.replace("$", "").trim()); // ✅ Asegura que el precio no tenga caracteres extra

        var cantidadElemento = item.getElementsByClassName("carrito-item-cantidad")[0];
        var cantidad = parseFloat(cantidadElemento.value.trim()); // ✅ Asegura que la cantidad no tenga errores de formato

        console.log(`Producto: ${item.getElementsByClassName("carrito-item-titulo")[0].innerText}`);
        console.log(`Cantidad detectada: ${cantidad}`);
        console.log(`Precio por unidad: ${precio}`);
        console.log(`Subtotal calculado: ${precio * cantidad}`);

        total += precio * cantidad;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("carrito-precio-total")[0].innerText = `$${total.toLocaleString("es")}.00`;
}


function restarCantidad(event) {
    var cantidadInput = event.target.parentElement.getElementsByClassName("carrito-item-cantidad")[0];
    cantidadInput.value = Math.max(1, parseInt(cantidadInput.value) - 1);
    actualizarTotalCarrito();
     guardarCarritoEnLocalStorage();
}

function agregarAlCarritoClicked(event) {
    var item = event.target.parentElement;
    var titulo = item.getElementsByClassName("titulo-item")[0].innerText;
    var precio = item.getElementsByClassName("precio-item")[0].innerText;
    var imagenSrc = item.getElementsByClassName("img-item")[0].src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc, cantidad = 1) {
    var itemsCarrito = document.getElementsByClassName("carrito-items")[0];
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName("carrito-item-titulo");

    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText === titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var item = document.createElement("div");
    item.classList.add("carrito-item");
    item.innerHTML = `
        <img src="${imagenSrc}" alt="" width="80px">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="${cantidad}" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div> 
        <span class="btn-eliminar"><i class="fa-solid fa-trash"></i></span>
    `;

    itemsCarrito.appendChild(item);

    item.getElementsByClassName("btn-eliminar")[0].addEventListener("click", function (e) {
        eliminarItemCarrito(e);
        guardarCarritoEnLocalStorage(); // <-- nuevo
    });
    item.getElementsByClassName("sumar-cantidad")[0].addEventListener("click", function (e) {
        sumarCantidad(e);
        guardarCarritoEnLocalStorage(); // <-- nuevo
    });
    item.getElementsByClassName("restar-cantidad")[0].addEventListener("click", function (e) {
        restarCantidad(e);
        guardarCarritoEnLocalStorage(); // <-- nuevo
    });

    actualizarTotalCarrito();
    guardarCarritoEnLocalStorage(); // <-- nuevo
}

function guardarCarritoEnLocalStorage() {
    var carritoItems = document.getElementsByClassName("carrito-item");
    var items = [];

    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var titulo = item.getElementsByClassName("carrito-item-titulo")[0].innerText;
        var precio = item.getElementsByClassName("carrito-item-precio")[0].innerText;
        var imagenSrc = item.getElementsByTagName("img")[0].src;
        var cantidad = item.getElementsByClassName("carrito-item-cantidad")[0].value;

        items.push({ titulo, precio, imagenSrc, cantidad });
    }

    localStorage.setItem("carrito", JSON.stringify(items));
}


function pagarClicked() {
    var carritoItems = document.getElementsByClassName("carrito-items")[0];
    if (carritoItems.childElementCount === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    var ticketHTML = "<h3>🧾 Ticket de Compra</h3>";
    var total = 0;

    for (var i = 0; i < carritoItems.children.length; i++) {
        var item = carritoItems.children[i];
        var titulo = item.getElementsByClassName("carrito-item-titulo")[0].innerText;
        var precio = parseFloat(item.getElementsByClassName("carrito-item-precio")[0].innerText.replace("$", ""));
        var cantidad = item.getElementsByClassName("carrito-item-cantidad")[0].value;

        ticketHTML += `<p>${titulo} x ${cantidad} - $${(precio * cantidad).toFixed(2)}</p>`;
        total += precio * cantidad;
    }

    ticketHTML += `<hr><p><strong>Total: $${total.toFixed(2)}</strong></p>`;
    document.getElementById("ticket-content").innerHTML = ticketHTML;
    document.getElementById("ticket-container").style.display = "block";
    document.getElementById("ticket-container").scrollIntoView({ behavior: "smooth", block: "center" });

    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
    }
    localStorage.removeItem("carrito");

    actualizarTotalCarrito();
    ocultarCarrito();
}

function cerrarTicket() {
    document.getElementById("ticket-container").style.display = "none";
}

function hacerVisibleCarrito() {
    var carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.marginRight = "0";
    carrito.style.opacity = "1";

    document.getElementsByClassName("contenedor-items")[0].style.width = "60%";
}
