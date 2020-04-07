App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },

  loadWeb3: async() => {
    if (typeof web3 != 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("please connect to metamask");
      App.renderMetaMaskAlert();
    }

    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        await ethereum.enable()
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        console.log(error);
      }
    }
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      console.log("i am here 2")
      console.log(window.web3)
      web3.eth.sendTransaction({/* ... */})
    }
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }, 

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    const todoList = await $.getJSON('TodoList.json')
    App.contracts.TodoList =TruffleContract(todoList)
    App.contracts.TodoList.setProvider(App.web3Provider)

    App.todoList = await App.contracts.TodoList.deployed()
  }, 

  render: async() => {
    if (App.loading) {
      return
    }

    App.setLoading(true)

    $('#account').html(App.account)

    await App.renderTasks()

    App.setLoading(false)
  },

  renderTasks: async () => {
    const taskCount = await App.todoList.taskCount()
    const $taskTemplate = $('.taskTemplate')

    for (var i=1; i<=taskCount; i++) {
      const task = await App.todoList.tasks(i)
      const taskId = task[0].toNumber()
      const taskTitle = task[1]
      const taskContent = task[2]
      const taskCompleted = task[3]
      console.log(taskTitle);
      console.log(taskContent);
    

      const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.title').html(taskTitle)
      $newTaskTemplate.find('.content').html(taskContent)
      $newTaskTemplate.find('input')
                      .prop('name', taskId)
                      .prop('checked', taskCompleted)
                      .on('click', App.toggleCompleted)

      // Put the task in the correct list
      if (taskCompleted) {
        $('#completedTaskList').append($newTaskTemplate)
      } else {
        $('#taskList').append($newTaskTemplate)
      }

      // Show the task
      $newTaskTemplate.show()
    }
  },

  createTask: async() => {
    App.setLoading(true)
    const title = $('#newTaskTitle').val()
    const content = $('#newTask').val()
    await App.todoList.createTask(title, content)
    window.location.reload()
  },

  toggleCompleted: async(e) => {
    App.setLoading(true)
    const taskId = e.target.name;
    await App.todoList.toggleCompleted(taskId);
    window.location.reload()
  },

  renderMetaMaskAlert: async() => {
    const data = "<div class='alert alert-danger'>download metamask plugin</div>"
    $('#account').html(data);
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $("#loader")
    const content = $("#content")

    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
