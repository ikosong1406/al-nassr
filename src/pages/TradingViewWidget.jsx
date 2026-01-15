// TradingViewWidget.jsx
import React, { useEffect, useRef, memo, useState } from "react";

function TradingViewWidget({ selectedPair = "EURUSD" }) {
  const container = useRef();

  useEffect(() => {
    // Clear previous widget
    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `FX_IDC:${selectedPair}`,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      details: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
      hide_side_toolbar: false,
      hide_top_toolbar: false,
      studies: ["STD;Volume@tv-basicstudies"],
      backgroundColor: "#0F0F0F",
      gridColor: "rgba(242, 242, 242, 0.06)",
      withdateranges: true,
    });

    container.current.appendChild(script);

    return () => {
      if (container.current && script.parentNode === container.current) {
        container.current.removeChild(script);
      }
    };
  }, [selectedPair]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
      <div className="tradingview-widget-copyright">
        <a
          href={`https://www.tradingview.com/symbols/${selectedPair}/`}
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">{selectedPair} chart</span>
        </a>
        <span className="trademark"> by TradingView</span>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
