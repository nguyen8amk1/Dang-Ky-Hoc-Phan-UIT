import { createMachine } from "xstate";
export const machine = createMachine(
  {
    id: "Google Calendar Generator Routing",
    initial: "Show a Place Holder Modal While Checking",
    states: {
      "Show a Place Holder Modal While Checking": {
        invoke: {
          input: {},
          src: "checkIfDangTrongMuaThi",
          onDone: [
            {
              target:
                "Modal Do You Want to Generate Lich Thi with 2 options with brief video tutorial (split view)",
              guard: "dangtrongmuathi",
              actions: [],
            },
            {
              target:
                "GCG- Welcome Modal with 2 options with brief video tutorial (split view)",
              actions: [],
            },
          ],
          onError: [
            {
              target:
                "GCG- Welcome Modal with 2 options with brief video tutorial (split view)",
              actions: [],
            },
          ],
        },
      },
      "Modal Do You Want to Generate Lich Thi with 2 options with brief video tutorial (split view)":
        {
          on: {
            no: [
              {
                target:
                  "GCG- Welcome Modal with 2 options with brief video tutorial (split view)",
                actions: [],
              },
            ],
            "yes (choosing either left or right)": [
              {
                target: "Pulling Lich Thi Data",
                actions: [],
              },
            ],
          },
        },
      "GCG- Welcome Modal with 2 options with brief video tutorial (split view)":
        {
          on: {
            "user choose submit by tkb": [
              {
                target: "Submit TKB",
                actions: [],
              },
            ],
            "use choose to submit using thongtindkhp": [
              {
                target: "Submit Mon Hoc Page",
                actions: [],
              },
            ],
          },
        },
      "Pulling Lich Thi Data": {
        entry: {
          type: "show loading",
        },
        invoke: {
          src: "pull lich thi data",
          input: {},
          onDone: [
            {
              target: "Submit TKB",
              guard: "by tkb",
              actions: [
                {
                  type: "set lichthi boolean",
                },
              ],
            },
            {
              target: "Submit Mon Hoc Page",
              actions: [
                {
                  type: "set lichthi boolean",
                },
              ],
            },
          ],
          onError: [
            {
              target:
                "Modal: Something wrong with pulling lich thi data, i will try again",
              actions: [],
            },
          ],
        },
      },
      "Submit TKB": {
        on: {
          "tkb sumitted": [
            {
              target: "Calendar Type Checking",
              actions: [],
            },
          ],
        },
      },
      "Submit Mon Hoc Page": {
        on: {
          monhocsubmitted: [
            {
              target: "Calendar Type Checking",
              actions: [],
            },
          ],
        },
      },
      "Modal: Something wrong with pulling lich thi data, i will try again": {
        entry: {
          type: "show modal",
        },
        after: {
          "500": [
            {
              target:
                "#Google Calendar Generator Routing.Pulling Lich Thi Data",
              actions: [],
            },
          ],
        },
      },
      "Calendar Type Checking": {
        entry: {
          type: "checkCalendarType",
        },
        on: {
          "lich thi": [
            {
              target: "CalendarPreview",
              actions: [
                {
                  type: "process some lich thi data",
                },
              ],
            },
          ],
          "lich hoc": [
            {
              target: "CalendarPreview",
              actions: [
                {
                  type: "process some lich hoc data",
                },
              ],
            },
          ],
        },
      },
      CalendarPreview: {
        on: {
          "want to upload another tkb": [
            {
              target: "2 options split view",
              actions: [],
            },
          ],
        },
      },
      "2 options split view": {
        on: {
          "by tkb html": [
            {
              target: "Submit TKB",
              actions: [],
            },
          ],
          "by thong tin dkhp": [
            {
              target: "Submit Mon Hoc Page",
              actions: [],
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      checkCalendarType: ({ context, event }) => {},
      "set lichthi boolean": ({ context, event }) => {},
      "process some lich hoc data": ({ context, event }) => {},
      "process some lich thi data": ({ context, event }) => {},
      "show loading": ({ context, event }) => {},
      "show modal": ({ context, event }) => {},
    },
    actors: {
      checkIfDangTrongMuaThi: fromPromise({
        /* ... */
      }),
      "pull lich thi data": fromPromise({
        /* ... */
      }),
    },
    guards: {
      dangtrongmuathi: ({ context, event }, params) => {
        return false;
      },
      "by tkb": ({ context, event }, params) => {
        return false;
      },
    },
    delays: {},
  },
);
