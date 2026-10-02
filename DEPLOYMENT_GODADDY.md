# GoDaddy Hosting Deployment Guide (Easy & Fast)

Yeh guide GoDaddy hosting par website ko bina kisi error ke successfully deploy aur run karne ke liye hai.

---

### Option 1: Easiest & Most Recommended (Static Hosting / cPanel public_html)
React Vite websites ke liye GoDaddy par sabse asaan aur fast tareeqa yeh hai:

1. Apne computer par command chalayein:
   ```bash
   npm run build
   ```
2. Build complete hone par `dist` folder ban jayega.
3. `dist` folder ke andar ki sari files aur folders (including `.htaccess`, `index.html`, aur `assets/` folder) ko zip karein ya direct GoDaddy **cPanel File Manager** mein `public_html/` ke andar upload kar dein.
4. Website live ho jayegi aur sabhi internal pages (`/products`, `/about`, etc.) bina 404 error ke smoothly work karenge kyunki humne `.htaccess` include kar diya hai.

---

### Option 2: GoDaddy cPanel "Setup Node.js App"
Agar aap GoDaddy ki Node.js Application feature use karna chahte hain:

1. **cPanel** open karein aur **"Setup Node.js App"** par click karein.
2. **Create Application** par click karein:
   - **Node.js version**: `18.x`, `20.x`, ya `22.x` select karein.
   - **Application mode**: `Production`
   - **Application root**: Apne folder ka path (e.g., `public_html` ya subfolder)
   - **Application startup file**: `app.js` (ya `server.js` dono ready hain)
3. Files upload karein (Project root files: `server.js`, `app.js`, `package.json`, aur `dist` folder).
4. cPanel mein **"Run NPM Install"** button dabayein.
5. Server restart karein: **"Restart"** button dabayein.
6. Website successfully run ho jayegi!

---

### Key Improvements Made to Ease the Build:
1. **Lightweight Chunk Splitting**: Heavy bundles split into fast, small chunks so GoDaddy's server won't run out of memory.
2. **`server.js` & `app.js` Added**: Production Express server that handles React SPA routing and works with GoDaddy's startup file configuration.
3. **`package.json` Updated**: Added `"start": "node server.js"` and proper engine targets (`Node >=18`).
4. **Apache `.htaccess` Generated**: Pre-configured SPA rewrite rules automatically built into `dist/`.
