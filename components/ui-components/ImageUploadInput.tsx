'use client';

import { useRef, useState } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import Image from "next/image";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyDescription,
  EmptyContent
} from '@/components/ui/empty';

export function ImageUploadInput({ value, onChange }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Validate image
    if (!selected.type.startsWith('image/')) {
      alert('Only image files are allowed.');
      return;
    }
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    onChange && onChange(selected);
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    onChange && onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div>
      {!previewUrl ? (
        <Empty
          className="border border-dashed cursor-pointer"
          onClick={openFilePicker}
        >
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ImagePlus />
            </EmptyMedia>
            <EmptyDescription>Click here to upload image</EmptyDescription>
          </EmptyHeader>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </Empty>
      ) : (
        <div className="relative border rounded-lg p-2 flex gap-4 items-center">
          <Image
            src={previewUrl}
            alt="preview"
            width={128}
  height={128}
            className="w-24 h-24 rounded-md object-cover border"
          />
          <div className="flex flex-col text-sm">
            <p className="font-medium">{file?.name}</p>
            <p className="text-gray-500">{formatSize(file?.size || 0)}</p>
          </div>
          <button
            onClick={handleRemove}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
