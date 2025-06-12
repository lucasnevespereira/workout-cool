"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UseMutationResult } from "@tanstack/react-query";

import { cn } from "@/shared/lib/utils";

interface ImageUploadProps {
  imageTypeLabel: string;
  initialImageUrl: string | null;
  isDisabled?: boolean;
  labelContent: React.ReactNode;
  onUploadError: (error: Error) => void;
  onUploadSuccess: () => void;
  placeholder: React.ReactNode;
  previewClassName?: string;
  previewSize: {
    width: number;
    height: number;
  };
  uploadMutation: UseMutationResult<{ url: string }, Error, { file: File }, unknown>;
}

export function ImageUpload({
  imageTypeLabel,
  initialImageUrl,
  isDisabled = false,
  labelContent,
  onUploadError,
  onUploadSuccess,
  placeholder,
  previewClassName,
  previewSize,
  uploadMutation,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImageUrl);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setPreview(initialImageUrl);
  }, [initialImageUrl]);

  const handleFileChange = (file: File) => {
    if (isDisabled) return;

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // Upload file
    uploadMutation.mutate(
      { file },
      {
        onSuccess: () => {
          onUploadSuccess();
        },
        onError: (error) => {
          setPreview(initialImageUrl);
          onUploadError(error);
        },
      },
    );
  };

  return (
    <div className="group relative">
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden border-2 border-gray-200 bg-gray-100 transition-opacity",
          previewClassName,
          (uploadMutation.isPending || isDisabled) && "opacity-60",
        )}
        style={{ width: previewSize.width, height: previewSize.height }}
      >
        {!mounted ? (
          placeholder
        ) : preview ? (
          <Image
            alt={imageTypeLabel}
            className="h-full w-full object-cover"
            height={previewSize.height}
            src={preview}
            width={previewSize.width}
          />
        ) : (
          placeholder
        )}

        <label
          className={cn(
            "absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition hover:bg-black/40 hover:opacity-100",
            (uploadMutation.isPending || isDisabled) && "pointer-events-none",
          )}
          htmlFor="imageUpload"
          tabIndex={0}
        >
          {labelContent}
          <input
            accept="image/png, image/jpeg"
            className="hidden"
            disabled={uploadMutation.isPending || isDisabled}
            id="imageUpload"
            name="imageUpload"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFileChange(file);
              }
            }}
            type="file"
          />
        </label>

        {(uploadMutation.isPending || isDisabled) && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            {uploadMutation.isPending && <span className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-black" />}
          </div>
        )}
      </div>
    </div>
  );
}
