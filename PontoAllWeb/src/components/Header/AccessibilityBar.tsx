import { useContext } from "react";
import {
  MdContrast ,
  MdOutlineTextIncrease,
  MdOutlineTextDecrease
} from "react-icons/md";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function AccessibilityBar(){
  const { theme, fontSize, changeTheme, changeFontSize } =
    useContext(ThemeContext);

    const changeThemeHandler = () => {
      if (theme === "light") {
        changeTheme("alternative");
      } else {
        changeTheme("light");
      }
    };

    const increaseFontSize = () => {
      changeFontSize(fontSize + 2);
    };
    const decreaseFontSize = () => {
      changeFontSize(fontSize - 2);
    };

  return(
    <div className="h-8 w-full flex gap-2 items-center justify-end text-primary text-base p-1 border-b border-neutral-light bg-white shadow-sm">
      <button onClick={increaseFontSize}>
        <MdOutlineTextIncrease />
      </button>
      <button onClick={decreaseFontSize}>
        <MdOutlineTextDecrease  />
      </button>
      <button onClick={changeThemeHandler}>
        <MdContrast  />
      </button>
    </div>
  );
}
