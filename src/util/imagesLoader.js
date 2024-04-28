async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function loadResources() {
  const headImage = await loadImage("/src/resources/head.png");
  const dotImage = await loadImage("/src/resources/dot.png");
  const appleImage = await loadImage("/src/resources/apple.png");

  return { headImage, dotImage, appleImage };
}
