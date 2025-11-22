/* Icône 192x192 et 512x512 pour PWA */
/* Ces fichiers doivent être créés avec votre logiciel de conception préféré */
/* Pour maintenant, un fichier SVG peut servir de placeholder */

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Fonction pour créer une icône
function createIcon(size) {
  canvas.width = size;
  canvas.height = size;
  
  // Fond gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Texte/Logo
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.4}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('💪', size / 2, size / 2);
  
  return canvas.toDataURL('image/png');
}

// Créer et télécharger les icônes
const icon192 = createIcon(192);
const icon512 = createIcon(512);

console.log('Icon 192x192:', icon192);
console.log('Icon 512x512:', icon512);
