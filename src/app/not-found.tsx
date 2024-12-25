import Link from "next/link";
import VideoOverlay from "./components/video";

export default function NotFound() {
  return (
    <div className="bg-background z-20 bg-[url('/noise.png')] bg-[length:50px_50px] bg-[0_0] h-screen">
      <VideoOverlay>
        {" "}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-foreground font-hanken flex flex-col items-center justify-center h-screen">
          <h1 className=" text-6xl md:text-9xl lg:text-[11rem] font-black text-BrandRed uppercase max-w-prose font-bigShoulders">
            Error 404
          </h1>
          <p>Oops! This page was not found :( </p>
          <Link href="/" className="hover:underline hover:text-BrandRed/70">
            Return Home!
          </Link>{" "}
        </div>
      </VideoOverlay>
    </div>
  );
}
