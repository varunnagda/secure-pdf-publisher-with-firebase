
firebase.initializeApp(config);

    var file_Name_array= new Array();
    var  description_array=new Array();
    var  category_details_array=new Array();
    var  keys_array=new Array();
    var url_array=new Array();
  
    RootRef = firebase.database().ref('ebooks/'); 
    var count=-1;
    RootRef.on("child_added", snap => {
    
     var file_name=snap.child('file_name').val();
     var  description=snap.child('description').val();
     var category_details=snap.child('category_details').val();
     var url=snap.child('url').child('i').val();
    // var cat_split=category_details.split(',');
     var key=snap.key;
    if(file_name!=null && description!=null &&  category_details!=null && key!=null){
     
        count++;
            file_Name_array.push(file_name);
             description_array.push(description);
             category_details_array.push(category_details);
            keys_array.push(key);
            url_array.push(url);
       
    
    
    }
    if(file_name==null){
    
        file_Name_array.reverse();
        description_array.reverse();
        category_details_array.reverse();
        keys_array.reverse();
        url_array.reverse();
    //  console.log(file_Name_array);
   for(var k=0;k<file_Name_array.length;k++){




    $('#myUL_pdf_view').append(

        " <li onclick="+"myFunction("+k+")"+" id="+"list_row"+"> " +
        "    <div "+"id="+"title_id"+">" +"</div>"+
        file_Name_array[k]  + "  <div "+"class="+"itemDelete"+" >"
        + " <button onclick="+"myFunctionDelete("+k+")"+">delete</button></div> " +
        "<div > " +
         "  <div  >"
        + " <button onclick="+"myFunctionEdit("+k+")"+">Edit</button></div> " +
        "<div > " +
        description_array[k]+
        "<a >"+category_details_array[k]+"</a>"+
       
        " </li>"
        ); 
        
   }
    }
  
    
    
     }); 
    function  myFunction(z){
  
      

    }
   function myFunctionDelete(z){
      
        var cat_split=new Array();

keys_array[z];
RemoveRef_PDF = firebase.database().ref('ebooks/'+keys_array[z]);  
var cat_split=category_details_array[z].split(',');
RemoveRef_PDF.remove();
var checker=0;
for(var x=0;x<cat_split.length;x++){
   
    console.log(cat_split[x]);


RemoveRef_CATEGORY = firebase.database().ref('ebooks/category/'+cat_split[x]+'/'+keys_array[z]);  
 RemoveRef_CATEGORY.remove();
 
 

}

$('#myUL_pdf_view').on('click', '.itemDelete', function(){
    if(checker==0){
        checker++;
    $(this).parent().remove();
    }
});


 
    }
    function myFunctionEdit(edit){

         
        sessionStorage.setItem("pdf_key",keys_array[edit]);
        sessionStorage.setItem("file_name_session",file_Name_array[edit]);
        sessionStorage.setItem("description_session",description_array[edit]);
        sessionStorage.setItem("category_session",category_details_array[edit]);
        sessionStorage.setItem("url_session",url_array[edit]);

         window.open("admin.html");

    }
    
