// Rich SEO content database for all tools
// Designed to target long-tail, low-competition keywords (especially India-specific use cases)

export const TOOL_SEO_CONTENT = {
  // === PHASE 1 TOOLS ===
  'passport-photo-maker': {
    title: 'Online Passport Photo Maker — Free India & Global Presets',
    subtitle: 'Create perfectly sized passport, visa, and ID photos in your browser. 100% free, private, and instant.',
    introduction: 'Getting the right photo size for official documents can be incredibly frustrating. Government portals and embassy guidelines are extremely strict, and uploading the wrong dimensions, file size, or background color can lead to immediate rejection of your application. Our free Online Passport Photo Maker makes this process simple. It runs entirely in your browser, meaning your personal photos are processed 100% privately and never uploaded to any server. You can generate, crop, and download print-ready passport or visa photos in seconds.',
    sections: [
      {
        heading: 'Indian Passport & Document Photo Specifications',
        content: `If you are applying for an Indian Passport, Visa, OCI Card, Aadhaar Card, or PAN Card, you must adhere to the official guidelines set by the Government of India:
        
• **Indian Passport Photo Size**: The official size is **2x2 inches (51x51 mm)**. The face must cover 70% to 80% of the photo area.
• **Aadhaar Card Photo**: While your photo is captured live at the enrollment center, any updates or online self-service forms require a passport-sized photo with a white background.
• **PAN Card Photo**: Requires two passport-size photographs of **3.5x2.5 cm (35x25 mm)**.
• **Background Color**: Must be **solid white** or very light off-white. Dark, patterned, or colorful backgrounds will be rejected.
• **Expression & Lighting**: Look directly at the camera with a neutral expression. Ensure there are no shadows on your face or in the background.`
      },
      {
        heading: 'How to Create Your Passport Photo Online',
        content: `Follow these simple steps to make your passport photo:

1. **Take a Photo**: Stand 3–4 feet away from a plain white or light-colored wall. Ensure good, even lighting from the front to avoid shadows.
2. **Upload**: Click the upload button above to select your photo.
3. **Select Country Preset**: Choose "India - Passport (2x2 in)" or your specific country preset from the dropdown list.
4. **Adjust & Align**: Use the interactive zoom and position sliders to align your face within the guided circular overlay.
5. **Download**: Click "Generate Passport Photo" and download your high-resolution, cropped image instantly.`
      }
    ],
    faqs: [
      {
        q: 'What is the official passport photo size for India?',
        a: 'The official size for Indian passport and visa applications is 2x2 inches (51x51 mm) with a white background.'
      },
      {
        q: 'Can I use a phone selfie for my passport photo?',
        a: 'Yes, as long as it is taken from the front, has good lighting, a solid white background, and your shoulders are visible. Selfies taken at an angle or with filters will be rejected.'
      },
      {
        q: 'What background color is required for Indian passport photos?',
        a: 'A solid, plain white background is strictly required. Off-white or light grey is sometimes accepted, but white is the safest option to avoid rejection.'
      },
      {
        q: 'Is my photo uploaded to a server?',
        a: 'No. ImageFlow is a client-side tool. Your image is processed entirely within your web browser. No data is sent to our servers, ensuring absolute privacy.'
      }
    ]
  },

  'compress-image': {
    title: 'Compress Photo to 20KB, 50KB, 100KB for Govt & Exam Forms',
    subtitle: 'Reduce image file size in KB instantly without losing quality. Perfect for SSC, UPSC, IBPS, and state board applications.',
    introduction: 'Most Indian government job portals, university admissions, and competitive exam websites (like SSC, UPSC, NTA, Railway, and Banking exams) require you to upload your photograph and signature within extremely strict file size limits. Typically, your photograph must be between **20KB and 50KB**, while your signature must be between **10KB and 20KB**. Uploading a larger file is impossible due to portal restrictions, while compressing too much can make the image blurry and cause your application to be rejected. Our browser-native image compressor solves this by giving you precise control over quality and size.',
    sections: [
      {
        heading: 'Typical Photo & Signature Size Limits for Indian Portals',
        content: `Here is a quick reference guide for popular Indian recruitment and admission portals:

• **SSC (Staff Selection Commission)**: Photograph must be **20KB to 50KB** (JPEG/JPG), and Signature must be **10KB to 20KB**.
• **UPSC (Union Public Service Commission)**: Both photo and signature must be between **20KB and 300KB** each.
• **IBPS / Banking Exams**: Photograph: **20KB to 50KB**, Signature: **10KB to 20KB**.
• **NTA / NEET / JEE**: Photograph: **10KB to 200KB**, Signature: **4KB to 30KB**.
• **Passport Seva Portal**: Photo and signature must be under **100KB** each.`
      },
      {
        heading: 'How to Compress an Image to a Specific KB Size',
        content: `To shrink your photo or signature to the exact size required:

1. **Upload**: Drag and drop your JPEG or PNG file into the uploader above.
2. **Adjust Quality**: Use the quality slider. For a 50KB target, start around **70%–80%** quality. For a 20KB signature, you may need to drop the quality to **50%–60%** or resize the dimensions.
3. **Format**: Select **JPEG** as the output format, as almost all government portals only accept \`.jpg\` or \`.jpeg\` extensions.
4. **Compress & Download**: Click "Compress" and check the resulting file size shown in the preview. If it is still too large, slide the quality down slightly and compress again. Once it falls within the required range, download it.`
      }
    ],
    faqs: [
      {
        q: 'How do I compress a photo to exactly 20KB or 50KB?',
        a: 'Upload your photo, set the output format to JPEG, and adjust the quality slider down (usually to 70-80% for 50KB, or 50-60% for 20KB). You can also use our Resize tool first if the original image has extremely large dimensions.'
      },
      {
        q: 'Why does the portal say my signature is invalid?',
        a: 'Portals reject signatures if they exceed the file size limit (often 20KB), if the dimensions are incorrect, or if the signature is blurry. Make sure you crop the signature closely and compress it to around 15KB with high contrast.'
      },
      {
        q: 'Will compressing my photo make it blurry?',
        a: 'Our compressor uses advanced canvas-based resampling. Even at 60% quality, the text and face remain highly legible and sharp, ensuring it easily passes portal validation.'
      }
    ]
  },

  'heic-converter': {
    title: 'Convert HEIC to JPG Online Free — 100% Private & Offline',
    subtitle: 'Convert iPhone HEIC photos to standard JPG/JPEG format instantly in your browser. No uploads, no limits.',
    introduction: 'If you use an iPhone, your photos are saved in the **HEIC (High Efficiency Image Container)** format by default. While HEIC is excellent for saving space on your phone, it is not widely supported on the web. Most Indian government websites, school portals, job applications, and online forms will reject \`.heic\` files, showing "Unsupported File Format" errors. Our HEIC Converter lets you convert these photos to standard, universally accepted JPEGs instantly, without uploading your private images to any external server.',
    sections: [
      {
        heading: 'Why Do Web Portals Reject HEIC Files?',
        content: `HEIC is a relatively new image format introduced by Apple. While it offers superior compression compared to JPEG, many older web servers and legacy database systems used by schools, universities, and government agencies (such as SSC, UPSC, and state portals) do not have the software required to process or display HEIC images. Converting your files to JPG or PNG is the only way to ensure your uploads are successful.`
      },
      {
        heading: 'How to Convert HEIC to JPG on Windows or Android',
        content: `You do not need to buy expensive software or upload your files to untrusted websites. Simply use our free tool:

1. **Select Files**: Click "Choose Files" and select one or more \`.heic\` or \`.heif\` images from your device.
2. **Convert**: The converter runs locally in your browser using JavaScript. Your files are converted immediately.
3. **Download**: Click "Download" to save the converted \`.jpg\` file to your device, ready for any online submission.`
      }
    ],
    faqs: [
      {
        q: 'Will converting HEIC to JPG reduce my photo quality?',
        a: 'No. Our converter maintains the original resolution and visual clarity of your iPhone photos, simply repackaging them into the standard JPEG format.'
      },
      {
        q: 'Can I convert multiple HEIC photos at once?',
        a: 'Yes! Our tool supports batch conversion. You can upload multiple HEIC files and download them all in a single click.'
      },
      {
        q: 'Is it safe to convert private photos here?',
        a: 'Absolutely. Unlike other online converters, all processing is done locally inside your web browser. Your private photos never leave your computer or phone.'
      }
    ]
  },

  'resize-image': {
    title: 'WhatsApp DP Size Resizer — Get the Perfect Profile Picture',
    subtitle: 'Resize any image to fit WhatsApp DP without cropping. Free, instant, and secure.',
    introduction: 'Have you ever tried to set a beautiful photo as your WhatsApp profile picture (DP), only to find that WhatsApp forces you to crop out the sides or top? WhatsApp profile pictures are strictly square. If you upload a portrait or landscape photo, it will not fit unless you resize it first. Our WhatsApp DP Resizer lets you easily resize or fit any photo into a perfect square, adding custom background colors or blur effects so you can show the entire picture without cropping.',
    sections: [
      {
        heading: 'What is the Best Size for WhatsApp DP?',
        content: `To ensure your profile picture looks crisp and does not get blurry, you should use the following dimensions:

• **Recommended Size**: **640x640 pixels** or higher (e.g., **1080x1080 pixels** for HD quality).
• **Aspect Ratio**: Must be a perfect **1:1 (Square)**.
• **File Format**: JPEG or PNG are highly recommended.`
      },
      {
        heading: 'How to Resize a Photo for WhatsApp DP Without Cropping',
        content: `Follow these steps to make your full photo fit:

1. **Upload**: Select the photo you want to use for your profile.
2. **Select Preset**: Choose the **WhatsApp DP (1:1)** preset from our social media dimensions dropdown.
3. **Adjust Fit**: Choose whether to stretch, crop, or fit with borders. Choosing "Fit with borders" will place your full image inside a square and let you choose a matching background color.
4. **Resize & Download**: Click "Resize" and download your new square profile picture.`
      }
    ],
    faqs: [
      {
        q: 'How do I put a full picture on WhatsApp DP without cropping?',
        a: 'Upload your image to our Resizer, select the "1:1 Square" aspect ratio, and choose "Fit" instead of "Crop". This adds borders to the sides of your landscape or portrait photo, making it a perfect square so the entire image is visible.'
      },
      {
        q: 'What is the pixel size of a WhatsApp profile picture?',
        a: 'The minimum recommended size is 192x192 pixels, but for high-resolution displays, it is best to use 640x640 pixels or 1080x1080 pixels.'
      }
    ]
  },

  'compress-pdf': {
    title: 'Compress PDF Online Free — Reduce Size for Email & Portals',
    subtitle: 'Shrink large PDF files to under 25MB for Gmail, Outlook, and official portal uploads.',
    introduction: 'PDF files containing scanned documents, certificates, and images can easily grow to 50MB or more. However, most email clients and official submission portals have strict file size limits. For example, **Gmail and Outlook have a 25MB attachment limit**, and government portals often require PDFs to be under **2MB or 5MB**. Our PDF Compressor runs entirely in your browser, shrinking your files using smart optimization without making the text blurry or unreadable.',
    sections: [
      {
        heading: 'Official PDF Upload Limits for Common Portals',
        content: `Before sending or uploading your documents, check these common limits:

• **Gmail / Outlook**: Maximum attachment size is **25MB**. Anything larger is uploaded to Google Drive/OneDrive as a link instead of a file.
• **Income Tax Portal (India)**: Most PDF uploads must be under **5MB**.
• **EPFO Portal**: Document uploads are usually restricted to **2MB** or less.
• **Visa & Immigration Portals**: Often restrict document uploads to **2MB** per PDF.`
      },
      {
        heading: 'How to Compress a PDF to Fit Email Limits',
        content: `To reduce your PDF file size:

1. **Upload**: Select the PDF file from your device.
2. **Set Compression**: Choose a compression level. "Recommended Compression" offers the best balance of size reduction and legibility.
3. **Process**: Click "Compress PDF". The tool will optimize fonts, compress images, and remove unused metadata.
4. **Download**: Preview the new file size and download your compressed PDF.`
      }
    ],
    faqs: [
      {
        q: 'Will compressing my PDF make the text unreadable?',
        a: 'No. Our tool uses vector-safe compression which keeps text sharp and readable, only compressing embedded images and removing unnecessary file overhead.'
      },
      {
        q: 'How do I send a PDF larger than 25MB via Gmail?',
        a: 'You can compress it using our tool to bring it under the 25MB limit so it can be attached directly as a file. If it remains larger, you can split the PDF or send it as a cloud link.'
      },
      {
        q: 'Is my confidential PDF document safe?',
        a: 'Yes. The compression is performed entirely on your device using client-side WebAssembly. Your document is never uploaded to any server, making it 100% secure.'
      }
    ]
  },

  // === PHASE 2 HIGH-PRIORITY TOOLS ===
  'merge-pdf': {
    title: 'Merge PDF Online Free — Combine PDF Files in Seconds',
    subtitle: 'Combine two or more PDF documents into one single file. No signup, no limits, 100% secure.',
    introduction: 'Whether you are submitting university assignments, compiling monthly business invoices, or organizing tax documents, keeping your PDFs together is essential. Our free Online PDF Merger runs entirely inside your browser. Your private documents are never uploaded to any external server, ensuring complete confidentiality and rapid processing speeds.',
    sections: [
      {
        heading: 'Common Use Cases for Merging PDFs',
        content: `• **Job Applications**: Combine your resume, cover letter, and certificates into a single PDF.
• **Academic Submissions**: Merge multiple chapters or assignment sheets into one file.
• **Financial Records**: Group all monthly receipts, invoices, or statements together for your accountant.`
      },
      {
        heading: 'How to Merge PDF Files in 4 Steps',
        content: `1. **Upload**: Click "Choose Files" or drag-and-drop your PDFs into the tool.
2. **Reorder**: Drag the file cards to arrange them in the correct sequence.
3. **Merge**: Click the "Merge PDFs" button. The tool merges them locally.
4. **Download**: Save your combined PDF instantly.`
      }
    ],
    faqs: [
      {
        q: 'Is there a limit to the number of PDFs I can merge?',
        a: 'No. You can combine as many PDF files as your browser memory can handle.'
      },
      {
        q: 'Does merging PDFs reduce the quality?',
        a: 'No, our tool preserves the exact page layout, vector text, fonts, and image resolutions of the original documents.'
      }
    ]
  },

  'split-pdf': {
    title: 'Split PDF Online Free — Extract Pages from PDF',
    subtitle: 'Extract specific pages or page ranges from any PDF document. Fast, safe, and private.',
    introduction: 'Need to share only a few pages of a massive report or extract a single certificate from a multi-page document? Our Split PDF tool lets you slice any PDF document in seconds. It runs completely client-side, so your sensitive documents never leave your device.',
    sections: [
      {
        heading: 'Flexible Page Extraction Modes',
        content: `• **Specific Pages**: Extract individual pages by listing them (e.g., 2, 5, 9).
• **Page Ranges**: Extract a continuous block of pages (e.g., 1-5 or 10-15).
• **Custom Combinations**: Combine both ranges and individual pages (e.g., 1, 3-5, 8).`
      }
    ],
    faqs: [
      {
        q: 'How do I split a PDF online?',
        a: 'Upload your PDF, enter the page numbers or ranges you want to extract (e.g., 1-3, 5), click "Extract Pages", and download the new PDF containing only those pages.'
      }
    ]
  },

  'image-upscaler': {
    title: 'AI Image Upscaler Online Free — Increase Image Resolution',
    subtitle: 'Upscale your photos 2x or 4x in your browser. Enhance details and improve clarity instantly.',
    introduction: 'Low-resolution images look blurry on modern high-definition screens and print poorly. Our free online image upscaler uses advanced client-side interpolation algorithms to increase the pixel dimensions of your images while maintaining clean edges and minimizing pixelation.',
    sections: [
      {
        heading: 'Why Use an Image Upscaler?',
        content: `• **Print Preparation**: Boost image resolutions to meet the 300 DPI standard for printing.
• **Social Media**: Enhance low-quality downloads from WhatsApp or Facebook to make them look sharp.
• **E-commerce**: Make product photos look crisp and professional for your online store.`
      }
    ],
    faqs: [
      {
        q: 'Does this upscaler use AI?',
        a: 'It uses advanced mathematical scaling filters (like Lanczos and bicubic interpolation) processed locally in your browser to sharpen edges and increase resolution without sending your data to external servers.'
      }
    ]
  },

  'remove-background': {
    title: 'Remove Background from Image Free — Instant PNG Cutouts',
    subtitle: 'Remove solid or plain backgrounds from your photos. Perfect for product images and profile pictures.',
    introduction: 'Creating clean product cutouts or professional headshots usually requires complex photo editing software. Our free Background Remover allows you to strip solid backgrounds in one click, generating transparent PNGs directly in your browser.',
    sections: [
      {
        heading: 'How to Get the Best Background Removal Results',
        content: `• **High Contrast**: Ensure the subject is a different color than the background.
• **Plain Backgrounds**: Works best on studio backdrops, white backgrounds, or solid walls.
• **Adjust Tolerance**: Use the tolerance slider to clean up any leftover pixels around the edges.`
      }
    ],
    faqs: [
      {
        q: 'Can I remove complex backgrounds?',
        a: 'Our tool is optimized for solid or high-contrast backgrounds. For busy backgrounds, a manual brush or AI segmentation is recommended.'
      }
    ]
  },

  'thumbnail-creator': {
    title: 'Free YouTube Thumbnail Maker Online — No Signup Required',
    subtitle: 'Design eye-catching YouTube thumbnails with templates, text, overlays, and custom borders.',
    introduction: 'A great YouTube thumbnail is the single most important factor for improving your Click-Through Rate (CTR) and growing your channel. Our free Thumbnail Creator gives you all the tools you need to design professional thumbnails in seconds. Add text, borders, overlays, and templates entirely in your browser.',
    sections: [
      {
        heading: 'YouTube Thumbnail Size & Guidelines',
        content: `To ensure your thumbnails look professional and don't get cropped:
• **Ideal Dimensions**: **1280x720 pixels** (16:9 aspect ratio).
• **File Size Limit**: Under **2MB**.
• **Formats**: JPEG, PNG, or WebP.`
      }
    ],
    faqs: [
      {
        q: 'Is this thumbnail maker free?',
        a: 'Yes, it is 100% free with no watermarks and no registration required.'
      }
    ]
  },

  // === GENERAL FALLBACKS FOR REMAINING TOOLS ===
  // To ensure every tool has structured SEO text + FAQs + valid schemas
  'bulk-compress': {
    title: 'Bulk Image Compressor — Compress Multiple Images at Once',
    subtitle: 'Upload and compress dozens of images simultaneously. Download all as a single ZIP file.',
    introduction: 'Manually compressing images one-by-one is tedious. Our Bulk Image Compressor lets you upload multiple JPEGs, PNGs, or WebPs and compress them in a single batch, saving time and storage.',
    sections: [{ heading: 'How to Batch Compress', content: 'Upload your files, set the target quality, click compress, and download the resulting ZIP archive.' }],
    faqs: [{ q: 'Is there a file count limit?', a: 'No, but compressing more than 50 images at once may slow down older devices.' }]
  },

  'batch-resize': {
    title: 'Batch Image Resizer — Resize Multiple Images Online',
    subtitle: 'Resize a batch of photos to the same dimensions instantly. Perfect for web galleries.',
    introduction: 'Ensure all your images have consistent dimensions. Our Batch Resizer lets you set a uniform width or height and process all your images at once.',
    sections: [{ heading: 'Batch Resizing Guide', content: 'Select your files, enter the target width/height or percentage, and download them as a ZIP.' }],
    faqs: [{ q: 'Does it preserve aspect ratio?', a: 'Yes, you can lock the aspect ratio to prevent stretching.' }]
  },

  'bulk-format-convert': {
    title: 'Bulk Image Converter — Batch Convert Formats Online',
    subtitle: 'Convert multiple images to WebP, JPG, or PNG in one click. Free and private.',
    introduction: 'Batch convert your images to modern web-friendly formats like WebP or standard formats like JPEG and PNG in seconds.',
    sections: [{ heading: 'How to Batch Convert', content: 'Select your images, choose your target format, convert, and download the ZIP.' }],
    faqs: [{ q: 'Can I convert PNG to WebP in bulk?', a: 'Yes, WebP is highly recommended for faster website speeds.' }]
  },

  'collage-maker': {
    title: 'Online Collage Maker — Combine Photos into Grid Layouts',
    subtitle: 'Create beautiful photo collages with customizable grids, borders, and spacings.',
    introduction: 'Arrange your favorite photos into a single grid. Perfect for social media, travel memories, or product showcases.',
    sections: [{ heading: 'How to Create a Collage', content: 'Select your layout grid, upload your photos into each slot, adjust borders, and download.' }],
    faqs: [{ q: 'Can I customize the border color?', a: 'Yes, you can adjust border thickness, roundness, and color.' }]
  },

  'merge-images': {
    title: 'Merge Images Online — Combine Photos Side-by-Side',
    subtitle: 'Stitch multiple images together horizontally or vertically into a single photo.',
    introduction: 'Merge two or more photos side-by-side or stacked vertically. Great for comparison shots, before/after graphics, or panorama stitches.',
    sections: [{ heading: 'Stitching Guide', content: 'Upload your images, choose horizontal or vertical alignment, adjust spacing, and download.' }],
    faqs: [{ q: 'Can I change the order of images?', a: 'Yes, you can reorder the uploaded images before merging.' }]
  },

  'watermark-pdf': {
    title: 'Watermark PDF Online Free — Protect Your PDF Documents',
    subtitle: 'Add text watermarks to your PDF pages. Customize font, size, opacity, and angle.',
    introduction: 'Protect your intellectual property, label drafts, or add branding to your PDF files with customizable text watermarks.',
    sections: [{ heading: 'How to Watermark a PDF', content: 'Upload your PDF, enter the watermark text, adjust the opacity and angle, and download.' }],
    faqs: [{ q: 'Can I apply the watermark to all pages?', a: 'Yes, the watermark is automatically applied to all pages of the document.' }]
  },

  'sign-pdf': {
    title: 'Sign PDF Online Free — Add Digital Signature to PDF',
    subtitle: 'Draw your signature and place it on any page of your PDF document. Secure and offline.',
    introduction: 'Sign contracts, lease agreements, and official forms in seconds. Draw your signature using your mouse, trackpad, or touch screen and place it anywhere on the PDF.',
    sections: [{ heading: 'How to Sign a PDF', content: 'Upload your PDF, draw your signature in the pad, drag it to the correct position, and download.' }],
    faqs: [{ q: 'Is my signature secure?', a: 'Yes, the signing process happens entirely in your browser. We never see or store your signature.' }]
  },

  'crop-pdf': {
    title: 'Crop PDF Online Free — Crop PDF Margins easily',
    subtitle: 'Trim margins or crop specific areas of your PDF pages with an interactive selector.',
    introduction: 'Remove unwanted white borders, headers, or footers from your PDF documents using our visual cropping tool.',
    sections: [{ heading: 'PDF Cropping Guide', content: 'Upload your PDF, drag the crop box over the area you want to keep, and download.' }],
    faqs: [{ q: 'Can I crop all pages at once?', a: 'Yes, you can choose to apply the crop to the current page or all pages.' }]
  },

  'rotate-pdf': {
    title: 'Rotate PDF Online Free — Turn PDF Pages Online',
    subtitle: 'Rotate individual pages or the entire PDF document. Fix upside-down scans instantly.',
    introduction: 'Correct sideways or upside-down scans quickly. Rotate pages by 90, 180, or 270 degrees in a simple visual interface.',
    sections: [{ heading: 'How to Rotate PDF Pages', content: 'Upload your PDF, select the rotation angle, choose whether to apply to all or specific pages, and download.' }],
    faqs: [{ q: 'Can I rotate just one page?', a: 'Yes, you can select and rotate individual pages.' }]
  },

  'rotate-image': {
    title: 'Rotate Image Online Free — Flip & Turn Photos',
    subtitle: 'Rotate images by any angle or flip them horizontally/vertically. Free and fast.',
    introduction: 'Fix photo orientation errors. Rotate your JPG, PNG, or WebP images in seconds.',
    sections: [{ heading: 'How to Rotate Images', content: 'Upload your image, click the rotate buttons or enter a custom angle, and download.' }],
    faqs: [{ q: 'Can I flip the image?', a: 'Yes, you can mirror the image horizontally or vertically.' }]
  },

  'svg-to-png': {
    title: 'SVG to PNG Converter — Rasterize Vector Files Online',
    subtitle: 'Convert SVG vector graphics to high-resolution PNG images with transparency support.',
    introduction: 'SVG files are vectors and can scale infinitely, but they are not supported everywhere. Convert them to PNGs for easy sharing and web use.',
    sections: [{ heading: 'How to Convert SVG to PNG', content: 'Upload your SVG, choose the rendering scale (e.g., 2x or 3x for high-res), and download.' }],
    faqs: [{ q: 'Does it preserve transparent backgrounds?', a: 'Yes, the output PNG will keep the original SVG transparency.' }]
  },

  'webp-converter': {
    title: 'WebP Converter — Convert Images to WebP Online',
    subtitle: 'Convert JPG, PNG, or BMP images to WebP format for faster web performance.',
    introduction: 'WebP is the modern image format for the web. It offers up to 30% smaller file sizes than JPEG with identical visual quality.',
    sections: [{ heading: 'How to Convert to WebP', content: 'Upload your images, adjust the quality slider, and download the optimized WebP files.' }],
    faqs: [{ q: 'Why should I use WebP?', a: 'WebP significantly reduces webpage load times, improving your website\'s SEO and PageSpeed score.' }]
  },

  'webp-to-png': {
    title: 'WebP to PNG Converter — Free Online Tool',
    subtitle: 'Convert WebP images back to standard PNG format with transparency preserved.',
    introduction: 'Need to edit a WebP image in a tool that doesn\'t support it? Convert it back to a lossless PNG in one click.',
    sections: [{ heading: 'How to Convert WebP to PNG', content: 'Upload your WebP file, click convert, and download the PNG instantly.' }],
    faqs: [{ q: 'Is the conversion lossless?', a: 'Yes, converting WebP to PNG is a lossless process.' }]
  },

  'webp-to-jpg': {
    title: 'WebP to JPG Converter — Convert WebP to JPEG',
    subtitle: 'Convert WebP images to universally compatible JPG/JPEG format online.',
    introduction: 'Convert WebP images to JPG to ensure they work on older devices, print services, or portals that do not accept WebP.',
    sections: [{ heading: 'How to Convert WebP to JPG', content: 'Upload your WebP, set the target quality, and download the JPG.' }],
    faqs: [{ q: 'Will the file size change?', a: 'Yes, the JPG file may be slightly larger than the WebP because WebP has superior compression.' }]
  },

  'jpg-to-png': {
    title: 'JPG to PNG Converter — Free Online, No Signup',
    subtitle: 'Convert JPG/JPEG images to PNG format instantly. Supports transparency.',
    introduction: 'Convert JPEG images to PNG format. PNG is lossless and supports transparency, making it ideal for logos and digital designs.',
    sections: [{ heading: 'How to Convert JPG to PNG', content: 'Upload your JPG file, click convert, and download the PNG.' }],
    faqs: [{ q: 'Can I make the background transparent?', a: 'Yes, once converted to PNG, you can use our background remover to make it transparent.' }]
  },

  'png-to-jpg': {
    title: 'PNG to JPG Converter — Free Online Tool',
    subtitle: 'Convert PNG images to JPEG format with custom quality control.',
    introduction: 'Convert PNG images to JPG to reduce file size. PNG is often too heavy for photos; converting to JPG makes them easier to share.',
    sections: [{ heading: 'How to Convert PNG to JPG', content: 'Upload your PNG, adjust the quality and background color (since JPG doesn\'t support transparency), and download.' }],
    faqs: [{ q: 'What happens to transparent areas?', a: 'Since JPG doesn\'t support transparency, any transparent areas will be filled with a solid color (default is white).' }]
  },

  'convert-format': {
    title: 'Convert Image Format — Online Image Converter',
    subtitle: 'Convert between JPEG, PNG, WebP, BMP, and other image formats in seconds.',
    introduction: 'A universal image converter. Change your image formats quickly without installing any software.',
    sections: [{ heading: 'How to Convert Formats', content: 'Upload your image, select the target format from the list, and download.' }],
    faqs: [{ q: 'What formats are supported?', a: 'We support JPEG, PNG, WebP, BMP, and SVG.' }]
  },

  'metadata-remover': {
    title: 'Metadata Remover — Strip EXIF & GPS Data from Photos',
    subtitle: 'Remove camera model, GPS coordinates, exposure details, and other metadata from your images.',
    introduction: 'Protect your privacy online. When you take a photo, your phone embeds hidden metadata (EXIF) including your exact GPS location. Use this tool to strip it clean before sharing.',
    sections: [{ heading: 'Why Remove Metadata?', content: 'EXIF data can expose where and when a photo was taken. Stripping it protects your privacy and slightly reduces file size.' }],
    faqs: [{ q: 'Is my photo safe?', a: 'Yes, the metadata stripping is done entirely in your browser. No files are uploaded.' }]
  },

  'photo-editor': {
    title: 'Free Online Photo Editor — Edit Photos in Your Browser',
    subtitle: 'Crop, resize, rotate, compress, and apply filters to your photos. No download required.',
    introduction: 'A complete, browser-based photo editor. Perform all basic photo editing tasks in a clean, fast interface.',
    sections: [{ heading: 'How to Edit Your Photos', content: 'Upload your photo, select any of the editing options from the menu, apply changes, and download.' }],
    faqs: [{ q: 'Is it free?', a: 'Yes, completely free with no watermarks.' }]
  },

  'image-to-pdf': {
    title: 'Image to PDF Converter — Convert JPG/PNG to PDF',
    subtitle: 'Combine one or more images into a single PDF document. Free and secure.',
    introduction: 'Convert your photos, scans, or receipts into a clean PDF document. You can combine multiple files into a single PDF page-by-page.',
    sections: [{ heading: 'How to Convert Images to PDF', content: 'Upload your images, drag to reorder the pages, set the page layout (A4/Letter), and download.' }],
    faqs: [{ q: 'Can I combine multiple formats?', a: 'Yes, you can upload JPEGs, PNGs, and WebPs together in one PDF.' }]
  }
};
