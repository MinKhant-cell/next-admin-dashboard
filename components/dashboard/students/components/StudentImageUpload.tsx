import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

function StudentImageUpload({ errors }: any) {
  const { register, control, trigger } = useFormContext();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [sizeMB, setSizeMB] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    // Convert file size to MB
    const sizeInMB = file.size / (1024 * 1024);

    // Show preview
    const fileURL = URL.createObjectURL(file);

    setImage(file);
    setPreview(fileURL);
    setSizeMB(parseFloat(sizeInMB.toFixed(2)));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label className="text-gray-600 dark:text-zinc-200" htmlFor="email">
          Upload Image
        </Label>
        <Input
          type="file"
          accept="image/*"
          {...register('image', { required: 'Please select an image' })}
          onChange={handleFileChange}
        />

         {errors.image && (
          <p className="text-red-500 text-xs">
            {String(errors.image.message)}
          </p>
        )}

        {preview && (
          <div className="flex flex-col items-center space-y-2">
            <img
              src={preview}
              alt="Preview"
              className="rounded-xl border shadow-sm"
              width={200}
              height={200}
            />
            <p className="text-sm text-gray-600">
              File size: <strong>{sizeMB} MB</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentImageUpload;
