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
	
	newList() {
		var index = this.lists.findIndex(k => k==null);
		
		if (index < 0) {
			index = this.lists.length;
		}
		
		this.lists[index] = [];
		return index + 1
	}
	
	addItem({ITEM, LIST}) {
		var list = this.lists[LIST - 1]
		if (list !== null) {
			list[list.length] = ITEM;
		}
	}
	
	delItem({INDEX, LIST}) {
		var list = this.lists[LIST - 1];
		if (list !== null) {
			list.splice(INDEX - 1, 1);
		}
	}
	
	insItem({ITEM, INDEX, LIST}) {
		var list = this.lists[LIST - 1];
		if (list !== null) {
			list.splice(INDEX - 1, 0, ITEM);
		}
	}
	
	repItem({INDEX, LIST, ITEM}) {
		var list = this.lists[LIST - 1];
		if (list !== null) {
			list[INDEX - 1] = ITEM;
		}
	}
	
	getItem({INDEX, LIST}) {
		var list = this.lists[LIST - 1];
		if (list !== null) {
			return list[INDEX - 1];
		}
		return "";
	}
	
	delList({LIST}) {
		this.lists[LIST - 1] = null;
	}
}

Scratch.extensions.register(new firstClass());