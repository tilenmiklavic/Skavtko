import * as React from "react";

function isMouseEvent(event) {
    return event.nativeEvent instanceof MouseEvent;
  }

  function isTouchEvent({ nativeEvent }) {
    return window.TouchEvent
      ? nativeEvent instanceof TouchEvent
      : "touches" in nativeEvent;
  }

export function useLongPress(callback, options = {}) {
    const { threshold = 400, onStart, onFinish, onCancel, allowScroll = false, scrollThreshold = 20 } = options;
    const isLongPressActive = React.useRef(false);
    const isPressed = React.useRef(false);
    const timerId = React.useRef();
    let startY;
  
    return React.useMemo(() => {
      if (typeof callback !== "function") {
        return {};
      } 
  
      const start = (event) => {
        if (!event.touches) {
          return;
        }

        startY = event.touches[0].clientY;
        if (!isMouseEvent(event) && !isTouchEvent(event)) return;
  
        if (onStart) {
          onStart(event);
        }
  
        isPressed.current = true;
        timerId.current = setTimeout(() => {
          callback(event);
          isLongPressActive.current = true;
        }, threshold);
      };
  
      const cancel = (event) => {
        if (!isMouseEvent(event) && !isTouchEvent(event)) return;
  
        if (isLongPressActive.current) {
          if (onFinish) {
            onFinish(event);
          }
        } else if (isPressed.current) {
          if (onCancel) {
            onCancel(event);
          }
        }
  
        isLongPressActive.current = false;
        isPressed.current = false;
  
        if (timerId.current) {
          window.clearTimeout(timerId.current);
        }
      };

      const move = (event) => {
        if (!event.touches) {
          return
        }

        if (!allowScroll && Math.abs(event.touches[0].clientY - startY) > scrollThreshold) {
          cancel(event)
        }
      }
  
      const mouseHandlers = {
        onMouseDown: start,
        onMouseUp: cancel,
        onMouseLeave: cancel,
        onMouseMove: move,
      };
  
      const touchHandlers = {
        onTouchStart: start,
        onTouchEnd: cancel,
        onTouchMove: move,
      };
  
      return {
        ...mouseHandlers,
        ...touchHandlers,
      };
    }, [callback, threshold, onCancel, onFinish, onStart]);
}