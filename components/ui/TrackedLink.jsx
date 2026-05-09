"use client";

import { track } from "@vercel/analytics";

export function TrackedLink({ eventName, eventProps, children, onClick, ...props }) {
  return (
    <a
      {...props}
      onClick={(event) => {
        if (eventName) track(eventName, eventProps);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
