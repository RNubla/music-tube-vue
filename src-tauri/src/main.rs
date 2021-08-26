#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

/* fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
 */

use tauri::{
  api::process::{Command, CommandEvent},
  Manager,
};

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let window = app.get_window("main").unwrap();
      tauri::async_runtime::spawn(async move {
        let (mut rx, mut child) = Command::new_sidecar("youtube-dl")
          .expect("failed to setup `youtube-dl` sidecar")
          .spawn()
          .expect("Failed to spawn packaged node");

        let mut i = 0;
        while let Some(event) = rx.recv().await {
          if let CommandEvent::Stdout(line) = event {
            window
              .emit("message", Some(format!("'{}'", line)))
              .expect("failed to emit event");
            i += 1;
            if i == 4 {
              child.write("message from Rust\n".as_bytes()).unwrap();
              i = 0;
            }
          }
        }
      });

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
