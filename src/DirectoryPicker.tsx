import { open } from "@tauri-apps/plugin-dialog";

function DirectoryPicker({
  setDirPath,
}: {
  setDirPath: (path: string) => void;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <button
        className="bg-accent-9 hover:bg-accent-10 text-grayscale-11 cursor-pointer rounded-sm px-4 py-2"
        onClick={() => {
          open({ directory: true }).then((path) => path && setDirPath(path));
        }}
      >
        Open Folder
      </button>
    </div>
  );
}

export { DirectoryPicker };
