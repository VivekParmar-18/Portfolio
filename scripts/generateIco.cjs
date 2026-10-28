const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

const pngFiles = [
  { size: 16, path: path.join(publicDir, 'favicon-16x16.png') },
  { size: 32, path: path.join(publicDir, 'favicon-32x32.png') },
  { size: 48, path: path.join(publicDir, 'favicon-48x48.png') }
];

const pngBuffers = pngFiles.map(f => ({
  size: f.size,
  data: fs.readFileSync(f.path)
}));

// ICONDIR: 6 bytes
// 2 bytes reserved (0)
// 2 bytes type (1 = ICO)
// 2 bytes count (pngBuffers.length)
const count = pngBuffers.length;
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(count, 4);

let offset = 6 + (16 * count);
const entries = [];

for (const img of pngBuffers) {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(img.size, 0); // width
  entry.writeUInt8(img.size, 1); // height
  entry.writeUInt8(0, 2); // color count
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bpp
  entry.writeUInt32LE(img.data.length, 8); // size in bytes
  entry.writeUInt32LE(offset, 12); // file offset
  entries.push(entry);
  offset += img.data.length;
}

const icoBuffer = Buffer.concat([
  header,
  ...entries,
  ...pngBuffers.map(b => b.data)
]);

fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
console.log(`✅ Generated multi-resolution favicon.ico (${icoBuffer.length} bytes, 16x16, 32x32, 48x48)`);

// Clean up temporary 48x48 png if not needed in public root
const f48 = path.join(publicDir, 'favicon-48x48.png');
if (fs.existsSync(f48)) {
  fs.unlinkSync(f48);
}
