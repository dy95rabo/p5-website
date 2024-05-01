import { defineStore } from "pinia";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    users: [
      new User(-1, "test@test.com", "Anana", "name", "test", [
        new Todo("Nice looking list", "you are right, this looks nice", false, ["#Test"]),
        new Todo("Test2", "this is a test", false, ["#DasGibtHoffentlichEine6"]),
        new Todo("Test3", "this is a test", true, []),
        new Todo("Test4", "this is a test", true, []),
      ]),
    ],
    activeUserId: -1,
    filter: "",
  }),
  getters: {
    activeUser() {
      return this.getUserById(this.activeUserId);
    },
    doneTodos() {
      return this.filteredTodos.filter((it) => it.isDone);
    },
    openTodos() {
      return this.filteredTodos.filter((it) => !it.isDone);
    },
    filteredTodos() {
      if ((this.filter != "")){
        return this.activeUser.todos.filter((it) =>this.filterFunction(it));
      }else {
        return this.activeUser.todos;
      }
    },
  },
  actions: {
    filterFunction(todo) {
      let titleContainsFilter = todo.title.toLowerCase().includes(this.filter);
      let textContainsFilter = todo.text.toLowerCase().includes(this.filter);
      let tagsContainFilter =
        todo.tags.filter((tag) => tag.toLowerCase().includes(this.filter)).length > 0;

      //console.log("filter:"+ this.filter)
      //console.log("Titel --> "+todo.title+": "+titleContainsFilter )
      //console.log("Text --> "+todo.text+": "+textContainsFilter )
      //console.log("Tags --> "+todo.tags+": "+tagsContainFilter )
      return (titleContainsFilter || textContainsFilter || tagsContainFilter);
    },
    //doesArrayIncludeString(array,string){
    //  array.forEach(element => {
    //    if (element.includes(string)) {
    //      return true;
    //    }
    //  });
    //  return false;
    //},
    setFilter(string) {
      this.filter = string.toLowerCase();
    },
    getTodoById(id) {
      return this.activeUser.todos.filter((it) => it.id == id)[0];
    },
    addNewTodo(title, text, tags) {
      this.activeUser.todos.push(new Todo(title, text, false, tags));
    },
    addNewUser(email, firstName, name, password) {
      this.users.push(
        new User(User.generateNewId(), email, firstName, name, password, [])
      );
    },
    getUserById(id) {
      return this.users.filter((it) => it.id == id)[0];
    },
    setActiveUserId(id) {
      this.activeUserId = id;
    },
    getTodoIndexById(id) {
      return this.activeUser.todos.indexOf(this.getTodoById(id));
    },
    deleteTodoById(id) {
      let todo = this.getTodoById(id);
      if (todo) {
        Todo.freeId(id);
        this.activeUser.todos.splice(this.getTodoIndexById(id), 1);
      }
    },
    toggleIsDone(todo) {
      todo.isDone = !todo.isDone;
    },
    splitTagsArray(string) {
      //split the string at the commas and add every
      return string.split(",");
    },
  },
  persist: true,
});

class Todo {
  static ids = [];

  static generateNewId() {
    var new_id = 1;
    while (this.ids.includes(new_id)) {
      new_id++;
    }
    this.ids.push(new_id);
    return new_id;
  }

  constructor(title, text, isDone, tags) {
    this.id = Todo.generateNewId();
    this.title = title;
    this.text = text;
    this.isDone = isDone;
    this.tags = tags;
  }

  toggleIsDone() {
    this.isDone != this.isDone;
  }

  static freeId(id) {
    this.ids.splice(Todo.ids.indexOf(id), 1);
  }
}

class User {
  static ids = [];

  static generateNewId() {
    var new_id = 0;
    while (this.ids.includes(new_id)) {
      new_id++;
    }
    //this.ids.push(new_id);
    return new_id;
  }
  constructor(id, email, firstName, name, password, todos) {
    this.id = id;
    User.ids.push(id);
    this.email = email;
    this.firstName = firstName;
    this.name = name;
    this.password = password;
    this.todos = todos;
  }
}

// users: [
//   {
//     id:-1,
//     email:"test@test.com",
//     firstName:"Annanas",
//     name:"name",
//     password:"test",
//     todos:[new Todo("Test", "this is a test"),]

//   },
//   new User("ivoheberle@gmail.com", "Ivo", "Heberle", "test1234", [
//     new Todo("do something", "I have to do something"),
//     new Todo("do something else", "I have to do something else"),
//     new Todo("do something", "I have to do something"),
//     new Todo("do something", "I have to do something"),
//     new Todo("do something", "I have to do something"),
//   ]),
//   new User("dario.kempf@edu.vs.ch", "Dario", "Kempf", "ivoistderbeste", [
//     new Todo("noice", "I have to do something"),
//     new Todo("noice else", "I have to do something else"),
//     new Todo("noice", "I have to do something"),
//     new Todo("noice", "I have to do something"),
//     new Todo("noice", "I have to do something"),
//   ]),
// ],
