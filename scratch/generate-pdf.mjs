import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';

async function run() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([600, 800]);
  page.drawText('Sample PDF document for Crop Tool Testing', {
    x: 50,
    y: 750,
    size: 20,
    color: rgb(0.1, 0.2, 0.8),
  });
  page.drawRectangle({
    x: 100,
    y: 300,
    width: 400,
    height: 300,
    borderColor: rgb(0.8, 0.1, 0.1),
    borderWidth: 2,
  });
  page.drawText('This is a red boundary box inside the page.', {
    x: 120,
    y: 450,
    size: 14,
    color: rgb(0, 0, 0),
  });
  
  const pdfBytes = await doc.save();
  fs.writeFileSync('public/sample.pdf', pdfBytes);
  console.log('Successfully generated public/sample.pdf');
}

run().catch(console.error);
