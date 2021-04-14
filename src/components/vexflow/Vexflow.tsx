import React, { useRef, useEffect } from "react";
import VexFlow from "vexflow";
import "./Vexflow.scss";

const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote, Accidental } = VF;

export function Score({
  note,
  clef = "treble",
  vhWidth,
  vhHeight,
  keySignature = "C",
}: {
  note: string;
  clef?: string;
  vhWidth: number;
  vhHeight: number;
  keySignature?: string;
}) {
  const container = useRef<HTMLCanvasElement>(null);

  function calculateCanvasSize(width: number, height: number) {
    if (width > 540) {
      return 400;
    }
    if (width <= 360 || height <= 680) {
      return 240;
    }
    return 300;
  }

  function calculateScale(width: number, height: number) {
    if (width > 540) {
      return 2.5;
    }
    if (width <= 360 || height <= 680) {
      return 1.6;
    }
    return 2;
  }

  useEffect(() => {
    if (container?.current) {
      const renderer = new Renderer(
        container.current,
        Renderer.Backends.CANVAS
      );

      const canvasSize = calculateCanvasSize(vhWidth, vhHeight);
      renderer.resize(canvasSize, canvasSize);

      const context = renderer.getContext();

      context.scale(
        calculateScale(vhWidth, vhHeight),
        calculateScale(vhWidth, vhHeight)
      );
      context.setFont("Arial", 10);
      context.setBackgroundFillStyle("#eed");

      const stave = new Stave(
        keySignature == "A" ? 0 : 20,
        40,
        keySignature == "A" ? 150 : 100
      );

      stave.addClef(clef);
      stave.addKeySignature(keySignature);
      stave.setContext(context).draw();

      const notes = [
        new StaveNote({
          clef: clef,
          keys: [note],
          duration: "q",
          auto_stem: true,
        }),
      ];

      const voice = new VF.Voice({ num_beats: 1, beat_value: 4 });
      voice.addTickables(notes);

      new Formatter().formatToStave([voice], stave);

      voice.draw(context, stave);
    }
  }, [clef, note]);

  return (
    <div className="vexflow-container">
      <canvas ref={container} />
    </div>
  );
}

export function RhythmScore({
  duration,
  vhWidth,
  vhHeight,
  accidental,
}: {
  duration: string;
  vhWidth: number;
  vhHeight: number;
  accidental: string | undefined;
}) {
  const container = useRef<HTMLCanvasElement>(null);

  function calculateCanvasSize(width: number, height: number) {
    if (width > 540) {
      return 240;
    }
    if (width <= 360 || height <= 680) {
      return 180;
    }
    return 180;
  }

  function calculateScale(width: number, height: number) {
    if (width > 540) {
      return 2.5;
    }
    if (width <= 360 || height <= 680) {
      return 2;
    }
    return 2;
  }

  useEffect(() => {
    if (container?.current) {
      const renderer = new Renderer(
        container.current,
        Renderer.Backends.CANVAS
      );

      const canvasSize = calculateCanvasSize(vhWidth, vhHeight);
      renderer.resize(canvasSize, canvasSize);

      const context = renderer.getContext();

      context.scale(
        calculateScale(vhWidth, vhHeight),
        calculateScale(vhWidth, vhHeight)
      );
      context.setFont("Arial", 10);
      context.setBackgroundFillStyle("#eed");

      const stave = new Stave(
        accidental != undefined ? 20 : 10,
        20,
        accidental != undefined ? 40 : 50,
        {
          num_lines: accidental != undefined ? 0 : 1,
        }
      );

      var notes;

      stave.setContext(context).draw();
      if (accidental != undefined) {
        notes = [
          new StaveNote({
            keys: ["f/5"],
            duration: "q",
            clef: "treble",
          }).addAccidental(0, new Accidental(accidental)),
        ];
      } else {
        notes = [
          new StaveNote({
            keys: ["f/5"],
            duration: duration,
            clef: "treble",
          }),
        ];
      }

      var num_beats;
      if (duration.includes("q")) {
        num_beats = 1;
      } else if (duration.includes("h")) {
        num_beats = 2;
      } else if (duration.includes("w")) {
        num_beats = 4;
      } else if (duration.includes("8")) {
        num_beats = 0.5;
      } else {
        num_beats = 0.25;
      }

      const voice = new VF.Voice({ num_beats: num_beats, beat_value: 4 });
      voice.addTickables(notes);

      new Formatter().formatToStave([voice], stave);

      voice.draw(context, stave);
    }
  }, [duration, accidental]);

  return (
    <div className="vexflow-container">
      <canvas ref={container} />
    </div>
  );
}
