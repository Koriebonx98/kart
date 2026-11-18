# Kart Rush — Arcade Grand Prix

A browser-based 3D kart-racing starter project for the Game OS `games/` directory.

## Run locally
From this folder run:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

*Note: Embedded fallback tracks, cups, drivers, and karts are included so the menu and race start reliably even if JSON fetches are blocked or run offline.*

## Controls
- **1 Local Player:** `W/A/S/D` **or** `Arrow Keys` **or** `Gamepad 1` (Left Stick / D-Pad to steer, `RT` / `A` / `Cross` to accelerate, `LT` / `B` / `Circle` to brake)
- **2 Local Players:** Player 1 (`W/A/S/D` or `Gamepad 1`) · Player 2 (`Arrow Keys` or `Gamepad 2`)
- **3–4 Local Players:** Gamepads 1–4
- **Pause / Resume:** `Escape`

## Add to Game.OS.Userdata
Copy the `kart-rush` folder into `Game.OS.Userdata/games/`.
