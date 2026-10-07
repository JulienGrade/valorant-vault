"use client";

import type {
    CSSProperties,
    PointerEvent,
    ReactNode,
} from "react";
import { useRef } from "react";

import styles from "./tilt-card.module.css";

type TiltCardProps = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
};

const MAX_ROTATION = 10;

export function TiltCard({
                             children,
                             className = "",
                             style,
                         }: TiltCardProps) {
    const cardReference =
        useRef<HTMLElement | null>(null);

    function motionIsReduced(): boolean {
        return window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
    }

    function handlePointerMove(
        event: PointerEvent<HTMLElement>,
    ) {
        if (
            event.pointerType !== "mouse" ||
            motionIsReduced()
        ) {
            return;
        }

        const card = cardReference.current;

        if (!card) {
            return;
        }

        const rectangle =
            card.getBoundingClientRect();

        const pointerX =
            event.clientX - rectangle.left;
        const pointerY =
            event.clientY - rectangle.top;

        const horizontalPosition =
            pointerX / rectangle.width;
        const verticalPosition =
            pointerY / rectangle.height;

        const rotateY =
            (horizontalPosition - 0.5) *
            MAX_ROTATION *
            2;

        const rotateX =
            (verticalPosition - 0.5) *
            MAX_ROTATION *
            -2;

        card.style.setProperty(
            "--rotate-x",
            `${rotateX.toFixed(2)}deg`,
        );

        card.style.setProperty(
            "--rotate-y",
            `${rotateY.toFixed(2)}deg`,
        );

        card.style.setProperty(
            "--pointer-x",
            `${(horizontalPosition * 100).toFixed(2)}%`,
        );

        card.style.setProperty(
            "--pointer-y",
            `${(verticalPosition * 100).toFixed(2)}%`,
        );

        card.style.setProperty(
            "--glare-opacity",
            "1",
        );
    }

    function resetTilt() {
        const card = cardReference.current;

        if (!card) {
            return;
        }

        card.style.setProperty(
            "--rotate-x",
            "0deg",
        );

        card.style.setProperty(
            "--rotate-y",
            "0deg",
        );

        card.style.setProperty(
            "--pointer-x",
            "50%",
        );

        card.style.setProperty(
            "--pointer-y",
            "50%",
        );

        card.style.setProperty(
            "--glare-opacity",
            "0",
        );
    }

    const cardClassName = [
        styles.card,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={styles.scene}>
            <article
                className={cardClassName}
                style={style}
                ref={cardReference}
                onPointerMove={handlePointerMove}
                onPointerLeave={resetTilt}
                onPointerCancel={resetTilt}
            >
                {children}

                <span
                    className={styles.glare}
                    aria-hidden="true"
                />
            </article>
        </div>
    );
}