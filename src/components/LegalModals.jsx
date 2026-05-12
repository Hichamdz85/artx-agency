import { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import { PrivacyPolicy, CookiePolicy, LegalNotice } from "./LegalContent.jsx";

/**
 * Container that owns the three legal modals (Privacy / Cookies / Legal Notice).
 *
 * Modals are opened by dispatching a global custom event so any component
 * (Footer, links inside other modals, cookie banner) can trigger them
 * without having to lift state up.
 *
 *   window.dispatchEvent(new CustomEvent("artx:open-modal", { detail: "privacy" }));
 *   window.dispatchEvent(new CustomEvent("artx:open-modal", { detail: "cookie"  }));
 *   window.dispatchEvent(new CustomEvent("artx:open-modal", { detail: "legal"   }));
 */
export default function LegalModals() {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const handler = (e) => setCurrent(e.detail ?? null);
    window.addEventListener("artx:open-modal", handler);
    return () => window.removeEventListener("artx:open-modal", handler);
  }, []);

  const close = () => setCurrent(null);
  const openPrefs = () =>
    window.dispatchEvent(new CustomEvent("artx:open-cookie-preferences"));

  return (
    <>
      <Modal open={current === "privacy"} onClose={close} title="Privacy Policy">
        <PrivacyPolicy />
      </Modal>
      <Modal open={current === "cookie"} onClose={close} title="Cookie Policy">
        <CookiePolicy onOpenPreferences={openPrefs} />
      </Modal>
      <Modal open={current === "legal"} onClose={close} title="Legal Notice">
        <LegalNotice />
      </Modal>
    </>
  );
}
