let preciosCarrito = [];

// ============================================================
// FUNCIÓN: abrirModal(pizza)
// Recibe un objeto pizza y llama a Swal.fire() de SweetAlert2.
// La librería se encarga del overlay, el cierre con Escape,
// el responsive y el diseño — nosotros solo pasamos los datos.
// ============================================================
function abrirModal(pizza) {
    Swal.fire({
        title: pizza.nombre.toUpperCase(),

        // html nos permite armar el contenido interno del modal
        html: `
                    <img src="${pizza.imagen}"
                         alt="${pizza.nombre}"
                         style="width:100%; border-radius:8px; margin-bottom:12px">
                    <p style="color:#555; font-size:1rem; margin-bottom:12px">
                        ${pizza.descripcion}
                    </p>
                    <p style="color:#135D76; font-size:2rem; font-weight:bold; margin:0">
                        $ ${pizza.precio.toLocaleString('es-AR')}
                    </p>
                `,

        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#0D7139',

        width: '500px',
    });
}

function calcularPrecio(pizza) {
    preciosCarrito.push(pizza.precio);

   // const preciosConDescuento = preciosCarrito.map(valor => valor * 0.9);

    

    // Calculamos el total recorriendo el arreglo con forEach()
    let total = 0;
    preciosCarrito.forEach(precio => {
        total = total + precio;
    });

    // Mostramos el resultado
    console.log(`Precios en el carrito: ${preciosCarrito}`);
    console.log(`Total: $ ${total.toLocaleString('es-AR')}`);

    if (total>50000) {
        totalDescuento = total-(total * 0.1);
        console.log(`Se aplicó un descuento del 10% ${totalDescuento.toLocaleString('es-AR')}`);
    }


}

async function cargarProductos() {
    // Cargar el archivo JSON
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        console.log(data);
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = '';
        data.productos.forEach(pizza => {
            const li = document.createElement('li');
            li.innerHTML = `
        <div class="box">
          <figure>
            <img src="${pizza.imagen}" alt="${pizza.nombre}" class="img-clickeable"/>
            <figcaption>
              <h3>${pizza.nombre}</h3>
              <p>$ ${pizza.precio.toLocaleString('es-AR')}</p>
              <time>${pizza.fecha}</time>
            </figcaption>
          </figure>
          <button class="button" value="${pizza.id}" data-price="${pizza.precio}">
            Añadir al carrito <i class="fa-solid fa-cart-shopping"></i>
          </button>
        </div>`;
            // ✅ Abrir el modal al hacer clic en la imagen
            const img = li.querySelector('.img-clickeable');
            img.addEventListener('click', () => abrirModal(pizza));

            gallery.appendChild(li);

            // ✅ Calcular el precio al hacer clic en el botón
            const btn = li.querySelector('.button');
            btn.addEventListener('click', () => calcularPrecio(pizza));

        }); // End of forEach

    } // End of try
    catch (error) {
        console.error('Error al cargar productos:', error);
    }  // End of catch
} // End of Function

document.addEventListener('DOMContentLoaded', cargarProductos);