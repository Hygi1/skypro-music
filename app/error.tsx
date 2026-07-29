"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Ошибка загрузки</h2>
        <p className="error-description">
          Проверьте подключение к сети и повторите попытку
        </p>
        <button onClick={reset} className="error-button">
          Повторить
        </button>
      </div>
    </div>
  );
}
