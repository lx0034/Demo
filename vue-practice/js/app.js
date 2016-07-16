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