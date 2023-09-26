// Requires sandboxing to be OFF!
// To run on TurboWarp: Click 'Custom Extensions', select the 'Text' tab, copy this source code into it and make sure 'Run Extension Without Sandbox' is ON.
// To run on E羊icques: Use the load_plugin URL parameter or paste the code directly into console and run.

(function(Scratch) {
    'use strict';
    
    class AnonymousLists {
        constructor(vm) {
            this.resetAll();
            vm.runtime.on("PROJECT_START", () => {
                this.resetAll();
            });
            vm.runtime.on("PROJECT_STOP_ALL", () => {
                this.resetAll();
            });
        }

        getInfo() {
            return {
                id: 'anonymousLists',
                name: 'Anonymous Lists',

                blocks: [
                    {
                        opcode: 'newList',
                        blockType: "reporter",
                        text: 'a new list',
                        arguments: {}
                    },
                    {
                        opcode: 'delList',
                        blockType: "command",
                        text: 'delete list [LIST]',
                        arguments: {
                            LIST: {
                                type: "number",
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'addItem',
                        blockType: "command",
                        text: 'add [ITEM] to [LIST]',
                        arguments: {
                            ITEM: {
                                type: "string",
                                defaultValue: "thing"
                            },
                            LIST: {
                                type: "number",
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'delItem',
                        blockType: "command",
                        text: 'delete [INDEX] of [LIST]',
                        arguments: {
                            INDEX: {
                                type: "number",
                                defaultValue: 1
                            },
                            LIST: {
                                type: "number",
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'insItem',
                        blockType: "command",
                        text: 'insert [ITEM] at [INDEX] of [LIST]',
                        arguments: {
                            ITEM: {
                                type: "string",
                                defaultValue: "thing"
                            },
                            INDEX: {
                                type: "number",
                                defaultValue: 1
                            },
                            LIST: {
                                type: "number",
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'repItem',
                        blockType: "command",
                        text: 'replace [INDEX] of [LIST] with [ITEM]',
                        arguments: {
                            INDEX: {
                                type: "number",
                                defaultValue: 1
                            },
                            LIST: {
                                type: "number",
                                defaultValue: 1
                            },
                            ITEM: {
                                type: "string",
                                defaultValue: "thing"
                            }
                        }
                    },
                    {
                        opcode: 'getItem',
                        blockType: "reporter",
                        text: 'item [INDEX] of [LIST]',
                        arguments: {
                            INDEX: {
                                type: "number",
                                defaultValue: 1
                            },
                            LIST: {
                                type: "number",
                                defaultValue: 1
                            }
                        }
                    },
                ]
            }
        }
        
        resetAll() {
            this.lists = [];
        }
        
        newList() {
            var index = this.lists.findIndex(k => k==null);
            
            if (index < 0) {
                index = this.lists.length;
            }
            
            this.lists[index] = [];
            return index + 1;
        }
        
        delList({LIST}) {
            this.lists[LIST - 1] = null;
        }
        
        addItem({ITEM, LIST}) {
            var list = this.lists[LIST - 1];
            if (list !== null) {
                list[list.length] = ITEM;
            }
        }
        
        delItem({INDEX, LIST}) {
            var list = this.lists[LIST - 1];
            if (list !== null) {
                if (INDEX >= 1 && INDEX <= list.length) {
                    list.splice(INDEX - 1, 1);
                }
            }
        }
        
        insItem({ITEM, INDEX, LIST}) {
            var list = this.lists[LIST - 1];
            if (list !== null) {
                if (INDEX >= 1 && INDEX <= list.length + 1) {
                    list.splice(INDEX - 1, 0, ITEM);
                }
            }
        }
        
        repItem({INDEX, LIST, ITEM}) {
            var list = this.lists[LIST - 1];
            if (list !== null) {
                if (INDEX >= 1 && INDEX <= list.length) {
                    list[INDEX - 1] = ITEM;
                }
            }
        }
        
        getItem({INDEX, LIST}) {
            var list = this.lists[LIST - 1];
            if (list !== null) {
                if (INDEX >= 1 && INDEX <= list.length && list[INDEX - 1] !== null) {
                    return list[INDEX - 1];
                }
            }
            return 0;
        }
    }

    // credit to showierdata9978 and CST
    const extensionClass = AnonymousLists;
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
            throw new Error("Anonymous Lists cannot run in sandboxed mode");
        } 
    } else {
        throw new Error("Scratch not detected");
    };
})(Scratch)