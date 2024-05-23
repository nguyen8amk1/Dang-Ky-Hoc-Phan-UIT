import { createMachine } from "xstate";
export const machine = createMachine(
  {
    id: "Page Lich thi Generator",
    initial: "CHECK IF LICH THI HAVE BEEN GENERATED BEFORE",
    states: {
      "CHECK IF LICH THI HAVE BEEN GENERATED BEFORE": {
        entry: {
          type: "check if lich thi have been generated before",
        },
        on: {
          "haven't": [
            {
              target: "Submit thong tin dang ky hoc phan",
              actions: [],
              meta: {},
            },
          ],
          have: [
            {
              target: "Show Calendar Preview",
              actions: [],
            },
          ],
        },
      },
      "Submit thong tin dang ky hoc phan": {
        on: {
          submitted: [
            {
              target: "checking if there are any good information at all",
              actions: [],
            },
          ],
        },
      },
      "Show Calendar Preview": {},
      "checking if there are any good information at all": {
        entry: {
          type: "do the checking",
        },
        on: {
          good: [
            {
              target: "Show Calendar Preview",
              actions: [],
            },
          ],
          bad: [
            {
              target: "Submit thong tin dang ky hoc phan",
              actions: [
                {
                  type: "show information bad modal",
                },
              ],
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      "check if lich thi have been generated before": ({
        context,
        event,
      }) => {},
      "do the checking": ({ context, event }) => {},
      "show information bad modal": ({ context, event }) => {},
    },
    actors: {},
    guards: {},
    delays: {},
  },
);
