class Test {

	constructor() {
		
	}

	getInfo() {
		return {
			id: 'test',
			name: 'Test',

			blocks: [
				{
					opcode: 'test',
					blockType: Scratch.BlockType.REPORTER,
					text: 'test',
					arguments: {}
				}
			]
		}
	}
	
	test() {
		return "yay!"
	}
}

Scratch.extensions.register(new Test());