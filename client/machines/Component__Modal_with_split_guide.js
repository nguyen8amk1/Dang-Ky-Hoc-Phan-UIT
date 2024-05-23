import { createMachine } from "xstate";
export const machine = createMachine(
  {
    id: "Modal with split view tutorials",
    initial: "Modal_Shown",
    states: {
      Modal_Shown: {
        states: {
          "Right split gif tutorial": {
            states: {
              "Gif playing": {},
            },
            on: {
              choose: [
                {
                  target:
                    "#Modal with split view tutorials.go to corresponse  right page mapping",
                  actions: [],
                },
              ],
            },
            type: "parallel",
          },
          "Left split gif tutorial": {
            states: {
              "Gif Playing": {},
            },
            on: {
              choose: [
                {
                  target:
                    "#Modal with split view tutorials.go to corresponse left page mapping",
                  actions: [],
                },
              ],
            },
            type: "parallel",
          },
        },
        type: "parallel",
      },
      "go to corresponse left page mapping": {
        entry: {
          type: "send by left event",
        },
      },
      "go to corresponse  right page mapping": {
        entry: {
          type: "send by right event",
        },
      },
    },
  },
  {
    actions: {
      "send by left event": ({ context, event }) => {},
      "send by right event": ({ context, event }) => {},
    },
    actors: {},
    guards: {},
    delays: {},
  },
);
