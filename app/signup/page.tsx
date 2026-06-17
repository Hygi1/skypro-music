"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signup, getTokens, login } from "@/lib/api/auth";
import { setCredentials } from "@/lib/store/authSlice";
import styles from "./signup.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Форма отправлена (POST), preventDefault сработал"); // для проверки

    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      setLoading(false);
      return;
    }

    try {
      console.log("Отправка запроса на регистрацию...");
      await signup(email, password, username);
      console.log("Регистрация успешна, получаем токены...");
      const tokenData = await getTokens(email, password);
      console.log("Токены получены, логинимся...");
      const userData = await login(email, password);
      console.log("Пользователь получен:", userData);

      dispatch(
        setCredentials({
          user: userData,
          access: tokenData.access,
          refresh: tokenData.refresh,
        })
      );

      console.log("Редирект на главную...");

      router.push("/");
    } catch (err: any) {
      console.error("Ошибка:", err);
      setError(err.message || "Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
          <form className={styles.modal__form} onSubmit={handleSubmit}>
            <Link href="/">
              <div className={styles.modal__logo}>
                <Image
                  src="/img/logo_modal.png"
                  alt="logo"
                  width={140}
                  height={21}
                />
              </div>
            </Link>
            <input
              className={styles.modal__input}
              type="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={styles.modal__input}
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className={styles.modal__input}
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className={styles.modal__input}
              type="password"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <div className={styles.errorContainer}>{error}</div>}
            <button
              type="submit"
              className={styles.modal__btnSignupEnt}
              disabled={loading}
            >
              {loading ? "Загрузка..." : "Зарегистрироваться"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
