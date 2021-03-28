class scriptVars {

	constructor() {
	}

	getInfo() {
		return {
			id: 'scriptVars',
			name: 'Script Vars',

			blocks: [
				{
					opcode: 'setScriptVar',
					blockType: Scratch.BlockType.COMMAND,
					text: 'set script var [NAME] to [VALUE]',
					arguments: {
						NAME: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: 'var'
						},
						VALUE: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: '0'
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
	
	setScriptVar(args, util) {
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