// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Emitter;
use std::thread;
use std::time::Duration;
use std::process::Command;
use device_query::{DeviceQuery, DeviceState};

// Quick helper to check macOS accessibility permissions without crashing
fn macos_has_accessibility() -> bool {
    if cfg!(target_os = "macos") {
        // Run a lightweight osascript snippet to see if AXIsProcessTrusted passes
        let output = Command::new("osascript")
            .arg("-e")
            .arg("tell application \"System Events\" to count of UI elements")
            .output();
        
        return match output {
            Ok(out) => out.status.success(),
            Err(_) => false,
        };
    }
    true
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.handle().clone();

            thread::spawn(move || {
                // Wait a brief moment for the system to settle, then check permissions
                thread::sleep(Duration::from_secs(1));

                if !macos_has_accessibility() {
                    println!("⚠️ [Warning] Accessibility permissions missing. Global typing animations disabled.");
                    // You could also emit an event to the frontend here to show a popup notice!
                    return;
                }

                let device_state = DeviceState::new();
                let mut prev_pressed_count = 0;

                loop {
                    let keys = device_state.get_keys();
                    let current_pressed_count = keys.len();

                    if current_pressed_count > prev_pressed_count {
                        let _ = app_handle.emit("global-typing", ());
                    }

                    prev_pressed_count = current_pressed_count;
                    thread::sleep(Duration::from_millis(30));
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}