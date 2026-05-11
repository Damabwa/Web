interface SlotProps {
  children?: React.ReactNode;
}

function Header({ children }: { children?: React.ReactNode }) {
  return (
    <div className="fixed top-0 z-30 flex items-center justify-center h-12 px-4 w-full max-w-[430px] bg-violet500">
      {children}
    </div>
  );
}

Header.Left = function Left({ children }: SlotProps) {
  return <div className="absolute left-0 cursor-pointer">{children}</div>;
};

Header.Center = function Center({ children }: SlotProps) {
  return <div>{children}</div>;
};

Header.Right = function Right({ children }: SlotProps) {
  return <div className="absolute right-0 cursor-pointer">{children}</div>;
};

export default Header;
