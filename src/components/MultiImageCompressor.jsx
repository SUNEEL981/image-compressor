
import { useEffect, useRef, useState } from "react";
import {
  MAX_FILE_SIZE,
  formatBytes,
  reductionPercent,
  compressToTarget,
  createOutputFile,
} from "../utils/imageTools";

const SUPPORTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

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

function UploadIcon({ className = "h-7 w-7" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 16V4m0 0L7 9m5-5 5 5" />
      <path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
    </svg>
  );
}

function ImageIcon({ className = "h-6 w-6" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m4 17 5-5 3 3 3-4 5 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="m5 10 3 3 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ActionButton({
  children,
  onClick,
  variant = "secondary",
  disabled = false,
  className = "",
}) {
  const variants = {
    primary:
      "border-transparent bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md shadow-violet-200/60 hover:from-violet-700 hover:to-blue-700",
    success:
      "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    danger:
      "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
    secondary:
      "border-slate-200 bg-white text-slate-700 hover:border-violet-200 hover:bg-violet-50",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-10 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-bold transition duration-200 focus:outline-none focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
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
  const mountedRef = useRef(true);

  const [items, setItems] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      abortControllerRef.current?.abort();

      itemsRef.current.forEach((item) => {
        if (item.result?.url) {
          URL.revokeObjectURL(item.result.url);
        }
      });
    };
  }, []);

  function updateItem(id, updates) {
    setItems((previous) => {
      const next = previous.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      itemsRef.current = next;
      return next;
    });
  }

  function addFiles(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    setError("");

    const validItems = [];
    const errors = [];

    files.forEach((file) => {
      if (!SUPPORTED_TYPES.includes(file.type)) {
        errors.push(`${file.name}: Only JPG, PNG and WebP are supported.`);
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
      setItems((previous) => {
        const next = [...previous, ...validItems];
        itemsRef.current = next;
        return next;
      });
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
    if (item?.result?.url) URL.revokeObjectURL(item.result.url);

    setItems((previous) => {
      const next = previous.filter((entry) => entry.id !== id);
      itemsRef.current = next;
      return next;
    });

    setError("");
  }

  function clearAll() {
    if (isCompressing) return;

    itemsRef.current.forEach((item) => {
      if (item.result?.url) URL.revokeObjectURL(item.result.url);
    });

    itemsRef.current = [];
    setItems([]);
    setError("");

    if (inputRef.current) inputRef.current.value = "";
  }

  async function compressOne(item, controller) {
    if (controller.signal.aborted) return false;

    const targetBytes = targetSize * 1024;

    if (item.file.size <= targetBytes) {
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
        targetBytes,
        outputType,
        {
          signal: controller.signal,
          onProgress: (progress) => {
            updateItem(item.id, {
              progress: Math.max(
                0,
                Math.min(100, Number(progress) || 0)
              ),
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
      const queue = [...itemsRef.current];

      for (const item of queue) {
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

      if (mountedRef.current) setIsCompressing(false);
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

      if (mountedRef.current) setIsCompressing(false);
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
    <section className="w-full min-w-0">
      {/* Upload card */}
      <div
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;

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
        role="button"
        tabIndex={0}
        aria-label="Upload images. Click to browse or drag and drop files."
        className={`group relative isolate w-full min-w-0 cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-all duration-300 sm:rounded-3xl sm:px-8 sm:py-12 lg:px-12 lg:py-14 ${
          dragging
            ? "scale-[1.005] border-violet-500 bg-violet-50 shadow-xl shadow-violet-100"
            : "border-violet-300 bg-gradient-to-br from-violet-50 via-white to-blue-50 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-100/70"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-violet-200/40 blur-3xl transition group-hover:bg-violet-300/50"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-12 h-52 w-52 rounded-full bg-blue-200/50 blur-3xl"
        />

        <div className="relative mx-auto flex w-full max-w-2xl min-w-0 flex-col items-center">
          <div
            className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-300/50 transition duration-300 sm:h-[76px] sm:w-[76px] sm:rounded-[24px] ${
              dragging
                ? "scale-110 rotate-3"
                : "group-hover:-translate-y-1"
            }`}
          >
            <UploadIcon className="h-7 w-7 sm:h-9 sm:w-9" />
          </div>

          <span className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-violet-100 bg-white/90 px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-violet-700 shadow-sm sm:px-3.5 sm:text-xs">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            FREE ONLINE IMAGE TOOL
          </span>

          <h3 className="mt-1 break-words text-xl font-extrabold leading-tight tracking-tight !text-slate-950 sm:text-2xl lg:text-3xl">
            {dragging ? "Drop Your Images Here" : title}
          </h3>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 !text-slate-600 sm:text-base sm:leading-8">
            Drag and drop JPG, PNG or WebP images here, or browse
            your device to select multiple files.
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              inputRef.current?.click();
            }}
            className="mt-6 inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-200/70 transition-all duration-200 hover:-translate-y-0.5 hover:from-violet-700 hover:to-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-violet-200 sm:w-auto sm:min-w-52"
          >
            <UploadIcon className="h-5 w-5" />
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

          <div className="mt-6 flex max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-3 text-xs font-semibold text-slate-600 sm:gap-x-5 sm:text-sm">
            {["JPG, PNG & WebP", "Multiple files", `Max ${formatBytes(MAX_FILE_SIZE)} per image`].map(
              (label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5"
                >
                  <span className="text-emerald-600">
                    <CheckIcon />
                  </span>
                  {label}
                </span>
              )
            )}
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Your images are processed in your browser where supported by
            the selected tool.
          </p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700"
        >
          <span className="font-extrabold">!</span>
          <p className="min-w-0 break-words">{error}</p>
        </div>
      )}

      {/* Selected image list */}
      {items.length > 0 && (
        <div className="mt-7 min-w-0">
          <div className="mb-4 flex min-w-0 flex-col gap-4 rounded-2xl border border-violet-100 bg-white p-4 shadow-sm sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-base font-extrabold text-slate-950 sm:text-lg">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <ImageIcon />
                </span>
                Selected Images
                <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-700">
                  {items.length}
                </span>
              </div>

              <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
                {completedCount} completed
                {remainingCount > 0 && ` · ${remainingCount} remaining`}
                {failedCount > 0 && ` · ${failedCount} failed`}
              </p>
            </div>

            <div className="flex w-full flex-wrap gap-2 sm:w-auto">
              {!isCompressing ? (
                <ActionButton
                  variant="primary"
                  onClick={compressAll}
                  disabled={remainingCount === 0}
                  className="flex-1 sm:flex-none"
                >
                  Compress All
                </ActionButton>
              ) : (
                <ActionButton
                  variant="danger"
                  onClick={cancelCompression}
                  className="flex-1 sm:flex-none"
                >
                  Cancel
                </ActionButton>
              )}

              {completedCount > 0 && (
                <ActionButton
                  variant="success"
                  onClick={downloadAll}
                  disabled={isCompressing}
                  className="flex-1 sm:flex-none"
                >
                  Download All
                </ActionButton>
              )}

              <ActionButton
                onClick={clearAll}
                disabled={isCompressing}
                className="flex-1 sm:flex-none"
              >
                Clear All
              </ActionButton>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-3">
            {items.map((item) => {
              const saved = item.result?.file
                ? reductionPercent(
                    item.file.size,
                    item.result.file.size
                  )
                : 0;

              return (
                <article
                  key={item.id}
                  className="flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-violet-200 hover:shadow-md sm:p-5 lg:flex-row lg:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 text-violet-700">
                      <ImageIcon />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate text-sm font-bold text-slate-900 sm:text-base"
                        title={item.file.name}
                      >
                        {item.file.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                        Original: {formatBytes(item.file.size)}
                      </p>

                      {item.status === "completed" && item.result?.file && (
                        <p className="mt-1 break-words text-xs font-semibold text-emerald-700 sm:text-sm">
                          Output: {formatBytes(item.result.file.size)}
                          {" · "}
                          {saved > 0
                            ? `${saved.toFixed(0)}% smaller`
                            : "Already under target"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="min-w-0 lg:w-44 lg:shrink-0">
                    {item.status === "waiting" && (
                      <span className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                        Waiting
                      </span>
                    )}

                    {item.status === "compressing" && (
                      <div>
                        <div className="mb-1.5 flex items-center justify-between gap-2 text-xs font-semibold text-violet-700">
                          <span>Processing</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div
                          className="h-2 overflow-hidden rounded-full bg-violet-100"
                          role="progressbar"
                          aria-valuenow={item.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Compressing ${item.file.name}`}
                        >
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
                        <p className="mt-1 break-words text-xs leading-5 text-rose-600">
                          {item.error}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 lg:shrink-0 lg:justify-end">
                    {item.status === "completed" && (
                      <ActionButton
                        variant="success"
                        onClick={() => downloadFile(item)}
                        disabled={isCompressing}
                      >
                        Download
                      </ActionButton>
                    )}

                    {item.status === "error" && (
                      <ActionButton
                        variant="primary"
                        onClick={() => retryItem(item)}
                        disabled={isCompressing}
                      >
                        Retry
                      </ActionButton>
                    )}

                    {item.status !== "compressing" && (
                      <ActionButton
                        onClick={() => removeItem(item.id)}
                        disabled={isCompressing}
                      >
                        Remove
                      </ActionButton>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
