"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import styles from "./site-header.module.css";

type NavigationItem = {
    href: string;
    label: string;
    segment: string | null;
};

const NAVIGATION_ITEMS: NavigationItem[] = [
    {
        href: "/",
        label: "Accueil",
        segment: null,
    },
    {
        href: "/agents",
        label: "Agents",
        segment: "agents",
    },
    {
        href: "/favoris",
        label: "Favoris",
        segment: "favoris",
    },
    {
        href: "/preferences",
        label: "Préférences",
        segment: "preferences",
    },
];

export function SiteHeader() {
    const activeSegment =
        useSelectedLayoutSegment();

    const [menuIsOpen, setMenuIsOpen] =
        useState(false);

    function closeMenu() {
        setMenuIsOpen(false);
    }

    return (
        <>
            <a
                className={styles.skipLink}
                href="#main-content"
            >
                Aller au contenu principal
            </a>

            <header className={styles.header}>
                <div className={styles.container}>
                    <Link
                        className={styles.logo}
                        href="/"
                        aria-label="Valorant Vault — Accueil"
                        onClick={closeMenu}
                    >
            <span
                className={styles.logoMark}
                aria-hidden="true"
            >
              V
            </span>

                        <span className={styles.logoText}>
              <strong>Valorant</strong>
              <span>Vault</span>
            </span>
                    </Link>

                    <button
                        className={styles.menuButton}
                        type="button"
                        aria-label={
                            menuIsOpen
                                ? "Fermer le menu"
                                : "Ouvrir le menu"
                        }
                        aria-expanded={menuIsOpen}
                        aria-controls="main-navigation"
                        onClick={() => {
                            setMenuIsOpen(
                                (currentValue) => !currentValue,
                            );
                        }}
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </button>

                    <nav
                        id="main-navigation"
                        className={`${styles.navigation} ${
                            menuIsOpen ? styles.open : ""
                        }`}
                        aria-label="Navigation principale"
                    >
                        {NAVIGATION_ITEMS.map((item) => {
                            const isActive =
                                activeSegment === item.segment;

                            return (
                                <Link
                                    className={`${styles.navigationLink} ${
                                        isActive ? styles.active : ""
                                    }`}
                                    href={item.href}
                                    aria-current={
                                        isActive ? "page" : undefined
                                    }
                                    key={item.href}
                                    onClick={closeMenu}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </header>
        </>
    );
}