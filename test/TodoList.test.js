const TodoList = artifacts.require("./TodoList.sol")

contract('TodoList', (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed()
  })

  it("deploys successfully", async() => {
    const address = await this.todoList.address
    assert.notEqual(address, null)
    assert.notEqual(address, '0x0')
    assert.notEqual(address, '')
    assert.notEqual(address, undefined)
  })

  it("displays tasks", async() => {
    const taskCount = await this.todoList.taskCount()
    const task = await this.todoList.tasks(1)
    assert.equal(taskCount.length, 1)
    assert.equal(task.title, "test title")
    assert.equal(task.content, "dummy content")
  })

  it("creates tasks", async() => {
    const task = await this.todoList.createTask("automated test title", "automated test content")
    const taskCount = await this.todoList.taskCount()
    const taskData = await this.todoList.tasks(2)
    assert.equal(taskCount, 2, "task count should match")
    assert.equal(taskData.title, "automated test title", "title should match")
    assert.equal(taskData.content, "automated test content", "content should match")
    const event = task.logs[0].args
    assert.equal(event.title, "automated test title")
    assert.equal(event.content, "automated test content")
  })

  it("toggles task completion", async() => {
    const result = await this.todoList.toggleCompleted(1);
    const task = await this.todoList.tasks(1);
    assert.equal(task.completed, true);
    const event = result.logs[0].args;
    assert.equal(event.id, 1);
    assert.equal(event.completed, true);
  })

})