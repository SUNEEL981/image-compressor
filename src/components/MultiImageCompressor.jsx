
import { useEffect, useRef, useState } from "react";

import {
  MAX_FILE_SIZE,
  formatBytes,
  reductionPercent,
  compressToTarget,
  createOutputFile,
} from "../utils/imageTools";

function createItem(file) {
  return {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,
    file,
    status: "waiting",
    progress: 0,
    result: null,
    error: "",
  };
}

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-9 w-9"
      aria-hidden="true"
    >
      <path
        d="M12 16V4m0 0L7 9m5-5 5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <path
        d="m4 17 5-5 3 3 3-4 5 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MultiImageCompressor({
  accepted = "image/jpeg,image/png,image/webp",
  targetSize = 100,
  outputType = "image/webp",
  title = "Upload Multiple Images",
}) {
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);
  const itemsRef = useRef([]);

  const [items, setItems] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => {
        if (item.result?.url) {
          URL.revokeObjectURL(item.result.url);
        }
      });

      abortControllerRef.current?.abort();
    };
  }, []);

  function updateItem(id, updates) {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  }

  function addFiles(fileList) {
    const files = Array.from(fileList || []);

    if (!files.length) return;

    setError("");

    const validItems = [];
    const errors = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        errors.push(`${file.name}: Please select an image file.`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(
          `${file.name}: Maximum allowed size is ${formatBytes(MAX_FILE_SIZE)}.`
        );
        return;
      }

      validItems.push(createItem(file));
    });

    if (errors.length) {
      setError(errors.join(" "));
    }

    if (validItems.length) {
      setItems((previous) => [...previous, ...validItems]);
    }
  }

  function handleInput(event) {
    addFiles(event.target.files);
    event.target.value = "";
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files);
  }

  function removeItem(id) {
    if (isCompressing) return;

    const item = itemsRef.current.find((entry) => entry.id === id);

    if (item?.result?.url) {
      URL.revokeObjectURL(item.result.url);
    }

    setItems((previous) => previous.filter((item) => item.id !== id));
    setError("");
  }

  function clearAll() {
    if (isCompressing) return;

    itemsRef.current.forEach((item) => {
      if (item.result?.url) {
        URL.revokeObjectURL(item.result.url);
      }
    });

    setItems([]);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function compressOne(item, controller) {
    if (controller.signal.aborted) return false;

    if (item.file.size <= targetSize * 1024) {
      const previewUrl = URL.createObjectURL(item.file);

      updateItem(item.id, {
        status: "completed",
        progress: 100,
        result: {
          blob: item.file,
          file: item.file,
          url: previewUrl,
          width: null,
          height: null,
        },
        error: "",
      });

      return true;
    }

    updateItem(item.id, {
      status: "compressing",
      progress: 0,
      error: "",
    });

    try {
      const result = await compressToTarget(
        item.file,
        targetSize * 1024,
        outputType,
        {
          signal: controller.signal,
          onProgress: (progress) => {
            updateItem(item.id, {
              progress: Math.max(0, Math.min(100, Number(progress) || 0)),
            });
          },
        }
      );

      if (controller.signal.aborted) return false;

      const outputFile = createOutputFile(
        result.blob,
        item.file.name,
        outputType
      );

      const previewUrl = URL.createObjectURL(result.blob);

      updateItem(item.id, {
        status: "completed",
        progress: 100,
        result: {
          ...result,
          file: outputFile,
          url: previewUrl,
        },
        error: "",
      });

      return true;
    } catch (err) {
      if (err?.name === "AbortError" || controller.signal.aborted) {
        updateItem(item.id, {
          status: "waiting",
          progress: 0,
          error: "",
        });

        return false;
      }

      updateItem(item.id, {
        status: "error",
        progress: 0,
        error: err?.message || "Compression failed. Please try again.",
      });

      return false;
    }
  }

  async function compressAll() {
    if (!itemsRef.current.length || isCompressing) return;

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsCompressing(true);
    setError("");

    try {
      for (const item of itemsRef.current) {
        if (controller.signal.aborted) break;

        const current = itemsRef.current.find(
          (entry) => entry.id === item.id
        );

        if (!current || current.status === "completed") continue;

        await compressOne(current, controller);
      }
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }

      setIsCompressing(false);
    }
  }

  function cancelCompression() {
    abortControllerRef.current?.abort();
  }

  async function retryItem(item) {
    if (isCompressing) return;

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsCompressing(true);

    try {
      await compressOne(item, controller);
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }

      setIsCompressing(false);
    }
  }

  function downloadFile(item) {
    if (!item.result?.file) return;

    const url = URL.createObjectURL(item.result.file);
    const link = document.createElement("a");

    link.href = url;
    link.download = item.result.file.name;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function downloadAll() {
    const completed = itemsRef.current.filter(
      (item) => item.result?.file
    );

    for (const item of completed) {
      downloadFile(item);
      await new Promise((resolve) => window.setTimeout(resolve, 350));
    }
  }

  const completedCount = items.filter(
    (item) => item.status === "completed"
  ).length;

  const failedCount = items.filter(
    (item) => item.status === "error"
  ).length;

  const remainingCount = items.filter(
    (item) =>
      item.status === "waiting" || item.status === "compressing"
  ).length;

  return (
    <section className="w-full">
      {/* Premium upload area */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload images"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setDragging(false);
          }
        }}
        onDrop={handleDrop}
        className={`group relative isolate cursor-pointer overflow-hidden rounded-[28px] border-2 border-dashed p-6 text-center transition-all duration-300 sm:p-10 ${
          dragging
            ? "scale-[1.01] border-violet-500 bg-violet-100 shadow-xl shadow-violet-200/50"
            : "border-violet-200 bg-gradient-to-br from-violet-50 via-white to-blue-50 hover:border-violet-400 hover:shadow-xl hover:shadow-violet-100/70"
        }`}
      >
        <div className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-violet-200/30 blur-3xl transition group-hover:bg-violet-300/40" />
        <div className="pointer-events-none absolute -bottom-20 -right-12 h-52 w-52 rounded-full bg-blue-200/40 blur-3xl" />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center">
          <div
            className={`mb-5 flex h-[76px] w-[76px] items-center justify-center rounded-[24px] bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-300/50 transition duration-300 ${
              dragging ? "scale-110 rotate-3" : "group-hover:-translate-y-1"
            }`}
          >
            <UploadIcon />
          </div>

          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-3.5 py-1.5 text-xs font-bold text-violet-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            FREE ONLINE IMAGE TOOL
          </span>

          <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            {dragging ? "Drop your images here" : title}
          </h3>

          <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
            Drag and drop your images here, or browse your device to select
            multiple files at once.
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              inputRef.current?.click();
            }}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-violet-300/40 transition hover:-translate-y-0.5 hover:from-violet-700 hover:to-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-violet-200"
          >
            <UploadIcon />
            Choose Images
          </button>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept={accepted}
            hidden
            onChange={handleInput}
          />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-emerald-600" fill="none">
                <path d="m5 10 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              JPG, PNG & WebP
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-emerald-600" fill="none">
                <path d="m5 10 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Multiple files
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-emerald-600" fill="none">
                <path d="m5 10 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Max {formatBytes(MAX_FILE_SIZE)} per image
            </span>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Your images are processed in your browser.
          </p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          <span className="font-bold">!</span>
          <p>{error}</p>
        </div>
      )}

      {/* Uploaded image summary and actions */}
      {items.length > 0 && (
        <div className="mt-7">
          <div className="mb-4 flex flex-col gap-4 rounded-2xl border border-violet-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-base font-extrabold text-slate-900">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <ImageIcon />
                </span>
                Your images
                <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-700">
                  {items.length}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {completedCount} completed
                {remainingCount > 0 && ` · ${remainingCount} remaining`}
                {failedCount > 0 && ` · ${failedCount} failed`}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {!isCompressing ? (
                <button
                  type="button"
                  onClick={compressAll}
                  disabled={remainingCount === 0}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:from-violet-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Compress All
                </button>
              ) : (
                <button
                  type="button"
                  onClick={cancelCompression}
                  className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
                >
                  Cancel
                </button>
              )}

              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={downloadAll}
                  disabled={isCompressing}
                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
                >
                  Download All
                </button>
              )}

              <button
                type="button"
                onClick={clearAll}
                disabled={isCompressing}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {items.map((item) => {
              const saved = item.result?.file
                ? reductionPercent(item.file.size, item.result.file.size)
                : 0;

              return (
                <div
                  key={item.id}
                  className="flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-violet-200 hover:shadow-md sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 text-violet-700">
                      <ImageIcon />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate text-sm font-bold text-slate-800"
                        title={item.file.name}
                      >
                        {item.file.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Original: {formatBytes(item.file.size)}
                      </p>

                      {item.status === "completed" && item.result?.file && (
                        <p className="mt-1 text-xs font-semibold text-emerald-700">
                          Output: {formatBytes(item.result.file.size)}
                          {" · "}
                          {saved > 0
                            ? `${saved.toFixed(0)}% smaller`
                            : "Already under target"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="min-w-0 sm:w-44">
                    {item.status === "waiting" && (
                      <span className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                        Waiting
                      </span>
                    )}

                    {item.status === "compressing" && (
                      <div>
                        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-violet-700">
                          <span>Processing</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-violet-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500 transition-all duration-200"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {item.status === "completed" && (
                      <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        ✓ Completed
                      </span>
                    )}

                    {item.status === "error" && (
                      <div>
                        <span className="inline-flex rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700">
                          Failed
                        </span>
                        <p className="mt-1 break-words text-xs text-rose-600">
                          {item.error}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {item.status === "completed" && (
                      <button
                        type="button"
                        onClick={() => downloadFile(item)}
                        disabled={isCompressing}
                        className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                      >
                        Download
                      </button>
                    )}

                    {item.status === "error" && (
                      <button
                        type="button"
                        onClick={() => retryItem(item)}
                        disabled={isCompressing}
                        className="rounded-lg bg-violet-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-violet-700 disabled:opacity-50"
                      >
                        Retry
                      </button>
                    )}

                    {item.status !== "compressing" && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        disabled={isCompressing}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
