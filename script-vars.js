// Requires sandboxing to be turned off!
// To run on TurboWarp: Click 'Custom Extensions', select the 'Text' tab, copy this source code into it and make sure 'Run Extension Without Sandbox' is ON.

(function(Scratch) {
    'use strict';
    
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
                        opcode: "usingScriptVars",
                        blockType: Scratch.BlockType.LOOP,
                        text: "using script vars",
                        arguments: {},
                    },
                    "---",
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
                    },
                    "---",
                    {
                        opcode: "forEachScriptVar",
                        blockType: Scratch.BlockType.LOOP,
                        text: "for script var [VAR] in [VALUE]",
                        arguments: {
                            VAR: {
                                type: "string",
                                defaultValue: "variable"
                            },
                            VALUE: {
                                type: "number",
                                defaultValue: "10"
                            }
                        },
                    },
                ]
            }
        }
        
        findVarFrame(name, thread) {
            if (typeof thread.varFrames === "undefined") {
                thread.varFrames = [{}];
                return thread.varFrames[0];
            }
            
            /* for (let i = thread.varFrames.length - 1; i >= 0; i--) {
                if (thread.varFrames[i][name]) {
                    return thread.varFrames[i];
                }
            } */
            return thread.varFrames[thread.varFrames.length - 1];
        }
        
        setScriptVar(args, util) {
            this.findVarFrame(args.VAR, util.thread)[args.VAR] = args.VALUE;
        }
        
        changeScriptVar(args, util) {
            const varFrame = this.findVarFrame(args.VAR, util.thread);
            varFrame[args.VAR] = Scratch.Cast.toNumber(varFrame[args.VAR]) + Scratch.Cast.toNumber(args.VALUE);
        }
        
        getScriptVar(args, util) {
            const value = this.findVarFrame(args.VAR, util.thread)[args.VAR];
            if (typeof value === "undefined") {
                return 0;
            }
            
            return value;
        }
        
        usingScriptVars(args, util) {
            const thread = util.thread;
            
            if (typeof util.stackFrame.used === "undefined") {
                util.stackFrame.used = true;
                if (typeof thread.varFrames === "undefined") {
                    thread.varFrames = [];
                }
                thread.varFrames.push({});
                
                return true;
            } else {
                thread.varFrames.pop();
                if (thread.varFrames.length === 0) {
                    delete thread.varFrames;
                }
            }
        }
        
        forEachScriptVar(args, util) {
            const thread = util.thread;
            
            if (typeof util.stackFrame.index === "undefined") {
                util.stackFrame.index = 0;
            }
            if (util.stackFrame.index < Number(args.VALUE)) {
                util.stackFrame.index++;
                this.setScriptVar({VAR: args.VAR, VALUE: util.stackFrame.index}, util);
                return true;
            }
        }
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
})(Scratch)