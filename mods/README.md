# User mods

Planned Windows layout:

```text
GameOS/
  mods/
    my-mod/
      manifest.json
      tracks/custom-track.json
      drivers/custom-driver.json
      karts/custom-kart.json
```

A manifest should declare each asset path. The native loader must canonicalize paths, reject `..` traversal, validate schema versions and numeric ranges, enforce file-size limits, and load only JSON. Never execute mod-provided JavaScript, DLLs, EXEs or scripts.

The browser Mod Studio currently exports individual JSON files or a single JSON pack. A proper in-game import, preview and install workflow is a later integration task.
