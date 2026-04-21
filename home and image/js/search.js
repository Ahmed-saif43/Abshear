function searchList(inputElement, listParent) {
  console.log('searching...')
  console.log(listParent)
  console.log(inputElement)
    // For Desktop
    const searchField = inputElement
    const listContent = document.getElementById(listParent);
    console.log('listContent')
    console.log(listContent)
    let searchTxt = searchField.value.toLowerCase();
    console.log(searchTxt)
    const length =  listContent.querySelectorAll(listParent).length;
    let innerLength = 0;
    let count = 0;
    let countInner = 0;
    listContent
      .querySelectorAll('li')
      .forEach((el) => {
        el.addEventListener('click', (e) =>{
          console.log('clicked item')
          console.log(e)
        })
        var rowTxt = el.innerText.toLowerCase();
        
        if (rowTxt.includes(searchTxt) === false && searchTxt !== "") {
            el.style.display = "none";
            count++;
        } else {
          el.style.display = "";
        }
      });
 
  
    // For Mobile
    // const searchFieldMobile = document.querySelector("#table_search");
    // const tableContentMobile = document.getElementById("absher_table_mobile");
    // let searchTxtMobile = searchFieldMobile.value.toLowerCase();
    // tableContentMobile &&
    //   tableContentMobile.querySelectorAll("li").forEach((el) => {
    //     var rowTxt = el.innerText.toLowerCase();
    //     if (
    //       rowTxt.includes(searchTxtMobile) === false &&
    //       searchTxtMobile !== ""
    //     ) {
    //       el.style.display = "none";
    //     } else {
    //       el.style.display = "";
    //     }
    //   });
  }
  function reset(inputElement){
     inputElement.nextElementSibling
    .querySelectorAll('li')
    .forEach((el) => {
        el.style.display = "";
    });
    inputElement.nextElementSibling.querySelector('input').value = null
  }