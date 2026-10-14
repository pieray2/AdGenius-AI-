import { PosterConfig } from '../types/campaign';

interface RenderPosterOptions {
  canvas: HTMLCanvasElement;
  config: PosterConfig;
  productName: string;
  description: string;
  onImageLoaded?: () => void;
}

const imageCache = new Map<string, HTMLImageElement>();

// Get pixel dimensions for aspect ratio
export function getPosterDimensions(aspectRatio: '1:1' | '9:16' | '16:9'): { width: number; height: number } {
  switch (aspectRatio) {
    case '9:16':
      return { width: 1080, height: 1920 };
    case '16:9':
      return { width: 1920, height: 1080 };
    case '1:1':
    default:
      return { width: 1080, height: 1080 };
  }
}

// Helper to wrap text into multiple lines
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number = 4
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine ? currentLine + ' ' + words[i] : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = words[i];
      if (lines.length >= maxLines - 1) {
        const remaining = words.slice(i).join(' ');
        let truncated = remaining;
        while (ctx.measureText(truncated + '...').width > maxWidth && truncated.length > 0) {
          truncated = truncated.slice(0, -1);
        }
        lines.push(truncated + '...');
        return lines;
      }
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

// Draw rounded rectangle
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  fill: boolean = true,
  stroke: boolean = false
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

// Main Render Function
export function renderPosterToCanvas({
  canvas,
  config,
  productName,
  description,
  onImageLoaded,
}: RenderPosterOptions) {
  const { width, height } = getPosterDimensions(config.aspectRatio);
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const accent = config.accentColor || '#8B5CF6';
  const layout = config.layout || 'bold_split';
  const isTall = config.aspectRatio === '9:16';

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // 1. Draw Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  if (layout === 'festive_royal') {
    bgGrad.addColorStop(0, '#381206');
    bgGrad.addColorStop(0.5, '#1B0803');
    bgGrad.addColorStop(1, '#0C0301');
  } else if (layout === 'luxury_dark') {
    bgGrad.addColorStop(0, '#04281F');
    bgGrad.addColorStop(0.5, '#021611');
    bgGrad.addColorStop(1, '#050B10');
  } else if (layout === 'vibrant_retail') {
    bgGrad.addColorStop(0, '#2E1065');
    bgGrad.addColorStop(0.5, '#1E1B4B');
    bgGrad.addColorStop(1, '#090D1A');
  } else if (layout === 'minimal_glow') {
    bgGrad.addColorStop(0, '#0B0F19');
    bgGrad.addColorStop(1, '#04060A');
  } else {
    // bold_split
    bgGrad.addColorStop(0, '#101426');
    bgGrad.addColorStop(0.6, '#0B0E1B');
    bgGrad.addColorStop(1, '#05070D');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Render Product Image if present
  if (config.productImageUrl) {
    const imgUrl = config.productImageUrl;
    let img = imageCache.get(imgUrl);

    if (!img) {
      img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imgUrl;
      img.onload = () => {
        imageCache.set(imgUrl, img!);
        if (onImageLoaded) onImageLoaded();
      };
    } else if (img.complete && img.naturalWidth > 0) {
      ctx.save();
      // Draw product image in central hero section
      const imgTargetH = isTall ? height * 0.46 : height * 0.52;
      const imgTargetY = isTall ? height * 0.28 : height * 0.18;
      const imgAspect = img.width / img.height;
      const drawW = imgTargetH * imgAspect;
      const drawX = (width - drawW) / 2;

      ctx.globalAlpha = 0.85;
      ctx.drawImage(img, drawX, imgTargetY, drawW, imgTargetH);

      // Vignette / overlay gradient to ensure text readability
      const overlayGrad = ctx.createLinearGradient(0, imgTargetY, 0, imgTargetY + imgTargetH);
      overlayGrad.addColorStop(0, 'rgba(11, 14, 27, 0.9)');
      overlayGrad.addColorStop(0.3, 'rgba(11, 14, 27, 0.1)');
      overlayGrad.addColorStop(0.8, 'rgba(11, 14, 27, 0.7)');
      overlayGrad.addColorStop(1, 'rgba(11, 14, 27, 0.98)');
      ctx.fillStyle = overlayGrad;
      ctx.fillRect(0, imgTargetY, width, imgTargetH);
      ctx.restore();
    }
  }

  // 3. Ambient lighting glows
  const topGlow = ctx.createRadialGradient(width * 0.8, height * 0.15, 20, width * 0.8, height * 0.15, width * 0.5);
  topGlow.addColorStop(0, `${accent}44`);
  topGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = topGlow;
  ctx.fillRect(0, 0, width, height);

  // 4. Subtle Border Frame
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 2;
  drawRoundRect(ctx, 40, 40, width - 80, height - 80, 24, false, true);

  // 5. Category / Strategy Badge
  ctx.save();
  const badgeText = (config.offerBadge || 'DIRECT RESPONSE').toUpperCase();
  ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
  const badgePadX = 22;
  const badgeW = ctx.measureText(badgeText).width + badgePadX * 2;
  const badgeH = 46;
  const badgeX = 80;
  const badgeY = 80;

  ctx.fillStyle = 'rgba(139, 92, 246, 0.25)';
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1.5;
  drawRoundRect(ctx, badgeX, badgeY, badgeW, badgeH, 12, true, true);

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeText, badgeX + badgeW / 2, badgeY + badgeH / 2 + 1);
  ctx.restore();

  // 6. Brand / Product Tag at top right
  ctx.save();
  ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.textAlign = 'right';
  ctx.fillText(productName.toUpperCase(), width - 80, 110);
  ctx.restore();

  // 7. Poster Headline
  ctx.save();
  const headline = config.headline || productName;
  const headlineFontSize = isTall ? 68 : 58;
  ctx.font = `900 ${headlineFontSize}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';

  const headlineLines = wrapText(ctx, headline, width - 160, 3);
  let currentY = isTall ? 190 : 160;

  for (const line of headlineLines) {
    ctx.fillText(line, 80, currentY);
    currentY += headlineFontSize * 1.1;
  }
  ctx.restore();

  // 8. Subheadline / Core Hook
  ctx.save();
  const subheadline = config.subheadline || description;
  const subFontSize = isTall ? 28 : 24;
  ctx.font = `600 ${subFontSize}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.textAlign = 'left';

  const subLines = wrapText(ctx, subheadline, width - 160, isTall ? 3 : 2);
  currentY += 10;
  for (const line of subLines) {
    ctx.fillText(line, 80, currentY);
    currentY += subFontSize * 1.35;
  }
  ctx.restore();

  // 9. Bottom Control Card: Price & Rating / Assurance
  const bottomCardY = height - (isTall ? 340 : 250);
  const bottomCardW = width - 160;
  const bottomCardH = isTall ? 140 : 100;

  ctx.save();
  ctx.fillStyle = 'rgba(15, 20, 36, 0.75)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1.5;
  drawRoundRect(ctx, 80, bottomCardY, bottomCardW, bottomCardH, 20, true, true);

  // Price & Guarantee
  ctx.font = '800 42px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#10B981';
  ctx.fillText(config.priceTag || 'SPECIAL OFFER', 115, bottomCardY + (isTall ? 60 : 55));

  ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('★ Verified Quality • Direct Express Delivery', 115, bottomCardY + (isTall ? 105 : 85));
  ctx.restore();

  // 10. Call To Action Button (Bottom)
  ctx.save();
  const ctaText = (config.callToAction || 'SHOP NOW').toUpperCase();
  const ctaBtnY = height - 160;
  const ctaBtnW = width - 160;
  const ctaBtnH = 80;

  const btnGrad = ctx.createLinearGradient(80, ctaBtnY, 80 + ctaBtnW, ctaBtnY);
  btnGrad.addColorStop(0, accent);
  btnGrad.addColorStop(1, '#4F46E5');

  ctx.shadowColor = accent;
  ctx.shadowBlur = 25;
  ctx.fillStyle = btnGrad;
  drawRoundRect(ctx, 80, ctaBtnY, ctaBtnW, ctaBtnH, 20, true, false);

  ctx.shadowBlur = 0;
  ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(ctaText + '  →', 80 + ctaBtnW / 2, ctaBtnY + ctaBtnH / 2);
  ctx.restore();
}

// Export canvas as downloadable PNG
export function exportCanvasAsPng(canvas: HTMLCanvasElement, filename: string = 'adgenius-poster.png') {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 'image/png');
}
