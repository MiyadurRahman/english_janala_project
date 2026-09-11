

const synonym=["hi","by","die"]

const createelement=(arr)=>
{
    const htmlelements=arr.map(el=>  `<span class="btn">${el}</span> `)
    console.log(htmlelements.join(" "));//join will create strings

};
 createelement(synonym);