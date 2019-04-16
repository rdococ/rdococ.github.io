var FirstClassLists = function (runtime) {
	this.runtime = runtime
};

FirstClassLists.prototype.getInfo = function () {
	return {
		id: "FirstClassLists",
		name: "First Class Lists",
		
		blocks = [
			{
				opcode: "test",
				blockType: BlockType.REPORTER,
				text: "test",
				arguments: []
			}
		]
	}
}

FirstClassLists.prototype.test = function () {
	return prompt("Prompt from extension:");
};

Scratch.extensions.register(new FirstClassLists());