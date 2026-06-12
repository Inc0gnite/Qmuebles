# Muebles Q's — Landing page

Landing tipo vitrina de catálogo con contacto directo por WhatsApp. Un solo archivo
estático (`index.html`), sin backend ni base de datos. Liviana, rápida y fácil de
publicar en cualquier hosting.

- **Stack:** HTML + CSS (sin build). Fuentes Google (Sora + Inter).
- **Objetivo:** que el visitante escriba por WhatsApp para cotizar.
- **Dirección visual:** moderna neutra (hueso / madera / carbón).

---

## Pendientes antes de publicar (importante)

La página está completa, pero hay material del cliente que debe entregarse **antes de
salir en vivo**. No publicar con los espacios de foto vacíos.

1. **Fotos reales** (lo más importante). Reemplazar los slots marcados `SLOT` /
   `photo-slot` por fotos reales de muebles terminados y del taller:
   - Hero: 1 foto vertical destacada (~4:5).
   - Tres líneas (madera, fierro, aglomerados): 1 foto cada una (~4:3).
   - Nosotros: 1 foto del taller o del equipo (~5:4).
   - Comprimir todo en https://squoosh.app o https://tinypng.com antes de subir.
2. **`og-image.jpg`**: imagen de 1200×630 px (un mueble bonito) para que el enlace se
   vea bien al compartirlo en WhatsApp/redes. Va junto al `index.html`.
3. **Confirmar WhatsApp**: el botón usa `+56 9 5981 7829`. Verificar que ese número
   tenga WhatsApp activo. Si cambia, actualizar los enlaces `wa.me/56959817829`.
4. **Logo**: hoy se usa un monograma "Q" interino. Si hay logo real, reemplazar el
   favicon y la marca del header.
5. **Redes**: si tienen Instagram/TikTok, agregar los enlaces en el footer.
6. **Testimonios** (opcional, recomendado): cuando haya reseñas reales de clientes, se
   puede añadir una sección. No se incluyeron inventadas a propósito.

---

## Cómo editar el contenido

Todo está en `index.html`. Para cambiar textos, busca la sección por su comentario
(`<!-- LÍNEAS DE FABRICACIÓN -->`, etc.) y edita el texto.

Para cambiar una foto: reemplaza el bloque `<div class="photo-slot">...</div>` por
`<img src="mi-foto.jpg" alt="descripción">` y deja la foto en la misma carpeta.

Los colores y fuentes están en las variables CSS al inicio (`:root { ... }`).

---

## Cómo publicar (pipeline: GitHub → Vercel → dominio .cl)

> Estos pasos requieren tus cuentas. Aquí va la guía; ejecútalos tú.

### 1. GitHub
1. Crea un repositorio nuevo (privado o público).
2. Sube `index.html`, `README.md` y las imágenes finales.

### 2. Vercel (hosting gratis)
1. Entra a https://vercel.com e inicia sesión con GitHub.
2. **Add New → Project** e importa el repositorio.
3. Framework preset: **Other** (es un sitio estático). Deploy.
4. Vercel te dará una URL `*.vercel.app` para revisar que todo se vea bien.

### 3. Dominio .cl (Modelo A — a nombre del cliente)
1. Registra el dominio (ej. `mueblesqs.cl`) en NIC Chile (https://nic.cl) **con los
   datos del cliente** (RUT y correo del cliente). El dominio queda a su nombre.
2. En Vercel, **Project → Settings → Domains**, agrega el dominio.
3. Vercel te indicará los registros DNS (un `A` y/o `CNAME`). Cópialos en el panel de
   NIC Chile (o donde administres el DNS).
4. Espera la propagación (minutos a unas horas) y verifica el candado HTTPS.

---

## Checklist de calidad (QA) — repasar antes de entregar

- [ ] Se ve bien en celular y en computador.
- [ ] El botón de WhatsApp abre el chat correcto con el mensaje prellenado.
- [ ] Todos los enlaces y el mapa funcionan.
- [ ] Las fotos reales están puestas y comprimidas; nada de slots vacíos.
- [ ] `og-image.jpg` presente (se ve bien al compartir el enlace).
- [ ] Title, meta description y favicon presentes (ya incluidos).
- [ ] HTTPS activo en el dominio .cl.

---

## Entrega

- Código: `index.html` (+ imágenes) — portable, sin dependencias de build.
- Dominio: a nombre del cliente (Modelo A).
- Este `README.md` como guía de despliegue y mantención.
