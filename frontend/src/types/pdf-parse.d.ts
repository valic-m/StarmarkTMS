// src/types/pdf-parse.d.ts
declare module 'pdf-parse' {
  interface PDFParseResult {
    numpages: number;
    numrender: number;
    info: {
      [key: string]: any; // Add specific properties if known
    };
    metadata?: {
      [key: string]: any;
    };
    text: string;
    version: string;
  }

  export default function pdfParse(
    buffer: Buffer | ArrayBuffer | Uint8Array
  ): Promise<PDFParseResult>;
}
