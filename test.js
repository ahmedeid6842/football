// <!DOCTYPE html>

// <html lang="en">

// <head>
//     <meta charset="utf-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <title><%= title %></title>

//     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
//         integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

//     <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
//     <link rel="stylesheet" href="/css/group.css">

// </head>

// <body>
//     <%- include ../partials/navbar.ejs %>
//     <div class="col-md-12">


//         <div class="col-md-12">
//             <div class="chat_container">
//                 <div class="row">

//                     <div class="col-sm-4 col-md-3 mob-clearfix">
//                         <div class="row">
//                             <div class="col-md-12">
//                                 <div class="card-container">
//                                     <div class="card">
//                                         <div class="front">
//                                             <div class="cover">

//                                             </div>
//                                             <div class="user cover-img">
//                                                 <img src="https://placehold.it/300x300" class="img-circle" alt="">
//                                             </div>
//                                             <div class="content">
//                                                 <div class="main">
//                                                     <h3 class="name">Username || Fullname</h3>
//                                                     <p class="profession-online">
//                                                         <i class="fa fa-circle online" aria-hidden="true"></i>
//                                                         Online
//                                                     </p>
//                                                     <p class="text-center">
//                                                         Mantra
//                                                     </p>
//                                                 </div>
//                                                 <div class="footer">
//                                                     <i class="fa fa-mail-forward"></i>
//                                                     <a href="#">
//                                                         View My Profile
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div class="row" style="margin-top:10px;">
//                             <div class="col-md-12">
//                                 <div class="card-container">
//                                     <div class="card">
//                                         <div class="front">

//                                             <div class="content main-scroll">
//                                                 <div class="main" id="main_scroll">
//                                                     <p class="friends" style="margin-bottom:0px;">
//                                                         Online Friends <span id="numOfFriends"></span>
//                                                     </p>
//                                                     <hr style="margin-top:10px" />
//                                                     <% if(data.friendsList.length>0){ %>
//                                                     <%_.forEach(data.friendsList,(value)=>{  %>
                                                   
//                                                         <%  })%>
//                                                     <%  }%>
//                                                     <div class="onlineFriends"></div>

//                                                 </div>

//                                             </div>
//                                         </div>

//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>



//                     <div class="col-sm-5 col-md-6 message_section">
//                         <div class="row">
//                             <div class="new_message_head">
//                                 <div class="pull-left">
//                                     <button class="club_name">
//                                         Group Name
//                                     </button>
//                                 </div>
//                                 <div class="pull-right">
//                                 </div>
//                             </div>

//                             <div class="chat_area">
//                                 <ul id="messages" class="list-unstyled">
//                                     <!-- <li class="left">
//                                         <span class="chat-img1 pull-left">
//                                             <img src="http://placehold.it/300x300" class="img-circle" alt="">
//                                         </span>
//                                         <div class="chat-body1">
//                                             <span class="chat-name">UserName</span>
//                                             <br>
//                                             MessageBody
//                                         </div>
//                                     </li> -->
//                                 </ul>
//                                 <script id="message-template" type="text/template">
//                                     <li class="left">
//                                         <span class="chat-img1 pull-left">
//                                             <img src="http://placehold.it/300x300" class="img-circle" alt="">
//                                         </span>
//                                         <div class="chat-body1">
//                                             <span class="chat-name">{{sender}}</span>
//                                             <br>
//                                             {{text}}
//                                         </div>
//                                     </li>
//                                 </script>
//                             </div>

//                             <div class="message_write">
//                                 <form id="message-form" method="post">
//                                     <input type="hidden" id="groupName" value="<%= groupName%> ">
//                                     <input type="hidden" name="sender" id="sender" value="<%= user.username%>">
//                                     <textarea class="form-control" name="message" id="msg"
//                                         placeholder="Type a message"></textarea>
//                                     <div class="clearfix"></div>
//                                     <div class="chat_bottom">
//                                         <button id="send-message" class="pull-right btn btn-primary"
//                                             style="background: #4aa1f3; border: #4aa1f3; ">
//                                             Send
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>

//                     <div class="col-sm-3 col-md-3 mob-50 mob-clearfix">


//                         <div class="new_message_head">
//                             <div class="pull-left">
//                                 <button class="club_fans">
//                                     <i class="fa fa-users" aria-hidden="true"
//                                         style="padding-right:15px; color:#4aa1f3 !important;"></i>
//                                     Online Club Fans <span id="numValue"></span>
//                                 </button>
//                             </div>
//                         </div>



//                         <div class="gr-rightsidebar">

//                             <div id="myModal" class="modal fade" role="dialog">
//                                 <div class="modal-dialog">

//                                     <div class="modal-content">
//                                         <div class="modal-header">
//                                             <button type="button" class="close" data-dismiss="modal">&times;</button>
//                                             <h3 class="modal-title" id="name"></h3>
//                                         </div>
//                                         <div class="modal-body">
//                                             <form action="" method="post" id="add_friend">
//                                                 <input type="hidden" name="receiverName" id="receiverName" value="">
//                                                 <input type="hidden" name="sender-name" id="sender-name"
//                                                     value="<%=user.username%>">

//                                                 <input type="hidden" name="userId" id="userId" value="">
//                                                 <button type="submit" id="friend-add" class="btn add"><i
//                                                         class="fa fa-user"></i> Add Friend</button>

//                                                 <a id="nameLink" class="btn">View Profile</a>

//                                                 <div id="myTest">

//                                                 </div>
//                                             </form>
//                                         </div>
//                                         <div class="modal-footer">
//                                             <button type="button" class="btn btn_close"
//                                                 data-dismiss="modal">Close</button>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>

//                             <div class="col-md-12" id="main">
//                                 <div id="users"></div>

//                             </div>

//                         </div>
//                     </div>

//                 </div>

//             </div>

//         </div>
//     </div>


//     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
//         integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
//         crossorigin="anonymous"></script>
//     <script src="/socket.io/socket.io.js"></script>
//     <script src="/js/group/groupchat.js"></script>
//     <script src="/js/group/sendRequest.js"></script>
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.js"></script>
// </body>

// </html>












// <% _.forEach(groupMsg,function(val){ %>
//     <h1><%= groupName %> </h1>
//     <h1><%=val.name %> </h1>
//     <br>
//     <% if(groupName===val.name){ %>
//     <li class="left">
//         <span class="chat-img1 pull-left">
//             <img src="http://placehold.it/300x300" class="img-circle" alt="">
//         </span>
//         <div class="chat-body1">
//             <span class="chat-name"><%= val.sender.username %></span>
//             <br>
//             <%= val.body %>
//         </div>
//     </li>
//     <% } %>
//     <% }) %>
