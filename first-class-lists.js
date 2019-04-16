class Test {

  constructor() {
    
  }

  getInfo() {
    return {
      id: 'test',
      name: 'Test',

      colour: '#ef5350',
      colourSecondary: '#f44336',
      colourTertiary: '#e53935',

      menuIconURI: icon,
      blockIconURI: icon,

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
}

Scratch.extensions.register(new Test());