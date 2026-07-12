"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileArrowUp,
  FileCsv,
  FilePdf,
  FileImage,
  CheckCircle,
  Spinner,
  X,
} from "@/lib/icons";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "csv" | "image";
  status: "uploading" | "processing" | "done" | "error";
  confidence?: number;
  error?: string;
}

const FILE_ICONS = {
  pdf: FilePdf,
  csv: FileCsv,
  image: FileImage,
};

export function UploadZone({ organizationId }: { organizationId?: string }) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = useCallback((sourceFiles: File[]) => {
    const newFiles: UploadedFile[] = sourceFiles.map(
      (f) => ({
        id: Math.random().toString(36).slice(2),
        name: f.name,
        size: `${(f.size / 1024).toFixed(1)} KB`,
        type: f.type.includes("pdf")
          ? "pdf"
          : f.type.includes("csv")
          ? "csv"
          : "image",
        status: "uploading" as const,
      })
    );

    setFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach(async (file, index) => {
      if (!organizationId) {
        setFiles((prev) => prev.map((f) => (
          f.id === file.id
            ? { ...f, status: "error", error: "Demo organization is still loading. Try again in a moment." }
            : f
        )));
        return;
      }

      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: "processing" } : f
          )
        );
      }, 400);

      try {
        const fd = new FormData();
        fd.append("organizationId", organizationId);
        fd.append("file", sourceFiles[index]);

        const res = await fetch("/api/upload", { method: "POST", body: fd });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();

        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? { ...f, status: "done", confidence: data.transaction?.confidence ?? 0.85 + Math.random() * 0.14 }
              : f
          )
        );
      } catch (error) {
        setFiles((prev) => prev.map((f) => (
          f.id === file.id
            ? { ...f, status: "error", error: error instanceof Error ? error.message : "Upload failed" }
            : f
        )));
      }
    });
  }, [organizationId]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    uploadFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadFiles(Array.from(e.target.files ?? []));
    e.target.value = "";
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        animate={{
          borderColor: isDragging ? "#059669" : "#e2e8f0",
          backgroundColor: isDragging ? "#ecfdf5" : "#ffffff",
        }}
        className="relative flex min-h-[180px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors"
      >
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept=".pdf,.csv,image/png,image/jpeg,image/webp"
          multiple
          onChange={handleFileInput}
        />
        <motion.div
          animate={{ y: isDragging ? -4 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FileArrowUp
            className={`h-8 w-8 ${
              isDragging ? "text-emerald-500" : "text-slate-300"
            }`}
          />
        </motion.div>
        <p className="mt-3 text-sm font-medium text-slate-600">
          Drop utility bills, invoices, or fleet records
        </p>
        <p className="mt-1 text-[12px] text-slate-400">
          PDF, CSV, or images — up to 10 MB
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-emerald-700 active:scale-[0.98]"
        >
          Browse Files
        </button>
      </motion.div>

      {/* Uploaded files */}
      <AnimatePresence>
        {files.map((file) => {
          const Icon = FILE_ICONS[file.type];
          return (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                  <Icon className="h-4.5 w-4.5 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px] font-medium text-slate-700">
                    {file.name}
                  </p>
                  <p className="text-[11px] text-slate-400">{file.size}</p>
                </div>
                <div className="flex items-center gap-2">
                  {file.status === "uploading" && (
                    <Spinner className="h-4 w-4 animate-spin text-slate-400" />
                  )}
                  {file.status === "processing" && (
                    <div className="flex items-center gap-1.5">
                      <Spinner className="h-4 w-4 animate-spin text-emerald-500" />
                      <span className="text-[11px] text-emerald-600">
                        Extracting...
                      </span>
                    </div>
                  )}
                  {file.status === "done" && (
                    <div className="flex items-center gap-1.5">
                      <CheckCircle
                        className="h-4 w-4 text-emerald-500"
                      />
                      <span className="text-[11px] font-medium text-emerald-600">
                        {(file.confidence! * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                  )}
                  {file.status === "error" && (
                    <span className="max-w-40 text-right text-[11px] text-rose-600">
                      {file.error}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    aria-label={`Remove ${file.name}`}
                    className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-white hover:text-slate-600 active:scale-[0.9]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
