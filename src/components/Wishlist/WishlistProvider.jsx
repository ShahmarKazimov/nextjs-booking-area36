"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "area36:wishlist";
const WishlistContext = createContext(null);

function readStorage() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
    } catch {
        return [];
    }
}

export function WishlistProvider({ children }) {
    const [slugs, setSlugs] = useState([]);
    const [ready, setReady] = useState(false);

    // Load after mount (avoids SSR/hydration mismatch) and stay in sync across tabs
    useEffect(() => {
        setSlugs(readStorage());
        setReady(true);
        const onStorage = (e) => {
            if (e.key === STORAGE_KEY) setSlugs(readStorage());
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const toggle = useCallback((slug) => {
        setSlugs((prev) => {
            const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
            try {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch {
                /* storage unavailable – keep in-memory state only */
            }
            return next;
        });
    }, []);

    const value = useMemo(
        () => ({ slugs, ready, toggle, has: (slug) => slugs.includes(slug) }),
        [slugs, ready, toggle]
    );

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
    return ctx;
}
