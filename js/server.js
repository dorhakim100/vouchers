import express from 'express';
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

const vouchers = [
  { serialNumber: "24062574", fullName: "אורי קסטיאל" },
  { serialNumber: "51822977", fullName: "מירב כץ" },
  { serialNumber: "55892925", fullName: "גאורגי מקוקישווילי" },
  { serialNumber: "36262045", fullName: "הילה דפני" },
  { serialNumber: "91267367", fullName: "אלי הרוש" },
  { serialNumber: "85424300", fullName: "כרמל פוליאק" },
  { serialNumber: "83991842", fullName: "לולי אמירי" },
  { serialNumber: "50906442", fullName: "אדווה ברעם" },
  { serialNumber: "71023356", fullName: "אלה-יה איסמלון" },
  { serialNumber: "11174006", fullName: "גליה אור ליאוז" },
  { serialNumber: "51744146", fullName: "מירב דפני" },
  { serialNumber: "34994370", fullName: "משה זיסקינד" },
  { serialNumber: "94574914", fullName: "נעמי רמון" },
  { serialNumber: "74276854", fullName: "סמדר דינור" },
  { serialNumber: "87921190", fullName: "תמי אריאלי" }
];

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

  for (let i = 0; i < elements.length; i++) {
    const voucher = vouchers[i];
    await elements[i].screenshot({
      path: `output/${voucher.fullName}-${voucher.serialNumber}.png`,
    });
  }

  await browser.close();
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

