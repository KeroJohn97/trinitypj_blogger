import jsQR from "jsqr";
import QRCode from "qrcode";

/**
 * Scans a QR code from a given image URL.
 * @param url The public URL of the image to scan.
 * @returns The decoded string content of the QR code, or null if scanning fails.
 */
export async function scanQRCodeFromUrl(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    // ESSENTIAL: Allow CORS to read pixels via Canvas
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        if (!context) {
          console.error("[QR_UTILS] Failed to get 2D context");
          return resolve(null);
        }

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          console.log("[QR_UTILS] Successfully scanned QR code:", code.data);
          resolve(code.data);
        } else {
          console.warn("[QR_UTILS] No QR code detected in image.");
          resolve(null);
        }
      } catch (err) {
        console.error("[QR_UTILS] Error during scan processing:", err);
        resolve(null);
      }
    };

    img.onerror = (err) => {
      console.error("[QR_UTILS] Failed to load image for scanning:", err);
      resolve(null);
    };

    img.src = url;
  });
}

/**
 * Generates a QR code Data URL from a given string.
 * @param text The string to encode.
 * @returns A Promise resolving to the Data URL string.
 */
export async function generateQRCode(text: string): Promise<string> {
  try {
    // Generate with custom branding (Deep Emerald)
    return await QRCode.toDataURL(text, {
      margin: 2,
      scale: 10,
      color: {
        dark: "#064e3b", // emerald-900 
        light: "#ffffff"
      }
    });
  } catch (err) {
    console.error("[QR_UTILS] Failed to generate QR code:", err);
    throw err;
  }
}
