import { useEffect, useState } from 'react';
import { Check, Copy, Info, MessageCircle, X } from 'lucide-react';

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToEdit: () => void;
  whatsappNumber: string;
  formattedMessage: string;
}

export function DemoBookingModal({
  isOpen,
  onClose,
  onBackToEdit,
  whatsappNumber,
  formattedMessage,
}: DemoBookingModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = formattedMessage;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-preview-title"
    >
      <div
        className="fixed inset-0 bg-[#121517]/50 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-[#FFFFFF] border border-[#DCE2E5] shadow-2xl overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-[#DCE2E5] flex items-center justify-between gap-4 bg-[#F4F6F7]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#2A5C63] text-[#FFFFFF]">
              LIVE DEMO PREVIEW
            </span>
            <span className="text-xs text-[#525C62] tabular-nums hidden sm:inline">
              To: {whatsappNumber}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking preview"
            className="min-h-[44px] min-w-[44px] -mr-2 flex items-center justify-center rounded-lg text-[#525C62] hover:text-[#121517] hover:bg-[#EAEEF0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <div>
            <h2
              id="demo-preview-title"
              className="text-xl sm:text-2xl font-semibold tracking-tight text-[#121517]"
            >
              WhatsApp Reception Summary
            </h2>
            <p className="text-xs text-[#525C62] mt-1 sm:hidden tabular-nums">
              Reception Desk: {whatsappNumber}
            </p>
          </div>

          <div className="rounded-xl bg-[#F4F6F7] border border-[#DCE2E5] p-4 sm:p-5 max-h-[45vh] overflow-y-auto">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2A5C63] mb-3 pb-2.5 border-b border-[#DCE2E5]">
              <MessageCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
              <span>Auto-formatted WhatsApp Message</span>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-[#121517]">
              {formattedMessage}
            </pre>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl bg-[#EAEEF0] p-3.5 text-xs sm:text-sm leading-relaxed text-[#121517]">
            <Info
              className="w-4 h-4 text-[#2A5C63] shrink-0 mt-0.5"
              strokeWidth={1.75}
            />
            <p>
              In your live studio site, tapping Send opens WhatsApp directly to your reception desk with this booking summary
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onBackToEdit}
              className="min-h-[44px] px-4 py-2.5 rounded-lg border border-[#DCE2E5] bg-[#FFFFFF] text-sm font-medium text-[#121517] hover:bg-[#EAEEF0] transition-colors cursor-pointer"
            >
              Edit Selection
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#2A5C63] text-[#FFFFFF] text-sm font-medium hover:bg-[#214A50] active:scale-[0.98] transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5C63]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 shrink-0" strokeWidth={2} />
                  <span>Copied Booking Summary</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  <span>Copy Booking Summary</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
