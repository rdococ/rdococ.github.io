class scriptVars {

	constructor() {
		this.vars = [];
	}

	getInfo() {
		return {
			id: 'scriptVars',
			name: 'Script Vars',

			blocks: [
				{
					opcode: 'withVar',
					blockType: Scratch.BlockType.CONDITIONAL,
					text: 'with variable',
					arguments: {}
				}
			]
		}
	}
	
	
	
	withVar(args, util) {
		if (typeof util.stackFrame.varUsed === 'undefined') {
			// Create variable here
			util.startBranch(1, true);
			util.stackFrame.varUsed = true;
		} else {
			// Remove variable here
		}
	}
}

Scratch.extensions.register(new scriptVars());