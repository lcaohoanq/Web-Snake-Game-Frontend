async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function loadResources() {
  try {
    const headImage = await loadImage("/public/head.png");
    const dotImage = await loadImage("/public/dot.png");
    const appleImage = await loadImage("/public/apple.png");
    const wallImage = await loadImage("/public/wall.png");

    return { headImage, dotImage, appleImage, wallImage };
  } catch (err) {
    console.log("Failed to load resources:", err);
  }
}
