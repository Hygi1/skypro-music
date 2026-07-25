import styles from "./ErrorDisplay.module.css";
import Link from "next/link";

interface ErrorDisplayProps {
  type: "error" | "not-found";
  message?: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({
  type,
  message,
  onRetry,
}: ErrorDisplayProps) {
  if (type === "not-found") {
    return (
      <div className={styles.container}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Страница не найдена</h2>
        <p className={styles.description}>
          Возможно, она была удалена или перенесена на другой адрес
        </p>
        <Link href="/" className={styles.button}>
          Вернуться на главную
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.code}>Error</h1>
      <h2 className={styles.title}>Ошибка загрузки</h2>
      <p className={styles.description}>
        {message || "Проверьте подключение к сети и повторите попытку"}
      </p>
      {onRetry && (
        <button onClick={onRetry} className={styles.button}>
          Повторить
        </button>
      )}
    </div>
  );
}
