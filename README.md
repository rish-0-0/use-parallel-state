# Use Parallel State

Runs a state container in a dedicated web worker. 

## Global State

Yes, this can be used as a global state container which runs in a worker. One thing is you should know the id of the 
reducer you're storing state through :)

## Comlink

This package uses @surma blessing: Comlink. Super lightweight RPC implementation of self.postMessage

## Actor Model

The whole idea is to follow as close to the `useReducer` hook from React but it should run according to the Actor Model.

## State Management

If you call a `useParallelState` with an existing reducer's id, it will return the existing reducer's content.

## Buffering Updates

Comlink's internal engine is relied upon for this. The more frequent your updates, the more  queueing up happens, and the more thread hops
there are. Shouldn't be too much of a problem, as this is a heavy reducer which takes time to do a state update.

## Status

- In development
- Adding a deep json diff checker.
- Adding comprehensive tests