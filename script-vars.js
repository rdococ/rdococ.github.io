// Requires sandboxing and compilation to both be OFF!
// To run on TurboWarp: Click 'Advanced', check 'Disable Compiler' and click 'Save Settings To Project'. Click 'Custom Extensions', select the 'Text' tab, copy this source code into it and make sure 'Run Extension Without Sandbox' is ON.

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
                    blockType: "command",
                    text: "set script var [VAR] to [VALUE]",
                    arguments: {
                        VAR: {
                            type: "string",
                            defaultValue: "variable"
                        },
                        VALUE: {
                            type: "string",
                            defaultValue: "0"
                        }
                    }
                },
                {
                    opcode: "changeScriptVar",
                    blockType: "command",
                    text: "change script var [VAR] by [VALUE]",
                    arguments: {
                        VAR: {
                            type: "string",
                            defaultValue: "variable"
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: "1"
                        }
                    }
                },
                {
                    opcode: "getScriptVar",
                    blockType: "reporter",
                    text: "script var [VAR]",
                    arguments: {
                        VAR: {
                            type: "string",
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
                            type: "string",
                            defaultValue: "variable",
                        },
                        NUM: {
                            type: "number",
                            defaultValue: "10",
                        },
                    },
                }, */
            ]
        }
    }
    
    setScriptVar(args) {
        const thread = this.vm.runtime.sequencer.activeThread;
        
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
        const thread = this.vm.runtime.sequencer.activeThread;
        
        for (let i = thread.stackFrames.length - 1; i >= 0; i--) {
            const frame = thread.stackFrames[i];
            if (frame.params === null) {
                continue;
            }
            if (frame.scriptVars === undefined) {
                frame.scriptVars = {};
            }
            frame.scriptVars[args.VAR] = (+frame.scriptVars[args.VAR] || 0) + (+args.VALUE || 0);
            return;
        }
        
        if (thread.threadVars === undefined) {
            thread.threadVars = {}
        }
        thread.threadVars[args.VAR] = (+thread.threadVars[args.VAR] || 0) + (+args.VALUE || 0);
    }
    
    getScriptVar(args) {
        const thread = this.vm.runtime.sequencer.activeThread;
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
        const thread = this.vm.runtime.sequencer.activeThread;
        
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
if (globalThis.vm) {
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
} else if (Scratch && Scratch.extensions) {
    if (Scratch.extensions.unsandboxed) {
        Scratch.extensions.register(new extensionClass(Scratch.vm));
    } else {
        throw new Error("Script Variables cannot run in sandboxed mode");
    } 
} else {
    throw new Error("Scratch not detected");
};