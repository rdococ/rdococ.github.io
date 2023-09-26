// Requires sandboxing to be OFF!
// To run on TurboWarp: Click 'Custom Extensions', select the 'Text' tab, copy this source code into it and make sure 'Run Extension Without Sandbox' is ON.

(function(Scratch) {
    'use strict';
    
    class AnonymousLists {
        constructor() {
            this.resetAll();
            Scratch.vm.runtime.on("PROJECT_START", () => {
                this.resetAll();
            });
            Scratch.vm.runtime.on("PROJECT_STOP_ALL", () => {
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
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'a new list',
                        arguments: {}
                    },
                    {
                        opcode: 'delList',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete list [LIST]',
                        arguments: {
                            LIST: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'addItem',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'add [ITEM] to [LIST]',
                        arguments: {
                            ITEM: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "thing"
                            },
                            LIST: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'delItem',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete [INDEX] of [LIST]',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            LIST: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'insItem',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'insert [ITEM] at [INDEX] of [LIST]',
                        arguments: {
                            ITEM: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "thing"
                            },
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            LIST: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'repItem',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'replace [INDEX] of [LIST] with [ITEM]',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            LIST: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            ITEM: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "thing"
                            }
                        }
                    },
                    {
                        opcode: 'getItem',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'item [INDEX] of [LIST]',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            LIST: {
                                type: Scratch.ArgumentType.NUMBER,
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