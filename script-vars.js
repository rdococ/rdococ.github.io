// Script Variables - alternate version with better semantics, but incompatible with TurboWarp compilation.
// To run on TurboWarp: Click 'Advanced', check 'Disable Compiler' and click 'Save Settings To Project'. Click 'Custom Extensions', select the 'Text' tab, copy this source code into it and make sure 'Run Extension Without Sandbox' is ON.
// To run on E羊icques: Use the load_plugin URL parameter or paste the code directly into console and run.

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
                
                color1: "#FF4D6A",
                color2: "#FF4263",

                blocks: [
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
                ]
            }
        }
        
        findVarFrame(thread) {
            for (let i = thread.stackFrames.length - 1; i >= 0; i--) {
                const frame = thread.stackFrames[i];
                if (frame.params === null) {
                    continue;
                }
                if (frame.scriptVars === undefined) {
                    frame.scriptVars = Object.create(null);
                    
                    if (!frame.__scriptVarsMonkeyPatch) {
                        const oldReset = frame.reset;
                        frame.reset = function () {
                            delete frame.scriptVars;
                            oldReset.call(frame);
                        }
                        frame.__scriptVarsMonkeyPatch = true;
                    }
                }
                return frame.scriptVars;
            }
            if (thread.threadVars === undefined) {
                thread.threadVars = Object.create(null);
            }
            return thread.threadVars;
        }
        
        getScriptVar(args) {
            const value = this.findVarFrame(this.vm.runtime.sequencer.activeThread)[args.VAR];
            if (typeof value === "undefined") {
                return 0;
            }
            
            return value;
        }
        
        setScriptVar(args) {
            this.findVarFrame(this.vm.runtime.sequencer.activeThread)[args.VAR] = args.VALUE;
        }
        
        changeScriptVar(args) {
            const varFrame = this.findVarFrame(this.vm.runtime.sequencer.activeThread);
            varFrame[args.VAR] = (+varFrame[args.VAR] || 0) + (+args.VALUE || 0);
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