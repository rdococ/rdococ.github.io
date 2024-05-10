// Script Variables - Scratch-compat Edition
// Run this code in the browser console, or make a bookmark with this link: 'javascript:fetch('https://rdococ.github.io/script-vars-compat.js').then(r=>r.text()).then(t=>eval(t))'

// Credit to LoganAbel for bookmark adaptation
function findReactComponent(element) {
    let fiber = element[Object.keys(element).find(key => key.startsWith("__reactInternalInstance$"))];
    if (fiber == null) return null;

    const go = fiber => {
        let parent = fiber.return;
        while (typeof parent.type == "string") {
            parent = parent.return;
        }
        return parent;
    };
    fiber = go(fiber);
    while(fiber.stateNode == null) {
        fiber = go(fiber);
    }
    return fiber.stateNode;
}
if (!window.vm) {
    window.vm = findReactComponent(document.getElementsByClassName("stage-header_stage-size-row_14N65")[0]).props.vm;
}

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
                    blockType: "reporter",
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
                    blockType: "reporter",
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
        return args.VALUE;
    }
    
    changeScriptVar(args) {
        const varFrame = this.findVarFrame(this.vm.runtime.sequencer.activeThread);
        varFrame[args.VAR] = (+varFrame[args.VAR] || 0) + (+args.VALUE || 0);
        return varFrame[args.VAR];
    }
    
}

// Credit to showierdata9978 and CST
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