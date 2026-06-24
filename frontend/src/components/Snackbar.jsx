import { useEffect } from "react";

// type: "success" | "error" | "info" | "warning"
function Snackbar({ isOpen, message, type = "success", onClose, duration = 3000 }) {
    useEffect(() => {
        if (!isOpen) return;
        const timer = setTimeout(() => onClose(), duration);
        return () => clearTimeout(timer);
    }, [isOpen , onClose , duration]);

    if (!isOpen) return <></>;

    const styles = {
        success: {
            container: "bg-green-50 border-green-200",
            icon: "text-green-500",
            text: "text-green-800",
            bar: "bg-green-500",
            svg: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            ),
        },
        error: {
            container: "bg-red-50 border-red-200",
            icon: "text-red-500",
            text: "text-red-800",
            bar: "bg-red-500",
            svg: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ),
        },
        warning: {
            container: "bg-yellow-50 border-yellow-200",
            icon: "text-yellow-500",
            text: "text-yellow-800",
            bar: "bg-yellow-500",
            svg: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            ),
        },
        info: {
            container: "bg-blue-50 border-blue-200",
            icon: "text-blue-500",
            text: "text-blue-800",
            bar: "bg-blue-500",
            svg: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
            ),
        },
    };

    const s = styles[type];

    return (
        <div className="fixed bottom-6 right-6 z-[9999] animate-fade-in-up">
            <div className={`relative flex items-center space-x-3 border rounded-xl shadow-lg px-4 py-3 pr-10 min-w-[260px] max-w-sm overflow-hidden ${s.container}`}>
                {/* Icon */}
                <div className={`flex-shrink-0 ${s.icon}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {s.svg}
                    </svg>
                </div>

                {/* Message */}
                <p className={`text-sm font-medium ${s.text}`}>{message}</p>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className={`absolute top-2 right-2 ${s.icon} opacity-60 hover:opacity-100 transition`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Auto-dismiss progress bar */}
                <div
                    className={`absolute bottom-0 left-0 h-0.5 ${s.bar} opacity-40`}
                    style={{ animation: `shrink ${duration}ms linear forwards` }}
                />
            </div>

            <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.2s ease-out;
        }
      `}</style>
        </div>
    );
}

export default Snackbar;