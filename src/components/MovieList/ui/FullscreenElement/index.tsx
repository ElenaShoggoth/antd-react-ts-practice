import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { MovieList } from "../MovieList";
import { AnimatedButton } from "../AnimatedButton";

export const FullscreenElement = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  //что бы избежать доп перерендеров, используем реф для хранения состояния
  const originalSize = useRef({ width: "", height: "" });

  useLayoutEffect(() => {
    const element = ref.current;
    if (element) {
      if (isFullScreen) {
        // Сохраняем исходные размеры
        originalSize.current.width = element.style.width;
        originalSize.current.height = element.style.height;
        // Устанавливаем размеры по размеру окна
        element.style.width = `${window.innerWidth}px`;
        element.style.height = `${window.innerHeight}px`;
      } else {
        // Возвращаем элемент к исходным размерам
        element.style.width = originalSize.current.width || "auto";
        element.style.height = originalSize.current.height || "auto";
      }
    }
  }, [isFullScreen]);

  const AnimatedButtonClick = useCallback(() => {
    setIsFullScreen(!isFullScreen);
  }, [isFullScreen]);

  return (
    <div>
      <AnimatedButton
        handleClickButton={AnimatedButtonClick}
        title={"Toggle Fullscreen"}
      />
      <div
        style={{
          margin: "40px",
        }}
        ref={ref}
      >
        {" "}
        <MovieList />
        {isFullScreen ? "Fullscreen Mode" : "Normal Mode"}
      </div>
    </div>
  );
};
