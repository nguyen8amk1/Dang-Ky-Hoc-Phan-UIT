import { createMachine } from "xstate";
export const machine = createMachine(
  {
    id: "Routing",
    initial: "Page: Homepage",
    states: {
      "Page: Homepage": {
        on: {
          "navigate: to google calendar generator": [
            {
              target: "Page: Google Calendar Generator",
              actions: [],
              meta: {},
            },
          ],
        },
      },
      "Page: Google Calendar Generator": {
        entry: {
          type: "checkIfUserLoggedIn",
        },
        on: {
          "navigate: to homepage": [
            {
              target: "Page: Homepage",
              actions: [
                {
                  type: "navigate to homepage",
                },
              ],
            },
          ],
          "user don't want to logged in": [
            {
              target: "Page: Homepage",
              actions: [
                {
                  type: "navigate to homepage",
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
      checkIfUserLoggedIn: ({ context, event }) => {},
      "navigate to homepage": ({ context, event }) => {},
    },
    actors: {},
    guards: {},
    delays: {},
  },
);
