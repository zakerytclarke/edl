# edl
Event Driven Programming Language

EDL is a lightweight programming language ideally suited for event driven systems, such as UI or microcontrollers.

## Motivation
We wanted a simple language that could be used on projects to easily descricbe state and transitions.


## Language Specification
 An EDL Program has three parts:
 
 1. Bindings
Bindings are used to map inputs to outputs

```
 temperature<->port1
```

The variable temperature is now bound to the state of port1


You can also create more complicated bindings:
```
temperature=4*port1+1
```
 2. Triggers & Events
 Triggers specify when an event should run. They are composed of a series of boolean statements followed by a ':'
 Events specify how to change state. They are tab indented below a trigger
 ```
 button1<->port1
 button2<->port2
 
 led<->port3
 
 button1=on:
  led=on 
  
 button2=on:
  led=on
 
 button1=on&button2=on:
  led=off
 
  
 ```

