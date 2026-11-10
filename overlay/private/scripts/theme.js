/*
 * Penumbra theme: loaded first in the main window.
 * - Forces dark mode.
 * - If the device is a phone, redirects to the dedicated mobile UI
 *   (unless the user picked "Desktop version" from the mobile UI).
 */
"use strict";

(() => {
    document.documentElement.classList.add("dark");

    let uiPref = null;
    try {
        uiPref = localStorage.getItem("penumbra.ui");
    }
    catch {}

    const ua = navigator.userAgent || "";
    const coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const smallScreen = Math.min(window.screen.width, window.screen.height) < 600;
    const isPhone = /iPhone|iPod|Windows Phone|Android.+Mobile|Mobile.+Firefox|Mobi/i.test(ua) || (coarse && smallScreen);

    if ((uiPref === "mobile") || ((uiPref !== "desktop") && isPhone))
        window.location.replace("mobile.html");

    // Label of the mobile UI link in the View menu (build.sh adds it in English)
    document.addEventListener("DOMContentLoaded", () => {
        const label = document.getElementById("mobileUiLabel");
        if (label && document.documentElement.lang.startsWith("es"))
            label.textContent = "Interfaz móvil";
    });

    // When switching back to the mobile UI from the menu, forget the "desktop" preference
    document.addEventListener("click", (e) => {
        if (e.target.closest && e.target.closest("#mobileUiLink")) {
            try {
                localStorage.removeItem("penumbra.ui");
            }
            catch {}
        }
    }, true);
})();
