import React from "react";

interface MediaRendererProps {
  url: string;
  mediaType: string | null;
  alt: string;
  className?: string;
}

export const MediaRenderer: React.FC<MediaRendererProps> = ({
  url,
  mediaType,
  alt,
  className = "w-full h-full object-cover",
}) => {
  const isVideo = typeof mediaType === 'string' && mediaType.toLowerCase() === "video";

  if (!url) {
    return (
      <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-muted-foreground text-xs">
        No media
      </div>
    );
  }

  if (!isVideo) {
    return (
      <img
        src={url}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`${className} transform-gpu will-change-transform`}
      />
    );
  }

  // Check if it is a YouTube URL
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={alt}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className={className}
      ></iframe>
    );
  }

  // Check if it is a Vimeo URL
  const vimeoMatch = url.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/
  );
  if (vimeoMatch) {
    const videoId = vimeoMatch[3];
    return (
      <iframe
        src={`https://player.vimeo.com/video/${videoId}`}
        title={alt}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className={className}
      ></iframe>
    );
  }

  // Otherwise treat as direct video file (e.g. mp4 upload from Supabase)
  const [isInView, setIsInView] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          // Pause when out of view to save CPU/battery
          node.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const node = videoRef.current;
    if (!node || !isInView || !url) return;

    // Explicitly set muted, playsInline, autoplay and loop properties on the DOM element
    // to force compliance with strict mobile autoplay policies
    node.muted = true;
    node.playsInline = true;
    node.autoplay = true;
    node.loop = true;

    let isPlaying = false;
    const playVideo = () => {
      if (!isPlaying && node.src) {
        node.play()
          .then(() => {
            isPlaying = true;
          })
          .catch((err) => {
            console.warn("Autoplay failed/prevented:", err);
          });
      }
    };

    // If readyState is already loaded enough, play immediately
    if (node.readyState >= 3) {
      playVideo();
    }

    node.addEventListener("canplay", playVideo);
    node.addEventListener("loadeddata", playVideo);

    // Backup timer in case readyState transitions don't fire events
    const timer = setTimeout(() => {
      if (node.readyState >= 2) {
        playVideo();
      }
    }, 200);

    return () => {
      node.removeEventListener("canplay", playVideo);
      node.removeEventListener("loadeddata", playVideo);
      clearTimeout(timer);
    };
  }, [isInView, url]);

  return (
    <video
      ref={videoRef}
      src={isInView ? url : undefined}
      autoPlay
      loop
      muted
      playsInline
      className={`${className} transform-gpu will-change-transform`}
      style={{ pointerEvents: "none" }}
    />
  );
};
