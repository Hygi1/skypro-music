import Link from "next/link";

export default function NotFound() {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Страница не найдена</h2>
        <p className="error-description">
          Возможно, она была удалена или перенесена на другой адрес
        </p>
        <Link href="/" className="error-button">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
