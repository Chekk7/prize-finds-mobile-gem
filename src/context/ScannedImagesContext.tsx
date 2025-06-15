
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ScannedImage {
  id: string;
  file: File;
  url: string;
  errorType: string;
  guideId?: number;
  timestamp: Date;
}

interface ScannedImagesContextType {
  scannedImages: ScannedImage[];
  addScannedImage: (file: File, errorType: string, guideId?: number) => void;
  getImageForGuide: (guideId: number) => ScannedImage | undefined;
  removeScannedImage: (id: string) => void;
}

const ScannedImagesContext = createContext<ScannedImagesContextType | undefined>(undefined);

export const useScannedImages = () => {
  const context = useContext(ScannedImagesContext);
  if (!context) {
    throw new Error('useScannedImages must be used within a ScannedImagesProvider');
  }
  return context;
};

export const ScannedImagesProvider = ({ children }: { children: ReactNode }) => {
  const [scannedImages, setScannedImages] = useState<ScannedImage[]>([]);

  const addScannedImage = (file: File, errorType: string, guideId?: number) => {
    const url = URL.createObjectURL(file);
    const newImage: ScannedImage = {
      id: Date.now().toString(),
      file,
      url,
      errorType,
      guideId,
      timestamp: new Date(),
    };
    setScannedImages(prev => [...prev, newImage]);
  };

  const getImageForGuide = (guideId: number) => {
    return scannedImages.find(image => image.guideId === guideId);
  };

  const removeScannedImage = (id: string) => {
    setScannedImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  return (
    <ScannedImagesContext.Provider
      value={{
        scannedImages,
        addScannedImage,
        getImageForGuide,
        removeScannedImage,
      }}
    >
      {children}
    </ScannedImagesContext.Provider>
  );
};
