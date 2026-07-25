"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getTokens, login } from "@/lib/api/auth";
import { setCredentials } from "@/lib/store/authSlice";
import styles from "./signin.module.css";
import Link from "next/link";
import Image from "next/image";
import { showError } from "@/lib/toast";
import { User, AuthResponse } from "@/lib/types/api";

export default function Signin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const tokenData: AuthResponse = await getTokens(email, password);
      const userData: User = await login(email, password);
      dispatch(
        setCredentials({
          user: userData,
          access: tokenData.access,
          refresh: tokenData.refresh,
        })
      );
      router.push("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Ошибка входа";
      setError(message);
      showError(message);
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
                <Image src="/img/logo_modal.png" alt="logo" width={140} height={21} />
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
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <div className={styles.errorContainer}>{error}</div>}
            <button type="submit" className={styles.modal__btnEnter} disabled={loading}>
              {loading ? "Загрузка..." : "Войти"}
            </button>
            <Link href="/signup" className={styles.modal__btnSignup}>
              Зарегистрироваться
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}