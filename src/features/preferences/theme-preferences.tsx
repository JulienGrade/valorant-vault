"use client";

import type { ThemePreference } from "@/features/preferences/types";
import { useTheme } from "@/features/preferences/use-theme";

import styles from "./theme-preferences.module.css";

type ThemeOption = {
    value: ThemePreference;
    title: string;
    description: string;
};

const THEME_OPTIONS: ThemeOption[] = [
    {
        value: "dark",
        title: "Sombre",
        description:
            "Utilise en permanence l’interface sombre de Valorant Vault.",
    },
    {
        value: "light",
        title: "Clair",
        description:
            "Utilise une interface claire avec un contraste adapté.",
    },
    {
        value: "system",
        title: "Système",
        description:
            "Suit automatiquement le thème de votre appareil.",
    },
];

export function ThemePreferences() {
    const {
        preference,
        resolvedTheme,
        setPreference,
    } = useTheme();

    return (
        <section className={styles.panel}>
            <div className={styles.heading}>
                <p className="eyebrow">Apparence</p>
                <h2>Thème de l’application</h2>

                <p>
                    Choisissez l’apparence utilisée sur cet appareil.
                </p>
            </div>

            <fieldset className={styles.options}>
                <legend className={styles.srOnly}>
                    Choisir un thème
                </legend>

                {THEME_OPTIONS.map((option) => (
                    <label
                        className={`${styles.option} ${
                            preference === option.value
                                ? styles.selected
                                : ""
                        }`}
                        key={option.value}
                    >
                        <input
                            type="radio"
                            name="theme"
                            value={option.value}
                            checked={preference === option.value}
                            onChange={() => {
                                setPreference(option.value);
                            }}
                        />

                        <span className={styles.radio} />

                        <span className={styles.optionContent}>
              <strong>{option.title}</strong>
              <span>{option.description}</span>
            </span>
                    </label>
                ))}
            </fieldset>

            <p className={styles.currentTheme} aria-live="polite">
                Thème actuellement affiché :{" "}
                <strong>
                    {resolvedTheme === "dark"
                        ? "sombre"
                        : "clair"}
                </strong>
            </p>
        </section>
    );
}