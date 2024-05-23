import { createMachine } from "xstate";
export const machine = createMachine(
  {
    id: "Submit Mon Hoc",
    initial: "Show Modal: Ki thi sap toi",
    states: {
      "Show Modal: Ki thi sap toi": {
        invoke: {
          input: {},
          src: "Load the lich thi information from server",
          onError: [
            {
              target: "Error While Loading information modal",
              actions: [],
            },
          ],
        },
        on: {
          close: [
            {
              target: "Show Modal: Huong dan su dung",
              actions: [],
            },
          ],
        },
      },
      "Show Modal: Huong dan su dung": {
        on: {
          close: [
            {
              target: "Input Form Empty",
              actions: [],
            },
          ],
        },
      },
      "Error While Loading information modal": {
        entry: {
          type: "Automatically re-fetch the api",
        },
        on: {
          refetch: [
            {
              target: "Show Modal: Ki thi sap toi",
              actions: [
                {
                  type: "show currently re-fetching the ki thi sap toi info",
                },
              ],
            },
          ],
        },
      },
      "Input Form Empty": {
        entry: [
          {
            type: "dimmed the form",
          },
          {
            type: "show place holder input",
          },
        ],
        on: {
          "user typing": [
            {
              target: "Input Form Filled",
              actions: [],
            },
          ],
        },
      },
      "Input Form Filled": {
        on: {
          "click to generate lich preview": [
            {
              target: "Good or bad information",
              actions: [
                {
                  type: "get the useful part of the inputted text",
                },
              ],
            },
          ],
        },
      },
      "Good or bad information": {
        entry: {
          type: "CheckIfTheUsefulPartisanygood",
        },
        on: {
          good: [
            {
              target: "GoToTheCalendarPreviewPage",
              actions: [],
            },
          ],
          bad: [
            {
              target: "InformationIsBad",
              actions: [],
            },
          ],
        },
      },
      GoToTheCalendarPreviewPage: {},
      InformationIsBad: {
        entry: {
          type: 'show modal say that "your information is not enough, do you actually copy the whole page"',
        },
        on: {
          close: [
            {
              target: "Show Modal: Huong dan su dung",
              actions: [],
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      "Automatically re-fetch the api": ({ context, event }) => {},
      "show currently re-fetching the ki thi sap toi info": ({
        context,
        event,
      }) => {},
      "get the useful part of the inputted text": ({ context, event }) => {},
      CheckIfTheUsefulPartisanygood: ({ context, event }) => {},
      "show modal say that 'your information is not enough, do you actually copy the whole page'":
        ({ context, event }) => {},
      "dimmed the form": ({ context, event }) => {},
      "show place holder input": ({ context, event }) => {},
    },
    actors: {
      "Load the lich thi information from server": fromPromise({
        /* ... */
      }),
    },
    guards: {},
    delays: {},
  },
);
