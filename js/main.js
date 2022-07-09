const selectFile = document.getElementById('fileSelect');
const fileName = document.getElementById('fileName');
const colorStyle = document.getElementById('userColor');


const controlButtons = document.querySelectorAll('button')
const docEara = document.getElementById('docEara');
const createLinkBtn = document.getElementById('createLink')


controlButtons.forEach((btn)=>{
    btn.onclick = (e)=> {
        document.execCommand(e.target.getAttribute('id'))
    }
})


//crate anchor
createLinkBtn.onclick = (e)=> {
    //[1]create input to take url value
    let urlInput = document.createElement('input');
    urlInput.style.position = 'absolute';
    urlInput.style.top = '100%';
    urlInput.style.left = '0';
    urlInput.style.width = '100%';
    urlInput.style.border = 'none';
    urlInput.style.padding = '0px 4px';

    urlInput.id = 'urlValue';
    //id we have inpute dont create anther one
    if(!document.getElementById('urlValue')){
        createLinkBtn.appendChild(urlInput)
    }
    //[2] set https:// as defaut value 
    document.execCommand( 'createLink', false , `https://`)
    urlInput.setAttribute('value' , 'https://');

    //[3] Cursor to the End of an Input field
    const end = urlInput.value.length;
    urlInput.setSelectionRange(end, end);

    //[4] get the real url and replace it with the default one and remove the input
    urlInput.focus();
    urlInput.onkeydown = (e)=>{
        if(e.key === 'Enter') {
            let url = urlInput.value;
            let anchor = document.querySelector('a[href="https://"]') 
            anchor.href = url;
            console.log(anchor);    
            urlInput.remove();
        } 
    }
    
}

colorStyle.oninput = ()=> {
    document.execCommand('foreColor' , false , colorStyle.value)
}

selectFile.onchange = ()=>{
    if(selectFile.value === 'new') {
        docEara.innerHTML = 'Start typing .......';
    }
    if(selectFile.value === 'saveAsTXT') {
        let a = document.createElement('a');
        let bob = new Blob([docEara.innerText]);
        let url = URL.createObjectURL(bob);
        a.setAttribute('download' , `${fileName.value}`)
        a.href = url;
        //click() 
        a.click();
    }
    if(selectFile.value === 'saveAsPDF') {
      html2pdf().from(docEara).save(fileName.value)
    }
  
}