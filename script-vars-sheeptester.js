// Requires sandboxing and compilation to both be OFF!
// To run on TurboWarp: Click 'Advanced' and check 'Disable Compiler'. Click 'Custom Extensions', select the 'Text' tab, copy this source code into it and make sure 'Run Extension Without Sandbox' is ON.

class ScriptVars {
    constructor(vm) {
        this.vm = vm;
    }

    getInfo() {
        return {
            id: "scriptVars",
            name: "Script Variables",
            
            color1: "#EB4129",
            color2: "#DE2D21",

            blocks: [
                {
                    opcode: "setScriptVar",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "set script var [VAR] to [VALUE]",
                    arguments: {
                        VAR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "variable"
                        },
                        VALUE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "0"
                        }
                    }
                },
                {
                    opcode: "changeScriptVar",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "change script var [VAR] by [VALUE]",
                    arguments: {
                        VAR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "variable"
                        },
                        VALUE: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: "1"
                        }
                    }
                },
                {
                    opcode: "getScriptVar",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "script var [VAR]",
                    arguments: {
                        VAR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "variable"
                        }
                    }
                }
                /* "---",
                {
                    opcode: "forEachScriptVar",
                    blockType: Scratch.BlockType.LOOP,
                    text: "for each [VAR] in [NUM]",
                    arguments: {
                        VAR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "variable",
                        },
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: "10",
                        },
                    },
                }, */
            ]
        }
    }
    
    setScriptVar(args) {
        const thread = vm.runtime.sequencer.activeThread;
        
        for (let i = thread.stackFrames.length - 1; i >= 0; i--) {
            const frame = thread.stackFrames[i];
            if (frame.params === null) {
                continue;
            }
            if (frame.scriptVars === undefined) {
                frame.scriptVars = {};
            }
            frame.scriptVars[args.VAR] = args.VALUE;
            return;
        }
        
        if (thread.threadVars === undefined) {
            thread.threadVars = {}
        }
        thread.threadVars[args.VAR] = args.VALUE;
    }
    
    changeScriptVar(args) {
        const thread = vm.runtime.sequencer.activeThread;
        
        for (let i = thread.stackFrames.length - 1; i >= 0; i--) {
            const frame = thread.stackFrames[i];
            if (frame.params === null) {
                continue;
            }
            if (frame.scriptVars === undefined) {
                frame.scriptVars = {};
            }
            frame.scriptVars[args.VAR] = Scratch.Cast.toNumber(frame.scriptVars[args.VAR]) + Scratch.Cast.toNumber(args.VALUE);
            return;
        }
        
        if (thread.threadVars === undefined) {
            thread.threadVars = {}
        }
        thread.threadVars[args.VAR] = Scratch.Cast.toNumber(thread.threadVars[args.VAR]) + Scratch.Cast.toNumber(args.VALUE);
    }
    
    getScriptVar(args) {
        const thread = vm.runtime.sequencer.activeThread;
        var param = null;
        
        for (let i = thread.stackFrames.length - 1; i >= 0; i--) {
            const frame = thread.stackFrames[i];
            if (frame.params === null) {
                continue;
            }
            if (frame.scriptVars === undefined) {
                continue;
            }
            if (frame.scriptVars[args.VAR] !== undefined) {
                param = frame.scriptVars[args.VAR];
                break;
            }
        }
        if (param === null && thread.threadVars !== undefined) {
            param = thread.threadVars[args.VAR];
        }
        
        if (param === null) {
            return 0;
        }
        return param;
    }
    
    /* forEachScriptVar(args) {
        const thread = vm.runtime.sequencer.activeThread;
        
        if (typeof util.stackFrame.index === "undefined") {
            util.stackFrame.index = 0;
        }
        if (util.stackFrame.index < Number(args.NUM)) {
            util.stackFrame.index++;
            this.setScriptVar({VAR: args.VAR, VALUE: util.stackFrame.index});
            return true;
        }
    } */
}

// credit to showierdata9978 and CST
const extensionClass = ScriptVars;
if (Scratch) {
    if (Scratch.extensions.unsandboxed) {
        Scratch.extensions.register(new extensionClass(Scratch.vm));
    } else {
        throw new Error("Script Variables cannot run in sandboxed mode");
    } 
} else if (globalThis.vm) {
    // Support loading the extension "the old way"
    // (running the code in something like the browser console
    // or E羊icques' load_plugin URL parameter)
    const extensionInstance = new extensionClass(globalThis.vm);
    const serviceName = globalThis.vm.extensionManager._registerInternalExtension(
        extensionInstance
    );
    globalThis.vm.extensionManager._loadedExtensions.set(
        extensionInstance.getInfo().id, serviceName
    );
} else {
    throw new Error("Scratch not detected");
};