import type { ReactNode } from "react";

interface SlotProps {
  children?: ReactNode;
}

function Header({ children }: { children?: ReactNode }) {
  return (
    <div className="fixed top-0 z-30 flex items-center justify-center h-12 px-4 w-full max-w-[430px] bg-violet500">
      {children}
    </div>
  );
}

Header.Left = function Left({ children }: SlotProps) {
  return (
    <div className="absolute left-0 flex items-center h-full">{children}</div>
  );
};

Header.Center = function Center({ children }: SlotProps) {
  return <div>{children}</div>;
};

Header.Right = function Right({ children }: SlotProps) {
  return (
    <div className="absolute right-0 flex items-center h-full">{children}</div>
  );
};

export default Header;
