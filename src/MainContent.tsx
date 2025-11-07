import { Navigator, type DirectoryTree } from "./Nav";

function MainContent({ directoryTree }: { directoryTree: DirectoryTree }) {
  return (
    <div className="flex h-full">
      <Navigator directoryTree={directoryTree} />
      <div className="grows p-2">{JSON.stringify(directoryTree)}</div>
    </div>
  );
}

export { MainContent };
