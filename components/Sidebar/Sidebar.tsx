"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { logout } from "@/lib/store/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const username = mounted ? user?.username || "Гость" : "Гость";

  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.personal}>
        <p className={styles.personalName}>{username}</p>
        <div className={styles.icon} onClick={handleLogout}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="16 17 21 12 16 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="21"
              y1="12"
              x2="9"
              y2="12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.list}>
          <div className={styles.item}>
            <Link href="/selection/1" className={styles.link}>
              <Image
                src="/img/playlist01.png"
                alt="Плейлист дня"
                width={250}
                height={150}
                className={styles.img}
                priority
              />
            </Link>
          </div>
          <div className={styles.item}>
            <Link href="/selection/2" className={styles.link}>
              <Image
                src="/img/playlist02.png"
                alt="Плейлист 2"
                width={250}
                height={150}
                className={styles.img}
              />
            </Link>
          </div>
          <div className={styles.item}>
            <Link href="/selection/3" className={styles.link}>
              <Image
                src="/img/playlist03.png"
                alt="Плейлист 3"
                width={250}
                height={150}
                className={styles.img}
              />
            </Link>
          </div>
          <div className={styles.item}>
            <Link href="/favorites" className={styles.link}>
              <div className={styles.favoritesLink}>⭐ Избранное</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
