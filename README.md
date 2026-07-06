# 🩵🤍🩷 Feliz Cumpleaños, Miriam

Una web sorpresa de cumpleaños, hecha a medida, con carta, 23 razones para
quererla, una vela para pedir un deseo, un mini juego y un easter egg
escondido con un panda rojo. Es un proyecto 100% estático (HTML + CSS + JS,
sin dependencias de build), lista para desplegar en GitHub Pages.

## 📁 Estructura del proyecto

```
miriam-cumple/
├── index.html        → toda la estructura de la web
├── css/style.css     → estilos, paleta de colores y animaciones
├── js/script.js       → todas las interacciones
└── README.md
```

## ✏️ Cómo personalizarla (antes de desplegar)

1. **Tu nombre en la firma final**: abre `index.html`, busca la sección
   `<!-- CIERRE -->` y cambia `— Con todo mi amor` por
   `— Con todo mi amor, [tu nombre]`.
2. **Las 23 razones**: en `js/script.js` busca el array `reasons` (cerca del
   principio) y cámbialas o amplíalas por cosas más concretas vuestras si
   quieres darle un toque aún más personal.
3. **Colores**: si quieres ajustar el azul celeste o el rosa, cambia las
   variables al principio de `css/style.css` (`--sky`, `--pink`,
   `--pink-deep`).
4. **El easter egg**: se activa de dos formas —tocando el pequeño icono de
   huella (esquina inferior derecha, muy sutil) o escribiendo la palabra
   "panda" en cualquier momento mientras se navega la web.
5. (Opcional) Si quieres añadir una foto vuestra o una canción, crea una
   carpeta `assets/` y referencia el archivo desde `index.html`.

## 🚀 Cómo desplegarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser público o privado; con
   privado necesitarás GitHub Pro/Team para activar Pages, así que si no
   tienes plan de pago, hazlo público — nadie va a encontrarlo si no
   comparte el enlace).
2. Sube estos archivos al repositorio, manteniendo la estructura de carpetas
   (`index.html` debe quedar en la raíz).
3. Entra en **Settings → Pages** del repositorio.
4. En "Source", selecciona la rama `main` (o `master`) y la carpeta `/root`.
5. Guarda. En un par de minutos GitHub te dará una URL del tipo:
   `https://tu-usuario.github.io/nombre-del-repo/`
6. Comparte ese enlace con Miriam el día de su cumpleaños 🎉

### Alternativa rápida por terminal

```bash
git init
git add .
git commit -m "Sorpresa de cumpleaños para Miriam"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

Después activa Pages desde Settings tal y como se explica arriba.

## 💡 Detalles de la web

- **Sobre inicial**: al abrirlo se revela el título y su edad (23).
- **Carta**: aparece frase a frase al hacer scroll.
- **23 razones**: tarjetas que se giran al tocarlas, una por cada año.
- **Vela de cumpleaños**: un botón "sopla la vela" con confeti y un deseo.
- **Minijuego**: atrapa corazones durante 15 segundos.
- **Easter egg**: un panda rojo escondido que aparece diciendo
  "¡Felicidades, mamá!" 🐼

Todo funciona sin conexión a internet salvo la tipografía (Google Fonts),
así que si prefieres que funcione 100% offline, puedes descargar las
fuentes "Baloo 2" y "Quicksand" y enlazarlas localmente.

¡Feliz cumpleaños, Miriam! 🎂
