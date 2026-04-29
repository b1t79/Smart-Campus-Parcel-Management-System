import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface ScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

export default function Scanner({ onScan, onClose }: ScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scannerRef.current.render(
      (decodedText) => {
        onScan(decodedText);
        scannerRef.current?.clear();
      },
      (error) => {
        // console.warn(error);
      }
    );

    return () => {
      scannerRef.current?.clear();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col pt-20">
      <div id="reader" className="w-full max-w-md mx-auto" />
      <button 
        onClick={onClose}
        className="mt-8 mx-auto bg-white text-black px-8 py-3 rounded-full font-bold"
      >
        Close Scanner
      </button>
    </div>
  );
}
