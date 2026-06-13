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
  const isVideo = mediaType === "video";

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
        className={className}
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
  return (
    <video
      src={url}
      controls
      preload="metadata"
      playsInline
      className={className}
    />
  );
};
