import { useBarcode } from "next-barcode";
import Image from "next/image";
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export default function Card2({
  number,
  imageUrl,
  heading,
  description,
  barcodeValue,
  sideImageUrl, // right side image next to description
}) {
  const cardWidth = 411;
  const imageWidth = 387;
  const sideGap = (cardWidth - imageWidth) / 2; // 12px
  const numberBoxHeight = 29;

  const { inputRef } = useBarcode({
    value: barcodeValue,
    options: {
      format: "CODE128",
      width: 1,
      height: 22,
      displayValue: false,
      background: "transparent",
      lineColor: "#111",
      margin: 0,
    },
  });

  return (
    <div
      style={{
        width: cardWidth,
        height: 700,
        border: "3px solid #e0e0e0",
        overflow: "hidden",
        position: "relative",
        background: "#f9f9f8",
        boxSizing: "border-box",
      }}
      className="shadow-xl "
    >
      {/* Number at top-left of image (Zen Dots font) */}
      <div
        style={{
          position: "absolute",
          top: sideGap,
          left: sideGap,
          width: 46,
          height: numberBoxHeight,
          display: "flex",
          alignItems: "center",
          fontFamily: "'Zen Dots', sans-serif",
          fontWeight: 400,
          fontSize: 24,
          color: "#4B5563",
          letterSpacing: "2%",
          zIndex: 2,
        }}
      >
        {number}
      </div>

      {/* Image container */}
      <div
        style={{
          width: imageWidth,
          height: 461,
          position: "relative",
          margin: `${sideGap}px auto 12px auto`,
          overflow: "hidden",
          WebkitClipPath: "url(#card-shape)",
          clipPath: "url(#card-shape)",
          background: "#d9d9d9",
        }}
      >
        <Image
          src={imageUrl}
          alt={heading}
          fill
          sizes="(max-width: 768px) 100vw, 387px"
          style={{
            objectFit: "cover",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable={false}
          priority
        />
        <svg width="0" height="0">
          <clipPath id="card-shape" clipPathUnits="userSpaceOnUse">
            <path d="M35.8649 32.911H2.16216H1V462H294.446C294.446 462 313.149 433.508 325.824 433.508H387V1H65.5C55.4279 11.637 46.7297 32.911 35.8649 32.911Z" />
          </clipPath>
        </svg>
      </div>

      {/* Barcode container positioned bottom right of image */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          right: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          background: "transparent",
          minWidth: 30,
          zIndex: 9999,
          transform: "scale(0.7)",
          transformOrigin: "right bottom",
        }}
      >
        <svg ref={inputRef} style={{ width: "40px", height: 11 }} />
        <span
          style={{
            fontSize: 5,
            color: "#555",
            letterSpacing: "0.5px",
            fontFamily: "monospace",
            marginTop: 2,
            textAlign: "right",
            userSelect: "none",
          }}
        >
          {barcodeValue}
        </span>
      </div>

      {/* Heading below the image, moved 5% upward */}
      <div
        style={{
          marginTop: 20,
          fontFamily: "'Jost', sans-serif",
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: "3%",
          lineHeight: 1.2,
          color: "#000",
          width: "auto",
          height: 40,
          display: "flex",
          alignItems: "center",
          marginBottom: 12,
          paddingLeft: sideGap,
          paddingRight: sideGap,
          marginBottom: 10,
          position: "relative",
          top: "-.5%",
          left: 0,
        }}
      >
        {heading}
      </div>

      {/* Container div with description and right side image */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
          paddingLeft: sideGap,
          paddingRight: sideGap,
        }}
      >
        {/* Description truncated to ~140 characters */}
        <div
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: "#444",
            lineHeight: 1.14,
            letterSpacing: "1px",
            width: "70%",
            textAlign: "justify",
            minHeight: 60,
            marginTop: "20px",
            overflow: "hidden",
          }}
        >
          {truncateText(description, 200)}
        </div>

        {/* Right image - 35% width (sideImageUrl prop) */}
        <div
          style={{
            width: "35%",
            height: 93,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {sideImageUrl && (
            <Image
              src={sideImageUrl}
              alt=""
              fill
              sizes="140px"
              style={{ objectFit: "cover", userSelect: "none" }}
              draggable={false}
              priority={false}
            />
          )}
        </div>
      </div>

      {/* Card line image at bottom right, no background, empty alt */}
      <div
        style={{
          position: "absolute",
          right: sideGap,
          bottom: 40,
          width: "30%",
          zIndex: 3,
        }}
      >
        <Image
          src="/images/card_line.png"
          alt=""
          width={200}
          height={200}
          style={{ width: "100%", height: "auto", background: "none" }}
          priority={false}
        />
      </div>
    </div>
  );
}
