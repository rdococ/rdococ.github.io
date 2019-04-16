class firstClass {

	constructor() {
		this.lists = [];
	}

	getInfo() {
		return {
			id: 'firstClass',
			name: 'First Class',

			blocks: [
				{
					opcode: 'newList',
					blockType: Scratch.BlockType.REPORTER,
					text: 'new list',
					arguments: {}
				},
				{
					opcode: 'delList',
					blockType: Scratch.BlockType.COMMAND,
					text: 'delete list [LIST]',
					arguments: {
						LIST: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						}
					}
				}
			]
		}
	}
	
	newList() {
		var index = this.lists.findIndex(k => k==null);
		this.lists[index] = [];
		return index
	}
	
	delList({LIST}) {
		this.lists[LIST] = null;
	}
}

Scratch.extensions.register(new firstClass());