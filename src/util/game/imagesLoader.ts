export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function loadResources(): Promise<Record<string, HTMLImageElement>> {
  try {
    const headImage = await loadImage('../../assets/images/head.png');
    const dotImage = await loadImage('../../assets/images/dot.png');
    const appleImage = await loadImage('../../assets/images/apple.png');
    const wallImage = await loadImage('../../assets/images/wall.png');

    return { headImage, dotImage, appleImage, wallImage };
  } catch (err) {
    console.log('Failed to load resources:', err);
  }
  return {} as Record<string, HTMLImageElement>;
}
