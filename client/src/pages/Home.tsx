'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Loader2, ArrowRight, Settings, Key } from 'lucide-react';

/**
 * Stickify Home Page - Lovart Design Style
 * 
 * Design Philosophy:
 * - Minimalist gallery aesthetic with ample whitespace
 * - Grid-based layout with clear visual hierarchy
 * - Mix of serif and sans-serif typography
 * - Black & white color palette with subtle interactions
 * - Smooth animations for state transitions
 */
export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load API Key from localStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('replicate_api_key');
    if (storedKey) setApiKey(storedKey);
  }, []);

  const handleSaveKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('replicate_api_key', key);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!apiKey) {
      setShowSettings(true);
      setError("Please enter your API Key first.");
      return;
    }
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
      setGeneratedImage(null);
      setError(null);
      setLoading(true);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`
          },
          body: formData,
        });

        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Failed to generate');
        
        if (data.result) {
          // Handle both array and string responses
          const resultImage = Array.isArray(data.result) ? data.result[0] : data.result;
          setGeneratedImage(resultImage);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111] font-sans selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full px-8 py-6 flex justify-between items-center bg-[#FAFAFA]/90 backdrop-blur-sm z-40 border-b border-gray-100">
        <div className="flex items-center gap-2">
           <div className="w-3 h-3 bg-black rounded-full" />
           <span className="font-bold tracking-tight text-lg">STICKIFY.</span>
        </div>
        
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${apiKey ? 'bg-gray-100 hover:bg-gray-200' : 'bg-black text-white hover:bg-black/80'}`}
        >
          {apiKey ? <Settings className="w-4 h-4" /> : <Key className="w-4 h-4" />}
          {apiKey ? 'Config' : 'Set API Key'}
        </button>
      </nav>

      {/* Settings Panel (Collapsible) */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed top-[88px] w-full bg-white z-30 border-b border-gray-200 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">Replicate API Token</h3>
                <p className="text-sm text-gray-500">Get your token from <a href="https://replicate.com/account/api-tokens" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">replicate.com</a>. Stored locally in your browser.</p>
              </div>
              <input 
                type="password" 
                placeholder="r8_..." 
                value={apiKey}
                onChange={(e) => handleSaveKey(e.target.value)}
                className="w-full md:w-96 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black font-mono text-sm"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-40 pb-20">
        
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 space-y-6"
        >
          <h1 className="text-7xl md:text-9xl font-semibold tracking-tighter leading-[0.9]">
            Reality <br/> 
            <span className="font-serif italic font-light text-gray-400">Sketchbook.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
            Transform everyday photos into handheld architectural sketches using AI. 
            A seamless blend of digital and analog aesthetics.
          </p>
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg max-w-md border border-red-100">
              ⚠️ {error}
            </div>
          )}
        </motion.div>

        {/* The Grid Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-gray-200">
          
          {/* 1. Upload Area */}
          <div className="relative group border-r border-b border-l border-gray-200 bg-white min-h-[600px] flex flex-col items-center justify-center p-12 transition-colors hover:bg-gray-50/50">
            {image ? (
              <motion.img 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                src={image} 
                className="max-w-full max-h-[400px] object-contain shadow-sm" 
                alt="Uploaded"
              />
            ) : (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 border border-gray-200 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-lg font-medium">Upload Image</p>
                  <p className="text-sm text-gray-400 mt-1">JPG or PNG</p>
                </div>
              </div>
            )}
            
            <input 
              type="file" 
              accept="image/*"
              onChange={handleUpload} 
              disabled={loading}
              className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
          </div>

          {/* 2. Result Area */}
          <div className="relative border-r border-b border-gray-200 bg-[#F5F5F5] min-h-[600px] flex flex-col items-center justify-center p-12 overflow-hidden">
            <div className="absolute top-6 left-6 text-xs font-mono uppercase text-gray-400 tracking-widest">
              Output_Result
            </div>

            {loading ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-gray-800" />
                <p className="text-sm font-mono text-gray-500 animate-pulse">RENDERING...</p>
              </div>
            ) : generatedImage ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img 
                  src={generatedImage} 
                  className="max-w-full max-h-[500px] shadow-2xl rotate-1 border-[8px] border-white bg-white" 
                  alt="Generated Sketch"
                />
                <a 
                  href={generatedImage} 
                  download="sketch.png"
                  className="absolute bottom-0 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform flex items-center gap-2 shadow-xl"
                >
                  Download Asset <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ) : (
              <div className="text-gray-300 font-serif italic text-2xl">
                Waiting for input...
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-gray-200 py-8 flex justify-between text-xs text-gray-400 font-mono uppercase tracking-wider">
          <p>Powered by Replicate & SDXL</p>
          <p>Design inspired by Lovart</p>
        </footer>

      </div>
    </main>
  );
}
