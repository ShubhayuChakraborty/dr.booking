import React, { useEffect } from "react";
import { XCircle, CheckCircle, AlertTriangle } from "lucide-react";

const icons = {
  error: <XCircle className="w-6 h-6 text-red-500" />,
  success: <CheckCircle className="w-6 h-6 text-green-500" />,
  warning: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
};

const Notification = ({ type = "error", message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="
        fixed top-6 right-6 z-50
        bg-white shadow-xl border border-gray-200 rounded-xl 
        p-4 flex items-center gap-3
        animate-slideIn
      "
    >
      {icons[type]}
      <p className="text-gray-800 font-medium">{message}</p>
    </div>
  );
};

export default Notification;
