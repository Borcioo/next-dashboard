"use client";
import React, { useState, useEffect, forwardRef } from "react";
import Cookies from "js-cookie";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const Persistence = {
  LocalStorage: "LocalStorage",
  Cookie: "Cookie",
  None: "None",
} as const;

interface PersistenceOptions {
  method: keyof typeof Persistence;
  key: string;
}

function saveStateToStorage(
  isOpen: boolean,
  options: PersistenceOptions
): void {
  switch (options.method) {
    case "LocalStorage":
      if (typeof window !== "undefined") {
        localStorage.setItem(options.key, JSON.stringify(isOpen));
      }
      break;
    case "Cookie":
      Cookies.set(options.key, JSON.stringify(isOpen), { expires: 7 });
      break;
    case "None":
    default:
      break;
  }
}

interface ForAsideDetail {
  aside?: string;
}

export function useSidebarState(
  initialState: boolean,
  persistenceOptions: PersistenceOptions,
  onOpen?: () => void,
  name?: string
): [boolean, (state: boolean) => void] {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const handleStateChange = (event: CustomEvent<boolean>) => {
      setIsOpen(!isOpen);

      if (persistenceOptions.method !== "None") {
        saveStateToStorage(!isOpen, persistenceOptions);
      }
      if (onOpen) {
        onOpen();
      }
    };

    window.addEventListener("forAside", (event) => {
      const detail = (event as CustomEvent<ForAsideDetail>).detail;
      if (detail.aside === name) {
        handleStateChange(event as CustomEvent<boolean>);
      }
    });

    return () =>
      window.removeEventListener("forAside", (event) => {
        const detail = (event as CustomEvent<ForAsideDetail>).detail;
        if (detail.aside === name) {
          handleStateChange(event as CustomEvent<boolean>);
        }
      });
  }, [persistenceOptions, isOpen, onOpen, name]);

  return [
    isOpen,
    (state: boolean) => {
      setIsOpen(state);
      saveStateToStorage(state, persistenceOptions);
    },
  ];
}

export function toggleSidebar({ forAside }: { forAside?: string } = {}): void {
  window.dispatchEvent(
    new CustomEvent("forAside", {
      detail: {
        aside: forAside,
      },
    })
  );
}

const asideClasses = cva(
  [
    "overflow-hidden",
    "transition-all duration-300",
    "flex flex-col border-r border-gray-700 bg-gray-800 text-white",
  ],
  {
    variants: {
      open: {
        true: "w-64",
        false: "w-0",
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

type PersistenceMethod = keyof typeof Persistence;

type AsidePropsBase = {
  children: React.ReactNode;
  onOpen?: () => void;
  name?: string;
};

type AsidePropsWithPersistence = AsidePropsBase & {
  persistence: {
    method: Exclude<PersistenceMethod, "None">;
    key: string;
  };
  initialOpen: boolean;
};

type AsidePropsWithoutPersistence = AsidePropsBase & {
  persistence?: { method: "None"; key: string };
  initialOpen?: boolean;
};

type AsideProps = AsidePropsWithPersistence | AsidePropsWithoutPersistence;

const Aside: React.FC<AsideProps> = ({
  children,
  persistence = { method: "None", key: "" },
  initialOpen = true,
  name,
  onOpen,
}) => {
  const [isOpen] = useSidebarState(initialOpen, persistence, onOpen, name);

  return <aside className={asideClasses({ open: isOpen })}>{children}</aside>;
};
Aside.displayName = "Aside";

const AsideTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    forAside: string;
  }
>(({ forAside, children, className, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      onClick={() => toggleSidebar({ forAside })}
      className={cn(
        "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer",
        className
      )}
    >
      {children ?? "Open Sidebar"}
    </button>
  );
});
AsideTrigger.displayName = "AsideTrigger";

const AsideClose = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button {...props} ref={ref} onClick={() => toggleSidebar()}>
      Close Sidebar
    </button>
  );
});
AsideClose.displayName = "AsideClose";

const asideContentClasses = cva("h-full", { variants: { open: { true: "" } } });

const AsideContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {}
>((props, ref) => {
  const { ...rest } = props;

  return (
    <div {...rest} ref={ref} className={asideContentClasses({ open: true })}>
      {props.children}
    </div>
  );
});
AsideContent.displayName = "AsideContent";

const AsideHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cn("p-4 border-b border-gray-700", className)}
    >
      {children}
    </div>
  );
});
AsideHeader.displayName = "AsideHeader";

const AsideFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cn("p-4 border-t border-gray-700", className)}
  >
    {children}
  </div>
));
AsideFooter.displayName = "AsideFooter";

const AsideTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, ...props }, ref) => (
  <h4 {...props} ref={ref} className={cn("text-lg font-semibold")}>
    {children}
  </h4>
));
AsideTitle.displayName = "AsideTitle";

const AsideDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => (
  <p
    {...props}
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
  >
    {children}
  </p>
));
AsideDescription.displayName = "AsideDescription";

export {
  Aside,
  AsideTrigger,
  AsideClose,
  AsideContent,
  AsideHeader,
  AsideFooter,
  AsideTitle,
  AsideDescription,
};
