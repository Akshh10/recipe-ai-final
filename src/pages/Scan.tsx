'use client';

import { useRef, useState, useEffect } from 'react';
import { ArrowLeft, Image, Zap } from 'lucide-react';
import Tesseract from 'tesseract.js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useScan } from '@/context/ScanContext';

export default function Scan() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [detectedText, setDetectedText] = useState('');
  const [loading, setLoading] = useState(false);
  const { setScannedIngredients } = useScan();

  const navigate = useNavigate();

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera', error);
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL('image/png');
    handleScan(imageDataUrl);
  };

  const handleScan = async (dataUrl: string) => {
    setLoading(true);
    try {
      const result = await Tesseract.recognize(dataUrl, 'eng');
      let scannedText = result.data.text;

      console.log('Raw scanned text:', scannedText);

      scannedText = scannedText
        .replace(/[^a-zA-Z\s]/g, '')
        .replace(/\s+/g, ' ')
        .toLowerCase()
        .trim();

      console.log('Cleaned scanned text:', scannedText);

      const words = scannedText.split(' ');

      const { data: validIngredientsData } = await supabase
        .from('ingredients')
        .select('name');

      const validIngredients = validIngredientsData?.map((i) => i.name.toLowerCase()) || [];
      const detectedIngredients = words.filter((word) => validIngredients.includes(word));

      console.log('Detected Ingredients:', detectedIngredients);
      setScannedIngredients(detectedIngredients);
      setDetectedText(detectedIngredients.join(', '));

      await fetchRecipes(detectedIngredients);
    } catch (error) {
      console.error('OCR Error:', error);
    } finally {
      setLoading(false);
    }
  };
  {detectedText && (
    <div className="absolute top-24 left-5 right-5 bg-white text-black p-4 rounded-lg z-50 shadow-md">
      <h2 className="font-semibold text-lg mb-2">Matched Ingredients:</h2>
      <p>{detectedText || 'No valid ingredients found 😓'}</p>
    </div>
  )}
  

  const fetchRecipes = async (ingredientsArray: string[]) => {
    const { data: recipeResults, error } = await supabase
      .from('recipes')
      .select('*')
      .ilike('ingredients', `%${ingredientsArray.join('%')}%`);

    if (error) {
      console.error('Failed to fetch recipes', error);
    } else {
      console.log('Recipes matched:', recipeResults);
    }
  };

  const handleGalleryImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        handleScan(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleFlash = () => {
    alert('Flash not supported in browser.');
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="absolute top-8 w-full flex justify-center">
        <p className="text-white text-lg font-semibold bg-black/40 px-4 py-2 rounded-full">
          Snap a picture of your food
        </p>
      </div>

      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => navigate('/')}
          className="bg-black/50 backdrop-blur-sm rounded-full p-2"
        >
          <ArrowLeft className="text-white h-6 w-6" />
        </button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-md" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-md" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-md" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-md" />
        </div>
      </div>

      <div className="absolute bottom-8 w-full flex items-center justify-between px-8">
        <button onClick={toggleFlash} className="bg-white/30 backdrop-blur-sm rounded-full p-3">
          <Zap className="text-white h-6 w-6" />
        </button>

        <button
          onClick={captureImage}
          className="bg-white rounded-full p-5 shadow-lg border-2 border-gray-300"
        >
          <div className="bg-white rounded-full h-8 w-8" />
        </button>

        <button
          onClick={() => galleryInputRef.current?.click()}
          className="bg-white/30 backdrop-blur-sm rounded-full p-3"
        >
          <Image className="text-white h-6 w-6" />
        </button>
      </div>

      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleGalleryImage}
        className="hidden"
      />

      <canvas ref={canvasRef} className="hidden"></canvas>

      {detectedText && (
        <div className="absolute top-5 left-5 right-5 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">Detected Ingredients:</h2>
          <p className="text-gray-800">{detectedText}</p>
        </div>
      )}

      {loading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
          <p className="text-white">Scanning...</p>
        </div>
      )}
    </div>
  );
}
