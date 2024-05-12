document.addEventListener('DOMContentLoaded', () => {
  const canvasTunnel = document.querySelector('#tunnel')! as HTMLCanvasElement;
  const canvasRails = document.querySelector('#rails')! as HTMLCanvasElement;
  const canvasMill = document.querySelector('#mill')! as HTMLCanvasElement;
  const canvasCampaign = document.querySelector('#campaign')! as HTMLCanvasElement;
  const canvasApartment = document.querySelector('#apartment')! as HTMLCanvasElement;
  if (canvasTunnel || canvasRails || canvasMill || canvasCampaign || canvasApartment) {
    window.location.href = '../../templates/404.html';
  }
});
