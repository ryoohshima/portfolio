import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// OG画像のサイズ
const WIDTH = 1200;
const HEIGHT = 630;

// 背景色（slate-950に近い色）
const BG_COLOR = '#0f172a';

// SVGファイルを読み込み
const svgPath = join(__dirname, '../src/assets/images/profile_white.svg');
const svgContent = readFileSync(svgPath, 'utf-8');

// アイコンサイズ（中央に配置）
const ICON_SIZE = 300;

// SVGを中央配置した新しいSVGを作成
const ogSvg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${BG_COLOR}"/>
  <g transform="translate(${(WIDTH - ICON_SIZE) / 2}, ${(HEIGHT - ICON_SIZE) / 2}) scale(${ICON_SIZE / 512})">
    ${svgContent.replace(/<svg[^>]*>/, '').replace('</svg>', '')}
  </g>
</svg>
`;

// PNGに変換して保存
const outputPath = join(__dirname, '../public/og-image.png');

sharp(Buffer.from(ogSvg))
  .png()
  .toFile(outputPath)
  .then(() => {
    console.log(`OG image generated: ${outputPath}`);
  })
  .catch((err) => {
    console.error('Error generating OG image:', err);
  });
