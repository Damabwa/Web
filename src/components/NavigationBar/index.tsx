export default function NavigationBar() {
  const buttons = [{}, {}, {}, {}];
  return (
    <div className="fixed bottom-0 flex items-center justify-around h-20 px-8 pt-2 pb-8 bg-white w-96 shadow-top-only">
      {buttons.map((item) => (
        <div className="w-12 h-12 bg-gray" />
      ))}
    </div>
  );
}
