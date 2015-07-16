'use strict';

angular.module('workspaceApp')
  .controller('EditorCtrl', function ($scope, Auth, $location, $http) {
    //This is the authentication of the view.
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.isAdmin = Auth.isAdmin();
    $scope.getCurrentUser = Auth.getCurrentUser();
    
    //This is all of the post relevant items for the view.
    $scope.editPost = {
      name: '',
      author: 'Glenn Nausley',
      info: '',
      active: false,
      body: '',
      markdown: '',
      thumbPic: '',
      postDate: new Date(),
    };
    $scope.preview = false;
    $scope.postTags = '';
    /*if($scope.isLoggedIn === false){
      $location.path('/');
    }*/
    
    var converter = new showdown.Converter();
    
    $scope.convert = function(content, date){
      var newTags = this.postTags.split([',']), modTags = null;
      newTags = newTags.map(function(tag){return tag.trim()});
      console.log(newTags);
      if(newTags.length > 0 && newTags[0] !== ''){
        modTags = newTags.map(function(data){
          return "<a href='/cat/"+data+"'>"+data+"</a>";
        }).reduce(function(prev, curr){
          return prev + ', '+ curr;
        });
      }
      if(content){
        $scope.editPost.formatDate = date.getMonth()+ 1 +'/'+ date.getDate() +'/'+date.getFullYear();
        content = "<h2 class='postTitle'>"+$scope.editPost['name']+ "</h2>" + '\n' + '#####' + $scope.editPost.formatDate + '\n' + content;
        content = content + "\n \n" + "<sup><sub> Written by: "+ $scope.editPost.author + "</sub></sup>";
        if(modTags){
          content = content + "<sup><sub>"+" || Tagged under: " + modTags + "</sub></sup>";
        }
        content = content + "<a href='http://twitter.com/intent/tweet?status="+$scope.editPost['name'] + " by "+$scope.editPost.author+"'><span class='fa-stack smFooter'><i class='fa fa-twitter fa-stack-1x'></i></span></a>"+"<a ><span class='fa-stack smFooter'><i class='fa fa-facebook fa-stack-1x'></i></span></a>";
        //href='http://www.facebook.com/sharer/sharer.php?u=[URL]&title='"+$scope.title + " by "+$scope.author+"'
        $scope.editPost.body = converter.makeHtml(content);
        //$scope.result = content;
        $scope.preview = true;
      }
    };
    
    $scope.goBack = function(){
      $scope.preview = false;
    };
    
    $scope.savePost = function(){
      var newTags = this.postTags.split([',']).map(function(tag){return tag.trim()});
      var urlID = this.dateFor +'/'+ this.editPost.name.split([' ']).join(['-']);
      console.log(urlID);
      $scope.editPost['category'] = newTags;
      $scope.editPost['urlID'] = urlID;
      $http.post('/api/posts', $scope.editPost);
      $location.path('/fileManage');
    };
  });
