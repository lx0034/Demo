new Vue({
	el: '#app',
	data: {
		message: 'Hello vue.js!'
	}
});

new Vue({
    el: "#app2",
    data:{
        todos:[
            {text: 'aaa'},
            {text: 'bbb'},
            {text: 'ccc'}
        ]    
    }
    
});

new Vue({
    el: "#app3",
    data: {
        message: "Hello Vue"
    },
    methods: {
        reverseMessage: function(){
            this.message =  this.message.split('').reverse().join();
        }
    } 
});

new Vue({
    el:"#app4",
    data: {
        newTodo: '',
        todos: [
            {text: 'add some todos'}
        ]
    },
    methods: {
        addTodo: function(){
            var text = this.newTodo.trim();
            if (text) {
                this.todos.push({text: text});
                this.newTodo = '';
            }
        },
        removeTodo: function(index){
            this.todos.splice(index, 1);
        }
    }
});

