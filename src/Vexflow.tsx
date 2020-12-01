import React, { useRef, useEffect } from "react";
import VexFlow from "vexflow";
import { makeStyles, createStyles } from "@material-ui/core";

const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote } = VF;

export function Score({
  note,
  clef = "treble",
}: {
  note: string;
  clef?: string;
}) {
  const container = useRef<HTMLCanvasElement>(null);
  const styles = useStyles();

  useEffect(() => {
    if (container?.current) {
      const renderer = new Renderer(
        container.current,
        Renderer.Backends.CANVAS
      );

      const canvasSize = 300;
      renderer.resize(canvasSize, canvasSize);

      const context = renderer.getContext();

      context.scale(2, 2);
      context.setFont("Arial", 10);
      context.setBackgroundFillStyle("#eed");

      const stave = new Stave(20, 40, 100);

      stave.addClef(clef);
      stave.setContext(context).draw();

      const notes = [
        new StaveNote({
          clef: "treble",
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
    <div className={styles.container}>
      <canvas ref={container} className={styles.container} />
    </div>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "center",
      marginTop: "-4rem",
      marginLeft: "0.5rem",
    },
  })
);
