class scriptVars {

	constructor() {
	}

	getInfo() {
		return {
			id: 'scriptVars',
			name: 'Script Vars',

			blocks: [
				{
					opcode: 'createScriptVar',
					blockType: Scratch.BlockType.COMMAND,
					text: 'create script var [NAME]',
					arguments: {
						NAME: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: 'var'
						}
					}
				},
				{
					opcode: 'getScriptVar',
					blockType: Scratch.BlockType.REPORTER,
					text: 'script var [NAME]',
					arguments: {
						NAME: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: 'var'
						}
					}
				}
			]
		}
	}
	
	createScriptVar(args, util) {
		if (typeof util.stackFrame.vars === 'undefined') {
			util.stackFrame.vars = {};
		}
		util.stackFrame.vars[args[0]] = args[1];
	}
	
	getScriptVar(args, util) {
		if (typeof util.stackFrame.vars === 'undefined') {
			return 0;
		}
		if (typeof util.stackFrame.vars[args[0]] === 'undefined') {
			return 0;
		}
		
		return util.stackFrame.vars[args[0]];
	}
}

Scratch.extensions.register(new scriptVars());