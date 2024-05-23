**THESE MACHINES WASN'T MEANT TO BE USED IN THE CODEBASE, IT USE FOR VISUALIZATION ON THE PAGE stately.ai/registry/editor**

## Authentication State machine (how to intergrate with our app)
-> **RUN IT IN RESPONSE TO CERTAIN LIFECYCLE EVENTS AND USER ACTIONS**.
Initialization: The authService starts when the application loads, checking the current authentication status.
Checking Authentication: Each page or route change ensures the user is authenticated.
User Actions: User actions like login and logout are handled by dispatching events to the state machine.

## Token Expiration: **TIMERS ARE SET TO MANAGE TOKEN EXPIRATION AND REFRESHES**.

To handle token expiration and refreshing, 
    you need to set up mechanisms that trigger these events based on the token's expiration time. 

vd: 
`setTimeout(() => {
authService.send('TOKEN_EXPIRES');
}, expirationTime);`

This involves using timers or intervals within the state machine's actions to dispatch the appropriate events.
[More information](https://stackoverflow.com/questions/30826726/how-to-identify-if-the-oauth-token-has-expired)

