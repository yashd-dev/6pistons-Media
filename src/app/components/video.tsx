"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}

export default function VideoOverlay({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true });
  const [isFixed, setIsFixed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= viewportHeight) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set video speed when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Adjust this value to change speed (1 is normal, 2 is double speed)
    }
  }, []);

  const getBrightness = () => {
    if (!isInView) return 0;
    return isMobile ? 0.4 : 0.3;
  };

  return (
    <div ref={ref} className="h-screen h-[100svh]  max-h-[1080px] relative">
      <div
        className={`${"fixed"} top-0 left-0 w-full h-screen z-10 bg-background`}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          style={{
            filter: `brightness(${getBrightness()})`,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="relative z-20 w-full h-full">{children}</div>
    </div>
  );
}
