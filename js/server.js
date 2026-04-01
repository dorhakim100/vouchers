import express from 'express';
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { vouchers } from './vouchers.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;


app.use(express.static(join(__dirname, '..')));

app.get('/vouchers', (req, res) => {
  res.sendFile(join(__dirname, '..', 'preview.html'));
});

app.get('/generate-snapshots', async (req, res) => {
  try {
    await generateSnapshots();
    res.send('Snapshots generated successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating snapshots');
  }
});

generateSnapshots()

async function generateSnapshots() {
  console.log('Generating snapshots...');
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1400, height: 2000 },
    deviceScaleFactor: 2, // sharper PNG
  });

  await page.goto('http://127.0.0.1:5500/preview.html', {
    waitUntil: 'networkidle',
  });

  // optional but useful when custom fonts/images exist
  await page.waitForLoadState('networkidle');

  const elements = await page.locator('.voucher-container').all();

  var unknownCounter = 1;
  for (let i = 0; i < elements.length; i++) {
    const voucher = vouchers[i];
    const name = voucher.fullName !== ' ' ? voucher.fullName : unknownCounter++;
    await elements[i].screenshot({
      path: `output/${name}-${voucher.serialNumber}.png`,
    });
  }

  await browser.close();
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

