import { createMachine, assign } from "xstate";
export const machine = createMachine(
  {
    context: initialContext,
    id: "authentication",
    initial: "unauthenticated",
    states: {
      unauthenticated: {
        on: {
          LOGIN: [
            {
              target: "authenticating",
              actions: [],
            },
          ],
        },
      },
      authenticating: {
        invoke: {
          input: {},
          src: "inline:authentication.authenticating#actor[0]",
          onDone: [
            {
              target: "authenticated",
              actions: [
                {
                  type: "inline:authentication.authenticating#done.invoke.authentication.authenticating:invocation[0][-1]#transition[0]",
                },
              ],
            },
          ],
          onError: [
            {
              target: "unauthenticated",
              actions: [
                {
                  type: "inline:authentication.authenticating#error.platform.authentication.authenticating:invocation[0][-1]#transition[0]",
                },
              ],
            },
          ],
        },
      },
      authenticated: {
        on: {
          TOKEN_EXPIRES: [
            {
              target: "tokenExpired",
              actions: [],
            },
          ],
          LOGOUT: [
            {
              target: "loggedOut",
              actions: [
                {
                  type: "clearTokens",
                },
              ],
            },
          ],
        },
      },
      tokenExpired: {
        on: {
          START_REFRESH: [
            {
              target: "refreshingToken",
              actions: [],
            },
          ],
          LOGOUT: [
            {
              target: "loggedOut",
              actions: [
                {
                  type: "clearTokens",
                },
              ],
            },
          ],
        },
      },
      loggedOut: {
        entry: {
          type: "clearTokens",
        },
        on: {
          RE_LOGIN: [
            {
              target: "unauthenticated",
              actions: [],
            },
          ],
        },
      },
      refreshingToken: {
        invoke: {
          input: {},
          src: "inline:authentication.refreshingToken#actor[0]",
          onDone: [
            {
              target: "authenticated",
              actions: [
                {
                  type: "inline:authentication.refreshingToken#done.invoke.authentication.refreshingToken:invocation[0][-1]#transition[0]",
                },
              ],
            },
          ],
          onError: [
            {
              target: "unauthenticated",
              actions: [
                {
                  type: "inline:authentication.refreshingToken#error.platform.authentication.refreshingToken:invocation[0][-1]#transition[0]",
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
      clearTokens: assign({
        accessToken: null,
        refreshToken: null,
        expiresIn: null,
        error: null,
      }),
      "inline:authentication.authenticating#done.invoke.authentication.authenticating:invocation[0][-1]#transition[0]":
        assign((context, event) => ({
          accessToken: event.data.accessToken,
          refreshToken: event.data.refreshToken,
          expiresIn: event.data.expiresIn,
          error: null,
        })),
      "inline:authentication.authenticating#error.platform.authentication.authenticating:invocation[0][-1]#transition[0]":
        assign({ error: (context, event) => event.data }),
      "inline:authentication.refreshingToken#done.invoke.authentication.refreshingToken:invocation[0][-1]#transition[0]":
        assign((context, event) => ({
          accessToken: event.data.accessToken,
          refreshToken: event.data.refreshToken,
          expiresIn: event.data.expiresIn,
          error: null,
        })),
      "inline:authentication.refreshingToken#error.platform.authentication.refreshingToken:invocation[0][-1]#transition[0]":
        assign({ error: (context, event) => event.data }),
    },
    actors: {
      "inline:authentication.authenticating#actor[0]": (context, event) =>
        authenticate(event.credentials),
      "inline:authentication.refreshingToken#actor[0]": (context) =>
        refreshToken(context.refreshToken),
    },
    guards: {},
    delays: {},
  },
);
