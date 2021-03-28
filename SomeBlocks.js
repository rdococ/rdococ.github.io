class SomeBlocks {
	constructor (runtime) {
		/**
		 * Store this for later communication with the Scratch VM runtime.
		 * If this extension is running in a sandbox then `runtime` is an async proxy object.
		 * @type {Runtime}
		 */
		this.runtime = runtime;
	};

	getInfo () {
		return {
			id: 'someBlocks',
			name: 'Some Blocks',
			blocks: [
				{
					opcode: 'myReporter',
					blockType: "Reporter",
					text: 'letter [LETTER_NUM] of [TEXT]',
					arguments: {
						LETTER_NUM: {
							type: "String",
							defaultValue: '1'
						},
						TEXT: {
							type: "String",
							defaultValue: 'text'
						}
					}
				}
			]
		};
	};
	
	myReporter (args) {
		return args.TEXT.charAt(args.LETTER_NUM);
	};
}

