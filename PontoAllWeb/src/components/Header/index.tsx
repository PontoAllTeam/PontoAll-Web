import AccessibilityBar from "./AccessibilityBar";

export default function Header() {

  return (
    <div className="w-full">
      <AccessibilityBar />
      <header className="bg-white flex items-center justify-between h-16 shadow z-10 w-full">
        <div className="px-4">
        </div>
      </header>
    </div>
  );
}
