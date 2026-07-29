"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { logout } from "@/lib/store/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import cn from "classnames";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/img/logo.png"
            alt="logo"
            width={113}
            height={17}
            priority
          />
        </Link>
      </div>
      <div className={styles.burger} onClick={toggleMenu} aria-label="Меню">
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      <div
        className={cn(styles.menu, {
          [styles.menuClosed]: !isMenuOpen,
          [styles.menuOpen]: isMenuOpen,
        })}
      >
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link href="/" className={styles.menuLink}>
              Главное
            </Link>
          </li>
          {mounted && isAuthenticated && (
            <li className={styles.menuItem}>
              <Link href="/favorites" className={styles.menuLink}>
                Мои треки
              </Link>
            </li>
          )}
          {mounted &&
            (isAuthenticated ? (
              <li className={styles.menuItem}>
                <button
                  onClick={handleLogout}
                  className={styles.menuLink}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Выйти
                </button>
              </li>
            ) : (
              <li className={styles.menuItem}>
                <Link href="/signin" className={styles.menuLink}>
                  Войти
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
