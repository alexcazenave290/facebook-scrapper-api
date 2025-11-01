const boton = document.getElementById('boton');
const contenedor = document.getElementById('imagenes');
const input = document.getElementById('input');

boton.addEventListener('click', mostrarDatos);

async function mostrarDatos() {
    if (input.value.trim() === '') {
        contenedor.innerHTML = '⚠️ Tienes que escribir algo';
        return;
    }

    // Deshabilitar botón y cambiar texto
    const textoOriginal = boton.textContent;
    boton.disabled = true;
    boton.textContent = '🔍 Buscando...';

    const url = `https://facebook-scraper3.p.rapidapi.com/search/people?query=${encodeURIComponent(input.value)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'API KEY FROM RAPIDAPI FACEBOOK SCRAPER',
            'x-rapidapi-host': 'facebook-scraper3.p.rapidapi.com'
        }
    };

    contenedor.innerHTML = '🔍 Buscando perfiles...';

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        const perfiles = result.results;
        if (!perfiles || perfiles.length === 0) {
            contenedor.innerHTML = '❌ No se encontraron perfiles.';
            // Rehabilitar botón
            boton.disabled = false;
            boton.textContent = textoOriginal;
            return;
        }

        contenedor.innerHTML = '';

        perfiles.forEach(perfil => {
            const imagen = perfil.profile_picture.uri;
            const nombre = perfil.name;
            const link = perfil.url;

            const div = document.createElement('div');
            div.style.border = '1px solid #ccc';
            div.style.borderRadius = '10px';
            div.style.padding = '10px';
            div.style.margin = '10px';
            div.style.display = 'inline-block';
            div.style.textAlign = 'center';
            div.style.width = '150px';
            div.style.background = '#f9f9f9';
            div.style.transition = 'transform 0.2s';
            div.onmouseover = () => div.style.transform = 'scale(1.05)';
            div.onmouseout = () => div.style.transform = 'scale(1)';

            const img = document.createElement('img');
            img.src = imagen;
            img.alt = nombre;
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.borderRadius = '50%';
            img.style.objectFit = 'cover';

            const name = document.createElement('p');
            name.textContent = nombre;
            name.style.fontWeight = 'bold';

            const linkTag = document.createElement('a');
            linkTag.href = link;
            linkTag.textContent = 'Ver perfil';
            linkTag.target = '_blank';
            linkTag.style.display = 'block';
            linkTag.style.color = '#1877f2';
            linkTag.style.textDecoration = 'none';
            linkTag.style.fontSize = '14px';
            linkTag.style.marginTop = '5px';

            div.appendChild(img);
            div.appendChild(name);
            div.appendChild(linkTag);
            contenedor.appendChild(div);
        });

        // Rehabilitar botón después de mostrar resultados
        boton.disabled = false;
        boton.textContent = textoOriginal;

    } catch (error) {
        console.error(error);
        contenedor.innerHTML = '⚠️ Error al buscar perfiles.';
        // Rehabilitar botón en caso de error
        boton.disabled = false;
        boton.textContent = textoOriginal;
    }
}
