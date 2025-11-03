import "./App.css";
import { Navigator } from "./Nav";
import { useState } from "react";
import { DirectoryPicker } from "./DirectoryPicker";

function App() {
  const [dirPath, setDirPath] = useState<string | null>(null);

  return (
    <main className="h-screen w-screen bg-grayscale-1 text-grayscale-11 dark">
      {dirPath ? (
        <MainContent dirPath={dirPath} />
      ) : (
        <DirectoryPicker setDirPath={setDirPath} />
      )}
    </main>
  );
}

export default App;

function MainContent({ dirPath }: { dirPath: string }) {
  return (
    <div className="flex">
      <Navigator />
      <span>{dirPath}</span>
    </div>
  );
}
