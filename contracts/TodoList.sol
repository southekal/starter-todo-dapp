pragma solidity ^0.5.0;

contract TodoList {
  uint public taskCount = 0;

  event TaskCreated(
    uint id,
    string title,
    string content,
    bool completed  
  );

  event TaskCompleted(
    uint id, 
    bool completed
  );

  struct Task {
    uint id;
    string title;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  constructor () public {
    createTask("test title", "dummy content");
  }

  function createTask(string memory _title, string memory _content) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _title, _content, false);
    emit TaskCreated(taskCount, _title, _content, false);
  }

  function toggleCompleted(uint _taskId) public {
    Task memory _task = tasks[_taskId];
    _task.completed = !_task.completed;
    tasks[_taskId].completed = _task.completed;
    emit TaskCompleted(_taskId, _task.completed);
  }

}