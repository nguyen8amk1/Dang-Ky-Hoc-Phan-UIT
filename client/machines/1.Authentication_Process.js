import { createMachine } from "xstate";
export const machine = createMachine(
  {
    id: "Authentication",
    initial: "CHECK IF USER LOGIN SESSION VALID",
    states: {
      "CHECK IF USER LOGIN SESSION VALID": {
        invoke: {
          input: {},
          src: "checkIfUserLoggedIn",
          onError: [
            {
              target: "LOGGED OUT",
              actions: [
                {
                  type: "displaySystemHaveProblemToast",
                },
              ],
            },
          ],
          onDone: [
            {
              target: "LOGGED IN",
              guard: "REPORT IS LOG IN STILL VALID",
              actions: [
                {
                  type: "assignUserDetailsToContext",
                },
              ],
            },
            {
              target: "LOGGED OUT",
              guard: "REPORT LOG IN NOT VALID",
              actions: [
                {
                  type: "displayAuthenInfoNotValid",
                },
              ],
            },
          ],
        },
      },
      "LOGGED OUT": {
        entry: [
          {
            type: "entry/ clearUserDetailsFromContext",
          },
          {
            type: "entry/ navigateToHomePage",
          },
        ],
        on: {
          Login: [
            {
              target: "LOGGING IN",
              actions: [],
            },
          ],
        },
      },
      "LOGGED IN": {
        on: {
          Logout: [
            {
              target: "LOGGED OUT",
              actions: [
                {
                  type: "displayLogoutToast",
                },
              ],
            },
          ],
          "Checking Session": [
            {
              target: "CHECK IF USER LOGIN SESSION VALID",
              actions: [],
            },
          ],
        },
      },
      "LOGGING IN": {
        invoke: {
          input: {},
          src: "callGoogleAuth",
          onError: [
            {
              target: "LOGGED OUT",
              actions: [
                {
                  type: "displaySystemHaveProblemToast",
                },
              ],
            },
          ],
          onDone: [
            {
              target: "LOGGED IN",
              guard: "REPORT USER LOGIN SUCCESS",
              actions: [
                {
                  type: "displayLoginSuccessToast",
                },
              ],
            },
            {
              target: "LOGGED IN",
              guard: "REPORT USER LOGIN FAIL",
              actions: [
                {
                  type: "displayLoginFailToast",
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
      displayLogoutToast: ({ context, event }) => {},
      displayLoginFailToast: ({ context, event }) => {},
      displayLoginSuccessToast: ({ context, event }) => {},
      displayAuthenInfoNotValid: ({ context, event }) => {},
      "entry/ navigateToHomePage": ({ context, event }) => {},
      assignUserDetailsToContext: ({ context, event }) => {},
      displaySystemHaveProblemToast: ({ context, event }) => {},
      "entry/ clearUserDetailsFromContext": ({ context, event }) => {},
    },
    actors: {
      callGoogleAuth: fromPromise({
        /* ... */
      }),
      checkIfUserLoggedIn: fromPromise({
        /* ... */
      }),
    },
    guards: {
      "REPORT USER LOGIN FAIL": ({ context, event }, params) => {
        return false;
      },
      "REPORT LOG IN NOT VALID": ({ context, event }, params) => {
        return false;
      },
      "REPORT USER LOGIN SUCCESS": ({ context, event }, params) => {
        return false;
      },
      "REPORT IS LOG IN STILL VALID": ({ context, event }, params) => {
        return false;
      },
    },
    delays: {},
  },
);
