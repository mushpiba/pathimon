# Task 5 Report - Add Phaser Scenes And Battle UI

## What changed
- Registered the real gameplay scene flow in `app/src/game/config.ts`.
- Added shared Phaser UI helpers in `app/src/ui/draw.ts` and battle formatting helpers in `app/src/ui/battleUi.ts`.
- Added `TitleScene`, `StoryScene`, `BattleScene`, `ShopScene`, and `BossIntroScene` under `app/src/scenes`.
- Added focused tests for battle UI formatting and scene registration in `app/src/ui/battleUi.test.ts` and `app/src/game/config.test.ts`.

## Battle UI behavior delivered
- Unit panels render Korean name plus scientific name.
- HP is shown as a bar only, with no numeric HP text.
- No level text or level numbers are rendered.
- Defensive trait appears through the monster ability label.
- Status/effect area appears and falls back to `상태 정상` when empty.
- Four move buttons render from the active monster moveset.
- Hovering a move or first-tapping an unselected move updates the description panel before execution.
- Tapping the already-selected move executes it.
- Capsule is exposed as a separate command button.
- Boss capture is clearly blocked with `보스 포획 불가` and does not spend a capsule.

## Integration notes
- I kept the existing battle and state APIs intact.
- `BattleScene` adapts incoming `RunState` data by normalizing `story` and `bossIntro` phases into a playable battle state.
- `ShopScene` uses `advanceFromShop` for progression and branches into `BossIntroScene` when the returned phase is `bossIntro`.
- No protected files were modified.

## Verification
- `npm.cmd run test:run` -> 6 test files passed, 35 tests passed.
- `npm.cmd run build` -> production build succeeded.
- Dev serve check confirmed a listener on `127.0.0.1:5173` while Vite was running briefly.

## Concerns
- The shop buttons for `패시몬 각성` and `패시몬 진화` are present and interactive, but they currently show placeholder text because Task 5 did not specify backing mechanics for those actions.
- Vite build reports the existing large-chunk warning for the bundled Phaser app, but the build still succeeds.