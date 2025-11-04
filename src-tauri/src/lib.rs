mod tree;

#[tauri::command]
fn get_tree(path: &str) -> Result<tree::DirectoryTree, &str> {
    tree::get_tree(path)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_tree])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
