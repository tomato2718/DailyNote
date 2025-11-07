import "./App.css";

import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

import { DirectoryPicker } from "./DirectoryPicker";
import { MainContent } from "./MainContent";
import { type DirectoryTree } from "./Nav";

function App() {
  const [dirTree, setDirTree] = useState<DirectoryTree | null>(null);

  async function get_tree(path: string): Promise<DirectoryTree> {
    return await invoke<DirectoryTree>("get_tree", { path: path });
  }

  return (
    <main className="h-screen w-screen bg-grayscale-1 text-grayscale-11 dark">
      {dirTree ? (
        <MainContent directoryTree={dirTree} />
      ) : (
        <DirectoryPicker
          onSelect={(path) => {
            get_tree(path).then(setDirTree);
          }}
        />
      )}
    </main>
  );
}

export default App;
