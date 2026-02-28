import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./BounceCards.css";

function BounceCards({
    cards = [],
    transformStyles = [],
    containerWidth = 700,
    containerHeight = 420,
    animationDelay = 0.4,
    animationStagger = 0.08,
    easeType = "elastic.out(1, 0.5)",
    className = "",
}) {
    const cardRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(null);

    /* ── Initial bounce-in ── */
    useEffect(() => {
        const els = cardRefs.current.filter(Boolean);
        gsap.set(els, { opacity: 0, y: -70 });
        gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: animationStagger,
            delay: animationDelay,
            ease: easeType,
        });
    }, [animationDelay, animationStagger, easeType]);

    /* ── Enlarge / collapse ── */
    useEffect(() => {
        cardRefs.current.filter(Boolean).forEach((el, i) => {
            if (i === activeIndex) {
                gsap.to(el, { scale: 2.1, zIndex: 30, duration: 0.55, ease: "back.out(1.4)" });
            } else {
                gsap.to(el, {
                    scale: activeIndex === null ? 1 : 0.82,
                    opacity: activeIndex === null ? 1 : 0.5,
                    zIndex: 1,
                    duration: 0.4,
                    ease: "power3.out",
                });
            }
        });
    }, [activeIndex]);

    const handleClick = (i) =>
        setActiveIndex((prev) => (prev === i ? null : i));

    return (
        <div
            className={`bc-wrapper ${className}`}
            style={{ width: containerWidth, height: containerHeight }}
        >
            {cards.map((card, i) => (
                <div
                    key={i}
                    ref={(el) => (cardRefs.current[i] = el)}
                    className={`bc-card${activeIndex === i ? " bc-active" : ""}`}
                    style={{ transform: transformStyles[i] || "none" }}
                    onClick={() => handleClick(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleClick(i)}
                    aria-label={card.title}
                    aria-expanded={activeIndex === i}
                >
                    {/* Full-quality image — never touched by any filter */}
                    <img src={card.image} alt={card.title} draggable={false} />

                    {/* Always-visible thin label at the bottom (category + title) */}
                    <div className="bc-label">
                        <span className="bc-badge">{card.category}</span>
                        <h3>{card.title}</h3>
                    </div>

                    {/* Gradient scrim — fades in on click for text contrast */}
                    <div className="bc-scrim" />

                    {/* Detail panel — revealed on click */}
                    <div className="bc-detail" aria-hidden={activeIndex !== i}>
                        <span className="bc-badge">{card.category}</span>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <div className="bc-tags">
                            {card.technologies?.map((t) => (
                                <span key={t} className="bc-tag">{t}</span>
                            ))}
                        </div>
                        <a
                            href={card.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bc-demo-btn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            View Demo ↗
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BounceCards;
