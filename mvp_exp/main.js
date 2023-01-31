function taskPost(){
    let body = document.getElementsByTagName('body')[0]
    let btn = document.getElementById('create-task');
    let results = document.getElementById('results');
    // btn.style.cursor = 'pointer';
    // let taskText = document.getElementById('input');
    function buttonClick(){
        btn.addEventListener('click', function(){
            var input = $('input')[0].value
            // let input = document.getElementById('input').value;
            taskPost(input);
        })
    }
    buttonClick()

    function taskPost(input){
        let count = [];
        count.push(input);
        
        for (let i=0; i<count.length; i++){
            let span = document.createElement('span');
            span.setAttribute('class', 'created-tasks');
            results.appendChild(span);
            let parag = document.createElement('p');
            span.appendChild(parag);
            parag[i]
            parag.textContent = input; 
        }
        
    }
    taskPost();
}
taskPost();