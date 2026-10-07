"use client";

import {
    useActionState,
} from "react";
import {
    useFormStatus,
} from "react-dom";

import { saveCatalogDensity } from "@/features/preferences/actions";
import type {
    CatalogDensity,
    CatalogDensityActionState,
} from "@/features/preferences/types";

import styles from "./catalog-density-form.module.css";

type CatalogDensityFormProps = {
    defaultDensity: CatalogDensity;
};

const INITIAL_STATE: CatalogDensityActionState = {
    status: "idle",
    message: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="button button--primary"
            type="submit"
            disabled={pending}
        >
            {pending
                ? "Enregistrement…"
                : "Enregistrer la préférence"}
        </button>
    );
}

export function CatalogDensityForm({
                                       defaultDensity,
                                   }: CatalogDensityFormProps) {
    const [state, formAction] = useActionState(
        saveCatalogDensity,
        INITIAL_STATE,
    );

    return (
        <section className={styles.panel}>
            <div className={styles.heading}>
                <p className="eyebrow">
                    Catalogue
                </p>

                <h2>Densité d’affichage</h2>

                <p>
                    Choisissez la taille des cartes utilisée dans le
                    catalogue des agents.
                </p>
            </div>

            <form
                className={styles.form}
                action={formAction}
            >
                <fieldset className={styles.options}>
                    <legend className={styles.srOnly}>
                        Choisir la densité du catalogue
                    </legend>

                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="density"
                            value="comfortable"
                            defaultChecked={
                                defaultDensity === "comfortable"
                            }
                        />

                        <span className={styles.radio} />

                        <span className={styles.content}>
              <strong>Confortable</strong>

              <span>
                Affiche de grandes cartes pour mieux
                découvrir chaque agent.
              </span>
            </span>
                    </label>

                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="density"
                            value="compact"
                            defaultChecked={
                                defaultDensity === "compact"
                            }
                        />

                        <span className={styles.radio} />

                        <span className={styles.content}>
              <strong>Compact</strong>

              <span>
                Affiche davantage de cartes sur une même
                ligne.
              </span>
            </span>
                    </label>
                </fieldset>

                <SubmitButton />

                {state.status !== "idle" ? (
                    <p
                        className={`${styles.message} ${
                            state.status === "success"
                                ? styles.success
                                : styles.error
                        }`}
                        role={
                            state.status === "error"
                                ? "alert"
                                : "status"
                        }
                    >
                        {state.message}
                    </p>
                ) : null}
            </form>
        </section>
    );
}