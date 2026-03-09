# Composition as Explanation

Interactive 3D web experience documenting the workshop *Composition as Explanation*.  
Organised with Notes in Studio and Digitale Grafik Klasse at HFBK Hamburg.

## Live
https://composition.digitale-grafik.com

## Stack
- Three.js + Vite
- Positional Audio (Three.js AudioListener)
- Draco-compressed GLTF models
- OrthographicCamera with OrbitControls

## Structure
```
/
├── src/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── static/
│   ├── models/        # Draco-compressed GLB (cube1–cube7)
│   ├── audio/
│   │   ├── character/ # Per-character hover audio
│   │   └── spots/     # Ambient spatial audio (positional)
│   ├── textures/matcaps/
│   ├── fonts/
│   └── draco/
├── package.json
└── vite.config.js
```

## Run locally
```bash
npm install
npm run dev
```

## Credits
Workshop organised by Insa Deist, Joerdis Lyn Behncke — Notes in Studio  
Christoph Knoth, Konrad Renner — Digitale Grafik Klasse  
Performance: Akseli Manner, Kim Kleinert, Fernanda Braun Santos,  
Tigran Ssakyn, Kristina Schuster, Liudmila Savalyeva, Yeji Cheon  
Document team: Dongseok Lee, Seoin Song, So Jin Park  
Photography: So Jin Park
