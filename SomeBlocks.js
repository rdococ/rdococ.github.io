class SomeBlocks {
	constructor (runtime) {
		this.runtime = runtime;
	};

	getInfo () {
		return {
			id: 'someBlocks',
			name: 'Some Blocks',
			blocks: [
				{
					opcode: 'myReporter',
					blockType: "reporter",
					text: 'letter [LETTER_NUM] of [TEXT]',
					arguments: {
						LETTER_NUM: {
							type: "string",
							defaultValue: '1'
						},
						TEXT: {
							type: "string",
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

