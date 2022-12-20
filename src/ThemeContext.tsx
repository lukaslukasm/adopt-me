import { createContext } from "react";

const ThemeContext = createContext<[string, (theme: string) => void]>([
  "darkblue",
  () => undefined,
]);

export default ThemeContext;
