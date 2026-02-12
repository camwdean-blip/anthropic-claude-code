"use client";

import { useState } from "react";

export default function DownloadPdfButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("playbook-content");
      if (!element) return;

      // html2canvas can't resolve CSS custom properties (var(--xxx))
      // so we temporarily inline the computed values, generate the PDF,
      // then restore the original styles
      const root = document.documentElement;
      const computed = getComputedStyle(root);
      const originals: { el: HTMLElement; style: string }[] = [];

      const allElements = [element, ...Array.from(element.querySelectorAll("*"))] as HTMLElement[];

      for (const el of allElements) {
        const inlineStyle = el.getAttribute("style");
        if (!inlineStyle || !inlineStyle.includes("var(--")) continue;

        originals.push({ el, style: inlineStyle });

        const resolved = inlineStyle.replace(
          /var\(--([^)]+)\)/g,
          (_, varName) => computed.getPropertyValue(`--${varName}`).trim() || ""
        );
        el.setAttribute("style", resolved);
      }

      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: "The-AI-Playbook.pdf",
        image: { type: "jpeg", quality: 0.92 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          backgroundColor: "#faf8f5",
        },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait",
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(opt).from(element).save();

      // Restore original styles with CSS variables
      for (const { el, style } of originals) {
        el.setAttribute("style", style);
      }
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("There was an issue generating the PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="inline-flex items-center gap-3 rounded-lg px-8 py-4 text-lg font-semibold text-white shadow-md transition-all disabled:opacity-60"
      style={{ backgroundColor: "var(--teal)" }}
    >
      {isGenerating ? (
        <>
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Generating PDF...
        </>
      ) : (
        <>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download as PDF
        </>
      )}
    </button>
  );
}
